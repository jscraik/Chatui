import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public struct TemplateFormFieldView<Content: View>: View {
    private let label: String
    private let actions: AnyView?
    private let content: Content

    public init(
        label: String,
        actions: AnyView? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.label = label
        self.actions = actions
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: FSpacing.s8) {
            HStack(spacing: FSpacing.s8) {
                Text(label)
                    .font(FType.sectionTitle())
                    .foregroundStyle(FColor.textSecondary)

                if let actions {
                    Spacer()
                    actions
                }
            }

            content
        }
    }
}
