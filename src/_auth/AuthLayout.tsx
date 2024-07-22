import { sideImg } from "@/utils"
import { Outlet,Navigate } from "react-router-dom"
const AuthLayout = () => {
  const isAuthenticated = false //替换实际认证状态

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ):(
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet /> {/* 子路由组件 */}
          </section>

          <img 
            src={sideImg} 
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
        </>
      )}
    </>
  )
}

export default AuthLayout
