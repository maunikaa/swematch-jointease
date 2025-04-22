import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //added import

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !password) {
      setError("Please fill out all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length <= 8) {
      setError("Password must be more than 8 characters.");
    } else {
      setError("");
    }
  }, [email, password, confirmPassword]);

  //gets api endpoint & directly navigates to login page
  const handleSignUp = async () => {
    if (!error) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setError("");
          navigate("/login"); // Redirect to login on successful registration
        } else {
          // Check for the specific "user already exists" error
          if (
            response.status === 409 &&
            data.message === "User with this email already exists"
          ) {
            setError(data.message);
          } else {
            setError(data.message || "Registration failed");
          }
        }
      } catch (error) {
        setError("Failed to connect to the server");
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="flex flex-col items-center w-full max-w-sm h-auto p-6 ">
        <h2 className="text-black text-2xl font-bold mt-14 mb-10 self-start">
          JointEase
        </h2>
        <h2 className="text-black text-xl font-bold mb-4 self-start">
          Enter Email
        </h2>
        <input
          placeholder="example@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full text-black bg-lightblue text-sm p-4 mb-4 rounded-xl border border-gray"
        />
        <h2 className="text-black text-xl font-bold mb-4 self-start">
          Enter Password
        </h2>
        <input
          type="password"
          placeholder="*************"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full text-black bg-lightblue text-sm p-4 mb-4 rounded-xl border border-gray"
        />
        <h2 className="text-black text-xl font-bold mb-4 self-start">
          Confirm Password
        </h2>
        <input
          type="password"
          placeholder="*************"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full text-black bg-lightblue text-sm p-4 mb-10 rounded-xl border border-gray"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="bg-black text-white text-lg font-bold px-8 py-3 rounded-full mt-2"
          onClick={handleSignUp}
          disabled={!!error}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;
