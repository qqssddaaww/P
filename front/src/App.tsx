import { createBrowserRouter, RouterProvider } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";
import axios from "axios";
import { SWRConfig } from "swr";

export default function App() {
  const fetcher = (url: string) => axios.get(url, {withCredentials: true}).then((res) => res.data);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <List /> },
        { path: "write", element: <Write /> },
        { path: "view/:uid", element: <View /> },
        { path: "login", element: <Login /> },
        { path: "join", element: <Join /> },
      ],
    },
  ]);

  return (
    <>
      <SWRConfig value={{ fetcher, revalidateOnFocus: true, revalidateOnReconnect: true,  refreshInterval: 5000,  }}>
        <RouterProvider router={router} />
      </SWRConfig>
    </>
  );
}
