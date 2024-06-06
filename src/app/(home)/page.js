import Link from "next/link";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      Main Page Here
    </div>
  );
}
