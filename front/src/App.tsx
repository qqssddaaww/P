import { createBrowserRouter, RouterProvider } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";
import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";


export default function App() {

  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data } = useSWR("/check-session", fetcher)

  useEffect(() => {
    
  },[data])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <List /> },
        { path: "write", element: <Write /> },
        { path: "view/:uid", element: <View /> },
        { path: "login", element: <Login /> },
        { path: "join", element: <Join />},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
