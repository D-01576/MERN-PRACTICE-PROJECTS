import { lazy } from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
// import { SignIn } from "./components/signin"
// import { SignUp } from "./components/signup"
const SignIn = lazy(() => import('./components/signin'));
const SignUp = lazy(() => import('./components/signup'));

function App() {


  return (
    <>
      <BrowserRouter>
         <Navigationbar/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Navigationbar(){
  const navigate = useNavigate();
  return(
    <div>
    <button onClick={()=>{
      navigate("/signin")
    }}>signin</button>
    <button onClick={()=>{
      navigate("/signup")
    }}>signup</button>
   </div>
  )
}

export default App
