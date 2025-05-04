import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import loader from '../assets/loader.gif'
import { setAvatarRoute } from '../utils/ApiRoutes';
import { Buffer } from 'buffer';
import multiavatar from '@multiavatar/multiavatar'

export default function SetAvatar() {

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);

  const setAvatarPicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("É necessário escolher um avatar para seu perfil.", toastOptions);
    } else {
      try {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar]
        })

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate('/chat');
        } else {
          toast.error("Erro ao selecionar avatar, por favor tente novamente.", toastOptions);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 400:
              toast.error(
                data.error || 'Dados inválidos. Verifique a imagem ou o ID do usuário.',
                toastOptions
              );
              break;
            case 404:
              toast.error(data.error || 'Usuário não encontrado.', toastOptions);
              break;
            case 403:
              toast.error(data.error || 'Acesso não autorizado.', toastOptions);
              break;
            default:
              toast.error('Erro no servidor. Tente novamente mais tarde.', toastOptions);
          }
        } else if (error.request) {
          toast.error('Sem conexão com o servidor. Verifique sua internet.', toastOptions);
        } else {
          toast.error(error.message || 'Erro inesperado. Tente novamente.', toastOptions);
        }
      }
    }
  };
  useEffect(() => {
    const data = [];
    for (let i=0; i<4; i++) {
      const image = multiavatar(Math.round(Math.random() * 1000));
      const buffer = Buffer.from(image, "binary");
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading ? 
        (<Container><img src={loader} alt='loader' className='loader'/></Container>) : 
        (<Container>
          <div className="title-container">
            <h1>
              Escolha seu avatar
            </h1>
          </div>
          <div className="avatars">
            {
              avatars.map((avatar, index) => {
                return (
                  <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar'onClick={() => setSelectedAvatar(index)}/>
                  </div>
                )
              })
            }
          </div>
          <button className='submit-btn' onClick={() => setAvatarPicture()}>Selecionar</button>
        </Container>)
      }
      <ToastContainer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #1a2a44;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #b3560b;
    }
  }
  .submit-btn {
    background-color: #dfa223;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #b3560b;
    }
  }
`;
