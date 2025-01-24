import {
  faBell,
  faHome,
  faPenToSquare,
  faSearch,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className='fixed bottom-0 flex min-h-fit w-screen bg-zinc-900 pb-2 shadow-lg'>
      <SideBarIcon
        path={'/'}
        icon={faHome}
      />
      <SideBarIcon
        path={'/search'}
        icon={faSearch}
      />
      <SideBarIcon
        path={'/create'}
        icon={faPenToSquare}
      />
      <SideBarIcon
        path={'/notifications'}
        icon={faBell}
      />
      <SideBarIcon
        path={'/profile'}
        icon={faUser}
      />
    </div>
  )
}

const SideBarIcon = ({
  icon,
  path,
}: {
  icon: IconDefinition
  path: string
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div
      className='sidebar-icon'
      style={
        location.pathname === path
          ? {
              borderRadius: '0.75rem',
              backgroundColor: '#e4e4e7',
              color: '#18181b',
            }
          : {}
      }
      onClick={() => navigate(path)}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}

export default SideBar
