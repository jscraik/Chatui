import SnapshotTesting
import SwiftUI
import ChatUIThemes
#if canImport(XCTest)
import XCTest
#endif

public enum SnapshotAccessibilityContrast {
    case standard
    case increased
}

public enum SnapshotTestSupport {
    public static let isRecording: Bool = {
        let value = ProcessInfo.processInfo.environment["SNAPSHOT_RECORD"] ?? "0"
        return value == "1" || value.lowercased() == "true"
    }()

    public static let isEnabled: Bool = {
        let value = ProcessInfo.processInfo.environment["SNAPSHOT_TESTS"] ?? "0"
        return isRecording || value == "1" || value.lowercased() == "true"
    }()

    @MainActor
    public static func assertView<V: View>(
        _ view: V,
        size: CGSize,
        colorScheme: ColorScheme,
        theme: ChatUITheme = .chatgpt,
        accessibilityContrast: SnapshotAccessibilityContrast? = nil,
        reduceMotion: Bool? = nil,
        legibilityWeight: SwiftUI.LegibilityWeight? = nil,
        dynamicTypeSize: SwiftUI.DynamicTypeSize? = nil,
        named: String? = nil,
        file: StaticString = #filePath,
        testName: String = #function,
        line: UInt = #line
    ) throws {
        guard isEnabled else {
            #if canImport(XCTest)
            throw XCTSkip("Snapshot tests disabled. Set SNAPSHOT_TESTS=1 to run or SNAPSHOT_RECORD=1 to record.")
            #else
            return
            #endif
        }

        SnapshotTesting.isRecording = isRecording

        var configuredView: AnyView = AnyView(
            view
                .environment(\.colorScheme, colorScheme)
                .environment(\.chatUITheme, theme)
                .frame(width: size.width, height: size.height)
        )

        _ = accessibilityContrast
        _ = reduceMotion
        if let legibilityWeight {
            configuredView = AnyView(
                configuredView.environment(\.legibilityWeight, legibilityWeight)
            )
        }
        if let dynamicTypeSize {
            configuredView = AnyView(
                configuredView.environment(\.dynamicTypeSize, dynamicTypeSize)
            )
        }

        #if os(macOS)
        let hostingController = NSHostingController(rootView: configuredView)
        hostingController.view.frame = CGRect(origin: .zero, size: size)
        assertSnapshot(
            of: hostingController.view,
            as: .image(size: size),
            named: named,
            file: file,
            testName: testName,
            line: line
        )
        #else
        assertSnapshot(
            of: configuredView,
            as: .image(layout: .fixed(width: size.width, height: size.height)),
            named: named,
            file: file,
            testName: testName,
            line: line
        )
        #endif
    }
}
