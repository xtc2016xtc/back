import { useParams, Link, useNavigate } from "react-router-dom";


// 引入react-router-dom中的useParams、Link和useNavigate函数
import {
  useGetPostById,
  useDeletePost,
  useGetUserPosts,
} from "@/lib/react-query/queries";
// 引入自定义的react-query查询函数
import { multiFormatDateString } from "@/lib/utils";
// 引入自定义的工具函数
import { useUserContext } from "@/context/AuthContext";
// 引入自定义的AuthContext
import { Button } from "@/components/ui/button";
// 引入自定义的Button组件
import Loader from "@/components/shared/Loader";
// 引入自定义的Loader组件
import PostStats from "@/components/shared/PostStats";
// 引入自定义的PostStats组件
import GridPostList from "@/components/shared/GridPostList";
// 引入自定义的GridPostList组件
import { backIcon, defaultAvatarIcon, deleteIconIcon, editIcon } from "@/utils";
// 引入自定义的图标

const PostDetails = () => {
  const navigate = useNavigate();
  // 使用useNavigate函数获取导航对象
  const { id } = useParams();
  // 使用useParams函数获取路由参数中的id
  const { user } = useUserContext();
  // 使用useUserContext函数获取用户信息

  const { data: post, isLoading } = useGetPostById(id);
  // 使用useGetPostById函数获取指定id的帖子信息
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  // 使用useGetUserPosts函数获取指定用户的帖子列表
  const { mutate: deletePost } = useDeletePost();
  // 使用useDeletePost函数获取删除帖子的函数

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );
  // 过滤掉当前帖子，获取相关帖子列表

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    // navigate(-1);
    navigate("/");
  };
  // 定义删除帖子的函数

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={backIcon}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator.imageUrl ||
                    defaultAvatarIcon
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={editIcon}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={deleteIconIcon}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          更多
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;