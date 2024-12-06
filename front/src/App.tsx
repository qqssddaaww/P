import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./component/List";
import Context from "./component/Context";
import View from "./component/View";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="/write" element={<Context />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
