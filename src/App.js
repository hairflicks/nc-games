import './App.css';
import Header from './components/Header'
import NavBar from './components/NavBar'
import ReviewList from './components/ReviewList';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as api from './api'



function App() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.fetchCategories()
  .then((response) => {
      setCategories(response)
    })
  }, [])

  return (
    <div>
      <Header />
      <NavBar categories={categories}/>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews" element={<ReviewList />} />
      </Routes>
    </div>
  );
}

export default App;


