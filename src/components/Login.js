import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { loginActions } from '../Store'

const Login = () => {
  const naviagte = useNavigate()
  const dispatch = useDispatch()
  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSignup, setisSignup] = useState(false)
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`https://bookbackend-jgyt.onrender.com/api/user/${type}`, {
      "name": Inputs.name,
      "email": Inputs.email,
      "password": Inputs.password,
    }).catch(err => console.log(err))
    const data = await res.data
    console.log(data);
    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(Inputs);

    if (isSignup) {
      sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(loginActions.login()))
        .then(() => naviagte("/"))
    } else {
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
        .then((data) => console.log(data))
        .then(() => dispatch(loginActions.login()))
        .then(() => naviagte("/"))
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} boxShadow={"10px 10px 20px #ccc"} padding={"3"} margin={"auto"} marginTop={5} borderRadius={"5"}>
          <Typography variant='h2' padding={3} textAlign={'center'}>{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup &&
            <TextField name='name' onChange={handleChange} value={Inputs.name} placeholder='Name' margin="normal" />}{" "}
          <TextField name='email' onChange={handleChange} value={Inputs.email} type='email' placeholder='Email' margin="normal" />
          <TextField name='password' onChange={handleChange} value={Inputs.password} type='password' placeholder='Password' margin="normal" />
          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
          <Button onClick={() => setisSignup(!isSignup)} sx={{ borderRadius: 3 }} >Change To {isSignup ? "Login" : "signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Login
