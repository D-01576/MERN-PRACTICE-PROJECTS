import { useState } from 'react'
import { UserContext } from './context'
import { useContext } from 'react'
import { memo } from 'react'
function App() {
  const [usernames,setusername] = useState(["sarfaraz"])
  return (
    <>
      <UserContext.Provider value={{usernames,setusername}}>
        <ShowUsers></ShowUsers>
        <AddUser></AddUser>
      </UserContext.Provider>
    </>
  )
}

const ShowUsers = memo(function ShowUsers(){
  const {usernames} = useContext(UserContext);
  console.log(usernames)
  return(
    <div>
      {usernames.map((user, index) => (
        <h2 key={index}>{user}</h2>
      ))}
    </div>
  )
})

function AddUser(){
  const [inputValue, setInputValue] = useState('');

  const {setusername} = useContext(UserContext);
  const handleAddUser = ()=>{
    if(inputValue !== ""){
      setusername(prevUsernames => [...prevUsernames, inputValue]);
      setInputValue('');
    }
  }
  return(
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddUser}>Add</button>
    </div>
  )
}

export default App
