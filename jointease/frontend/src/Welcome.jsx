import React from "react";
import { Link } from 'react-router-dom';


const Welcome = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="124" height="121" viewBox=" 0 124 121" fill="none">
          <ellipse cx="62" cy="60.5" rx="62" ry="60.5" fill="#407CE2" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 11 85 40" fill="none">
            <path d="M23.4794 33.6234C23.4794 35.9129 20.8092 37.0601 19.2487 35.4406L14.3649 30.3762C13.0148 28.9761 10.8266 28.9761 9.47646 30.3762C8.23499 31.6635 8.12171 33.7133 9.21407 35.1398L21.623 51.3437C24.7602 54.5969 29.0949 56.6095 33.884 56.6095C43.4597 56.6095 51.223 48.5591 51.223 38.6292V19.4501C51.223 17.4639 49.6705 15.854 47.7552 15.854C45.8398 15.854 44.2874 17.4639 44.2874 19.4501V30.2383V12.2579C44.2874 10.2717 42.7349 8.66187 40.8196 8.66187C38.9042 8.66187 37.3518 10.2717 37.3518 12.2579V27.8409V25.4436V7.46318C37.3518 5.47695 35.7994 3.8671 33.884 3.8671C31.9686 3.8671 30.4162 5.47695 30.4162 7.46318V25.4436V27.8409V9.86056C30.4162 7.87433 28.8638 6.26449 26.9484 6.26449C25.033 6.26449 23.4806 7.87433 23.4806 9.86056V27.8409L23.4794 33.6234Z" stroke="white" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </svg>
        <h2 className="text-black text-3xl font-bold mt-5">
          JointEase
        </h2>
        <Link to="/login">
          <button className="bg-lightblue text-left py-4 px-20 mt-8 mb-8 rounded-xl border-[1px] border-solid border-gray">
            <h2 className="text-black text-lg font-bold">
              Login
            </h2>
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-lightblue text-left py-4 px-10 rounded-xl border-[1px] border-solid border-gray">
            <h2 className="text-black text-lg font-bold">
              Create Account
            </h2>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
