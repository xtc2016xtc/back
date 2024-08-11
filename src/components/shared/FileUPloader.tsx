import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "../ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { fileuploadIcon } from "@/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

// 文件上传组件
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  // 文件状态
  const [file, setFile] = useState<File[]>([]);
  // 文件URL状态
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  // 文件拖拽事件
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // 设置文件状态
      setFile(acceptedFiles);
      // 调用fieldChange函数，将文件传递给父组件
      fieldChange(acceptedFiles);
      // 将文件转换为URL
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  // 获取拖拽区域和输入框的属性
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img
            src={fileuploadIcon}
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;