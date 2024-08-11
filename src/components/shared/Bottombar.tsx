// 导入sidebarLinks常量
import { sidebarLinks } from "@/constants";
// 导入INavLink类型
import { INavLink } from "@/types";
// 导入Link和useLocation函数
import { Link, useLocation } from "react-router-dom";


// 定义Bottombar组件
const Bottombar = () => {
  // 获取当前路由路径
  const { pathname } = useLocation();

  return (
    // 返回一个section元素，类名为bottom-bar
    <section className="bottom-bar">
       {sidebarLinks.map((link: INavLink) => {
            // 判断当前路由路径是否与link.route相等
            const isActive = pathname === link.route;

            return (
              // 返回一个Link元素，类名为flex-center flex-col gap-1 p2 transition
              <Link
                to={link.route}
                key={link.label}
                className={`${isActive && "bg-primary-500 rounded-[10px]"
                  } flex-center flex-col gap-1 p2 transition`}>
                    
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    width={16}
                    height={16}
                    className={`${isActive && "invert-white"}`}
                  />
                
                 <p className="tiny-medium text-light-2">{link.label}</p>
              </Link>
            );
          })}
    </section>
  )
}

// 导出Bottombar组件
export default Bottombar