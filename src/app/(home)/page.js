import Link from "next/link";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Hero from "@/app/components/Hero";
import AboutUs from "@/app/components/AboutUs";
import Footer from "@/app/components/Footer";
import NotificationSection from "@/app/components/NotificationSection";
import ContactPage from "@/app/components/ContactPage";
import StudentAllCard from "@/app/components/StudentCard"
import LandingPage from "../components/LandingPage";
import Gallery from "../components/Gallery";



export default async function Home() {

  const session = await auth();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LandingPage/>
      <AboutUs/>
      <Gallery/>
      <NotificationSection />
      <ContactPage/>
    </div>
  );
}
