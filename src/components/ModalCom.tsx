/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  isModalOpen: string | boolean;
  setIsModalOpen: Dispatch<SetStateAction<string | boolean>>;
  messageApi: any;
}

const ModalCom = ({
  isModalOpen: modalId,
  messageApi,
  setIsModalOpen,
}: PropsType) => {
  const handleOk = async () => {
    const res = await fetch("/api/save", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: modalId }),
    });
    const resData = await res.json();
    if (resData.success) {
      messageApi.open({
        type: "success",
        content: resData.message,
      });
      setIsModalOpen(false);
    } else {
      messageApi.open({
        type: "error",
        content: resData.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Delete Data"
      open={!!modalId}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};

export default ModalCom;
