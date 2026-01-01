import SwiftUI
import ChatUIFoundation
import ChatUIThemes

/// Icon button for compose toolbar
public struct ComposeIconButton: View {
    @Environment(\.chatUITheme) private var theme

    public struct Config: Hashable {
        public let systemName: String
        public let label: String
        public let isActive: Bool

        public init(systemName: String, label: String, isActive: Bool) {
            self.systemName = systemName
            self.label = label
            self.isActive = isActive
        }
    }

    let config: Config
    let action: () -> Void

    public init(config: Config, action: @escaping () -> Void) {
        self.config = config
        self.action = action
    }

    public init(systemName: String, label: String, isActive: Bool = false, action: @escaping () -> Void) {
        self.config = Config(systemName: systemName, label: label, isActive: isActive)
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            ZStack(alignment: .topTrailing) {
                Image(systemName: config.systemName)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(config.isActive ? FColor.accentBlue : FColor.iconTertiary)

                if config.isActive {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 8, weight: .bold))
                        .foregroundStyle(FColor.accentBlue)
                        .offset(x: 4, y: -4)
                }
            }
            .frame(width: 24, height: 24)
            .background(config.isActive ? FColor.accentBlue.opacity(0.12) : Color.clear)
            .clipShape(RoundedRectangle(cornerRadius: theme.buttonCornerRadius))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(Text(config.label))
    }
}
