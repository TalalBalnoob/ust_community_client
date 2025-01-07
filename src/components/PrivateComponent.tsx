import useAuth from '../context/AuthProvider'

type propsType = {
  ownerId: number
  component: import('react').ReactNode
}

function PrivateComponent({ ownerId, component }: propsType) {
  const { auth } = useAuth()

  if (auth.userData.id === ownerId) {
    return component
  } else {
    return <></>
  }
}

export default PrivateComponent
