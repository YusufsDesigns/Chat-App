import { useContext } from "react";
import PropTypes from 'prop-types';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import MessageDetails from "./components/MessageDetails";
import Root from "./Root";


function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
          <Route index element=
            {
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
            />
            <Route path="messages">
              <Route path=":id" element={<MessageDetails />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
