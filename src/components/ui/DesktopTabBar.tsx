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
      <div className=' fixed top-14 right-0 flex h-screen items-start flex-col justify-start px-2 w-fit bg-sec'>
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
      className='sidebar-icon bg-primary text-[#e4e4e7]'
      style={
        location.pathname === path
          ? {
            borderRadius: '0.75rem',
            border: '1px solid #18181b',
            backgroundColor: '#e4e4e7',
            color: '#2E3439'
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
