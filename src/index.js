import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ColorProvider } from "./contexts/ColorContext";
import { PostsProvider } from "./contexts/PostsContext";
import { UserProvider } from "./contexts/UserContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostsProvider>
        <UserProvider>
          <ColorProvider>
            <App />
          </ColorProvider>
        </UserProvider>
      </PostsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
