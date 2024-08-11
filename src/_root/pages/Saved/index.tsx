import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

// 定义Saved组件
const Saved = () => {
  // 使用useGetCurrentUser钩子获取当前用户数据
  const { data: currentUser } = useGetCurrentUser();

  // 将当前用户的保存的帖子数据转换为GridPostList组件需要的格式
  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  // 返回Saved组件的JSX
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        // 如果当前用户数据不存在，则显示加载器
        <Loader />
      ) : (
        // 如果当前用户数据存在，则显示GridPostList组件
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            // 如果保存的帖子数据为空，则显示提示信息
            <p className="text-light-4">No available posts</p>
          ) : (
            // 否则，显示GridPostList组件
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

// 导出Saved组件
export default Saved;