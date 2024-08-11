
// 导入GridPostList和Loader组件
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
// 导入useGetCurrentUser钩子函数
import { useGetCurrentUser } from "@/lib/react-query/queries";

// 定义LikedPosts组件
const LikedPosts = () => {
  // 使用useGetCurrentUser钩子函数获取当前用户数据
  const { data: currentUser } = useGetCurrentUser();

  // 如果当前用户不存在，则返回一个加载中的组件
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // 如果当前用户喜欢的帖子为空，则返回一个提示信息
  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      
      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

// 导出LikedPosts组件
export default LikedPosts;