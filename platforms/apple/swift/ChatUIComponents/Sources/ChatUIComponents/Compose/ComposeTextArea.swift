import SwiftUI
import ChatUIFoundation
import ChatUIThemes

/// Text area for compose input with placeholder
public struct ComposeTextArea: View {
    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    let text: Binding<String>
    let placeholder: String
    let minHeight: CGFloat
    let accessibilityLabel: String

    public var body: some View {
        ZStack(alignment: .topLeading) {
            if text.wrappedValue.isEmpty {
                Text(placeholder)
                    .font(FType.rowTitle())
                    .foregroundStyle(FColor.textTertiary)
                    .padding(.horizontal, FSpacing.s12)
                    .padding(.vertical, FSpacing.s8)
            }

            TextEditor(text: text)
                .font(FType.rowTitle())
                .padding(.horizontal, FSpacing.s8)
                .padding(.vertical, FSpacing.s8)
                .frame(minHeight: minHeight)
                .background(FColor.bgApp)
                .clipShape(RoundedRectangle(cornerRadius: theme.inputCornerRadius))
                .overlay(
                    RoundedRectangle(cornerRadius: theme.inputCornerRadius)
                        .stroke(FColor.divider.opacity(scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight), lineWidth: 1)
                )
                .accessibilityLabel(Text(accessibilityLabel))
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s8)
    }
}
