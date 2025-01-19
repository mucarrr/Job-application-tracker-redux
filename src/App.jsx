import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/form'
import Home from './pages/home'
import Header from './components/Header'
import api from './utils/api'
import { useDispatch } from 'react-redux'
import { setError, setJobs, setLoading } from './redux/slices/jobSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/job/:mode" element={<Form/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App