import Image from "next/image";
import Navbar from "./components/Homepage/Navbar";
import Hero from "./components/Homepage/Hero";
import HeroFooter from "./components/Homepage/HeroFooter";
import Working from "./components/Homepage/Working";
import Categories from "./components/Homepage/Category";
import FeaturedJobs from "./components/Homepage/FeaturedJobs";
import Community from "./components/Homepage/Community";
import Adver from "./components/Homepage/Adver";
import Footer from "./components/Homepage/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <HeroFooter/>
      <Working/>
      <Categories/>
      <FeaturedJobs/>
      <Community/>
      <Adver/>
      <Footer/>
    </div>
  );
}
