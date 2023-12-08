import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import App from "./App";

import { Capacitor } from "@capacitor/core";
import { Plugins } from "@capacitor/core";
const { StatusBar } = Plugins;

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
	root.render(<App />);
};

if (Capacitor.isNative) {
	// Sprawdzamy, czy uruchomiono w środowisku natywnym za pomocą Capacitor
	StatusBar.setStyle({ style: "dark" });
	StatusBar.setBackgroundColor({ color: "#fefae0" }); // Ustaw kolor według własnych preferencji
}

// Renderujemy aplikację po ewentualnych konfiguracjach
renderApp();
