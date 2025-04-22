import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //added import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //function to get login info from api endpoint & direct to dashboard if login successful
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.access_token);
        setError("");
        navigate("/dashboard"); // Redirect on successful login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="flex flex-col items-center w-full max-w-sm h-auto p-6 ">
        <h2 className="text-black text-2xl font-bold mt-14 mb-10 self-start">
          Login
        </h2>
        <h2 className="text-black text-xl font-bold mb-4 self-start">Email</h2>
        <input
          placeholder="example@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full text-black bg-lightblue text-sm p-4 mb-4 rounded-xl border border-gray"
        />
        <h2 className="text-black text-xl font-bold mb-4 self-start">
          Password
        </h2>
        <input
          type="password"
          placeholder="*************"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full text-black bg-lightblue text-sm p-4 mb-4 rounded-xl border border-gray"
        />
        <button
          className="bg-black text-white text-lg font-bold mt-10 px-16 py-3 rounded-full"
          onClick={handleLogin} //used to redirect or throw an error
        >
          Log in
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="text-sm font-bold mt-6">
          {" "}
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
