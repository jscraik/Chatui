import SwiftUI
import ChatUIFoundation
import ChatUIThemes

public struct ComposeView: View {
    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    @State private var instructions = ""
    @State private var isWebSearchActive = false
    @State private var systemMessage = ""
    @State private var taskDescription = ""
    @State private var promptEnhancement: PromptEnhancement = .rewrite
    @State private var autoPlan = false
    @State private var showTaskHelp = false
    @State private var modelSelection = "ChatGPT 5.2 Pro"
    @State private var planMode = "Manual"

    public init() {}

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: FSpacing.s16) {
                SettingsCardView {
                    VStack(spacing: 0) {
                        TemplateHeaderBarView(
                            title: "Prompt Instructions",
                            leading: AnyView(
                                ComposeIconButton(systemName: "doc.on.doc", label: "Copy to clipboard") {}
                            ),
                            trailing: AnyView(
                                ComposeActionButton(
                                    title: "Send to Chat",
                                    systemName: "bubble.left",
                                    style: .secondary
                                ) {}
                            )
                        )

                        composeTextArea(
                            text: $instructions,
                            placeholder: "Enter your prompt's task specific instructions. Use {{template variables}} for dynamic inputs",
                            minHeight: 180,
                            accessibilityLabel: "Prompt instructions"
                        )

                        TemplateFooterBarView(
                            leading: AnyView(
                                HStack(spacing: FSpacing.s4) {
                                    ComposeIconButton(systemName: "plus", label: "Add") {}

                                    ComposeIconButton(
                                        systemName: isWebSearchActive ? "globe" : "globe",
                                        label: "Toggle web search",
                                        isActive: isWebSearchActive
                                    ) {
                                        isWebSearchActive.toggle()
                                    }

                                    ComposeIconButton(systemName: "link", label: "Link") {}
                                    ComposeIconButton(systemName: "arrow.clockwise", label: "Refresh") {}

                                    ComposeIconButton(systemName: "square.grid.2x2", label: "Apps") {}

                                    Text(modelSelection)
                                        .font(FType.caption())
                                        .padding(.vertical, 2)
                                        .padding(.horizontal, FSpacing.s8)
                                        .background(FColor.bgCardAlt)
                                        .clipShape(RoundedRectangle(cornerRadius: theme.pillCornerRadius))
                                }
                            ),
                            trailing: AnyView(
                                HStack(spacing: FSpacing.s8) {
                                    ComposeActionButton(
                                        title: "Auto-clear",
                                        systemName: "arrow.clockwise",
                                        style: .ghost
                                    ) {}

                                    ComposeIconButton(systemName: "mic", label: "Voice") {}

                                    Button {
                                    } label: {
                                        Image(systemName: "arrow.up")
                                            .font(.system(size: 12, weight: .bold))
                                            .foregroundStyle(FColor.textPrimary)
                                            .frame(width: 24, height: 24)
                                            .background(FColor.accentGreen)
                                            .clipShape(Circle())
                                    }
                                    .buttonStyle(.plain)
                                    .accessibilityLabel(Text("Send message"))
                                }
                            )
                        )
                    }
                }

                SettingsDivider()

                SettingsCardView {
                    VStack(spacing: 0) {
                        TemplateHeaderBarView(
                            title: "Prompt Builder",
                            trailing: AnyView(
                                ComposeActionButton(
                                    title: "Run Discovery",
                                    systemName: "play.circle",
                                    style: .secondary
                                ) {}
                            )
                        )

                        VStack(alignment: .leading, spacing: FSpacing.s16) {
                            HStack(alignment: .top, spacing: FSpacing.s16) {
                                TemplateFormFieldView(label: "Model") {
                                    ComposeMenu(
                                        title: modelSelection,
                                        options: ["ChatGPT 5.2 Pro", "GPT-5.2 Codex Medium", "GPT-5.2 Codex Large"],
                                        selection: $modelSelection
                                    )
                                }
                                .frame(maxWidth: 320)

                                TemplateFormFieldView(label: "System Message") {
                                    composeTextArea(
                                        text: $systemMessage,
                                        placeholder: "Describe desired modal behavior (tone, tool usage, response style)",
                                        minHeight: 68,
                                        accessibilityLabel: "System message"
                                    )
                                }
                            }

                            TemplateFieldGroupView(
                                label: taskConfig.label,
                                actions: AnyView(
                                    HStack(spacing: FSpacing.s8) {
                                        Button {
                                            showTaskHelp.toggle()
                                        } label: {
                                            Image(systemName: "info.circle")
                                                .font(.system(size: 14, weight: .semibold))
                                                .foregroundStyle(FColor.iconSecondary)
                                        }
                                        .buttonStyle(.plain)
                                        .accessibilityLabel(Text("Show task information"))
                                        .popover(isPresented: $showTaskHelp) {
                                            TaskHelpView(content: taskConfig.helpText)
                                        }

                                        ComposeIconButton(
                                            systemName: "xmark",
                                            label: "Clear task"
                                        ) {
                                            taskDescription = ""
                                        }
                                    }
                                )
                            ) {
                                HStack(alignment: .top, spacing: FSpacing.s12) {
                                    composeTextArea(
                                        text: $taskDescription,
                                        placeholder: taskConfig.placeholder,
                                        minHeight: 120,
                                        accessibilityLabel: taskConfig.label
                                    )

                                    VStack(alignment: .leading, spacing: FSpacing.s8) {
                                        ComposeActionButton(
                                            title: taskConfig.buttonText,
                                            systemName: "sparkles",
                                            style: .secondary
                                        ) {}
                                        .accessibilityLabel(Text("Run discovery: \(taskConfig.buttonText)"))

                                        Text("60k")
                                            .font(FType.caption())
                                            .padding(.vertical, 2)
                                            .padding(.horizontal, FSpacing.s8)
                                            .background(FColor.accentGreen.opacity(0.2))
                                            .clipShape(RoundedRectangle(cornerRadius: theme.buttonCornerRadius))
                                    }
                                }
                            }

                            SettingsDivider()

                            HStack(alignment: .center, spacing: FSpacing.s16) {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Prompt Enhancement")
                                        .font(FType.sectionTitle())
                                    Text("How to handle your instructions")
                                        .font(FType.caption())
                                        .foregroundStyle(FColor.textSecondary)
                                }

                                Picker("Prompt Enhancement", selection: $promptEnhancement) {
                                    ForEach(PromptEnhancement.allCases, id: \.self) { option in
                                        Text(option.title).tag(option)
                                    }
                                }
                                .pickerStyle(.segmented)
                                .frame(maxWidth: 280)

                                Spacer()

                                HStack(spacing: FSpacing.s8) {
                                    Text("Plan mode")
                                        .font(FType.caption())
                                        .foregroundStyle(FColor.textSecondary)

                                    ComposeMenu(
                                        title: planMode,
                                        options: ["Manual", "Auto"],
                                        selection: $planMode
                                    )
                                }

                                Toggle("Auto plan", isOn: $autoPlan)
                                    .labelsHidden()
                                    .toggleStyle(FoundationSwitchStyle())

                                Text(autoPlan ? "On" : "Off")
                                    .font(FType.caption())
                                    .foregroundStyle(FColor.textSecondary)
                            }
                        }
                        .padding(.all, FSpacing.s24)
                    }
                }
            }
            .padding(.all, FSpacing.s24)
        }
        .background(FColor.bgApp)
    }

    // TemplateHeaderBarView + TemplateFooterBarView now provide reusable header/footer blocks.

    private func composeTextArea(
        text: Binding<String>,
        placeholder: String,
        minHeight: CGFloat,
        accessibilityLabel: String
    ) -> some View {
        ZStack(alignment: .topLeading) {
            if text.wrappedValue.isEmpty {
                Text(placeholder)
                    .font(FType.rowTitle())
                    .foregroundStyle(FColor.textSecondary.opacity(0.6))
                    .padding(.horizontal, FSpacing.s12)
                    .padding(.vertical, FSpacing.s8)
            }

            TextEditor(text: text)
                .font(FType.rowTitle())
                .padding(.horizontal, FSpacing.s8)
                .padding(.vertical, FSpacing.s8)
                .frame(minHeight: minHeight)
                .background(FColor.bgCard)
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

    private var taskConfig: TaskSectionConfig {
        switch promptEnhancement {
        case .rewrite:
            return TaskSectionConfig(
                label: "Task Description",
                placeholder: "Describe your task here...\n\nExample: \"Add a dark mode toggle to the settings page with system, light, and dark options. Store the preference and apply it app-wide.\"",
                helpText: "Describe your task here.\n\nThe agent will:\n- Analyze your codebase\n- Select relevant files\n- Write detailed instructions above\n\nThis is your primary input in Rewrite mode.",
                buttonText: "Rewrite"
            )
        case .augment:
            return TaskSectionConfig(
                label: "Additional Context (Optional)",
                placeholder: "Add extra details to help the agent find relevant files and enhance your prompt",
                helpText: "Add extra context to help the agent.\n\nThe agent will:\n- Keep your existing instructions\n- Add relevant context from discoveries\n- Select appropriate files\n\nLeave empty to just enhance with file context.",
                buttonText: "Augment"
            )
        case .preserve:
            return TaskSectionConfig(
                label: "Discovery Hints (Optional)",
                placeholder: "Describe what files to look for (your instructions won't be modified)",
                helpText: "Provide hints for file discovery.\n\nThe agent will:\n- Only select relevant files\n- Leave your instructions unchanged\n\nUseful when you've already written detailed instructions.",
                buttonText: "Preserve"
            )
        }
    }
}

private enum PromptEnhancement: CaseIterable {
    case rewrite
    case augment
    case preserve

    var title: String {
        switch self {
        case .rewrite:
            return "Rewrite"
        case .augment:
            return "Augment"
        case .preserve:
            return "Preserve"
        }
    }
}

private struct TaskSectionConfig {
    let label: String
    let placeholder: String
    let helpText: String
    let buttonText: String
}

private struct TaskHelpView: View {
    let content: String

    var body: some View {
        Text(content)
            .font(FType.rowTitle())
            .foregroundStyle(FColor.textPrimary)
            .padding(FSpacing.s16)
            .frame(maxWidth: 320, alignment: .leading)
    }
}

private struct ComposeMenu: View {
    @Environment(\.chatUITheme) private var theme

    let title: String
    let options: [String]
    @Binding var selection: String

    var body: some View {
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
            .background(FColor.bgCardAlt)
            .clipShape(RoundedRectangle(cornerRadius: theme.inputCornerRadius))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(Text("Select \(title)"))
    }
}

private struct ComposeIconButton: View {
    @Environment(\.chatUITheme) private var theme

    struct Config: Hashable {
        let systemName: String
        let label: String
        let isActive: Bool
    }

    let config: Config
    let action: () -> Void

    init(config: Config, action: @escaping () -> Void) {
        self.config = config
        self.action = action
    }

    init(systemName: String, label: String, isActive: Bool = false, action: @escaping () -> Void) {
        self.config = Config(systemName: systemName, label: label, isActive: isActive)
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            ZStack(alignment: .topTrailing) {
                Image(systemName: config.systemName)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(FColor.iconSecondary)

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

private struct ComposeActionButton: View {
    enum Style {
        case secondary
        case ghost
    }

    @Environment(\.chatUITheme) private var theme
    @Environment(\.colorScheme) private var scheme

    let title: String
    let systemName: String
    let style: Style
    let action: () -> Void

    var body: some View {
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
        .foregroundStyle(FColor.textPrimary)
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
            return FColor.bgCardAlt
        case .ghost:
            return Color.clear
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

private extension ComposeIconButton.Config {
    static func config(systemName: String, label: String, isActive: Bool = false) -> ComposeIconButton.Config {
        ComposeIconButton.Config(systemName: systemName, label: label, isActive: isActive)
    }
}
