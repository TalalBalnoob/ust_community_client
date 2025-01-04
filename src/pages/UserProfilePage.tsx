import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import { userProfile } from '../types'
import { fetchUserProfile } from '../utils/api/fetchMethods'

function UserProfilePage() {
  const [user, setUser] = useState<userProfile>()
  const { auth } = useAuth()
  const { userId } = useParams()
  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const res = await fetchUserProfile(userId as string, auth)
        setUser(() => res.data)
      } catch {
        throw Error
      }
    }

    fetchMethod()
  }, [])
  return <></>
}

export default UserProfilePage
