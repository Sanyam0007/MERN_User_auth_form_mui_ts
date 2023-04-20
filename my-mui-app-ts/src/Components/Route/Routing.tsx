import { Routes,Route } from "react-router"
import Navbar from "../NavElements/Navbar"
import { About } from "../NavElements/About"
import { Logout } from "../NavElements/Logout"
import { Community } from "../NavElements/Community"
import { Home } from "../NavElements/Home"
import Profile from '../NavElements/Profile'
import { SuccessSignIn } from '../NavElements/SuccessSignIn'
import SignUp2 from '../NavElements/SignUp2'
import Login from '../NavElements/Login'
import { Protected } from "./Protected"
// import Profile from "../NavElements/Profile"
// const LazyProfile = React.lazy(() =>  import ('../NavElements/Profile'))
export const Routing = () => {

  const signUp =(
    name:string ,
    email: string,
    password: string,
    phoneNumber:number
  )=>{}
  return (
    
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="signup" element={<SignUp2 onSignUp={signUp} />} />
        <Route path="about" element={<About/>} />
        <Route path="community" element={<Protected Component={Community}/>} />
        <Route path="profile" element={<Protected Component={Profile}/>} />
        <Route path="login" element={<Login/>} />
        <Route path="Logout" element={<Logout/>} />
        <Route path="successSign" element={<SuccessSignIn/>} />
      </Routes>
    </div>
  )
}
