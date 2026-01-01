import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public struct ModalDialogView<Content: View>: View {
    @Binding private var isPresented: Bool
    private let title: String?
    private let description: String?
    private let maxWidth: CGFloat
    private let showOverlay: Bool
    private let onClose: (() -> Void)?
    private let content: Content

    @Environment(\.colorScheme) private var scheme
    @Environment(\.chatUITheme) private var theme

    public init(
        isPresented: Binding<Bool>,
        title: String? = nil,
        description: String? = nil,
        maxWidth: CGFloat = 520,
        showOverlay: Bool = true,
        onClose: (() -> Void)? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self._isPresented = isPresented
        self.title = title
        self.description = description
        self.maxWidth = maxWidth
        self.showOverlay = showOverlay
        self.onClose = onClose
        self.content = content()
    }

    public var body: some View {
        if isPresented {
            ZStack {
                if showOverlay {
                    Color.black.opacity(FAccessibility.prefersReducedTransparency ? 0.7 : 0.5)
                        .ignoresSafeArea()
                        .onTapGesture {
                            dismiss()
                        }
                }

                VStack(spacing: 0) {
                    if let title {
                        ModalHeaderView(
                            title: title,
                            subtitle: description,
                            onClose: { dismiss() }
                        )
                    }

                    content
                }
                .frame(maxWidth: maxWidth, maxHeight: .infinity, alignment: .top)
                .background(FColor.bgCard)
                .clipShape(RoundedRectangle(cornerRadius: theme.cardCornerRadius, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: theme.cardCornerRadius, style: .continuous)
                        .stroke(
                            FColor.divider.opacity(
                                scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight
                            ),
                            lineWidth: 1
                        )
                )
                .shadow(color: FColor.bgCardAlt.opacity(0.35), radius: 18, x: 0, y: 10)
                .padding(FSpacing.s24)
                .accessibilityElement(children: .contain)
                .accessibilityAddTraits(.isModal)
                #if os(macOS)
                .onExitCommand {
                    dismiss()
                }
                #endif
            }
            .animation(FAccessibility.prefersReducedMotion ? nil : .easeInOut(duration: 0.2), value: isPresented)
        }
    }

    private func dismiss() {
        onClose?()
        isPresented = false
    }
}

public struct ModalHeaderView: View {
    private let title: String
    private let subtitle: String?
    private let onClose: (() -> Void)?

    public init(title: String, subtitle: String? = nil, onClose: (() -> Void)? = nil) {
        self.title = title
        self.subtitle = subtitle
        self.onClose = onClose
    }

    public var body: some View {
        HStack(alignment: .center, spacing: FSpacing.s12) {
            VStack(alignment: .leading, spacing: FSpacing.s4) {
                Text(title)
                    .font(FType.title())
                    .foregroundStyle(FColor.textPrimary)
                if let subtitle {
                    Text(subtitle)
                        .font(FType.caption())
                        .foregroundStyle(FColor.textSecondary)
                }
            }

            Spacer()

            if let onClose {
                ChatUIButton(
                    systemName: "xmark",
                    variant: .ghost,
                    size: .icon,
                    accessibilityLabel: "Close dialog",
                    accessibilityHint: "Dismiss the dialog"
                ) {
                    onClose()
                }
            }
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s12)
        .background(FColor.bgCardAlt)
        .overlay(SettingsDivider(), alignment: .bottom)
    }
}

public struct ModalBodyView<Content: View>: View {
    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: FSpacing.s12) {
            content
        }
        .padding(FSpacing.s16)
    }
}

public struct ModalFooterView<Content: View>: View {
    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        HStack {
            Spacer()
            content
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s12)
        .background(FColor.bgCardAlt)
        .overlay(SettingsDivider(), alignment: .top)
    }
}
