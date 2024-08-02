//这些导入语句引入了React Router的导航组件、类型定义、常量、加载组件、按钮组件、用户认证查询、用户上下文以及一些图片资源。
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import Loader from '@/components/shared/Loader'
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { logoImg, logoutIcon, userImg } from "@/utils";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();
  // LeftSidebar组件使用useNavigate和useLocation钩子来处理导航和获取当前路径。useUserContext钩子用于获取用户信息和状态。useSignOutAccount钩子用于处理用户登出操作。

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };
  //handleSignOut函数处理用户的登出操作。它阻止默认的表单提交行为，调用signOut函数进行登出操作，更新用户认证状态，重置用户信息，并导航到登录页面。

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logoImg}
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || userImg}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"
                  }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"
                      }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <img src={logoutIcon} alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
    /* 
          组件的返回部分渲染了导航栏的内容：

          显示品牌logo。
          如果用户正在加载或用户信息未加载完成，显示加载器。
          否则，显示用户头像、姓名和用户名。
          渲染导航链接列表，根据当前路径高亮显示活动链接。
          渲染登出按钮，点击时调用handleSignOut函数。
    */
  );
};

export default LeftSidebar;

/* 
注意事项
确保所有导入的模块和资源文件路径正确。
sidebarLinks常量应该包含导航链接的配置信息。
useUserContext和useSignOutAccount钩子应该正确配置，以便获取用户信息和处理登出操作。
样式类名（如leftsidebar, body-bold等）应该与CSS文件中的定义相匹配。

*/