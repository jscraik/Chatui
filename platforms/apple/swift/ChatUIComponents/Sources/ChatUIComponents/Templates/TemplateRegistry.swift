import SwiftUI

public enum TemplateID: String, CaseIterable, Identifiable {
    case chatHeader
    case chatSidebar
    case chatMessages
    case chatInput
    case chat
    case chatVariants
    case compose

    public var id: String { rawValue }

    public var title: String {
        switch self {
        case .chatHeader:
            return "Chat Header"
        case .chatSidebar:
            return "Chat Sidebar"
        case .chatMessages:
            return "Chat Messages"
        case .chatInput:
            return "Chat Input"
        case .chat:
            return "Chat"
        case .chatVariants:
            return "Chat Variants"
        case .compose:
            return "Compose"
        }
    }

    public var detail: String {
        switch self {
        case .chatHeader:
            return "Header bar for chat surfaces."
        case .chatSidebar:
            return "Sidebar navigation for chats."
        case .chatMessages:
            return "Message list block."
        case .chatInput:
            return "Composer input bar."
        case .chat:
            return "Chat shell with messages and input composer."
        case .chatVariants:
            return "Switchable chat layouts (split, compact, rail)."
        case .compose:
            return "Prompt builder and compose workflow template."
        }
    }
}

public struct TemplateDescriptor: Identifiable {
    public let id: TemplateID
    public let title: String
    public let detail: String
    public let makeView: () -> AnyView

    public init(id: TemplateID, title: String, detail: String, makeView: @escaping () -> AnyView) {
        self.id = id
        self.title = title
        self.detail = detail
        self.makeView = makeView
    }
}

public enum TemplateRegistry {
    public static let templates: [TemplateDescriptor] = [
        TemplateDescriptor(
            id: .chatHeader,
            title: TemplateID.chatHeader.title,
            detail: TemplateID.chatHeader.detail,
            makeView: { AnyView(ChatHeaderTemplateView()) }
        ),
        TemplateDescriptor(
            id: .chatSidebar,
            title: TemplateID.chatSidebar.title,
            detail: TemplateID.chatSidebar.detail,
            makeView: { AnyView(ChatSidebarTemplateView()) }
        ),
        TemplateDescriptor(
            id: .chatMessages,
            title: TemplateID.chatMessages.title,
            detail: TemplateID.chatMessages.detail,
            makeView: { AnyView(ChatMessagesTemplateView()) }
        ),
        TemplateDescriptor(
            id: .chatInput,
            title: TemplateID.chatInput.title,
            detail: TemplateID.chatInput.detail,
            makeView: { AnyView(ChatInputTemplateView()) }
        ),
        TemplateDescriptor(
            id: .chat,
            title: TemplateID.chat.title,
            detail: TemplateID.chat.detail,
            makeView: { AnyView(ChatTemplateView()) }
        ),
        TemplateDescriptor(
            id: .chatVariants,
            title: TemplateID.chatVariants.title,
            detail: TemplateID.chatVariants.detail,
            makeView: { AnyView(ChatVariantsTemplateView()) }
        ),
        TemplateDescriptor(
            id: .compose,
            title: TemplateID.compose.title,
            detail: TemplateID.compose.detail,
            makeView: { AnyView(ComposeView()) }
        )
    ]

    public static func template(for id: TemplateID) -> TemplateDescriptor? {
        templates.first { $0.id == id }
    }
}
