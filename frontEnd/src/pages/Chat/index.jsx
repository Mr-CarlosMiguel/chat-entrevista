import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { userRoute, host, allUsersRoute } from "../../utils/APIRoutes";

import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";

import { Container } from "./style"


export default function Chat() {
  const socket = useRef()
  const idUser = localStorage.getItem('idUser')
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const [currentUser, setCurrentUser] = useState('')

  const listUser = async () => {
    const data = await axios.get(`${userRoute}/${idUser}`);
    setCurrentUser(data.data);
  };

  const listUsers = async () => {
    const data = await axios.get(`${allUsersRoute}`)
    setContacts(data.data)
  };

  const socketConfig = () => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", idUser)
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.isAvatarImageSet === false){
      window.location.href="/setAvatar"
    }
  }, [currentUser])

  useEffect(() => {
    listUser()
    listUsers()
  }, [])

  useEffect(() => {
    socketConfig()
  }, [currentUser])

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={setCurrentChat} />
          {!currentChat ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

