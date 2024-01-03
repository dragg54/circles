import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { globalModalState } from './types/GlobalModalState'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import PostForm from './components/Forms/PostForm'
import { useDispatch, useSelector } from 'react-redux'
import { isClosed } from './redux/GlobalModal'
import Post from './pages/Post'
import User from './pages/User'
import { FormTypes } from './types/Form'
import ProtectedRoute from './routes/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import Community from './pages/Community'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function App() {
  interface eventType extends EventTarget {
    id: string
  }
  const globalModal = useSelector(state => (state as globalModalState).formModal)
  const dispatch = useDispatch()
  document.addEventListener("click", (event) => {
    if ((event.target as eventType).id == "modal") {
      dispatch(isClosed({ formName: FormTypes.createForm }))
    }
  })
  return (
    <body className={`relative ${globalModal?.isOpened ? 'h-screen' : 'h-auto'} ${globalModal?.isOpened ? 'overflow-hidden' : ''}`}>
      <div className={`absolute ${globalModal?.isOpened ? 'flex' : 'hidden'} bg-[rgba(220,220,220,0.7)]   w-screen z-50  h-full justify-center pt-24`} id='modal'>
        <div className='w-2/5'>
          {globalModal?.formName == FormTypes.createForm || FormTypes.editForm ? <PostForm /> : ""}
        </div>
      </div>
      <Router>
        <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/posts" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/currentUser/:id" element={<User />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/community/:id" element={<Community />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </body>
  )
}

export default App
