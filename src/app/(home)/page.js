import Link from "next/link";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default async function Home() {

  const session = await auth();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AboutUs/>
    </div>
  );
}
