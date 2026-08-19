import { Route, Routes, useLocation} from "react-router-dom"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import ProtectedRoutes from "./Pages/ProtectedRoutes"
import { UserContextProvider } from "./Utils/UserContext"
import NewTask from "./Pages/NewTask"
import { Toaster } from "react-hot-toast"
import Edittask from "./Pages/Edittask"
import Profile from "./Pages/Profile"
import Footer from "./Components/Footer"

const App = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <UserContextProvider>

    <div className="flex flex-col min-h-screen">

      <Toaster />
      


      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={<ProtectedRoutes />}>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/edit" element={<Edittask />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>

      {!isAuthPage && <Footer />}

    </div>
    </UserContextProvider>

  )
}

export default App