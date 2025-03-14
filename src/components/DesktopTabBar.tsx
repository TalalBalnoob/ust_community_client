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

const DesktopSideBar = () => {
  return (
    <>
      <div className='fixed right-0 top-14 flex h-full w-fit flex-col justify-center bg-zinc-900 pb-40'>
        <DesktopSideBarIcon
          path={'/'}
          icon={faHome}
          shadow-lg
        />
        <DesktopSideBarIcon
          path={'/search'}
          icon={faSearch}
        />
        <DesktopSideBarIcon
          path={'/create'}
          icon={faPenToSquare}
        />
        <DesktopSideBarIcon
          path={'/notifications'}
          icon={faBell}
        />
        <DesktopSideBarIcon
          path={'/profile'}
          icon={faUser}
        />
      </div>
    </>
  )
}

const DesktopSideBarIcon = ({
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

export default DesktopSideBar
