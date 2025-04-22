import React from "react";

const Dashboard = () => {
  const username = localStorage.getItem("email");

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
        <p>You are now logged in.</p>
        {/* You can add more content or navigation links here */}
      </div>
    </div>
  );
};

export default Dashboard;
