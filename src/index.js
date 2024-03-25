import React from "react";
import App from "./App";
import "./index.css";

import { createRoot } from "react-dom/client";

// 既存のDOMノードを取得
const root = document.getElementById("root");

// ルートを作成
const reactRoot = createRoot(root);

// ルートにReactコンポーネントをレンダリング
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
