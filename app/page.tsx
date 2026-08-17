import Nav from "@/components/Nav";
import SignalLine from "@/components/SignalLine";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RevenueSystems from "@/components/RevenueSystems";
import VideoReel from "@/components/VideoReel";
import WebPortfolio from "@/components/WebPortfolio";
import Photography from "@/components/Photography";
import Apps from "@/components/Apps";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SignalLine />
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <RevenueSystems />
        <VideoReel />
        <WebPortfolio />
        <Photography />
        <Apps />
        <BookACall />
      </main>
      <Footer />
    </>
  );
}
