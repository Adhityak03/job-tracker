import { Routes,Route } from "react-router-dom";
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import ProtrctedRoute from "./components/ProtectedRoute"

function App(){
  return(
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={
      <ProtrctedRoute> <Dashboard/>  </ProtrctedRoute>
      } />
    </Routes>
  )
}

export default App