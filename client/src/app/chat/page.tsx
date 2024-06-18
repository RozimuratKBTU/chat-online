"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GeneralChat from "../components/GeneralChat";
import { AuthService } from "../service/auth.service";

const ChatPage = () => {
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const leaveDiscussion = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access");
      setUsername(null);
      router.push("/");
    }
  };

  return (
    <div className="bg-blue-500 text-white px-24 py-6">
      <div className="flex align-center justify-between ">
        <div className="flex justify-between w-[350px]">
          <h1>Online Chat</h1>
          <button className="" onClick={leaveDiscussion}>
            Go out
          </button>
        </div>
        {username !== null ? username : "No username found"}
      </div>
      <GeneralChat username={username} />
    </div>
  );
};

export default ChatPage;
