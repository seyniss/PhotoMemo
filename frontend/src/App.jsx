import './App.scss'
import { useState,useEffect } from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import AuthPanel from './components/AuthPanel'
import Landing from "./pages/Landing"
import api from "./api/client"

function App() {

  const [user,setUser]=useState(()=>{
    const raw=localStorage.getItem('user')
    return raw? JSON.parse(raw):null
  })

  const [token, setToken]=useState(()=>localStorage.getItem('token'))
  const [me,setMe]=useState(null)
  const isAuthed=!!token

//로그인 성공 시 아래 실행

  const handleAuthed =({user,token})=>{
    setUser(user)
    setToken(token)
    //로그인 성공시 저장하기 위해?

    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    //새로고침 이후에도 남아있도록

    const logout=()=>{
      //로그아웃 함수
      setUser(null)
      setToken(null)
      setMe(null)

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      //로그아웃 시 로컬에 남은 유저 정보와 토큰 삭제
    }

    const fetchMe =async()=>{
      try {
        const {data}=await api.get('/api/auth/me')
        setMe(data)

      } catch (error) {
        setMe({error:error.response?.data||'실패'})
      }
    }

  }


  return (
    <div className="page">

      <Routes>  
        <Route path="/" element={<Landing />}/>
        <Route
          path="/admin/login" 
          element={<AuthPanel 
          isAuthed={isAuthed}
          user={user}
          me={me}
          onfetchMe={fetchMe}
          onLogout={logout}
          onAuthed={handleAuthed}
          requiredRole="admin"
          />}
        />

      </Routes>
    </div>
  )
}

export default App
