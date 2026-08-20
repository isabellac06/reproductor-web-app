import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReproductorWebApp } from "./ReproductorWebApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReproductorWebApp />
  </StrictMode>,
);
