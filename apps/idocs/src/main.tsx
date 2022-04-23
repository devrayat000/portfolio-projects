import React from "react";
import ReactDOM from "react-dom/client";
import MantineThemeProvider from "mantine/react/provider";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineThemeProvider themeKey="idocs.theme">
      <App />
    </MantineThemeProvider>
  </React.StrictMode>
);
