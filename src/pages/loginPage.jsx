import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import settings from "../../settings.json";

const responseMessage = (response) => {
  fetch(`${settings.REACT_APP_BACKEND_URI}/google-login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  })
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok){
        console.log("Error:", data)
      }
      else{
        window.location.replace("/");
        console.log("Server Response:", data);
      }

    })
    .catch((error) => console.error("Error:", error));
  console.log(response);
};

function GoogleLoginButton() {
  const errorMessage = (error) => {
      console.log(error);
  };
  return (
      <div>
          <h2>React Google Login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
  )
}

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input change and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${settings.REACT_APP_BACKEND_URI}/login/`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
            // "Cookie": "=cookie_value1"
        },
        
        body: JSON.stringify({
            username: formData.username,
            password: formData.password
        }), // Convert the data object to a JSON string
        
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to submit post');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(responseData => {
      console.log('Logged in with username:', responseData);
      window.location.replace("/");
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log('Form submitted with data:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="!bg-gray-300 text-bg-gray-400 !p-2 !rounded-full">
          Log In
        </button>
      </form>
      <GoogleLoginButton/>
    </div>
  );
};

export default LoginForm;
