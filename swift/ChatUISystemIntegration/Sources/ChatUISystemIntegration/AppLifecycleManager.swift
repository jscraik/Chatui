import Foundation
#if canImport(AppKit)
import AppKit
#elseif canImport(UIKit)
import UIKit
#endif

/// Manages app lifecycle and state restoration
public class AppLifecycleManager {
    
    public enum LifecycleError: Error, LocalizedError {
        case stateRestorationFailed(Error)
        case stateSavingFailed(Error)
        case invalidState
        
        public var errorDescription: String? {
            switch self {
            case .stateRestorationFailed(let error):
                return "Failed to restore state: \(error.localizedDescription)"
            case .stateSavingFailed(let error):
                return "Failed to save state: \(error.localizedDescription)"
            case .invalidState:
                return "Invalid application state"
            }
        }
    }
    
    private let stateDirectory: URL
    
    public init() {
        // Create state directory in Application Support
        let fileManager = FileManager.default
        let appSupport = fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
        let baseDirectory = appSupport ?? fileManager.temporaryDirectory
        var targetDirectory = baseDirectory.appendingPathComponent("ChatUI/State", isDirectory: true)
        
        do {
            try fileManager.createDirectory(at: targetDirectory, withIntermediateDirectories: true)
        } catch {
            // Fall back to a temporary directory if Application Support is unavailable.
            targetDirectory = fileManager.temporaryDirectory.appendingPathComponent("ChatUI/State", isDirectory: true)
            try? fileManager.createDirectory(at: targetDirectory, withIntermediateDirectories: true)
        }
        
        self.stateDirectory = targetDirectory
        
        setupLifecycleObservers()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    // MARK: - Lifecycle Observers
    
    private func setupLifecycleObservers() {
        #if os(macOS)
        // macOS lifecycle notifications
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationWillTerminate),
            name: NSApplication.willTerminateNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationDidBecomeActive),
            name: NSApplication.didBecomeActiveNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationWillResignActive),
            name: NSApplication.willResignActiveNotification,
            object: nil
        )
        
        #elseif os(iOS)
        // iOS lifecycle notifications
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationWillTerminate),
            name: UIApplication.willTerminateNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationWillResignActive),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationDidEnterBackground),
            name: UIApplication.didEnterBackgroundNotification,
            object: nil
        )
        #endif
    }
    
    @objc private func applicationWillTerminate() {
        NotificationCenter.default.post(name: .appWillTerminate, object: nil)
    }
    
    @objc private func applicationDidBecomeActive() {
        NotificationCenter.default.post(name: .appDidBecomeActive, object: nil)
    }
    
    @objc private func applicationWillResignActive() {
        NotificationCenter.default.post(name: .appWillResignActive, object: nil)
    }
    
    #if os(iOS)
    @objc private func applicationDidEnterBackground() {
        NotificationCenter.default.post(name: .appDidEnterBackground, object: nil)
    }
    #endif
    
    // MARK: - State Persistence
    
    /// Save application state
    public func saveState<T: Codable>(_ state: T, forKey key: String) async throws {
        let stateURL = stateDirectory.appendingPathComponent("\(key).json")
        
        let data: Data
        do {
            let encoder = JSONEncoder()
            data = try encoder.encode(state)
        } catch {
            throw LifecycleError.stateSavingFailed(error)
        }

        try await withCheckedThrowingContinuation { continuation in
            DispatchQueue.global(qos: .utility).async {
                do {
                    try data.write(to: stateURL, options: .atomic)
                    continuation.resume()
                } catch {
                    continuation.resume(throwing: LifecycleError.stateSavingFailed(error))
                }
            }
        }
    }
    
    /// Restore application state
    public func restoreState<T: Codable>(forKey key: String, as type: T.Type) async throws -> T? {
        let stateURL = stateDirectory.appendingPathComponent("\(key).json")
        
        guard FileManager.default.fileExists(atPath: stateURL.path) else {
            return nil
        }
        
        let data: Data
        do {
            data = try await withCheckedThrowingContinuation { continuation in
                DispatchQueue.global(qos: .utility).async {
                    do {
                        let data = try Data(contentsOf: stateURL)
                        continuation.resume(returning: data)
                    } catch {
                        continuation.resume(throwing: error)
                    }
                }
            }
        } catch {
            throw LifecycleError.stateRestorationFailed(error)
        }

        do {
            let decoder = JSONDecoder()
            return try decoder.decode(T.self, from: data)
        } catch {
            throw LifecycleError.stateRestorationFailed(error)
        }
    }
    
    /// Delete saved state
    public func deleteState(forKey key: String) async throws {
        let stateURL = stateDirectory.appendingPathComponent("\(key).json")
        
        guard FileManager.default.fileExists(atPath: stateURL.path) else {
            return
        }
        
        try await withCheckedThrowingContinuation { continuation in
            DispatchQueue.global(qos: .utility).async {
                do {
                    try FileManager.default.removeItem(at: stateURL)
                    continuation.resume()
                } catch {
                    continuation.resume(throwing: LifecycleError.stateSavingFailed(error))
                }
            }
        }
    }
    
    /// Check if state exists
    public func stateExists(forKey key: String) -> Bool {
        let stateURL = stateDirectory.appendingPathComponent("\(key).json")
        return FileManager.default.fileExists(atPath: stateURL.path)
    }
    
    /// Get all saved state keys
    public func getAllStateKeys() throws -> [String] {
        do {
            let contents = try FileManager.default.contentsOfDirectory(
                at: stateDirectory,
                includingPropertiesForKeys: nil
            )
            return contents
                .filter { $0.pathExtension == "json" }
                .map { $0.deletingPathExtension().lastPathComponent }
        } catch {
            throw LifecycleError.stateRestorationFailed(error)
        }
    }
    
    // MARK: - Window State Restoration
    
    #if os(macOS)
    /// Save window state
    @MainActor
    public func saveWindowState(window: NSWindow, identifier: String) async throws {
        let state = WindowState(
            frame: window.frame,
            isVisible: window.isVisible,
            isMiniaturized: window.isMiniaturized,
            isZoomed: window.isZoomed
        )
        
        try await saveState(state, forKey: "window_\(identifier)")
    }
    
    /// Restore window state
    @MainActor
    public func restoreWindowState(for window: NSWindow, identifier: String) async throws {
        guard let state = try await restoreState(forKey: "window_\(identifier)", as: WindowState.self) else {
            return
        }
        
        window.setFrame(state.frame, display: true)
        
        if state.isMiniaturized {
            window.miniaturize(nil)
        }
        
        if state.isZoomed {
            window.zoom(nil)
        }
        
        if state.isVisible {
            window.makeKeyAndOrderFront(nil)
        }
    }
    #endif
    
    // MARK: - Chat State Management
    
    /// Save chat session state
    public func saveChatSession(_ session: ChatSession) async throws {
        try await saveState(session, forKey: "chat_session_\(session.id)")
    }
    
    /// Restore chat session
    public func restoreChatSession(id: String) async throws -> ChatSession? {
        return try await restoreState(forKey: "chat_session_\(id)", as: ChatSession.self)
    }
    
    /// Get all chat sessions
    public func getAllChatSessions() async throws -> [ChatSession] {
        let keys = try getAllStateKeys()
        let sessionKeys = keys.filter { $0.hasPrefix("chat_session_") }
        
        var sessions: [ChatSession] = []
        for key in sessionKeys {
            if let session = try await restoreState(forKey: key, as: ChatSession.self) {
                sessions.append(session)
            }
        }
        
        return sessions.sorted { $0.lastModified > $1.lastModified }
    }
    
}

// MARK: - Supporting Types

#if os(macOS)
public struct WindowState: Codable, Sendable {
    let frame: NSRect
    let isVisible: Bool
    let isMiniaturized: Bool
    let isZoomed: Bool
}
#endif

public struct ChatSession: Codable, Sendable {
    public let id: String
    public let title: String
    public let messages: [ChatMessage]
    public let created: Date
    public let lastModified: Date
    
    public init(id: String, title: String, messages: [ChatMessage], created: Date, lastModified: Date) {
        self.id = id
        self.title = title
        self.messages = messages
        self.created = created
        self.lastModified = lastModified
    }
}

// MARK: - Notification Names

extension Notification.Name {
    public static let appWillTerminate = Notification.Name("appWillTerminate")
    public static let appDidBecomeActive = Notification.Name("appDidBecomeActive")
    public static let appWillResignActive = Notification.Name("appWillResignActive")
    public static let appDidEnterBackground = Notification.Name("appDidEnterBackground")
}
