import SwiftUI
import ChatUIFoundation

public struct ChatShell<Sidebar: View, Header: View, Messages: View, Composer: View, ContextPanel: View>: View {
    private let sidebar: Sidebar
    private let header: Header
    private let messages: Messages
    private let composer: Composer
    private let contextPanel: ContextPanel
    private let spacing: CGFloat
    private let padding: CGFloat

    public init(
        spacing: CGFloat = CGFloat(FSpacing.s16),
        padding: CGFloat = CGFloat(FSpacing.s16),
        @ViewBuilder sidebar: () -> Sidebar,
        @ViewBuilder header: () -> Header,
        @ViewBuilder messages: () -> Messages,
        @ViewBuilder composer: () -> Composer,
        @ViewBuilder contextPanel: () -> ContextPanel
    ) {
        self.spacing = spacing
        self.padding = padding
        self.sidebar = sidebar()
        self.header = header()
        self.messages = messages()
        self.composer = composer()
        self.contextPanel = contextPanel()
    }

    public var body: some View {
        HStack(spacing: spacing) {
            sidebar
            VStack(spacing: spacing) {
                header
                VStack(spacing: 0) {
                    messages
                    composer
                }
            }
            contextPanel
        }
        .padding(padding)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(FColor.bgApp)
    }
}

public struct ChatVariantSplitSidebar<Sidebar: View, Header: View, Messages: View, Composer: View>: View {
    private let sidebar: Sidebar
    private let header: Header
    private let messages: Messages
    private let composer: Composer
    private let spacing: CGFloat
    private let padding: CGFloat

    public init(
        spacing: CGFloat = CGFloat(FSpacing.s16),
        padding: CGFloat = CGFloat(FSpacing.s16),
        @ViewBuilder sidebar: () -> Sidebar,
        @ViewBuilder header: () -> Header,
        @ViewBuilder messages: () -> Messages,
        @ViewBuilder composer: () -> Composer
    ) {
        self.spacing = spacing
        self.padding = padding
        self.sidebar = sidebar()
        self.header = header()
        self.messages = messages()
        self.composer = composer()
    }

    public var body: some View {
        ChatShell(
            spacing: spacing,
            padding: padding,
            sidebar: { sidebar },
            header: { header },
            messages: { messages },
            composer: { composer },
            contextPanel: { EmptyView() }
        )
    }
}

public struct ChatVariantCompact<Header: View, Messages: View, Composer: View>: View {
    private let header: Header
    private let messages: Messages
    private let composer: Composer
    private let spacing: CGFloat
    private let padding: CGFloat

    public init(
        spacing: CGFloat = CGFloat(FSpacing.s16),
        padding: CGFloat = CGFloat(FSpacing.s16),
        @ViewBuilder header: () -> Header,
        @ViewBuilder messages: () -> Messages,
        @ViewBuilder composer: () -> Composer
    ) {
        self.spacing = spacing
        self.padding = padding
        self.header = header()
        self.messages = messages()
        self.composer = composer()
    }

    public var body: some View {
        ChatShell(
            spacing: spacing,
            padding: padding,
            sidebar: { EmptyView() },
            header: { header },
            messages: { messages },
            composer: { composer },
            contextPanel: { EmptyView() }
        )
    }
}

public struct ChatVariantContextRail<Sidebar: View, Header: View, Messages: View, Composer: View, ContextPanel: View>: View {
    private let sidebar: Sidebar
    private let header: Header
    private let messages: Messages
    private let composer: Composer
    private let contextPanel: ContextPanel
    private let spacing: CGFloat
    private let padding: CGFloat

    public init(
        spacing: CGFloat = CGFloat(FSpacing.s16),
        padding: CGFloat = CGFloat(FSpacing.s16),
        @ViewBuilder sidebar: () -> Sidebar,
        @ViewBuilder header: () -> Header,
        @ViewBuilder messages: () -> Messages,
        @ViewBuilder composer: () -> Composer,
        @ViewBuilder contextPanel: () -> ContextPanel
    ) {
        self.spacing = spacing
        self.padding = padding
        self.sidebar = sidebar()
        self.header = header()
        self.messages = messages()
        self.composer = composer()
        self.contextPanel = contextPanel()
    }

    public var body: some View {
        ChatShell(
            spacing: spacing,
            padding: padding,
            sidebar: { sidebar },
            header: { header },
            messages: { messages },
            composer: { composer },
            contextPanel: { contextPanel }
        )
    }
}
