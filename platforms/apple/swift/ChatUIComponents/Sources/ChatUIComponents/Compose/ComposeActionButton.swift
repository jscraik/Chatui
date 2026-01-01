import SwiftUI
import ChatUIFoundation
import ChatUIThemes

/// Action button for compose toolbar with secondary or ghost style
public struct ComposeActionButton: View {
    public enum Style {
        case secondary
        case ghost
    }

    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    let title: String
    let systemName: String
    let style: Style
    let action: () -> Void

    public var body: some View {
        Button(action: action) {
            HStack(spacing: FSpacing.s8) {
                Image(systemName: systemName)
                    .font(.system(size: 12, weight: .semibold))
                Text(title)
                    .font(FType.caption())
            }
            .padding(.vertical, FSpacing.s4)
            .padding(.horizontal, FSpacing.s12)
        }
        .buttonStyle(.plain)
        .foregroundStyle(foregroundColor)
        .background(background)
        .clipShape(RoundedRectangle(cornerRadius: theme.buttonCornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: theme.buttonCornerRadius)
                .stroke(borderColor, lineWidth: borderWidth)
        )
        .accessibilityLabel(Text(title))
    }

    private var background: Color {
        switch style {
        case .secondary:
            return FColor.bgCard
        case .ghost:
            return FColor.bgCardAlt
        }
    }

    private var foregroundColor: Color {
        switch style {
        case .secondary:
            return FColor.textPrimary
        case .ghost:
            return FColor.textTertiary
        }
    }

    private var borderWidth: CGFloat {
        switch style {
        case .secondary:
            return 1
        case .ghost:
            return 0
        }
    }

    private var borderColor: Color {
        FColor.divider.opacity(scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight)
    }
}
