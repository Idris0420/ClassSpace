import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import PageNotFound from "./pages/PageNotFound";
import HandleIsAuth from "./pages/HandleIsAuth";
import CreateClass from './pages/CreateClass';

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
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
