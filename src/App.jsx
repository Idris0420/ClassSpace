import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import PageNotFound from "./pages/PageNotFound";
import { auth } from "./FirebaseConfig";
import { useState } from "react";
import Cookies from "universal-cookie";
import HandleIsAuth from "./pages/HandleIsAuth";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HandleIsAuth/>,
      errorElement: <PageNotFound />,
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
