import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "$lib/styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <Paper> */}
      <App />
      {/* </Paper> */}
    </ThemeProvider>
  </React.StrictMode>
);
