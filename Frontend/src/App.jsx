import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/header'

import Home from './components/Home'
import Login from './components/UserComponents/Login'
import RegisterUser from './components/UserComponents/registerUser'
import Profile from './components/UserComponents/profile'
import Logout from './components/UserComponents/Logout'
import CreateTask from './components/Taskcomponents/createTask'
import UpdateTask from './components/Taskcomponents/updateTask'
import SearchTask from './components/Taskcomponents/searchTask'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import './App.css'



function Layout() {
  return (
    <>
      <Header />
      <div className='w-full bg-white'>
        <Outlet />
      </div>
      
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "registerUser",
        element: <RegisterUser />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "createTask",
        element: <CreateTask />
      },
      {
        path: "searchTask",
        element: <SearchTask />
      },
      {
        path: "AdminLogin",
        element: <AdminLogin />
      },
      {
        path: "AdminDashboard",
        element: <AdminDashboard />
      },
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App    

