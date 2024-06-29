import React from "react";
import logo from "../assets/Logo.svg"

function IdentificationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-900 to-black">
      <div className="max-w-md w-full space-y-8 p-10 bg-black bg-opacity-50 rounded-lg shadow-lg text-center">
        <div>
        <div className="flex gap-2 items-center">
            <img className="h-12 w-9" src={logo} alt="Logo" />
            <h1 className="text-white text-[20px]">Beatily</h1>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            How do you identify yourself?
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <button className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            I'm a Listener
          </button>
          <button className="w-full py-2 px-4 rounded-md text-white border border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            I'm a Creator
          </button>
        </div>
        <div className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up here
          </a>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google
          <br />
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </div>
      </div>
    </div>
  );
}

export default IdentificationPage;
