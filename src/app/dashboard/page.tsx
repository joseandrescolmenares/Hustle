'use client'
import { Sidebar } from "./components/Sidebar"
import { MainTable } from "./components/Contact"

 const dashboard = () => {
  return (
    <div className="flex justify-center  w-full items-start ">
      <Sidebar />
      <MainTable/>
    </div>
  )
}

export default dashboard
