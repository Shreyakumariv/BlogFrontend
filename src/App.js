import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import React from 'react';
import Login from './components/Login';
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import UserBlog from './components/UserBlog'
import BlogDetail from './components/BlogDetail'
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<Blog />} />
          <Route path='/AddBlog/add' element={<AddBlog />} />
          <Route path='/UserBlog' element={<UserBlog />} />
          <Route path='/myBlog/:id' element={<BlogDetail />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
