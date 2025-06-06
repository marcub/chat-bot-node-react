import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import { registerRoute } from '../utils/ApiRoutes';

function Register() {

  const navigate = useNavigate();

  const [values, setValeus] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/chat');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {password, username, email} = values;
      const {data} = await axios.post(registerRoute, {
        username, 
        email, 
        password
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  }

  const handleChange = (event) => {
    setValeus({...values, [event.target.name]: event.target.value});
  }

  const handleValidation = () => {
    const {password, confirmPassword, username, email} = values;

    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem, por favor digite-as novamente.", toastOptions);
      return false;
    } else if (username.length < 6) {
      toast.error("Username deve ter no mínimo 6 caracteres.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Senha deve ter no mínimo 8 caracteres.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email deve ser preenchido.", toastOptions);
      return false;
    }

    return true;
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='Logo'/>
            <h1>Clutch Chat</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)}/>
          <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)}/>
          <input type="password" placeholder='Senha' name='password' onChange={(e) => handleChange(e)}/>
          <input type="password" placeholder='Confirmar Senha' name='confirmPassword' onChange={(e) => handleChange(e)}/>
          <button type="submit">Criar conta</button>
          <span>Já tem uma conta? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer>

      </ToastContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #1a2a44;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #b3560b;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #dfa223;
        outline: none;
      }
    }
    button {
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
    span {
      color: white;
      text-transform: uppercase;
      align-self: center;
      a {
        color: #b3560b;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register