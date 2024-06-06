import Link from "next/link";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {session && (
          <div className="mb-6">
            <p className="text-lg">Welcome, {session.username}</p>
          </div>
        )}
        <Link href={"/admin-dashboard"} className="text-blue-500 hover:underline">
          Admin Page
        </Link>
        <div className="mt-6">
          <Link href={"/api/auth/signout"} className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
