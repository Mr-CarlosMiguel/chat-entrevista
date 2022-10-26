import React, { useEffect, useState } from "react"

import axios from "axios"
import { Buffer } from "buffer"
import loader from "../../assets/loader.gif"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { setAvatarRoute } from "../../utils/APIRoutes"

import { Container } from "./style"

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Selecione um avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        )
        navigate("/chat");
      } else {
        toast.error("Erro ao definir avatar. Por favor, tente novamente.", toastOptions)
      }
    }
  };

  const getImages = async () => {
    const data = []
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data)
      data.push(buffer.toString("base64"))
    }
    setAvatars(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getImages()
  }, [avatars])

  return (
    <div>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Escolha um Avatar como sua foto de perfil</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Definir como imagem de perfil
          </button>
          <ToastContainer />
        </Container>
      )}
    </div>
  );
}


