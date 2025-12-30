import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public enum ChatHeaderViewMode: String, CaseIterable, Identifiable {
    case chat
    case compose

    public var id: String { rawValue }
}

public struct ChatSidebarItem: Identifiable {
    public let id: UUID
    public let title: String
    public let systemIcon: String

    public init(id: UUID = UUID(), title: String, systemIcon: String) {
        self.id = id
        self.title = title
        self.systemIcon = systemIcon
    }
}

public enum ChatMessageRole {
    case user
    case assistant
}

public struct ChatMessageItem: Identifiable {
    public let id: UUID
    public let role: ChatMessageRole
    public let content: String

    public init(id: UUID = UUID(), role: ChatMessageRole, content: String) {
        self.id = id
        self.role = role
        self.content = content
    }
}

public struct ChatHeaderBlockView: View {
    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    @Binding private var isSidebarOpen: Bool
    @Binding private var viewMode: ChatHeaderViewMode
    @Binding private var selectedModel: String
    private let models: [String]
    private let onDownload: () -> Void
    private let onShare: () -> Void

    public init(
        isSidebarOpen: Binding<Bool>,
        viewMode: Binding<ChatHeaderViewMode>,
        selectedModel: Binding<String>,
        models: [String],
        onDownload: @escaping () -> Void = {},
        onShare: @escaping () -> Void = {}
    ) {
        self._isSidebarOpen = isSidebarOpen
        self._viewMode = viewMode
        self._selectedModel = selectedModel
        self.models = models
        self.onDownload = onDownload
        self.onShare = onShare
    }

    public var body: some View {
        HStack(spacing: FSpacing.s12) {
            ChatUIButton(variant: .ghost, size: .icon, accessibilityLabel: "Toggle sidebar") {
                isSidebarOpen.toggle()
            } content: {
                Image(systemName: "sidebar.left")
            }

            Picker("View mode", selection: $viewMode) {
                Text("Chat").tag(ChatHeaderViewMode.chat)
                Text("Compose").tag(ChatHeaderViewMode.compose)
            }
            .pickerStyle(.segmented)
            .frame(maxWidth: 220)

            Menu {
                ForEach(models, id: \.self) { model in
                    Button(model) { selectedModel = model }
                }
            } label: {
                HStack(spacing: FSpacing.s8) {
                    Text(selectedModel)
                        .font(FType.caption())
                        .foregroundStyle(FColor.textSecondary)
                    Image(systemName: "chevron.down")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(FColor.iconSecondary)
                }
                .padding(.vertical, FSpacing.s4)
                .padding(.horizontal, FSpacing.s8)
                .background(FColor.bgCardAlt)
                .clipShape(RoundedRectangle(cornerRadius: theme.inputCornerRadius))
            }
            .buttonStyle(.plain)

            Spacer()

            ChatUIButton(variant: .ghost, size: .icon, accessibilityLabel: "Download conversation") {
                onDownload()
            } content: {
                Image(systemName: "arrow.down.circle")
            }

            ChatUIButton(variant: .ghost, size: .icon, accessibilityLabel: "Share conversation") {
                onShare()
            } content: {
                Image(systemName: "square.and.arrow.up")
            }
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s8)
        .background(FColor.bgApp)
        .overlay(
            Rectangle()
                .fill(FColor.divider.opacity(scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight))
                .frame(height: 1),
            alignment: .bottom
        )
    }
}

public struct ChatSidebarBlockView: View {
    @Environment(\.chatUITheme) private var theme
    @Binding private var selectedItemID: UUID?
    private let title: String
    private let items: [ChatSidebarItem]
    private let onNewChat: () -> Void

