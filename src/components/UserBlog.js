import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blogs from './Blogs';

const UserBlog = () => {
  const [blog, setBlog] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    // console.log(id)
    await axios.post(`http://localhost:7000/api/blog/user`, { id }).then((res) => {
      setBlog(res.data.user.blogs)
    })
  }
  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      setBlog([])
    } else
      sendRequest()
  }, [])

  return (
    <div>
      {" "}
      {blog && blog.map((blogs, index) =>
        <Blogs
          id={blogs._id}
          key={index}
          isUser={true}
          title={blogs.title} description={blogs.description} imageURL={blogs.image} userName={blogs.user.name} />)}
    </div>
  )
}

export default UserBlog
