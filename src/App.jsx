import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import PageNotFound from "./pages/PageNotFound";
import HandleIsAuth from "./pages/HandleIsAuth";
import CreateClass from './pages/CreateClass';
import JoinClass from './pages/JoinClass'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/ClassSpace/",
      element: <HandleIsAuth/>,
      errorElement: <PageNotFound />,
    },
    {
      path: "/ClassSpace/CreateClass",
      element: <CreateClass/>,
    },
    {
      path: "ClassSpace/JoinClass",
      element: <JoinClass/>,
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
