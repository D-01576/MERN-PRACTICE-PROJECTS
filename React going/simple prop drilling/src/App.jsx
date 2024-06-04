import { useState } from 'react'

function App() {
  const [usernames,setUsername] = useState(["sarfaraz"])

  const addUser = (username) => {
    setUsername([...usernames, username]);
  };

  return (
    <>
      <ShowUsers usernames={usernames} setUsername={addUser}/>
    </>
  )
}

function ShowUsers(props){

    return(
      <div>
      <AddUser setUsername={props.setUsername}/>
      {props.usernames.map((user, index) => (
        <h2 key={index}>{user}</h2>
      ))}
      </div>
    )
}

function AddUser(props) {
  const [inputValue, setInputValue] = useState('');

  const handleAddUser = () => {
    if (inputValue.trim() !== '') {
      props.setUsername(inputValue);
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
