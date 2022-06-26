import { useState } from "react"

export default function Login(props) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className='wrapper'>
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" value={login} onChange={(e) => {setLogin(e.target.value)}}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
        </label> <br/><br/>
        <div>
          <button type="submit" onClick={(e) => { 
            e.preventDefault();
            props.validateLogPass(login, pass) 
          }}>Submit</button>
        </div>
      </form>    
    </div>
  )
}


