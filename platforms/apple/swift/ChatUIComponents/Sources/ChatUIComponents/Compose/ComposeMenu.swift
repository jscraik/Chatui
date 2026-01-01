import SwiftUI
import ChatUIFoundation
import ChatUIThemes

/// Dropdown menu for compose toolbar
public struct ComposeMenu: View {
    @Environment(\.chatUITheme) private var theme

    let title: String
    let options: [String]
    @Binding var selection: String

    public var body: some View {
        Menu {
            ForEach(options, id: \.self) { option in
                Button(option) {
                    selection = option
                }
            }
        } label: {
            HStack(spacing: FSpacing.s8) {
                Text(title)
                    .font(FType.rowTitle())
                    .foregroundStyle(FColor.textPrimary)
                Image(systemName: "chevron.down")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(FColor.iconSecondary)
            }
            .padding(.vertical, FSpacing.s8)
            .padding(.horizontal, FSpacing.s12)
            .background(FColor.bgCard)
            .clipShape(RoundedRectangle(cornerRadius: theme.inputCornerRadius))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(Text("Select \(title)"))
    }
}
