import Map from "../components/Map"
import User from "../components/User"
import SideBar from "../components/sideBar"
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map></Map>
      <User></User>
    </div>
    
  )
}

export default AppLayout
