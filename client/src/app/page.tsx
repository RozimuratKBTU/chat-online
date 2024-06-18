"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { AuthService } from "./service/auth.service";
import Link from "next/link";

const MyComponent = () => {
  const navigate = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await AuthService.login(userName, password, email);
    console.log(response.data);
    localStorage.setItem("access", response.data.accessToken);
    navigate.push("/chat");
  };
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex-grow-0 p-6 bg-white rounded-t-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sign in to Open Chat
        </h2>
      </div>
      <div
        className="flex-grow overflow-y-auto p-6 bg-white rounded-b-md shadow-lg"
      >
        <form
          onClick={(e) => e.preventDefault()}
          className="w-full max-w-md mx-auto"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="password"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                minLength={6}
                name="password"
                id="password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                minLength={6}
                name="email"
                id="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-80 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>
          <p className="text-center mt-4 font-sm accent-blue-500">
            <Link href="/register">No account? Registration</Link>
          </p>
        </form>
      </div>
    </div>
  );

};

export default MyComponent;
