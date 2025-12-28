import AppKit
import SwiftUI
import XCTest
@testable import ChatUISwift

final class ComponentRenderTests: XCTestCase {
    private func render<V: View>(_ view: V) {
        let hostingView = NSHostingView(rootView: view)
        hostingView.frame = NSRect(x: 0, y: 0, width: 400, height: 200)
        hostingView.layoutSubtreeIfNeeded()
        _ = hostingView.intrinsicContentSize
    }

    func testChatUIButtonRenders() throws {
        XCTAssertNoThrow(render(ChatUIButton("Test") { }))
        XCTAssertNoThrow(render(ChatUIButton(systemName: "heart.fill", size: .icon) { }))
    }

    func testChatUIInputRenders() throws {
        XCTAssertNoThrow(render(ChatUIInput(text: .constant(""), placeholder: "Name")))
        XCTAssertNoThrow(render(ChatUIInput(text: .constant(""), placeholder: "Search", variant: .search)))
    }

    func testChatUICardRenders() throws {
        XCTAssertNoThrow(
            render(
                ChatUICard(variant: .elevated) {
                    Text("Card")
                }
            )
        )
    }
}
