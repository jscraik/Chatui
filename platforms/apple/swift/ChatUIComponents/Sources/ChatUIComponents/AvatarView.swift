import SwiftUI
import ChatUIFoundation

public enum AvatarSize {
    case sm
    case md
    case lg

    var dimension: CGFloat {
        switch self {
        case .sm:
            return CGFloat(FSpacing.s24)
        case .md:
            return CGFloat(FSpacing.s32)
        case .lg:
            return CGFloat(FSpacing.s32 * 1.5)
        }
    }
}

public struct AvatarView: View {
    private let image: Image?
    private let url: URL?
    private let initials: String?
    private let size: AvatarSize
    private let accessibilityLabel: String?

    public init(
        image: Image? = nil,
        url: URL? = nil,
        initials: String? = nil,
        size: AvatarSize = .md,
        accessibilityLabel: String? = nil
    ) {
        self.image = image
        self.url = url
        self.initials = initials
        self.size = size
        self.accessibilityLabel = accessibilityLabel
    }

    public var body: some View {
        ZStack {
            if let image {
                image
                    .resizable()
                    .scaledToFill()
                    .accessibilityHidden(true)
            } else if let url {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let loadedImage):
                        loadedImage
                            .resizable()
                            .scaledToFill()
                            .accessibilityHidden(true)
                    default:
                        fallbackView
                    }
                }
            } else {
                fallbackView
            }
        }
        .frame(width: size.dimension, height: size.dimension)
        .background(FColor.bgCardAlt)
        .clipShape(Circle())
        .overlay(
            Circle()
                .stroke(FColor.divider.opacity(0.2), lineWidth: 1)
        )
        .accessibilityLabelIfPresent(accessibilityLabel)
    }

    private var fallbackView: some View {
        Group {
            if let initials, !initials.isEmpty {
                Text(initials)
                    .font(FType.caption())
                    .foregroundStyle(FColor.textPrimary)
            } else {
                Image(systemName: "person.fill")
                    .foregroundStyle(FColor.iconSecondary)
                    .accessibilityHidden(true)
            }
        }
    }
}

public extension AvatarView {
    init(
        url: URL?,
        initials: String? = nil,
        size: AvatarSize = .md,
        accessibilityLabel: String? = nil
    ) {
        self.init(
            image: nil,
            url: url,
            initials: initials,
            size: size,
            accessibilityLabel: accessibilityLabel
        )
    }
}

private extension View {
    @ViewBuilder
    func accessibilityLabelIfPresent(_ label: String?) -> some View {
        if let label {
            self.accessibilityLabel(Text(label))
        } else {
            self
        }
    }
}
