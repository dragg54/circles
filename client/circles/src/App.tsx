import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { globalModalState } from './types/GlobalModalState'
import { useRef } from 'react'
import { isClosed } from './redux/GlobalModalReducer'
import Post from './pages/Post'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import PostForm from './components/Forms/PostForm'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function App() {
  interface eventType extends EventTarget {
    id: string
  }
  const globalModal = useSelector(state => (state as globalModalState).globalModal)
  const dispatch = useDispatch()
  document.addEventListener("click", (event) => {
    if ((event.target as eventType).id == "modal") {
      dispatch(isClosed({ formName: "" }))
    }
  })
  return (
    <body className={`relative ${globalModal.isOpened ? 'h-screen' : 'h-auto'} ${globalModal.isOpened ? 'overflow-hidden' : 'h-auto'}`}>
      <div className={`absolute ${globalModal.isOpened ? 'flex' : 'hidden'} bg-[rgba(220,220,220,0.7)]  w-screen z-30  h-screen justify-center pt-24 items-start`} id='modal'>
        <div className='w-2/5'>
          {globalModal.formName == "CreatePost" ? <PostForm /> : ""}
        </div>
      </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Router>
    </body>
  )
}

export default App
