import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./component/List";
import Context from "./component/Context";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="/write" element={<Context />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
