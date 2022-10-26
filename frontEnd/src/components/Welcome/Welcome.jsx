import React, { useState, useEffect } from "react"
import Robot from "../../assets/robot.gif"

import { Container } from "./style"

export default function Welcome() {
  const [userName, setUserName] = useState("")

  const userNameLocalStorage = async () => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      )
    }
  };

  useEffect(() => {
    userNameLocalStorage()
  }, [])

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Bem-vindo, <span>{userName}!</span>
      </h1>
      <h3>Selecione um bate-papo para começar a enviar mensagens.</h3>
    </Container>
  )
}


