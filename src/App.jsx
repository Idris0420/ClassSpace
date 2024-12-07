import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from "./pages/PageNotFound";
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
      errorElement: <PageNotFound/>
    },
    {
      path: '/DashBoard',
      element: <DashBoard/>,
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
