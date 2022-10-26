import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from "../../utils/APIRoutes"

import { FormContainer } from "./style"

export default function Register() {
  const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/")
    }
  }, [])

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error(
        "Senha e confirme a senha devem ser iguais"
      )

    } else if (username.length < 3) {
      toast.error(
        "Usuario deve ter no minimo 3 caracteres.",
        toastOptions
      )
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Senha de conter no minimo 8 caracteres.",
        toastOptions
      )
      return false;
    } else if (email === "") {
      toast.error("Email requerido.",
        toastOptions
      )
      return false;
    }

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user))
        navigate("/")
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Bluelab</h1>
          </div>
          <input
            type="text"
            placeholder="Nome de usuario"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Criar usuario</button>
          <span>
            Já possui conta? <Link to="/">Clique aqui.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

