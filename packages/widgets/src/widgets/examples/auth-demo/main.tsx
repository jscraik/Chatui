import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../styles/widget.css";

import { AuthDemo } from "./auth-demo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthDemo />
  </StrictMode>,
);
