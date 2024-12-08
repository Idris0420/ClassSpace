import Login from "./Login"
import DashBoard from "./DashBoard"
import { useState } from "react"
import Cookies from "universal-cookie"

function HandleIsAuth(){
    const cookies  = new Cookies();
    const [isLoggedIn, setLogin] = useState(cookies.get("auth-token"));

    return(
        isLoggedIn ? <DashBoard/> : <Login setLogin={setLogin}/>
    )
}

export default HandleIsAuth