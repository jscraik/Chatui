import AppKit
import SwiftUI

public final class ComposeViewController: NSViewController {
    public override func loadView() {
        view = NSHostingView(rootView: ComposeView())
    }
}
