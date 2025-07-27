import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import "@fontsource/inter"; 
import { Provider } from "react-redux";
import store from "./Reduxtoolkit/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
