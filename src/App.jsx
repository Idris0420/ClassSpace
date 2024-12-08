import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import PageNotFound from "./pages/PageNotFound";
import HandleIsAuth from "./pages/HandleIsAuth";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HandleIsAuth/>,
      errorElement: <PageNotFound />,
    },
    {
      basename: "/ClassSpace", // Add the base path here
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
