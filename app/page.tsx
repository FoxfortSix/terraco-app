import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Values } from "@/components/Values";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="values"><Values /></div>
      <div id="collections"><Products /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </main>
  );
}