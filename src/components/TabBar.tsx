import DesktopSideBar from './DesktopTabBar'
import MobileTabBar from './MobileTabBar'

const TabBar = () => {
  return (
    <>
      <div className='hidden lg:block'>
        <DesktopSideBar />
      </div>
      {/* only phone tab bar */}
      <div className='block lg:hidden'>
        <MobileTabBar />
      </div>
    </>
  )
}

export default TabBar
