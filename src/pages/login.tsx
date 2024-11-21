// TODO: add some error handling
import { FormEvent, useState } from 'react'
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
      navigate('/')
    } catch (err: any) {
      setPassword('')
      setErrorMsg('خطاء في رقم السند او كلمة المرور')
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
          className='flex w-4/5 flex-col items-center justify-between'
        >
          <input
            className='w-full border-none p-1 px-2  focus:outline-none'
            type='text'
            name='username'
            id='username'
            placeholder='رقم السند'
            autoComplete='off'
            value={username}
            onChange={(e) => {
              setErrorMsg('')
              return setUsername(e.target.value)
            }}
            required
          />
          <input
            className='w-full border-none p-1 px-2 focus:outline-none'
            type='password'
            name='password'
            id='password'
            placeholder='كلمة السر'
            value={password}
            onChange={(e) => {
              setErrorMsg('')
              return setPassword(e.target.value)
            }}
            required
          />
          <div className='error_block h-2 my-2'>
            <p className='text-red-600 select-none'>{errorMsg}</p>
          </div>
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
