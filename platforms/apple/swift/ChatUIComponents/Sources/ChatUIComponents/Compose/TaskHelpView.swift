import SwiftUI
import ChatUIFoundation
import ChatUIThemes

/// Help popover content for compose tasks
public struct TaskHelpView: View {
    let content: String

    public var body: some View {
        Text(content)
            .font(FType.rowTitle())
            .foregroundStyle(FColor.textPrimary)
            .padding(FSpacing.s16)
            .frame(maxWidth: 320, alignment: .leading)
    }
}
