import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Dashboard  from './Components/Dashboard'
import Sidebar from './Components/Sidebar'



function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <Navbar />
     <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Dashboard />
    </>
    
  )
}

export default App