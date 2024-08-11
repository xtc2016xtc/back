// 导入Models和Link组件
import { Models } from "appwrite";
import { Link } from "react-router-dom";

// 导入Button组件
import { Button } from "../ui/button";

// 定义UserCardProps类型，包含一个user属性，类型为Models.Document
type UserCardProps = {
  user: Models.Document;
};

// 定义UserCard组件，接收UserCardProps类型的参数
const UserCard = ({ user }: UserCardProps) => {
  // 返回一个Link组件，链接到/profile/${user.$id}
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      {/** 显示用户头像 */}
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      {/** 显示用户名和用户名 */}
      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      {/** 显示Follow按钮 */}
      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

// 导出UserCard组件
export default UserCard;