    public init(
        title: String,
        items: [ChatSidebarItem],
        selectedItemID: Binding<UUID?>,
        onNewChat: @escaping () -> Void = {}
    ) {
        self.title = title
        self.items = items
        self._selectedItemID = selectedItemID
        self.onNewChat = onNewChat
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: FSpacing.s12) {
            HStack {
                Text(title)
                    .font(FType.title())
                    .foregroundStyle(FColor.textPrimary)

                Spacer()

                ChatUIButton(variant: .ghost, size: .icon, accessibilityLabel: "New chat") {
                    onNewChat()
                } content: {
                    Image(systemName: "square.and.pencil")
                }
            }
            .padding(.horizontal, FSpacing.s16)
            .padding(.top, FSpacing.s12)

            ScrollView {
                VStack(alignment: .leading, spacing: FSpacing.s8) {
                    ForEach(items) { item in
                        ListItemView(
                            systemIcon: item.systemIcon,
                            title: item.title,
                            trailing: .none,
                            isSelected: item.id == selectedItemID
                        ) {
                            selectedItemID = item.id
                        }
                    }
                }
                .padding(.horizontal, FSpacing.s12)
                .padding(.bottom, FSpacing.s16)
            }
        }
        .background(FColor.bgApp)
        .clipShape(RoundedRectangle(cornerRadius: theme.cardCornerRadius))
    }
}

public struct ChatMessagesBlockView: View {
    private let messages: [ChatMessageItem]

    public init(messages: [ChatMessageItem]) {
        self.messages = messages
    }

    public var body: some View {
        ScrollView {
            LazyVStack(spacing: FSpacing.s16) {
                ForEach(messages) { message in
                    ChatMessageRow(message: message)
                }
            }
            .padding(FSpacing.s16)
        }
        .background(FColor.bgApp)
    }
}

public struct ChatInputBlockView: View {
    @Binding private var text: String
    private let isProcessing: Bool
    private let onSend: () -> Void

    public init(text: Binding<String>, isProcessing: Bool, onSend: @escaping () -> Void) {
        self._text = text
        self.isProcessing = isProcessing
        self.onSend = onSend
    }

    private var canSendMessage: Bool {
        !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty && !isProcessing
    }

    public var body: some View {
        HStack(spacing: FSpacing.s12) {
            InputView(
                text: $text,
                placeholder: "Type a message...",
                variant: .default,
                submitLabel: .send
            ) {
                guard canSendMessage else { return }
                onSend()
            }
            .disabled(isProcessing)

            ChatUIButton(
                variant: .default,
                size: .icon,
                isDisabled: !canSendMessage,
                accessibilityLabel: "Send"
            ) {
                guard canSendMessage else { return }
                onSend()
            } content: {
                Image(systemName: "arrow.up")
            }
        }
        .padding(FSpacing.s16)
        .background(FColor.bgApp)
        .overlay(SettingsDivider(), alignment: .top)
    }
}

private struct ChatMessageRow: View {
    let message: ChatMessageItem

    var body: some View {
        HStack(alignment: .top, spacing: FSpacing.s12) {
            if message.role == .assistant {
                Circle()
                    .fill(FColor.bgCardAlt)
                    .frame(width: 32, height: 32)
                    .overlay(
                        Image(systemName: "sparkles")
                            .font(.system(size: 14))
                            .foregroundStyle(FColor.iconSecondary)
                            .accessibilityHidden(true)
                    )

                MessageBubble(role: "Assistant", content: message.content)
                Spacer(minLength: 0)
            } else {
                Spacer(minLength: 0)

                MessageBubble(role: "You", content: message.content)

                Circle()
                    .fill(FColor.accentBlue)
                    .frame(width: 32, height: 32)
                    .overlay(
                        Image(systemName: "person.fill")
                            .font(.system(size: 14))
                            .foregroundStyle(Color.white)
                            .accessibilityHidden(true)
                    )
            }
        }
    }
}

private struct MessageBubble: View {
    let role: String
    let content: String

    var body: some View {
        VStack(alignment: .leading, spacing: FSpacing.s8) {
            Text(role)
                .font(FType.sectionTitle())
                .foregroundStyle(FColor.textPrimary)

            Text(content)
                .font(FType.rowTitle())
                .foregroundStyle(FColor.textSecondary)
                .textSelection(.enabled)
        }
        .accessibilityElement(children: .combine)
        .padding(FSpacing.s12)
        .background(FColor.bgCard)
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}
