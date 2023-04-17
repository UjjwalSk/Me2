import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Room from './Components/Room'
import Auth from './Components/Auth'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/new" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </div>
  )
}

export default App
