import SwiftUI
import ChatUIFoundation

public struct SkeletonView: View {
    private let cornerRadius: CGFloat
    private let isActive: Bool

    @State private var isAnimating = false

    public init(cornerRadius: CGFloat = 6, isActive: Bool = true) {
        self.cornerRadius = cornerRadius
        self.isActive = isActive
    }

    public var body: some View {
        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
            .fill(FColor.bgCardAlt)
            .opacity(currentOpacity)
            .onAppear {
                guard isActive, !FAccessibility.prefersReducedMotion else { return }
                withAnimation(
                    .easeInOut(duration: 1.2).repeatForever(autoreverses: true)
                ) {
                    isAnimating = true
                }
            }
            .onDisappear {
                isAnimating = false
            }
            .accessibilityHidden(true)
    }

    private var currentOpacity: Double {
        if !isActive {
            return 0.35
        }
        if FAccessibility.prefersReducedMotion {
            return 0.45
        }
        return isAnimating ? 0.35 : 0.6
    }
}
