import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blogs = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlog/${id}`)
  };
  const deleteRequest = async () => {
    const res = await axios.delete(`https://bookbackend-jgyt.onrender.com/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/"));
  }
  return (
    <div>
      <Card sx={{ maxWidth: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover:": { boxShadow: "5px 5px 10px #ccc" } }}>
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteForeverIcon /></IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader={`${new Date().toDateString()}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blogs
