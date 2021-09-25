import { Modal, Upload } from "antd";
import React, { FC, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import api from "services/api";

import "./style.less";

const { Dragger } = Upload;
interface Props {
  IdProduct: number;
}
const ImageUploader: FC<Props> = ({ IdProduct }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(Array());

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    console.log("aqui");
    return setPreviewVisible(false);
  };

  const handlePreview = async (file: any) => {
    console.log("eita", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }: { fileList: any }) =>
    setFileList(fileList);

  const updloadDrag = (
    <>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click ou arraste para realizar o upload</p>
      <p className="ant-upload-hint">
        Você pode carregar um ou mais arquivos ao mesmo tempo.
      </p>
    </>
  );

  const handleOnRemove = () => {
    console.log("to aqui");
  };

  return (
    <>
      <Dragger
        action={`${api.defaults.baseURL}/files/product/${IdProduct}`}
        method="POST"
        listType="picture-card"
        accept="image/*"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleOnRemove}
        maxCount={4}
        onDrop={(e) => console.log("Dropped files", e.dataTransfer.files)}
        multiple
        style={{
          width: "50%",
          margin: "10px auto",
        }}
      >
        {updloadDrag}
        <p>Máximo 4 imagens</p>
      </Dragger>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUploader;
