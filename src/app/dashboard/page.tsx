'use client'
import { Sidebar } from "./Sidebar"
import { MainTable } from "./Contact"

 const dashboard = () => {
  return (
    <div className="flex justify-center  w-full items-start ">
      <Sidebar />
      <MainTable/>
    </div>
  )
}

export default dashboard
