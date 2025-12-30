import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public struct TemplateHeaderBarView: View {
    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    private let title: String
    private let leading: AnyView?
    private let trailing: AnyView?

    public init(title: String, leading: AnyView? = nil, trailing: AnyView? = nil) {
        self.title = title
        self.leading = leading
        self.trailing = trailing
    }

    public var body: some View {
        HStack(spacing: FSpacing.s8) {
            Text(title)
                .font(FType.title())
                .foregroundStyle(FColor.textPrimary)

            if let leading {
                leading
            }

            Spacer()

            if let trailing {
                trailing
            }
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s8)
        .background(FColor.bgCardAlt)
        .overlay(
            Rectangle()
                .fill(FColor.divider.opacity(scheme == .dark ? theme.dividerOpacityDark : theme.dividerOpacityLight))
                .frame(height: 0.5),
            alignment: .bottom
        )
    }
}

public struct TemplateFooterBarView: View {
    private let leading: AnyView?
    private let trailing: AnyView?

    public init(leading: AnyView? = nil, trailing: AnyView? = nil) {
        self.leading = leading
        self.trailing = trailing
    }

    public var body: some View {
        HStack(spacing: FSpacing.s8) {
            if let leading {
                leading
            }

            Spacer()

            if let trailing {
                trailing
            }
        }
        .padding(.horizontal, FSpacing.s16)
        .padding(.vertical, FSpacing.s8)
        .background(FColor.bgCard)
        .overlay(SettingsDivider(), alignment: .top)
    }
}
