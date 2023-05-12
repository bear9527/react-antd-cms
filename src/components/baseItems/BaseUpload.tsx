import React, { FC, useEffect, useState } from "react";
import { Upload, UploadFile, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { upload } from "@/api/upload";
import service from "@/utils/request";
import { log } from "console";
import { flushSync } from "react-dom";

interface Props {
  onChange?: any;
  fileList?: UploadFile[];
  accept?: string[];
  size?: number;
  action?: string;
  multiple?: boolean;
  maxCount?: number;
}

const BaseUpload: FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    onChange,
    fileList = [],
    accept = ["jpg", "jpeg", "png", "gif"],
    size = 5,
    // action = service.baseURL + '/common/upload',
    action = "/common/upload",
    multiple = false,
    maxCount = 1,
  } = props;

  const [stateFileList, setStateFileList] = useState<UploadFile[]>(
    fileList.length ? [...fileList] : []
  );

  const uploadButton = loading ? <LoadingOutlined /> : <PlusOutlined />;

  const _onChange = (a: any): void => {
    flushSync(() => {
      setStateFileList([...a.fileList]);
      onChange([
        ...a.fileList.filter((item: any) => {
          return item.status === "done";
        }),
      ]);
    });
    setLoading(false);
    // setLoading(true)
  };

  const onStart = (file: any): void => {
    console.log("onStart", file);
    setLoading(true);
  };

  const onError = (): void => {};

  const uploadProps = {
    action,
    multiple,
    maxCount,
    onStart,
    customRequest({ file, filename, onSuccess }: any) {
      const isType = accept.some((item: string) => file.type.includes(item));
      const isSize = file.size / 1024 / 1024 < size;
      if (!isType || !isSize) {
        message.error("请上传正确文件");
        return false;
      }
      const formData = new FormData();
      formData.append(filename, file);
      upload(action, formData)
        .then((res: any) => {
          onSuccess(res);
        })
        .catch(onError);
      return {
        abort() {
          // console.log('upload progress is aborted.')
        },
      };
    },
  };

  return (
    <Upload
      className="avatar-uploader"
      listType="picture-card"
      showUploadList={true}
      fileList={stateFileList}
      {...uploadProps}
      onChange={_onChange}
    >
      {stateFileList.length >= maxCount ? null : uploadButton}
    </Upload>
  );
};

export default BaseUpload;
