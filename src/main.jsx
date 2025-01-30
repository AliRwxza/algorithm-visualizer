import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar/Navbar";

createRoot(document.getElementById("root")).render(
  <div>
    {/* <Navbar /> */}
    <App />
  </div>
);
