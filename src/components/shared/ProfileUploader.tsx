import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

// 定义ProfileUploader组件，用于上传用户头像
const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  // 定义file状态，用于存储上传的文件
  const [file, setFile] = useState<File[]>([]);
  // 定义fileUrl状态，用于存储上传文件的URL
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  // 定义onDrop函数，用于处理文件上传
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // 设置file状态为上传的文件
      setFile(acceptedFiles);
      // 调用fieldChange函数，将上传的文件传递给父组件
      fieldChange(acceptedFiles);
      // 设置fileUrl状态为上传文件的URL
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  // 使用useDropzone钩子，获取getRootProps和getInputProps函数
  const { getRootProps, getInputProps } = useDropzone({
    // 调用onDrop函数，处理文件上传
    onDrop,
    // 设置可接受的文件类型
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    // 返回一个div，包含getRootProps和getInputProps函数
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        {/* 显示上传的文件，如果没有上传文件，则显示默认的占位图 */}
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        {/* 显示“Change profile photo”文字 */}
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;