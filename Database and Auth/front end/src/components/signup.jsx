import axios from "axios";
import { useEffect, useState } from "react";

export function SignUp(){
    const [userdata, setUserData] = useState();
      console.log(userdata)
    useEffect(()=>{axios.post("http://localhost:3000/signup", userdata)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })}, [userdata])
    
    return (
        <div>
            <Input setUserData={setUserData}></Input>
        </div>
    )
}

function Input(props){
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const handlechange = ()=>{
        props.setUserData({
            name: name,
            email : email,
            pass :password
        })
    }
    return(
        <div class="signup">
            <input type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}/>
            <input type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}/>
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}/>
            <button onClick={handlechange}>SignUp</button>
        </div>
    )
}