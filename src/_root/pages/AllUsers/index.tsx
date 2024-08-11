import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";

// 引入获取用户数据的hook
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  // 使用toast组件
  const { toast } = useToast();

  // 使用获取用户数据的hook
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  // 如果获取用户数据出错，则显示错误信息
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          // 如果正在加载用户数据，则显示加载组件
          <Loader />
        ) : (
          // 否则，显示用户列表
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;