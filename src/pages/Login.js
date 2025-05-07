import React, {useState} from 'react';
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const login = async () => {
      // try {
        const data = { username, password };
        const response = await axios.post("https://plant-db-7e0c17d70235.herokuapp.com/auth/login", data);
        
        if (response.data.error) alert(response.data.error);
        sessionStorage.setItem("accessToken", response.data);
        setSuccessMessage("Login successful!");
        setErrorMessage(""); // clear previous errors
        console.log(response.data);
    //   } catch (error) {
    //     setSuccessMessage(""); // clear success message on error
  
    //     if (error.response) {
    //       if (error.response.status === 403) {
    //         setErrorMessage("Wrong Username and Password Combination.");
    //       } else if (error.response.status === 404) {
    //         setErrorMessage("User not found.");
    //       } else {
    //         setErrorMessage("Unexpected error. Try again.");
    //       }
    //     } else {
    //       setErrorMessage("Network error. Check your connection.");
    //     }
    //   }
    };

    return (
        <div className="formContainer">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
    
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button onClick={login}>Login</button>
    
          {successMessage && (
            <div style={{ color: "darkgreen", fontWeight: "bold" }}>
              {successMessage}
            </div>
          )}
    
          {errorMessage && (
            <div style={{ color: "darkred", fontWeight: "bold" }}>
              {errorMessage}
            </div>
          )}
        </div>
      );
    }
    
    export default Login;