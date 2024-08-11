import { Outlet } from "react-router-dom";

// 引入共享组件
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

// 定义根布局组件
const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* 顶部导航栏 */}
      <Topbar />
      {/* 左侧边栏 */}
      <LeftSidebar />

      {/* 中间内容区域 */}
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      {/* 底部导航栏 */}
      <Bottombar />
    </div>
  );
};

// 导出根布局组件
export default RootLayout;