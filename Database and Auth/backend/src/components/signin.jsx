import { useEffect, useState } from "react";
import axios from "axios";

export function SignIn() {
  const [userdata, setUserData] = useState();
      console.log(userdata)
    useEffect(()=>{axios.post("http://localhost:3000/signin", userdata)
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
  );
}

function Input(props){
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')

  const handlechange = ()=>{
      props.setUserData({
          email : email,
          pass :password
      })
  }
  return(
      <div class="signup">
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
