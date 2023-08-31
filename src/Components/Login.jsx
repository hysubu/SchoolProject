
import React, { useState } from 'react'

const Login = () => {


    const[username , setUsername] = useState("")
    const[password , setpassword] = useState("")




    const Submit = () =>{
        let input = {
            "username" : username , 
            "password" : password 
        }

        let requestOption = {
            method: 'POST',  
            headers:{"Content-type":"application/json"  }, 
            body: JSON.stringify(input)
        }

        fetch("http://127.0.0.1:8000/api/login" , requestOption)
        .then(response => response.json())
        .then(data=>{
            // console.log(data.error);
            if (data.token){
                localStorage.setItem("token" , data.token)
                window.location="http://localhost:3000/?#/profile"
            }
            else(
            alert(data.error))
        })
    }
  return (
    <div className='login-div'>
        <h2>Login</h2>
        <div>
            <form action="">
                <input type="text" placeholder='username' onChange={obj => setUsername(obj.target.value)} />
                <input type="text" placeholder='password' onChange={obj => setpassword(obj.target.value)} />
                <button onClick={Submit}>Login</button>
            </form>
        </div>





    </div>
  )
}

export default Login