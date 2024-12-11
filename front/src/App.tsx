import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route element={<Layout />}>
            <Route path="/write" element={<Write />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
