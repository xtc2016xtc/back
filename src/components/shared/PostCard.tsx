import { Models } from "appwrite";
import { Link } from "react-router-dom";


// 导入工具函数
import { multiFormatDateString } from "@/lib/utils";
// 导入用户上下文
import { useUserContext } from "@/context/AuthContext";
// 导入组件
import PostStats from "./PostStats";
// 导入图标
import { defaultAvatarIcon, editIcon } from "@/utils";

// 定义PostCard组件的props类型
type PostCardProps = {
  post: Models.Document;
};

// 定义PostCard组件
const PostCard = ({ post }: PostCardProps) => {
  // 获取用户上下文
  const { user } = useUserContext();

  // 如果没有creator，则返回
  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                defaultAvatarIcon
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={editIcon}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || defaultAvatarIcon}
          alt="post image"
          className="post-card_img"
        />
      </Link>
      {/* 点赞,收藏 */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;