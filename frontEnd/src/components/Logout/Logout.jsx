import React from "react"
import { BiPowerOff } from "react-icons/bi"

import axios from "axios"
import { logoutRoute } from "../../utils/APIRoutes"

import {Button} from "./style"


export default function Logout() {
  const handleClick = async () => {
    const idUser = localStorage.getItem('idUser')
    const data = await axios.get(`${logoutRoute}/${idUser}`)
    if (data.status === 200) {
      window.location.href = "/"
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}


