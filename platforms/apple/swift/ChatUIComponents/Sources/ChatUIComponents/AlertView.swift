import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public enum AlertVariant {
    case `default`
    case destructive
}

public struct AlertView<Content: View>: View {
    private let variant: AlertVariant
    private let icon: Image?
    private let content: Content

    @Environment(\.colorScheme) private var scheme
    @Environment(\.chatUITheme) private var theme

    public init(
        variant: AlertVariant = .default,
        icon: Image? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.variant = variant
        self.icon = icon
        self.content = content()
    }

    public var body: some View {
        HStack(alignment: .top, spacing: FSpacing.s12) {
            if let icon {
                icon
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(iconColor)
                    .accessibilityHidden(true)
            }
            VStack(alignment: .leading, spacing: FSpacing.s4) {
                content
            }
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s12)
        .background(backgroundColor)
        .overlay(
            RoundedRectangle(cornerRadius: theme.cardCornerRadius, style: .continuous)
                .stroke(borderColor, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: theme.cardCornerRadius, style: .continuous))
        .accessibilityElement(children: .combine)
    }

    private var backgroundColor: Color {
        switch variant {
        case .default:
            return FColor.bgCard
        case .destructive:
            return FColor.accentRed.opacity(0.12)
        }
    }

    private var borderColor: Color {
        switch variant {
        case .default:
            return FColor.divider.opacity(scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight)
        case .destructive:
            return FColor.accentRed.opacity(0.5)
        }
    }

    private var iconColor: Color {
        switch variant {
        case .default:
            return FColor.iconSecondary
        case .destructive:
            return FColor.accentRed
        }
    }
}

public struct AlertTitle: View {
    private let text: String

    public init(_ text: String) {
        self.text = text
    }

    public var body: some View {
        Text(text)
            .font(FType.rowTitle())
            .foregroundStyle(FColor.textPrimary)
    }
}

public struct AlertDescription: View {
    private let text: String

    public init(_ text: String) {
        self.text = text
    }

    public var body: some View {
        Text(text)
            .font(FType.caption())
            .foregroundStyle(FColor.textTertiary)
            .fixedSize(horizontal: false, vertical: true)
    }
}
