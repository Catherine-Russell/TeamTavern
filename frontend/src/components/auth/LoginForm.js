import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("Login succesful")
      navigate('/login')
    } else {
      console.log("login unsuccessful")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/myAccount');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} /><br/>
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} /><br/>
        <input role='submit-button' id='submit' type="submit" value="Submit" /><br/>
      </form>
    );
}

export default LogInForm;
