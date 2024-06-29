import React from "react";
import logo from "../assets/Logo.svg"

function SignupPage() {
  return (
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
        <form className="mt-8 space-y-3">
          <input type="hidden" name="remember" value="true" />
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="name@domain.com"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="name@domain.com"
              />
            </div>
          </div>

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
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
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
  );
}

export default SignupPage;
