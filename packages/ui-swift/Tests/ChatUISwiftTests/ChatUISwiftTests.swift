import XCTest
import SwiftUI
@testable import ChatUISwift

final class ChatUISwiftTests: XCTestCase {
    
    func testDesignTokensExist() throws {
        // Test that design tokens are accessible
        XCTAssertNotNil(DesignTokens.Colors.Background.primary)
        XCTAssertNotNil(DesignTokens.Colors.Text.primary)
        XCTAssertNotNil(DesignTokens.Colors.Accent.blue)
        
        // Test typography tokens
        XCTAssertGreaterThan(DesignTokens.Typography.Heading1.size, 0)
        XCTAssertGreaterThan(DesignTokens.Typography.Body.size, 0)
        
        // Test spacing tokens
        XCTAssertFalse(DesignTokens.Spacing.scale.isEmpty)
        XCTAssertGreaterThan(DesignTokens.Spacing.md, 0)
    }
    
    func testColorHexInitializer() throws {
        // Test hex color initialization
        let whiteColor = Color(hex: "#FFFFFF")
        let blackColor = Color(hex: "#000000")
        let blueColor = Color(hex: "#0285FF")
        
        // These should not crash and should create valid colors
        XCTAssertNotNil(whiteColor)
        XCTAssertNotNil(blackColor)
        XCTAssertNotNil(blueColor)
    }
    
    func testPackageInitialization() throws {
        // Test that package initialization doesn't crash
        XCTAssertNoThrow(ChatUISwift.initialize())
        
        // Test package metadata
        XCTAssertEqual(ChatUISwift.name, "ChatUISwift")
        XCTAssertEqual(ChatUISwift.version, "1.0.0")
    }
    
    func testChatUIButtonAccessibilityLabelResolution() throws {
        XCTAssertEqual(
            ChatUIButton<Text>.resolveAccessibilityLabel(explicit: "Save", fallback: "Fallback"),
            "Save"
        )
        XCTAssertEqual(
            ChatUIButton<Text>.resolveAccessibilityLabel(explicit: "  ", fallback: "Fallback"),
            "Fallback"
        )
        XCTAssertNil(
            ChatUIButton<Text>.resolveAccessibilityLabel(explicit: nil, fallback: "   ")
        )
    }
    
    func testChatUIInputAccessibilityLabelResolution() throws {
        XCTAssertEqual(
            ChatUIInput.resolveAccessibilityLabel(explicit: "Email", placeholder: "Enter email"),
            "Email"
        )
        XCTAssertEqual(
            ChatUIInput.resolveAccessibilityLabel(explicit: "  ", placeholder: "Enter email"),
            "Enter email"
        )
        XCTAssertNil(
            ChatUIInput.resolveAccessibilityLabel(explicit: nil, placeholder: "   ")
        )
    }
    
    func testChatUIInputSubmitLabelInitializer() throws {
        let input = ChatUIInput(
            text: .constant(""),
            placeholder: "Search",
            submitLabel: .search
        )
        XCTAssertNotNil(input)
    }
    
    func testChatUIButtonStyleMappings() throws {
        XCTAssertEqual(ChatUIButton<Text>.fontSize(for: .sm), DesignTokens.Typography.BodySmall.size)
        XCTAssertEqual(ChatUIButton<Text>.fontWeight(for: .lg), DesignTokens.Typography.Heading3.weight)
        
        let padding = ChatUIButton<Text>.paddingInsets(for: .default)
        XCTAssertEqual(padding.top, DesignTokens.Spacing.xs)
        XCTAssertEqual(padding.leading, DesignTokens.Spacing.sm)
        XCTAssertEqual(padding.bottom, DesignTokens.Spacing.xs)
        XCTAssertEqual(padding.trailing, DesignTokens.Spacing.sm)
        
        XCTAssertEqual(
            ChatUIButtonStyle.backgroundToken(for: .default, isPressed: false, prefersHighContrast: false),
            .accentBlue
        )
        XCTAssertEqual(
            ChatUIButtonStyle.foregroundToken(for: .outline, prefersHighContrast: false),
            .accentBlue
        )
        XCTAssertEqual(
            ChatUIButtonStyle.borderToken(for: .outline, prefersHighContrast: false),
            .borderAccentBlue
        )
    }
    
    func testChatUIInputStyleMappings() throws {
        XCTAssertEqual(ChatUITextFieldStyle.fontSize(for: .lg), DesignTokens.Typography.Heading3.size)
        XCTAssertEqual(ChatUITextFieldStyle.fontWeight(for: .sm), DesignTokens.Typography.BodySmall.weight)
        
        let padding = ChatUITextFieldStyle.paddingInsets(for: .sm)
        XCTAssertEqual(padding.top, DesignTokens.Spacing.xxs)
        XCTAssertEqual(padding.leading, DesignTokens.Spacing.xs)
        XCTAssertEqual(padding.bottom, DesignTokens.Spacing.xxs)
        XCTAssertEqual(padding.trailing, DesignTokens.Spacing.xs)
        
        XCTAssertEqual(
            ChatUITextFieldStyle.backgroundToken(for: .search, prefersHighContrast: false),
            .backgroundTertiary
        )
        XCTAssertEqual(
            ChatUITextFieldStyle.borderToken(isFocused: true, prefersHighContrast: false),
            .focusRing
        )
    }
    
    func testChatUICardStyleMappings() throws {
        XCTAssertEqual(
            ChatUICard<Text>.backgroundToken(for: .default, prefersHighContrast: false),
            .backgroundPrimary
        )
        XCTAssertEqual(
            ChatUICard<Text>.borderToken(for: .outlined, prefersHighContrast: false),
            .borderTertiary
        )
        XCTAssertEqual(
            ChatUICard<Text>.shadowToken(for: .elevated, prefersHighContrast: false),
            .shadow
        )
    }
}
