import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import logo from "../assets/Logo.svg";

function SignupPage() {
  const navigate = useNavigate(); // Initialize navigate hook for navigation
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Signup failed. Please try again.");
      }

      console.log("Signup successful:", await response.json());

      // Redirect to another route upon successful registration
      navigate('/login'); // Replace '/login' with your desired route

    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  const handleFan = () => {
    setRole("fan")
  }
  const handleMusician = () => {
    setRole("musician")
  }


  return (

    <>

      {
        role == "" ?
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
                <button onClick={handleFan} className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  I'm a Listener
                </button>
                <button onClick={handleMusician} className="w-full py-2 px-4 rounded-md text-white border border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
          :
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-900 to-black">
            <div className="max-w-md w-full space-y-1 p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <div>
                <div className="flex gap-2 items-center">
                  <img className="h-12 w-9" src={logo} alt="Logo" />
                  <h1 className="text-white text-[20px]">Beatily</h1>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                  Sign Up and dive into your listening experience.
                </h2>
              </div>
              <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>
                <div className="rounded-md shadow-sm">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 mt-2 text-sm">
                    Error: {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-6 mb-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-white">or</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Google</span>
                      Sign up with Google
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Facebook</span>
                      Sign up with Facebook
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Apple</span>
                      Sign up with Apple
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-300 mt-[10px]">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login here
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
      }
    </>

  );

}

export default SignupPage;
