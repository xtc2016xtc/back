import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { logoImg, logoutIcon, userImg } from "@/utils";

// 定义Topbar组件
const Topbar = () => {
  // 使用useNavigate钩子获取导航功能
  const navigate = useNavigate();
  // 使用useUserContext钩子获取用户信息
  const { user } = useUserContext();
  // 使用useSignOutAccount钩子获取登出功能
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  // 监听isSuccess的变化，如果isSuccess为true，则刷新页面
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        {/* 跳转到首页 */}
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logoImg}
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          {/* 登出按钮 */}
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src={logoutIcon} alt="logout" />
          </Button>
          {/* 跳转到用户个人主页 */}
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || userImg}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;