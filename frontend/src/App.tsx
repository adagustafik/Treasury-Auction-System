import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.sass";
import { AppRouter } from "./components";

function App() {
  return (
    <>
      <AppRouter />
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
