import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="/write" element={<Write />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
