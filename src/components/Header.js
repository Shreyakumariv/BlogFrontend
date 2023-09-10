import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tabs, Toolbar, Typography, Tab } from "@mui/material"
import { Box, Button } from "@mui/material"
import { Link } from 'react-router-dom';
import { loginActions } from '../Store';


const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState(0);
  return (
    <AppBar
      position='sticky'
      sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(115,9,86,0.241421568627451) 35%, rgba(0,185,255,0.4010854341736695) 100%)" }}>
      <Toolbar>
        <Typography variant='h4'>BlogApp</Typography>
        {(<Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
          <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >
            <Tab LinkComponent={Link} to="/" label="All blogs" />
            <Tab LinkComponent={Link} to="/UserBlog" label="My blogs" />
            <Tab LinkComponent={Link} to="/AddBlog/add" label="Add blogs" />
          </Tabs>
        </Box>)}
        <Box display={"flex"} marginLeft={"auto"}>


          {isLoggedIn != true ? <><Button LinkComponent={Link} to="/Login" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Login</Button>
            <Button LinkComponent={Link} to="/Login" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Signup</Button></>
            : <Button
              onClick={() => {
                localStorage.removeItem("userId")
                dispath(loginActions.logout())
              }} LinkComponent={Link} to="/Login" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Logout</Button>}

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
