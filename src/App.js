import './App.css';
import Header from './components/Header'
import NavBar from './components/NavBar'
import ReviewList from './components/ReviewList';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as api from './api'
import ReviewPage from './components/ReviewPage';
import LoginPage from './components/LoginPage'
import InvalidPath from './components/InvalidPath';
import Profile from './components/Profile';
import PostReview from './components/PostReview';



function App() {

  const [categories, setCategories] = useState([{slug: "loading..."}])
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')))

  useEffect(() => {
    api.fetchCategories()
  .then((response) => {
      setCategories(response)
    })
  }, [])

  return (
    <div>
      <Header currentUser={currentUser}/>
      <NavBar categories={categories} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/reviews/:id" element={<ReviewPage currentUser={currentUser}/>} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser}/>} />
        <Route path="/profile/:username?" element={<Profile currentUser={currentUser}/>} />
        <Route path="/post-review" element={<PostReview currentUser={currentUser} categories={categories}/>} />
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </div>
  );
}

export default App;


