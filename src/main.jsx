import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "react-toast-notifications";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
		<StrictMode>
			<App />
		</StrictMode>
	</ToastProvider>,
);
