import './App.css';
import Header from './components/Header'
import NavBar from './components/NavBar'
import ReviewList from './components/ReviewList';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as api from './api'
import ReviewPage from './components/ReviewPage';
import LoginPage from './components/LoginPage'



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
      <Header />
      <NavBar categories={categories} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/reviews/:id" element={<ReviewPage currentUser={currentUser}/>} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser}/>} />
      </Routes>
    </div>
  );
}

export default App;


