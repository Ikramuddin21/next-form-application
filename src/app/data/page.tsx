// "use client";
import { getData } from "@/services/getData";
// import { getData } from "@/services/getData";
import Link from "next/link";
// import { useEffect, useState } from "react";

const page = async () => {
  // const [data, setData] = useState([]);
  // const dataFetch = async () => {
  //   const res = await fetch("http://localhost:3000/api/get");
  //   const { data } = await res.json();
  //   setData(data);
  // };
  // useEffect(() => {
  //   fetch("/api/get")
  //     .then((res) => res.json())
  //     .then(({ data }) => setData(data));
  // }, []);
  const data = await getData();
  console.log("data testT", data);

  return (
    <div>
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
            {data?.map((item: any, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item?.skills?.map((item) => item).join(", ")}</td>
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
                      // onClick={() => handleDeleteDriver(item.id)}
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
    </div>
  );
};

export default page;
