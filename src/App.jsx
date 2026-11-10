
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shard/Components/AuthLayout/AuthLayout';
import Notfound from './modules/Shard/Components/Notfound/Notfound';
import Login from './modules/Authentication/Login/Login';
import Register from './modules/Authentication/Register/Register';
import Verfiy from './modules/Authentication/VerfiyAccount/Verfiy';
import Forget from './modules/Authentication/Forget/Forget';
import Reset from './modules/Authentication/Reset/Reset';
import MasterLayout from './modules/Shard/Components/MasterLayout/MasterLayout';
import RecipesData from './modules/Recipes/Components/RecipesData/RecipesData';
import RecipesList from './modules/Recipes/Components/RecipesList/RecipesList';
import CategoriesList from './modules/Categories/Components/CategoriesList/CategoriesList';
import UsersList from './modules/Users/Components/UsersList/UsersList';
import Favourites from './modules/Favourites/Components/FavouritesList/Favourites';
import Dashboard from './modules/dashboard/Components/dashboard/Dashboard.jsx';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import ProtectedRoute from './modules/Shard/Components/ProtectedRoute/ProtectedRoute';

function App() {
  const [LoginData, setLoginData] = useState(null)
  let SaveLoginData = () => {
    let encoded = localStorage.getItem("token");
    let decoded = jwtDecode(encoded);
    setLoginData(decoded);
  }

  const routers = createBrowserRouter([
    {


      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: < Login SaveLoginData={SaveLoginData} /> },
        { path: 'login', element: < Login SaveLoginData={SaveLoginData} /> },
        { path: 'register', element: < Register /> },
        { path: 'verify-account', element: < Verfiy /> },
        { path: 'forget-pass', element: <Forget /> },
        { path: 'reset-pass', element: < Reset /> },
      ]
    },
    {
      path: "dashboard",
      element: <ProtectedRoute LoginData={LoginData}>< MasterLayout LoginData={LoginData} /></ProtectedRoute>,
      errorElement: < Notfound />,
      children: [
        { index: true, element: < Dashboard /> },
        { path: '', element: <Dashboard /> },
        { path: 'recipes', element: < RecipesList /> },
        { path: 'recipe-data', element: <RecipesData /> },
        { path: 'categories', element: < CategoriesList /> },
        { path: 'users', element: < UsersList /> },
        { path: 'favourites', element: < Favourites /> },
      ]
    },


  ]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App
