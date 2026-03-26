import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register  from "./pages/auth/Register"
import VerifyOtp from "./pages/auth/VerifyOtp"
import SignUp from "./pages/auth/SignUp"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}/>
        <Route path='/auth/VerifyOtp' element={<VerifyOtp />}/>
        <Route path='/auth/SignUp' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
