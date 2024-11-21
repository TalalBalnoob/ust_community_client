// TODO: add some error handling
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import useAuth from '../context/AuthProvider'
import axios from '../utils/api/axios'

const LOGIN_URL = '/login'

function LoginPage() {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('202110500133')
  const [password, setPassword] = useState('password')
  const [errorMsg, setErrorMsg] = useState('')
  const errorRef = useRef()

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      setAuth({
        token: res.data.token,
        userData: { id: res.data.user.id, username: res.data.user.username },
      })
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-indigo-800 from-40% to-blue-950'>
      <h1 className='mb-6 text-center text-4xl font-bold text-white'>
        صفحة الدخول
      </h1>
      <div className='flex justify-center'>
        <form
          onSubmit={handleLogin}
          className='flex h-32 w-4/5 flex-col items-center justify-between'
        >
          <input
            className='w-full border-none p-1 px-2 outline-none focus:outline-none'
            type='text'
            name='username'
            id='username'
            placeholder='رقم السند'
            autoComplete='off'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='w-full border-none p-1 px-2 outline-none focus:outline-none'
            type='password'
            name='password'
            id='password'
            placeholder='كلمة السر'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text='تسجيل دخول'
            type='submit'
            className='w-1/2 mt-4 rounded bg-green-600 p-1 text-white'
          />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
