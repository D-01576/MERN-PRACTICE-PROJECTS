import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { UserAtom } from "./store/atom/atoms";
import { useState } from "react";


function App() {

  return (
    <>
    <RecoilRoot>
    <User></User>
    </RecoilRoot>
    </>
  )
}

function User(){
  return(
    <div>
      <ShowUsers></ShowUsers>
      <AddUser></AddUser>
    </div>
  )
}

function ShowUsers(){
  const users = useRecoilValue(UserAtom);
  return(
    <div>
      {users.map((user, index) => (
        <h2 key={index}>{user}</h2>
      ))}
    </div>
  )
}

function AddUser() {
  const [inputValue, setInputValue] = useState("");
  const setuser = useSetRecoilState(UserAtom);

  const handleAddUser = () => {
    if (inputValue.trim() !== '') {
      setuser((prevUsers) => [...prevUsers, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddUser}>Add</button>
    </div>
  );
}


export default App
