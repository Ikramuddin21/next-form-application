/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ModalCom from "@/components/ModalCom";
import { message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldType } from "../../../type/type";

const page = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<string | boolean | any>(false);
  const [messageApi, contextHolder] = message.useMessage();

  // fetch data
  const dataFetch = async () => {
    const res = await fetch("/api/get");
    const { data } = await res.json();
    setData(data);
  };

  useEffect(() => {
    dataFetch();
  }, [isModalOpen]);

  return (
    <div>
      {contextHolder}
      <div className="flex justify-between gap-8 mb-6">
        <h1 className="text-2xl">Data display</h1>
        <div>
          <Link href="/" className="mr-2">
            <button className="bg-gray-200 px-4 py-2 rounded">Home</button>
          </Link>
          <Link href="/form">
            <button className="bg-gray-200 px-4 py-2 rounded">Form page</button>
          </Link>
        </div>
      </div>
      {/* <input
        className="w-[15%] py-1 pl-2 mb-3 text-sm outline-0 border border-gray-300 rounded"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      /> */}
      {data?.length ? (
        <table className="text-md border-collapse border border-gray-300 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 w-full text-center">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Skills</td>
              <td>Experience</td>
              <td>Expected Salary</td>
              <td>Employment Status</td>
              <td>Introduction</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: FieldType, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item?.skills?.map((item: string) => item).join(", ")}</td>
                <td>{item.experience}</td>
                <td>{item.salary}</td>
                <td>{item.status}</td>
                <td>{item.introduction}</td>
                <td className="w-[160px]">
                  <div className="flex justify-center space-x-2">
                    <Link href={`/edit-driver/${item.id}`}>
                      <button className="!bg-orange-700 text-white px-4 py-2 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => setIsModalOpen(item.id)}
                      className="!bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg">No data added</p>
      )}
      <ModalCom
        isModalOpen={isModalOpen}
        messageApi={messageApi}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default page;
