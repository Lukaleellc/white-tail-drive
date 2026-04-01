"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WildlifeCard } from "@/components/WildlifeCard";
import { SectionHeader } from "@/components/SectionHeader";
import { PropertyStat } from "@/components/PropertyStat";
import { ContactOverlay } from "@/components/ContactOverlay";
import { LandscapeGalleryModal } from "@/components/LandscapeGalleryModal";
import { WildlifeGalleryModal } from "@/components/WildlifeGalleryModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navLinks = [
  { id: 'property', label: 'Property' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'ag', label: 'Ag Exemption' },
  { id: 'tech', label: 'Technology' },
  { id: 'attractions', label: 'Attractions' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('property');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLandscapeModalOpen, setIsLandscapeModalOpen] = useState(false);
  const [isWildlifeModalOpen, setIsWildlifeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Force 'property' target when hovering at the very top of the Hero.
      if (window.scrollY < 100) {
        setActiveSection('property');
        return;
      }

      // Add a viewport offset so the transition feels natural as the next section enters.
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const reversedLinks = [...navLinks].reverse();

      for (const link of reversedLinks) {
        const section = document.getElementById(link.id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollPosition = carouselRef.current.scrollLeft;
    const width = carouselRef.current.offsetWidth;
    const newSlide = Math.round(scrollPosition / width) + 1;
    setCurrentSlide(newSlide);
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      if (currentSlide === 1) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
      } else {
        carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
      }
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      if (currentSlide === totalSlides) {
        carouselRef.current.scrollLeft = 0;
      } else {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
      }
    }
  };

  const wildlifeRef = useRef<HTMLDivElement>(null);
  const [wildlifeSlide, setWildlifeSlide] = useState(1);
  const [wildlifeTotal, setWildlifeTotal] = useState(3);

  useEffect(() => {
    // Dynamic total based on scrollWidth allows mobile 15 items vs desktop 3 grids
    const calculateTotal = () => {
      if (wildlifeRef.current) {
        setWildlifeTotal(Math.round(wildlifeRef.current.scrollWidth / wildlifeRef.current.offsetWidth));
      }
    };
    calculateTotal();
    window.addEventListener('resize', calculateTotal);
    return () => window.removeEventListener('resize', calculateTotal);
  }, []);

  const handleWildlifeScroll = () => {
    if (!wildlifeRef.current) return;
    const scrollPosition = wildlifeRef.current.scrollLeft;
    const width = wildlifeRef.current.offsetWidth;
    const newSlide = Math.round(scrollPosition / width) + 1;
    setWildlifeSlide(newSlide);
  };

  const scrollWildlifePrev = () => {
    if (wildlifeRef.current) {
      if (wildlifeSlide === 1) {
        wildlifeRef.current.scrollLeft = wildlifeRef.current.scrollWidth;
      } else {
        wildlifeRef.current.scrollLeft -= wildlifeRef.current.offsetWidth;
      }
    }
  };

  const scrollWildlifeNext = () => {
    if (wildlifeRef.current) {
      if (wildlifeSlide === wildlifeTotal) {
        wildlifeRef.current.scrollLeft = 0;
      } else {
        wildlifeRef.current.scrollLeft += wildlifeRef.current.offsetWidth;
      }
    }
  };

  return (
    <div className="bg-[#0c0a09] min-h-screen text-[#e7e5e4] selection:bg-[#ece1d3] selection:text-[#453f34]">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0c0a09]/70 backdrop-blur-[20px]">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center w-full px-6 md:px-12 py-6">
          <div className="text-xl font-bold tracking-widest text-[#f5f5f4] font-serif uppercase">WHITE TAIL</div>
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={`pb-1 font-sans text-[0.75rem] uppercase tracking-[0.1rem] transition-all duration-500 ${activeSection === link.id
                  ? "text-[#f5f5f4] border-b border-[#f5f5f4]"
                  : "text-[#a8a29e] border-b border-transparent hover:text-[#e7e5e4]"
                  }`}
                href={`#${link.id}`}
                onClick={() => setActiveSection(link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsContactOpen(true)}>Inquire</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden h-[700px] bg-[#0c0a09]" id="property">
        <div className="max-w-[1440px] mx-auto h-full relative overflow-hidden">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            alt="Cinematic shot of a spring-fed pond at the Austin rural estate"
            src="/images/Pond-1.JPG"
            fill
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-75% to-[#0c0a09]"></div>
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <span className="inline-block mb-6 text-[#a8a29e] font-sans text-[0.75rem] uppercase tracking-[0.3rem]">East of Austin, TX</span>
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-[#f5f5f4] leading-[1.1] mb-10 tracking-tighter">
                White Tail Drive<br /> <span className="italic font-light opacity-90">36.25 acres</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-10 text-stone-100">
                <h2 className="text-xl md:text-2xl font-normal leading-relaxed max-w-2xl">
                  A natural canvas of raw, rural land, with diverse topography and abundant wildlife.
                </h2>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-[#78716c] flex flex-shrink-0 items-center justify-center group-hover:bg-[#f5f5f4] group-hover:text-[#1c1917] transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-200v-560l440 280-440 280Z" /></svg>
                  </div>
                  <span className="uppercase text-[0.7rem] tracking-widest font-semibold">Play Property Film</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description / Intro Section */}
      <section className="py-32 px-6 md:px-12 bg-stone-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <div className="w-full md:w-1/3">
            <SectionHeader
              label="The Property"
              title="The dominant estate is accessed at the end of a private road."
              titleClassName="italic !text-3xl"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="section-copy">
              Situated just 14 miles from Austin-Bergstrom International Airport, and only 19 miles from the Texas Capitol. The property offers a rare balance of privacy and accessibility. The natural preserve allows mature trees to touch the sky.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <PropertyStat value="36.25" label="Total Acres" />
              <PropertyStat value="0.25" label="Acre Pond" />
              <PropertyStat value="∞" label="Privacy" />
            </div>
          </div>
        </div>
      </section>

      {/* Landscape Gallery Section */}
      <section className="bg-stone-950 py-12" id="landscape">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end border-stone-900/50 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-100">Landscape</h2>
              <p className="text-stone-500 font-sans text-[0.7rem] uppercase tracking-[0.3rem] mt-4">Environment</p>
              <p className="text-stone-400 text-lg font-light leading-relaxed mb-10 mt-8 max-w-3xl">
                A natural sanctuary. From pond, to pasture, to wooded thicket, the property is home to diverse elevations and natural landscapes. It is also host to a grand canopy of mature trees where post oaks touch the sky, cedar elms cast dappled shade, and Texas mesquites endure in the sun.
              </p>
            </div>
          </div>
          <div className="relative group">
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory h-[500px] md:h-[650px] hide-scrollbar scroll-smooth"
              id="landscape-carousel"
            >
              <div className="min-w-full h-full snap-start relative">
                <Image className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt="Wide landscape of rolling hills and post oak trees" src="/images/gallery-landscape/Pond-Eagle-Oaks.jpg" fill />
              </div>
              <div className="min-w-full h-full snap-start relative">
                <Image className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt="Lush cedar elm grove in morning mist" src="/images/gallery-landscape/Doe-Meadow-01.jpg" fill />
              </div>
              <div className="min-w-full h-full snap-start relative">
                <Image className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt="Golden hour light through prairie grass" src="/images/gallery-landscape/Prickly-Pear-Pass-01.jpg" fill />
              </div>
              <div className="min-w-full h-full snap-start relative">
                <Image className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt="Close up of a pond at dawn with soft reflections" src="/images/gallery-landscape/Prickly-Pear-Pass-04.jpg" fill />
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="flex flex-col items-center gap-6 mt-12">
            <div className="flex items-center gap-6">
              <button className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-stone-100 hover:text-stone-100 transition-all duration-300" onClick={scrollPrev}>
                <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
              </button>
              <div className="bg-stone-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-stone-800/50 min-w-[120px] text-center flex justify-center">
                <span className="text-stone-100 font-sans text-[0.75rem] uppercase tracking-[0.2rem]">
                  {String(currentSlide).padStart(2, '0')} <span className="text-stone-600 mx-2">/</span> {String(totalSlides).padStart(2, '0')}
                </span>
              </div>
              <button className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-stone-100 hover:text-stone-100 transition-all duration-300" onClick={scrollNext}>
                <ChevronRight className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="md" onClick={() => setIsLandscapeModalOpen(true)}>
                Full Landscape Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Gallery Section */}
      <section className="py-32 px-6 md:px-12 bg-[#121212] overflow-hidden" id="wildlife">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <SectionHeader
                label="Ecology"
                title="Wildlife"
                titleClassName="!mb-0"
              />
              <p className="section-copy">
                Adjacent to hundreds of acres of neighboring ranches, the property is a haven for Texas wildlife. White-tailed deer, turkey, coyote, hogs, bobcat, fox, squirrel, raccoon, rabbit, various birds and other native animals frequently roam the grounds.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <button className="group flex items-center gap-3 text-[#00A3FF] hover:text-white transition-colors duration-300">
                <span className="text-[0.75rem] uppercase tracking-[0.2rem] font-bold">Explore Habitat</span>
                <span className="w-12 h-px bg-[#00A3FF] group-hover:w-16 transition-all duration-500"></span>
              </button>
            </div>
          </div>

          {/* Editorial Grid (Desktop) / Carousel (Mobile) */}
          <div
            ref={wildlifeRef}
            onScroll={handleWildlifeScroll}
            id="wildlife-carousel"
            className="flex w-full h-[550px] md:h-[900px] overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            {/* Grid Page 1 */}
            <div className="contents md:grid md:grid-cols-12 md:grid-rows-6 md:gap-6 md:min-w-full md:snap-center">
              <div className="md:col-span-8 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Buck" src="/images/gallery-wildlife/Buck-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk" src="/images/gallery-wildlife/Hawk-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk soar" src="/images/gallery-wildlife/Hawk-03.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Bird" src="/images/gallery-wildlife/Bird-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Spider" src="/images/gallery-wildlife/Spider-01.jpg" />
              </div>
            </div>

            {/* Grid Page 2 */}
            <div className="contents md:grid md:grid-cols-12 md:grid-rows-6 md:gap-6 md:min-w-full md:snap-center">
              <div className="md:col-span-8 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Buck duplicate" src="/images/gallery-wildlife/Buck-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk duplicate" src="/images/gallery-wildlife/Hawk-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk soar duplicate" src="/images/gallery-wildlife/Hawk-03.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Bird duplicate" src="/images/gallery-wildlife/Bird-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Spider duplicate" src="/images/gallery-wildlife/Spider-01.jpg" />
              </div>
            </div>

             {/* Grid Page 3 */}
             <div className="contents md:grid md:grid-cols-12 md:grid-rows-6 md:gap-6 md:min-w-full md:snap-center">
              <div className="md:col-span-8 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Buck duplicate" src="/images/gallery-wildlife/Buck-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-4 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk duplicate" src="/images/gallery-wildlife/Hawk-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hawk soar duplicate" src="/images/gallery-wildlife/Hawk-03.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Bird duplicate" src="/images/gallery-wildlife/Bird-01.jpg" />
              </div>
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden snap-start md:snap-none h-full md:h-auto min-w-full md:min-w-0">
                <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Spider duplicate" src="/images/gallery-wildlife/Spider-01.jpg" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-12 flex items-center gap-6">
              <button className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-stone-100 hover:text-stone-100 transition-all duration-300" onClick={scrollWildlifePrev}>
                <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
              </button>
              <div className="bg-stone-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-stone-800/50 min-w-[120px] text-center flex justify-center">
                <span className="text-stone-100 font-sans text-[0.75rem] uppercase tracking-[0.2rem]">
                  {String(wildlifeSlide).padStart(2, '0')} <span className="text-stone-600 mx-2">/</span> {String(wildlifeTotal).padStart(2, '0')}
                </span>
              </div>
              <button className="w-14 h-14 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-stone-100 hover:text-stone-100 transition-all duration-300" onClick={scrollWildlifeNext}>
                <ChevronRight className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="md" onClick={() => setIsWildlifeModalOpen(true)}>
                Full Wildlife Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ag Exemption Section */}
      <section className="py-32 bg-stone-950/50" id="ag">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1 relative w-full aspect-[4/5] rounded-sm overflow-hidden group">
              <Image fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt="Graceful whitetail deer in a sun-dappled meadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtiteZ2MsuK8rPpP9XaUGdFGnXAb7wJmBvi8oInrqtoc-h6Dh7jC41X0otKIgxYoZGHrdKO6dQRGDMniTo9HjEX2VmUONGrc_kiciwJcogDRQmQ7hpMAHgpKjCLle8k6Ga8E6DOhNztPKcY3PSM22Xefe45NHR3GkqMHLTwkwTZ206FSWg3rnEWQwuStTOmKTRtrat2sa1R2Vtc95I_V9JjEEoLgcRg2PKA8pfZ8P0-ZwmKvocAF0yCZTtlDMI2H0ArXHuw_AGui9-" />
            </div>
            <div className="order-1 md:order-2">
              <SectionHeader
                label="Agricultural & Wildlife"
                title="Ag Valuation"
                className="!mb-0"
              />
              <p className="section-copy">
                The property has a current Ag valuation with Bastrop County. Native grasses and local biotic factors foster a thriving habitat for cute creatures and predators alike.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 mt-1 flex-shrink-0"><path d="M11 20A7 7 0 0 1 9 9V2a7 7 0 0 1 12 12v5h-5a7 7 0 0 1-5-5Z" /><path d="m11 20 6-6" /></svg>
                  <div>
                    <h4 className="text-stone-200 font-semibold text-sm uppercase tracking-wider">Post Oak Savannah</h4>
                    <p className="text-stone-500 text-sm">A mosaic of scattered post oak woodlands, native grasslands, near the Lost Pines region promoting preservation and restoration.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 mt-1 flex-shrink-0"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>
                  <div>
                    <h4 className="text-stone-200 font-semibold text-sm uppercase tracking-wider">Carrizo-Wilcox Aquifer</h4>
                    <p className="text-stone-500 text-sm">The property sits atop this groundwater system managed by the Lost Pines Groundwater Conservation District.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology / Business Section */}
      <section className="py-32 bg-[#0c0a09] relative overflow-hidden bg-gradient-to-br from-[#00A3FF]/15 to-transparent to-50% border-y border-stone-900/50" id="tech">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <SectionHeader
              label="Economic Epicenter"
              title="East Austin Tech Expansion."
              labelClassName="!text-[#00A3FF] !tracking-[0.4rem] !font-bold"
              titleClassName="!text-4xl md:!text-6xl !font-medium"
            />
            <p className="section-copy !max-w-xl">
              The estate offers excellent proximity to the headquarters or central operations for products and industries of the future.
            </p>
            <div className="grid grid-cols-2 gap-8 border-l border-stone-800 pl-8">
              <div>
                <div className="text-stone-500 font-sans text-[0.6rem] uppercase tracking-widest mb-1">Automotive & AI</div>
                <div className="text-stone-100 font-medium text-lg">Tesla GigaFactory</div>
              </div>
              <div>
                <div className="text-stone-500 font-sans text-[0.6rem] uppercase tracking-widest mb-1">Aerospace</div>
                <div className="text-stone-100 font-medium text-lg">SpaceX / Starlink</div>
              </div>
              <div>
                <div className="text-stone-500 font-sans text-[0.6rem] uppercase tracking-widest mb-1">AI Research</div>
                <div className="text-stone-100 font-medium text-lg">xAI Campus</div>
              </div>
              <div>
                <div className="text-stone-500 font-sans text-[0.6rem] uppercase tracking-widest mb-1">Infrastructure</div>
                <div className="text-stone-100 font-medium text-lg">Bastrop Tech Corridor</div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] group">
            {/* Outline Offset Box */}
            <div className="absolute inset-0 border border-stone-800 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 z-0"></div>

            {/* Masked Image Container */}
            <div className="relative w-full h-full z-10 overflow-hidden bg-stone-900 border border-stone-900 w-full h-full rounded-sm">
              <Image
                fill
                className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                alt="Modern high-tech industrial architecture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkMT9M3MvqG5yEPH9HdNHm3XhuLEhnmRKTMj1JyBvJQyPdeEG9dgbqOLQwTaoklq2tQKncPgDa1bjeuP1tjDCVAq7KnwM5h0QTgq-wsRTfk4HGP4IN4oppiFZCIXccb_pFp36TjFhsTy-D-JIPBf05aiicwVvCtd93g2Ykz11fQBmilBOoITScQVgK-eusZkZhEdg6_3E-LOYgUWIcA3w7E8wQls6rEY0QP8M1GdAQcLJ6CdM1dy6HEoSYRVLg2HAkRD4K_fMYXEr"
              />

              {/* Rocket Icon Overlay */}
              <div className="absolute top-0 right-0 p-8 z-20">
                <div className="w-16 h-16 rounded-full border border-stone-100/20 backdrop-blur-md flex items-center justify-center bg-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-100"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Attractions Section */}
      <section className="py-32 px-6 md:px-12 bg-stone-950" id="attractions">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <SectionHeader
              label="Explore Your Neighborhood"
              title="Privacy & Proximity"
              labelClassName="!tracking-[0.3rem]"
              titleClassName="!text-4xl md:!text-5xl !mb-6"
            />
            <p className="section-copy !max-w-2xl !mx-auto">
              While the silence here is absolute, the energy of Central Texas is always within reach. A world of vibrant experiences awaits within a 20-minute drive.
            </p>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-sm">
              <Image fill className="object-cover hover:scale-105 transition-transform duration-1000" alt="Gourmet dining experience in Austin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Xyx8S9TwB_nf98sjnWsYFpZd3OSjNmwcmJCHOPvmYH4zaB7ssOVsrshmrpYUTOFwLC1ytl2wp3qe34kyUpj-R9pUJhUv0syolmh7L4RtCGa9SKYR-XfQgj3RyGWgVlGUiHe8sKrZWYQYQlCRM6qDXPEcAaaHe8NnPfhFaLc-5c-qPL-nSD8-_qzBNBg9kwJXvs1Hrj2lnSROSeS7zR5zpQRk83fNUSt_YY_2Pevw3W1_9KptMl-6tFqDNyvpktDffD6CHt2tuhlu" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className="text-stone-400 font-sans text-[0.65rem] uppercase tracking-widest mb-2">Gastronomy</span>
                <h4 className="text-2xl font-serif text-stone-100 italic">Chef-Driven Excellence</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-sm">
              <Image fill className="object-cover hover:scale-105 transition-transform duration-1000" alt="High-end shopping district" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBQ-Yr0BhQOJ7MTamjESRtd84KXUKRixs3A-hi44wrp3bB7t2f6KsrgGoeukddoX6182rvVydClCsb7KziFka4dCqcZgdci6X1CxtS3YOc35pfmSppgGzXO88w_lQ-tS6BkiVT_dpVdCnaF-mjR1657Is4w4p_3XvOCIkLTHkDzSyKOG2TCSOBg4Eu1SkQXyyD5OXhXsdwAKoKYfI4vcJg3tdaMChQZGXZ87EJwJz9Jpksdq3VQ1NrSnO-z4EkXl9cYiZsHM59LIHZ" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-stone-400 font-sans text-[0.65rem] uppercase tracking-widest mb-2">Lifestyle</span>
                <h4 className="text-xl font-serif text-stone-100">Curated Retail</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-sm">
              <Image fill className="object-cover hover:scale-105 transition-transform duration-1000" alt="Scenic river views" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWUuXwpL8ao31uPtFaflTn43aNRaBCgxKfPFOPOzdC41sfxd3PqSLEHwikR0lxsZe1l3GeNySCCF_8ad6sfqrc0S5-DbrVIwyrQAKZIqae9uR4WzBRnXwFhZbQMj7AVcCtXl328GnsMbD2DsLYwcBfbSc1RcQxs4yJmDOc8wj5TRXHKFajlB5nGaYU6nouFiF2_YTP1MMucHOkCt9IPWxU4O5G-vM32NQHjTk_Pej5a4Li6CDTrkS9pIC3-H2yr4uKaEDNoCb_TMp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-stone-400 font-sans text-[0.65rem] uppercase tracking-widest mb-2">Nature</span>
                <h4 className="text-xl font-serif text-stone-100">Colorado River Access</h4>
              </div>
            </div>

            <div className="md:col-span-2 relative group overflow-hidden rounded-sm">
              <Image fill className="object-cover hover:scale-105 transition-transform duration-1000" alt="Live music performance in Austin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoIT0VOyrVZWRrFjbKOPg79C_xVGZ6n89ibpJ_Xr_G9Z_CLptt35NJWH1hSZWyhvP05iqXPVUhPiwkmQ9jk2EzaoM0B9hgGoa8gUhlM8vkHAQjG9jaav0O742gxnP4wX_LgtF8aAvTcL-7xCBULLMcl4R1FUEtPGW0WCJgsG7pGQUsaM-DXJzODOzT9RrnPskRUlreOHYU8_G45GDlW2DWAkmlP6o7G9KAbTGwp0my4jISH4PUTlBgrZqDBvG1EgZuNTm7wUgFTi7Y" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className="text-stone-400 font-sans text-[0.65rem] uppercase tracking-widest mb-2">Entertainment</span>
                <h4 className="text-2xl font-serif text-stone-100 italic">World-Class Live Venues</h4>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" size="md">
              Discover the Area
            </Button>
          </div>
        </div>
      </section>

      {/* Map/CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-stone-950 flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <SectionHeader
            label="Private Tour"
            title="Witness the stillness."
            className="text-center"
            labelClassName="!mb-12"
            titleClassName="!text-4xl md:!text-6xl !mb-12"
          />
          <p className="section-copy !text-xl !mb-16">
            We invite qualified buyers to experience the property in person. Guided tours available by appointment only.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button variant="primary" size="lg" className="shadow-2xl" onClick={() => setIsContactOpen(true)}>Inquire</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 w-full border-t border-stone-900/30">
        <div className="flex flex-col items-center px-6 md:px-12 py-16 w-full max-w-screen-2xl mx-auto justify-center">
          <div className="flex flex-col md:flex-row gap-10 items-center text-center">
            <div className="flex flex-wrap justify-center gap-8">
              <a className="text-stone-500 hover:text-stone-300 transition-colors duration-300 font-sans text-[0.75rem] uppercase tracking-[0.1rem]" href="#">Privacy Policy</a>
              <a className="text-stone-500 hover:text-stone-300 transition-colors duration-300 font-sans text-[0.75rem] uppercase tracking-[0.1rem]" href="#">Terms of Service</a>
              <a className="text-stone-500 hover:text-stone-300 transition-colors duration-300 font-sans text-[0.75rem] uppercase tracking-[0.1rem]" href="#">Accessibility</a>
            </div>
            <div className="text-stone-600 font-sans text-[0.7rem] uppercase tracking-[0.1rem]">
              © 2026 All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LandscapeGalleryModal isOpen={isLandscapeModalOpen} onClose={() => setIsLandscapeModalOpen(false)} />
      <WildlifeGalleryModal isOpen={isWildlifeModalOpen} onClose={() => setIsWildlifeModalOpen(false)} />
    </div>
  );
}
