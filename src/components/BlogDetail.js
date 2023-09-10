import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }
const BlogDetail = () => {
  const Navigate = useNavigate()
  const [blog, setBlog] = useState();
  const id = useParams().id
  console.log(id);
  const [inputs, setInputs] = useState({
    title: "",
    description: ""
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios.get(`https://bookbackend-jgyt.onrender.com/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog)
      setInputs(
        {
          title: data.blog.title,
          description: data.blog.description
        })

    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios.put(`https://bookbackend-jgyt.onrender.com/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(() => Navigate("/myBlog"))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3} borderColor={green} borderRadius={10} boxShadow={"10px 10px 20px #ccc"} padding={3} margin={"auto"} marginTop={3} display={'flex'} flexDirection={'column'} width={'80%'} >
          <Typography fontWeight={'bold'} padding={3} color={'gray'} variant='h2' textAlign={'center'}>Post your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin="normal" variant='outlined' />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin="normal" variant='outlined' />
          <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type='Submit'> Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogDetail
