import React, { useState, useEffect } from "react";

const PatientHistory = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("/api/protected", {
            // Or a specific /api/patienthistory endpoint
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setPatientData(data); // Assuming your protected route returns some user-specific data
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          console.error("Error fetching patient data:", error);
        }
      } else {
        setError("Not authenticated");
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center max-w-sm p-6">
        <h2 className="text-black text-3xl font-bold mb-10 mt-56 -ml-24">
          Patient History
        </h2>
        <h2 className="text-black text-xl font-bold mt-2 -ml-44">
          Persistent Symptoms
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-5 px-16">
          <div className=" -ml-20 w-20 h-10 rounded-xl bg-darkgray flex items-center justify-center">
            <button>Fatigue</button>
          </div>
          <div className="w-20 h-10 -mx-12 rounded-xl bg-darkgray flex items-center justify-center">
            <button>Joint pain</button>
          </div>
          <div className="w-28 h-10 -ml-5 rounded-xl bg-darkgray flex items-center justify-center">
            <button>Tenderness</button>
          </div>
          <button className=" -ml-20 mt-6 w-20 h-10 rounded-xl bg-blue font-medium text-white text-lg flex items-center justify-center">
            Add
          </button>
        </div>
        <h2 className="text-black text-xl font-bold mx-14 -ml-40 mt-10">
          Type of Arthritis
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-5 px-14">
          <div className="-ml-20 w-40 mx-1 h-10 rounded-xl bg-darkgray flex items-center justify-center">
            <button>Rheumatiod Arthritis</button>
          </div>
          <div className="w-40 h-10 mx-4 rounded-xl bg-darkgray flex items-center justify-center">
            <button>Osteoarthritis</button>
          </div>
        </div>
        <div className="text-black text-xl font-bold mx-14 -ml-64 mt-5">
          Name
        </div>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="text-black bg-white border border-black -ml-10 pt-2 pb-2 pl-5 pr-10 mb-10 w-full rounded-md mt-4"
        />
        <div className="text-black text-xl font-bold mx-14 -ml-72 ">Age</div>
        <input
          placeholder="Enter your age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          className="text-black bg-white border border-black -ml-10 pt-2 pb-2 pl-5 pr-10 mb-10 w-full rounded-md mt-4"
        />
        <div className="text-black text-xl font-bold mx-14 -ml-64 ">Gender</div>
        <input
          placeholder="Enter gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          className="text-black bg-white border border-black -ml-10 pt-2 pb-2 pl-5 pr-10 mb-10 w-full rounded-md mt-4"
        />
        <button className="bg-black text-white text-lg font-bold px-16 py-3 -ml-3 rounded-full mt-2">
          Save
        </button>
      </div>
    </div>
  );
};

export default PatientHistory;
