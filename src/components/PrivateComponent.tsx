import useAuth from '../context/AuthProvider'

type propsType = {
  ownerId: number
  component: import('react').ReactNode
}

// show the component child only if the user is the owner of the post
function PrivateComponent({ ownerId, component }: propsType) {
  const { auth } = useAuth()

  // compare the post owner id with the logged in user id
  if (auth.userData.id === ownerId) {
    return component
  } else {
    return <></>
  }
}

export default PrivateComponent
