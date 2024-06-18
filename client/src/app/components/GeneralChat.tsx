"use client";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Message } from "../interfaces/Message";
import Textarea from "./TextArea";
import { v4 as uuidv4 } from "uuid";

const GeneralChat = ({ username }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const [textingUserName, setTextingUserName] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const usernameRef = useRef<string>(username);

  const onTyping = useRef<() => void>(() => {
  });
  const onFocus = useRef<() => void>(() => {
  });
  const onBlur = useRef<() => void>(() => {
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  useEffect(() => {
    const socketIo = io("https://chat-back-production-06c2.up.railway.app/");

    socketIo.on("connect", () => {
      console.log("Connected to server");

      setTimeout(() => {
        socketIo.emit("get-message");
        setLoading(false);
      }, 1000);
    });

    socketIo.on("init-message", (newMessages: Message[]) => {
      if (Array.isArray(newMessages)) {
        console.log("Init Received messages from server", newMessages);
        setMessages(newMessages);
      } else {
        console.error(
          "Invalid messages format received from server",
          newMessages
        );
      }
    });

    socketIo.on("chat-message", (newMessages: Message[]) => {
      if (Array.isArray(newMessages)) {
        setMessages(newMessages);
      } else {
        console.error(
          "Invalid messages format received from server",
          newMessages
        );
      }
    });

    socketIo.on("clients-total", (data) => {
      console.log(`Clients-total: ${data}`);
      setNumberOfUsers(data);
    });

    socketIo.on("feedback-check", (user: string) => {
      setTextingUserName(user);
    });

    onTyping.current = () => {
      socketIo.emit("feedback", usernameRef.current);
    };

    onFocus.current = () => {
      socketIo.emit("feedback", usernameRef.current);
    };

    onBlur.current = () => {
      socketIo.emit("feedback", "");
    };

    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    const messageId = uuidv4();
    setMessages([
      ...messages,
      {
        id: messageId,
        text: text,
        username: username,
        createdAt: new Date(),
      },
    ]);

    if (socket) {
      socket.emit("send-message", {
        id: messageId,
        text: text,
        username: username,
        createdAt: new Date(),
      });
      setText("");
    } else {
      console.log("Socket is not connected");
    }
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div>
      {loading ? (
        <div className="h-[750px] flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h1 className="text-5xl text-white">Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col h-[750px] bg-white rounded-md shadow-lg">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-t-md">
            <h1 className="text-center text-2xl">Chat</h1>
            <p className="text-center opacity-[60%]">{numberOfUsers} online</p>
          </div>
          <div
            className="flex-grow py-6 px-10 overflow-y-auto chat-container"
            ref={chatContainerRef}
          >
            {messages.map((message, index) => {
              if (message.username === username) {
                return (
                  <div
                    key={index}
                    className="flex-grow p-6 overflow-y-auto text-right"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="bg-blue-500 text-white text-2xl p-3 rounded-lg self-end max-w-xs">
                        <p className="text-sm">{message.username}</p>
                        <p className="text-md">{message.text}</p>
                        <p className="text-sm">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex-grow p-6 overflow-y-auto">
                    <div className="flex flex-col space-y-4">
                      <div className="bg-slate-100 text-black text-2xl p-3 rounded-lg self-start max-w-xs">
                        <p className="text-sm">{message.username}</p>
                        <p className="text-md">{message.text}</p>
                        <p className="text-sm">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {textingUserName && (
              <div className="text-sm text-gray-500 dark:text-gray-400 p-4">
                {textingUserName} is typing...
              </div>
            )}
          </div>
          <form className="p-4 bg-white border-t border-gray-200 flex items-center rounded-b-lg">
            <Textarea
              text={text}
              setText={setText}
              placeholder="Type your message..."
              onTyping={onTyping.current}
              onBlur={onBlur.current}
              onFocus={onFocus.current}
              className="flex-grow p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              type="submit"
              className="ml-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:opacity-80"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );

}

  export default GeneralChat;
