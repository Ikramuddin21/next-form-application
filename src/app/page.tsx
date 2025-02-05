import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 max-w-[800px] w-full p-4 mx-auto flex flex-col w-fit gap-4">
      <Link href="/form">
        <button className="bg-gray-200 px-4 py-2 rounded">
          Go to Form page
        </button>
      </Link>
      <Link href="/data">
        <button className="bg-gray-200 px-4 py-2 rounded">
          Go to Data display page
        </button>
      </Link>
    </div>
  );
}
