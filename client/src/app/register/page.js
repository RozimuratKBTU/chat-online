"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AuthService } from "../service/auth.service";
import { useRouter } from "next/navigation";

const Register = () => {

  const navigate = useRouter();

  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
  });

  const registerUser = async () => {
    const response = await AuthService.register(
      register.username,
      register.password,
      register.email
    );
    if (response && response.status === 201) {
      const resp = await AuthService.login(
        register.username,
        register.password,
        register.email
      );
      localStorage.setItem("access", resp.data.accessToken);
      navigate.push("/chat");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <form
          onClick={(e) => e.preventDefault()}
          className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sign up to Open Chat
          </h2>
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
                value={register.username}
                onChange={(e) =>
                  setRegister({ ...register, username: e.target.value })
                }
                name="username"
                id="username"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                value={register.password}
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
                minLength={6}
                name="password"
                id="password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
                name="email"
                id="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <button
            onClick={registerUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>
          <p className="text-center mt-4 font-sm">
            <Link href="/">Have account? Go through Autorization</Link>
          </p>
        </form>
      </div>
    </div>
  );
};


export default Register;
