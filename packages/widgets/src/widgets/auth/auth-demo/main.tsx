import "../../../styles/widget.css";
import { mountWidget } from "../../../shared/widget-base";
import { useWidgetProps } from "../../../shared/use-widget-props";

import { AuthDemo, type AuthDemoProps } from "./auth-demo";

function AuthDemoWidget() {
  const props = useWidgetProps<AuthDemoProps>({
    authStatus: {
      authenticated: false,
      level: "none",
    },
  });
  return <AuthDemo {...props} />;
}

mountWidget(<AuthDemoWidget />);
