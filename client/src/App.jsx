import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Name from './pages/onboarding/Name'
import Gender from './pages/onboarding/gender'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/auth/login'  element={<Login />}/>
        <Route path='/onbording/gender'  element={<Gender/>}/>
        <Route path='/onbording/name'  element={<Name />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
