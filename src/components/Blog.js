import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blogs from './Blogs';

const Blog = () => {
  const [blog, setBlog] = useState();
  const sendRequest = async () => {

    await axios.get("http://localhost:7000/api/blog").then((res) => {
      setBlog(res.data.blogs)
    })

  }
  useEffect(() => {
    sendRequest()

  }, []);

  return (
    <div>
      {blog &&
        blog.map((blogs, index) =>
          <Blogs
            id={blogs._id}
            isUser={localStorage.getItem("userId") === blogs.user._id}
            title={blogs.title} description={blogs.description} imageURL={blogs.image} userName={blogs.user.name} />)}
    </div>
  )
}

export default Blog