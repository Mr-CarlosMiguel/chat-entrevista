import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from "../../utils/APIRoutes"

import { FormContainer } from "./style"

export default function Login() {
  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    localStorage.clear()
  }, [])

  const validateForm = () => {
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions)
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions)
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      } else if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        )
        localStorage.setItem('idUser', data.user._id)
        navigate("/chat")
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Bluelab</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <span>
            Não possui conta? <Link to="/register">Clique aqui.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

