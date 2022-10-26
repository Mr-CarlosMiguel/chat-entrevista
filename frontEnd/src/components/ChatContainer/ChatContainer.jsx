import React, { useState, useEffect, useRef } from "react"

import ChatInput from "../ChatInput/ChatInput"
import Logout from "../Logout/Logout"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIRoutes"
import { Container } from "./style"

export default function ChatContainer({ currentChat, socket }) {

  const scroll = useRef()

  const [messages, setMessages] = useState([])

  const [arrivalMessage, setArrivalMessage] = useState(null)

  const setIntoMessage = async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    })
    setMessages(response.data)

    scroll.current.scrollTo({
      top: scroll.current.scrollHeight,
      behavior: 'smooth',
    });

  }

  const getThisCurrentChat = async () => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id
      }
    };
    getCurrentChat()
  }

  useEffect(() => {
    if (currentChat) {
      setIntoMessage()
    }
  }, [currentChat])

  useEffect(() => {
    getThisCurrentChat()
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    })

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    })

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg })
    setMessages(msgs)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);


    setTimeout(() => {
      scroll.current.scrollTo({
        top: scroll.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 500)
  }, [arrivalMessage])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div ref={scroll} className="chat-messages">
        {messages.map((message) => {
          return (
            <div key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
