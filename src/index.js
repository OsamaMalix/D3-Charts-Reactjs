import React from "react";
import ReactDOM from "react-dom";

import DonutChart from "./comps/donutChart/donutChart";

import "./styles.css";

function App() {
  return <DonutChart />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
