import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "../convex/_generated/api";
import {
  Calendar,
  MapPin,
  Ticket,
  Menu,
  X,
  ChevronDown,
  CheckCircle,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Play,
  Youtube,
} from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Speakers", href: "#speakers" },
  { name: "Schedule", href: "#schedule" },
  { name: "Gallery", href: "#gallery" },
  { name: "Location", href: "#location" },
  { name: "FAQ", href: "#faq" },
];

const SPEAKERS = [
  {
    name: "Yemi Davids",
    role: "Lead Pastor, Global Impact Church",
    image: "/images/speakers/RC-Speaker-Yemi-Davids.jpg",
  },
  {
    name: "Bimbo Davids",
    role: "Lead Pastor, Global Impact Church",
    image: "/images/speakers/RC-Speaker-Bimbo-Davids.jpg",
  },
  {
    name: "Nathaniel Bassey",
    role: "Pastor, Singer, and Worship Leader",
    image: "/images/speakers/RC-Speaker-Nathaniel-Bassey.jpg",
  },
  {
    name: "Joshua Selman",
    role: "Senior Pastor of Koinonia Global",
    image: "/images/speakers/RC-Speakers-Joshua.jpg",
  },
  {
    name: "Bishop Funke Felix-Adejumo",
    role: "Co-founder of Agape Christian Ministries Worldwide",
    image: "/images/speakers/RC-Speakers-Funke.jpg",
  },
  {
    name: "Godman Akinlabi",
    role: "Lead Pastor of The Elevation Church",
    image: "/images/speakers/RC-Speakers-Godman.jpg",
  },
  {
    name: "Lawrence Oyor",
    role: "Senior Pastor of The Davidic Generation Church",
    image: "/images/speakers/RC-Speakers-Lawrance.jpg",
  },
  {
    name: "David Oyedepo Jnr.",
    role: "Resident Pastor of Living Faith Church, Canaanland, Ota",
    image: "/images/speakers/RC-Speakers-Oyedepo-jnr.jpg",
  },
  {
    name: "Michael Orokpo",
    role: "Founder Encounter Jesus Ministries International",
    image: "/images/speakers/RC-Speakers-Orokpo.jpg",
  },
  {
    name: "Mercy Chinwo-Blessed",
    role: "Singer, and Worship Leader",
    image: "/images/speakers/RC-Speaker-Mercy-Chinwo.jpg",
  },

  {
    name: "Chris Ugoh",
    role: "Senior Pastor of The Family House Church",
    image: "/images/speakers/RC-Speakers-Chris.jpg",
  },
  {
    name: "Sola Osunmakinde",
    role: "Senior Pastor of the Household of David",
    image: "/images/speakers/RC-Speakers-Sola.jpg",
  },
   {
    name: "Niyi Eboda",
    role: "Senior Pastor, HarvestHouse Christian Center",
    image: "/images/speakers/RC-Speakers-Niyi.jpg",
  },
   {
    name: "Kunle Soriyan",
    role: "Nigerian polymath, futurist, and leadership strategist",
    image: "/images/speakers/RC-Speaker-Kunle-Soriyian.jpg",
  },
   {
    name: "Kaestrings",
    role: "Singer, and Worship Leader",
    image: "/images/speakers/RC-Speaker-KStrings.jpg",
  },
];

type ScheduleEvent = {
  time: string;
  title: string;
  tag?: string;
};

type ScheduleDay = {
  day: string;
  date: string;
  label: string;
  events: ScheduleEvent[];
};

const SCHEDULE: ScheduleDay[] = [
  {
    day: "Wednesday",
    date: "1 July",
    label: "Opening Night",
    events: [{ time: "5:30 PM", title: "Opening Night Service" }],
  },
  {
    day: "Thursday – Saturday",
    date: "2 – 4 July",
    label: "Main Conference",
    events: [
      { time: "9:00 AM", title: "Morning Sessions" },
      {
        time: "1:30 PM",
        title: "Afternoon Sessions",
        tag: "Youth Conference",
      },
      { time: "5:30 PM", title: "Evening Sessions" },
    ],
  },
  {
    day: "Sunday",
    date: "5 July",
    label: "Sunday Services",
    events: [
      { time: "7:15 AM", title: "First Service" },
      { time: "9:00 AM", title: "Second Service" },
    ],
  },
];

const FAQS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What date is the Recharge Conference 2026?",
    answer: (
      <p>
        RC 2026 holds from{" "}
        <strong className="text-slate-900">
          Wednesday, July 1st to Sunday, July 5th, 2026
        </strong>
        .
      </p>
    ),
  },
  {
    question: "What is the theme for Recharge Conference 2026?",
    answer: (
      <p>
        This year's theme is{" "}
        <strong className="text-slate-900">"Kingdom Greatness."</strong>
      </p>
    ),
  },
  {
    question: "Where is the venue for Recharge Conference 2026?",
    answer: (
      <p>
        Global Impact Church
        <br />
        The Goodland, Ifako Bus Stop, Ogudu/Oworonshoki Expressway.
      </p>
    ),
  },
  {
    question: "What are the times for the sessions?",
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong className="text-slate-900">Wednesday (July 1st):</strong>{" "}
          5:30 PM only (Opening Night Service)
        </li>
        <li>
          <strong className="text-slate-900">
            Thursday – Saturday (July 2nd – 4th):
          </strong>
          <ul className="list-[circle] pl-5 mt-2 space-y-1">
            <li>Morning Sessions — 9:00 AM</li>
            <li>Afternoon Sessions (Youth Conference) — 1:30 PM</li>
            <li>Evening Sessions — 5:30 PM</li>
          </ul>
        </li>
        <li>
          <strong className="text-slate-900">Sunday (July 5th):</strong> 7:15
          AM | 9:00 AM
        </li>
      </ul>
    ),
  },
  {
    question: "Is RC free, and is pre-registration required?",
    answer: (
      <p>
        Attendance is free, we encourage{" "}
        <strong className="text-slate-900">
          registrations so that you can get reminders and updates about the
          conference.
        </strong>
      </p>
    ),
  },
  {
    question:
      "Are there any specialized sessions in Recharge Conference 2026?",
    answer: (
      <p>
        Yes. All afternoon sessions from Thursday to Saturday have been
        specialized and dedicated to the{" "}
        <strong className="text-slate-900">Youth Conference</strong>.
      </p>
    ),
  },
  {
    question: "Will I be able to get things to buy at RC 2026?",
    answer: "Yes. Food vendors will be available throughout the conference.",
  },
  {
    question: "Will parking space be available?",
    answer:
      "Yes. Parking will be available within the church premises and surrounding areas.",
  },
  {
    question: "Will childcare be available?",
    answer: "Yes. Childcare services will be provided at every session.",
  },
  {
    question: "Will the conference be streamed live?",
    answer: (
      <div className="space-y-3">
        <p>Yes. You can join via:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Facebook</li>
          <li>Instagram</li>
          <li>YouTube</li>
          <li>Mixlr</li>
          <li>
            Global Impact website:{" "}
            <a
              href="https://globalimpactng.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
            >
              globalimpactng.org
            </a>
          </li>
          <li>
            TikTok —{" "}
            <a
              href="https://www.tiktok.com/@yemidavidsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
            >
              yemidavidsofficial
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How can I follow the events on social media?",
    answer: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>
          Instagram:{" "}
          <a
            href="https://instagram.com/globalimpactng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            @globalimpactng
          </a>{" "}
          /{" "}
          <a
            href="https://instagram.com/rechargegic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            @rechargegic
          </a>
        </li>
        <li>
          YouTube:{" "}
          <a
            href="https://youtube.com/@globalimpactTV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            @globalimpactTV
          </a>
        </li>
        <li>
          Facebook:{" "}
          <a
            href="https://facebook.com/globalimpactng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            Global Impact NG
          </a>
        </li>
        <li>
          X —{" "}
          <a
            href="https://x.com/Global_ImpactNG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            Global_ImpactNG
          </a>
        </li>
        <li>
          TikTok —{" "}
          <a
            href="https://www.tiktok.com/@global.impact.church"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dd7b30] underline hover:text-[#b86a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
          >
            global.impact.church
          </a>
        </li>
      </ul>
    ),
  },
];

// Highlights gallery — videos from Global Impact Church TV
// (https://www.youtube.com/@GlobalImpactChurchTV). The first three entries
// are verified live videos tagged "Recharge Conference 2022" on the channel.
// To replace a "Coming Soon" tile with a real video, copy the 11-character
// "v" parameter from any YouTube URL (e.g. for
// https://www.youtube.com/watch?v=dQw4w9WgXcQ the id is "dQw4w9WgXcQ") and
// set `available: true`.
const GLOBAL_IMPACT_CHANNEL_URL =
  "https://www.youtube.com/@GlobalImpactChurchTV";

type GalleryVideo = {
  id: string;
  title: string;
  speaker?: string;
  available: boolean;
};

const VIDEO_GALLERY: GalleryVideo[] = [
  {
    id: "ICPR9LoJ3O0",
    title: "Spontaneous Worship & Praise",
    speaker: "Chioma Jesus",
    available: true,
  },
  {
    id: "UfDN6ch7Oh4",
    title: "Extraordinary Praise & Worship",
    speaker: "Judikay",
    available: true,
  },
  {
    id: "cDrcGItNevM",
    title: "Building a Strong Family in God's Covenant",
    speaker: "Pastor Yemi Davids",
    available: true,
  },
  {
    id: "COMING_SOON_04",
    title: "Recharge 2026 Opening Night",
    available: false,
  },
  {
    id: "COMING_SOON_05",
    title: "Youth Conference Highlights",
    available: false,
  },
  {
    id: "COMING_SOON_06",
    title: "Sunday Services Recap",
    available: false,
  },
];

// Placeholder partner hotels near The Goodland (Ogudu / Oworoshoki, Lagos).
// Update names, contact numbers, and booking links with confirmed details.
const HOTELS = [
  {
    name: "Goodland Suites",
    type: "Official Partner Hotel",
    distance: "On Venue Grounds",
    rateType: "Block Rate",
    bookingLink: "#",
    isPrimary: true,
    amenities: ["Free Wi-Fi", "Breakfast Included", "Shuttle to Sessions"],
    contactNumber: "+234 (0) 800 000 0001",
  },
  {
    name: "Ogudu GRA Residences",
    type: "Recommended Hotel",
    distance: "1.5 km from Venue",
    rateType: "Conference Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Free Wi-Fi", "Restaurant", "24/7 Power"],
    contactNumber: "+234 (0) 800 000 0002",
  },
  {
    name: "Oworoshoki Express Inn",
    type: "Overflow Hotel",
    distance: "3 km from Venue",
    rateType: "Regular Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Free Parking", "Continental Breakfast", "Airport Pickup"],
    contactNumber: "+234 (0) 800 000 0003",
  },
  {
    name: "Maryland Boutique Hotel",
    type: "Premium Hotel",
    distance: "6 km from Venue",
    rateType: "Regular Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Spa", "Pool", "Fine Dining", "Valet Parking"],
    contactNumber: "+234 (0) 800 000 0004",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172B] border-b border-[#0F172B] shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/images/RC2026-logo.png"
              alt="Recharge Conference 2026"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-slate-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              className="bg-[#dd7b30] text-white px-6 py-2 text-xs font-bold uppercase tracking-tighter hover:bg-[#f28110] transition-colors"
            >
              Register Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F172B] border-t border-[#0F172B] overflow-hidden"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col p-4 gap-4 font-mono uppercase text-xs">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="p-2 font-bold text-slate-300 hover:text-indigo-600 border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setIsOpen(false)}
                className="bg-[#dd7b30] text-white px-6 py-3 text-center font-bold tracking-tighter mt-2 border border-[#dd7b30] hover:bg-[#f28110]"
              >
                REGISTER NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const targetDate = new Date("2026-07-01T09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="pt-16 text-white relative overflow-hidden flex flex-col justify-center min-h-screen"
      style={{
        backgroundImage: "url('/images/rc-banner-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#dd7b30]/20 rounded-full -mr-40 -mt-40 blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <p className="text-[#dd7b30] font-mono text-sm md:text-base uppercase tracking-[0.3em] mb-5">
            Renew. Revive. Restore.
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight mb-10 text-white">
            Kingdom
            <br />
            <span className="text-[#dd7b30]">Greatness</span>
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-center text-base md:text-[15px] uppercase font-mono border-y-2 border-[#dd7b30] py-4 mb-10">
            <div className="flex items-center gap-2">
              <span className="text-[#dd7b30]">Date:</span>Wednesday, July 1st
              - Sunday, July 5th, 2026
            </div>
            <div className="hidden sm:block text-[#dd7b30]">/</div>
            <div className="flex items-center gap-2">
              <span className="text-[#dd7b30]">Location:</span> The
              Goodland - Ifako Bus Stop, Ogudu, <br />
              Oworoshoki Expressway, Lagos{" "}
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 font-mono">
            <div className="border border-[#dd7b30]/30 bg-[#dd7b30] backdrop-blur-sm p-5 w-28 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">
                {timeLeft.days}
              </span>
              <span className="text-xs uppercase text-slate-100 tracking-widest mt-1">
                Days
              </span>
            </div>
            <div className="border border-[#dd7b30]/30 bg-[#dd7b30] backdrop-blur-sm p-5 w-28 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">
                {timeLeft.hours}
              </span>
              <span className="text-xs uppercase text-slate-100 tracking-widest mt-1">
                Hours
              </span>
            </div>
            <div className="border border-indigo-400/30 bg-[#dd7b30] backdrop-blur-sm p-5 w-28 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">
                {timeLeft.minutes}
              </span>
              <span className="text-xs uppercase text-slate-100 tracking-widest mt-1">
                Mins
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#register"
              className="bg-white text-[#dd7b30] px-10 py-5 text-sm md:text-base font-bold uppercase tracking-tighter hover:bg-slate-100 transition-colors border border-white"
            >
              Register Now
            </a>
            <a
              href="#about"
              className="border border-[#dd7b30] text-[#dd7b30] px-10 py-5 text-sm md:text-base font-bold uppercase tracking-tighter hover:bg-[#dd7b30] hover:text-white transition-colors"
            >
              About RC 2026
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-4 border-l-2 border-[#dd7b30] pl-2">
              About Recharge Conference
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-900 leading-none mb-6 tracking-tight">
              A Winning
              <br />
              Second Half
            </h3>
            <p className="text-sm font-mono text-slate-600 mb-6 leading-relaxed">
              Recharge Conference is Global Impact Church's annual mid-year
              gathering for every believer and leader who knows the year isn't
              over yet. For five powerful days, you will be immersed in moments
              designed to reignite your spirit, sharpen your leadership, and
              reposition you for a stronger second half of the year.
            </p>
            <p className="text-sm font-mono text-slate-600 mb-6 leading-relaxed">
              By mid year, momentum slows, vision blurs, and fire dims.
              Recharge exists for that exact moment, to pull you back to
              clarity, purpose, and power. Each day is intentionally crafted to
              move you through spiritual renewal and leadership sharpening, so
              you don't just finish the year, you finish strong. You enter the
              second half not depleted, but empowered.
            </p>
            <p className="text-sm font-mono text-slate-600 mb-8 leading-relaxed">
              Convened by Pastor Yemi Davids and Pastor Bimbo Davids, Global
              Lead Pastors of Global Impact Church, the unique voices God has
              graced to lead this charge. One focus: a winning second half.
              Come ready to be refuelled.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
              <div>
                <div className="text-5xl font-black text-[#dd7b30] mb-1 leading-none">
                  05
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Powerful Days
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-[#dd7b30] mb-1 leading-none">
                  01
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Focus: A Winning Second Half
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-4/5 bg-slate-200 border border-slate-300 relative overflow-hidden">
              <img
                src="https://picsum.photos/seed/aboutus/800/1000"
                alt="Worship moment"
                className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-8 border-white/20 mix-blend-overlay"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[#dd7b30] text-white p-6 border border-[#dd7b30] flex flex-col gap-2 max-w-sm">
              <div className="flex items-center gap-2 mb-2 border-b border-[#dd7b30] pb-2">
                <MapPin className="text-white size={20}" />
                <h4 className="text-xs font-bold uppercase tracking-widest">
                  Global Impact Church
                </h4>
              </div>
              <p className="text-xs font-mono text-white">
                The Goodland - Ifako Bus Stop, Ogudu, <br />
                Oworoshoki Expressway, Lagos{" "}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(1); // Default to 1 for mobile first

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerScreen(3);
      else if (window.innerWidth >= 640) setItemsPerScreen(2);
      else setItemsPerScreen(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, SPEAKERS.length - itemsPerScreen);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

  return (
    <section id="speakers" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 border-b border-slate-900 pb-4 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Meet the
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-900 leading-none tracking-tight">
              Speakers
            </h3>
          </div>
          <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
            <span
              className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest"
              aria-live="polite"
            >
              0{currentIndex + 1} / 0{maxIndex + 1}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous speakers"
                className="w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
              >
                <ChevronLeft
                  size={18}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next speakers"
                className="w-10 h-10 border border-slate-900 bg-slate-900 text-white flex items-center justify-center hover:bg-[#dd7b30] hover:border-[#dd7b30] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1"
              >
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden -mx-3"
          role="region"
          aria-roledescription="carousel"
          aria-label="Conference speakers"
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / itemsPerScreen)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {SPEAKERS.map((speaker, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${SPEAKERS.length}`}
              >
                <div className="bg-slate-50 border border-slate-200 flex flex-col hover:border-[#dd7b30] transition-colors group h-full">
                  <div className="aspect-square bg-slate-200 border-b border-slate-200 relative overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                        {speaker.name}
                      </h4>
                      <span className="text-[10px] font-bold text-white uppercase bg-[#dd7b30] px-2 py-1 tracking-widest border border-[#dd7b30] shrink-0 ml-2">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 uppercase mb-4 border-b border-slate-200 pb-4">
                      {speaker.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section
      id="schedule"
      className="py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
            Itinerary
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-900 leading-none tracking-tight">
            Conference Schedule
          </h3>
          <p className="mt-4 font-mono text-xs text-slate-500 uppercase tracking-widest">
            Wednesday, 1st - Sunday, 5th July 2026 • The Goodland, Ogudu, Lagos
          </p>
        </div>

        <ol className="border-l-2 border-[#dd7b30]/30 pl-6 sm:pl-10 space-y-10">
          {SCHEDULE.map((day, idx) => (
            <motion.li
              key={day.day}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[34px] sm:-left-[50px] top-1 w-4 h-4 bg-[#dd7b30] border-4 border-slate-50 rounded-full"
              ></span>

              <div className="bg-white border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#dd7b30]">
                      {day.label}
                    </p>
                    <h4 className="text-lg sm:text-xl font-black uppercase text-slate-900 tracking-tight">
                      {day.day}
                    </h4>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-widest text-slate-700 border border-slate-300 bg-white px-3 py-1">
                    {day.date}
                  </span>
                </div>

                <ul className="divide-y divide-slate-100">
                  {day.events.map((evt) => (
                    <li
                      key={`${day.day}-${evt.title}-${evt.time}`}
                      className="px-6 py-4 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-6 items-baseline font-mono text-[12px]"
                    >
                      <span className="text-[#dd7b30] font-bold tracking-wider">
                        {evt.time}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 uppercase font-bold text-slate-900 tracking-tight">
                        {evt.title}
                        {evt.tag && (
                          <span className="inline-block px-2 py-0.5 border border-[#dd7b30] text-[9px] text-[#dd7b30] leading-none tracking-widest">
                            {evt.tag}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Gallery() {
  const playableVideos = VIDEO_GALLERY.filter((v) => v.available);
  const [selectedPlayableIndex, setSelectedPlayableIndex] = useState<
    number | null
  >(null);

  const openVideo = (video: GalleryVideo) => {
    if (!video.available) return;
    const idx = playableVideos.findIndex((v) => v.id === video.id);
    if (idx !== -1) setSelectedPlayableIndex(idx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPlayableIndex !== null) {
      setSelectedPlayableIndex(
        (selectedPlayableIndex + 1) % playableVideos.length,
      );
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPlayableIndex !== null) {
      setSelectedPlayableIndex(
        (selectedPlayableIndex - 1 + playableVideos.length) %
          playableVideos.length,
      );
    }
  };

  useEffect(() => {
    if (selectedPlayableIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPlayableIndex(null);
      if (e.key === "ArrowRight")
        setSelectedPlayableIndex(
          (i) => ((i ?? 0) + 1) % playableVideos.length,
        );
      if (e.key === "ArrowLeft")
        setSelectedPlayableIndex(
          (i) =>
            ((i ?? 0) - 1 + playableVideos.length) % playableVideos.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPlayableIndex, playableVideos.length]);

  const activeVideo =
    selectedPlayableIndex !== null
      ? playableVideos[selectedPlayableIndex]
      : null;

  return (
    <section
      id="gallery"
      className="py-24 bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Past Events
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight">
              Recharge Highlights
            </h3>
          </div>
          <a
            href={GLOBAL_IMPACT_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto border-2 border-[#dd7b30] text-[#dd7b30] px-5 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-[#dd7b30] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <Youtube size={16} />
            Watch More on YouTube
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VIDEO_GALLERY.map((video, idx) => {
            const isWide = idx === 0 || idx === 3;
            const tileSize = isWide
              ? "col-span-2 aspect-video"
              : "col-span-2 md:col-span-1 aspect-square";

            if (!video.available) {
              return (
                <motion.div
                  key={`${video.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`border border-dashed border-slate-700 bg-slate-800/40 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 ${tileSize}`}
                  aria-label={`Coming soon: ${video.title}`}
                >
                  <span className="absolute top-4 left-4 border border-white/10 bg-black/40 backdrop-blur-sm px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-slate-400">
                    Coming Soon
                  </span>
                  <Youtube size={28} className="text-slate-600 mb-3" />
                  <p className="font-bold uppercase text-xs sm:text-sm tracking-tight text-slate-300 line-clamp-2">
                    {video.title}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-2">
                    Highlights to be added
                  </p>
                </motion.div>
              );
            }

            return (
              <motion.button
                type="button"
                key={`${video.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => openVideo(video)}
                aria-label={`Play video: ${video.title}${
                  video.speaker ? ` by ${video.speaker}` : ""
                }`}
                className={`border border-slate-700 bg-slate-800 overflow-hidden relative group cursor-pointer text-left ${tileSize} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]`}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallback !== "1") {
                      img.dataset.fallback = "1";
                      img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    } else {
                      img.style.display = "none";
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none"
                />

                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 border border-white/20 bg-black/50 backdrop-blur-sm px-2 py-1 text-[9px] font-mono uppercase tracking-widest group-hover:bg-[#dd7b30] transition-colors"
                >
                  Highlight 0{idx + 1}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="w-14 h-14 md:w-16 md:h-16 border-2 border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-full group-hover:bg-[#dd7b30] group-hover:border-[#dd7b30] transition-colors">
                    <Play size={24} className="text-white translate-x-0.5" />
                  </span>
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  {video.speaker && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#dd7b30] mb-1">
                      {video.speaker}
                    </p>
                  )}
                  <p className="font-bold uppercase text-xs sm:text-sm tracking-tight line-clamp-2 text-white">
                    {video.title}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && selectedPlayableIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Video: ${activeVideo.title}`}
          >
            {/* Overlay click handler */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedPlayableIndex(null)}
            />

            <button
              onClick={() => setSelectedPlayableIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-[#dd7b30] transition-colors z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video z-10">
              <motion.div
                key={activeVideo.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full bg-black border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </motion.div>

              {playableVideos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous video"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#dd7b30] text-white p-3 rounded-full backdrop-blur-md transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next video"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#dd7b30] text-white p-3 rounded-full backdrop-blur-md transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 font-mono text-xs uppercase tracking-widest text-white border border-white/20 rounded-full whitespace-nowrap"
                aria-live="polite"
              >
                {selectedPlayableIndex + 1} / {playableVideos.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

type AttendeeType =
  | "General Attendee"
  | "Ministry Leader"
  | "Worship Team"
  | "Volunteer";
type ChildcareOption = "No" | "Yes";

const VOLUNTEER_DEPARTMENTS = [
  "Ushering & Welcome",
  "Registration & Check-in",
  "Media & Technical",
  "Worship & Music",
  "Hospitality & Catering",
  "Children's Ministry",
  "Security & Logistics",
  "Prayer & Counseling",
  "Sanitation",
  "Other",
] as const;

function RegistrationAndHotel() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [currentHotelPage, setCurrentHotelPage] = useState(0);
  const [expandedHotelName, setExpandedHotelName] = useState<string | null>(
    null,
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [attendeeType, setAttendeeType] =
    useState<AttendeeType>("General Attendee");
  const [department, setDepartment] = useState("");
  const [childcare, setChildcare] = useState<ChildcareOption>("No");

  const hasConvex = Boolean(import.meta.env.VITE_CONVEX_URL);
  const register = useMutation(api.registrations.register);
  const registeredCount = useQuery(
    api.registrations.count,
    hasConvex ? {} : "skip",
  );

  const itemsPerPage = 2;
  const totalHotelPages = Math.ceil(HOTELS.length / itemsPerPage);

  const handleHotelNext = () => {
    setCurrentHotelPage((p) => (p + 1) % totalHotelPages);
    setExpandedHotelName(null);
  };
  const handleHotelPrev = () => {
    setCurrentHotelPage((p) => (p - 1 + totalHotelPages) % totalHotelPages);
    setExpandedHotelName(null);
  };

  const displayedHotels = HOTELS.slice(
    currentHotelPage * itemsPerPage,
    (currentHotelPage + 1) * itemsPerPage,
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === "submitting") return;
    setFormError(null);
    setFormStatus("submitting");
    const formEl = e.target as HTMLFormElement;

    const resetAfterSuccess = () => {
      setFormStatus("idle");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setAttendeeType("General Attendee");
      setDepartment("");
      setChildcare("No");
      formEl.reset();
    };

    if (!hasConvex) {
      // Convex isn't configured yet — fall back to the original mock flow so
      // the site stays usable while the backend is being provisioned.
      setFormStatus("success");
      setTimeout(resetAfterSuccess, 8000);
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        phone,
        organization: organization.trim() ? organization : undefined,
        attendeeType,
        department:
          attendeeType === "Volunteer" && department.trim()
            ? department
            : undefined,
        childcare,
      });
      setFormStatus("success");
      setTimeout(resetAfterSuccess, 8000); // Time to download the badge
    } catch (err) {
      const message =
        err instanceof ConvexError &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Something went wrong. Please try again.";
      setFormError(message);
      setFormStatus("idle");
    }
  };

  const downloadBadge = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderBadge = (logo: HTMLImageElement | null) => {
      // Background
      ctx.fillStyle = "#0f172a"; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border
      ctx.strokeStyle = "#4f46e5"; // indigo-600
      ctx.lineWidth = 20;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      ctx.textAlign = "center";

      // Header — Recharge logo (replaces the old "RECHARGE" wordmark)
      if (logo) {
        const logoWidth = 360;
        const logoHeight = logoWidth * (logo.height / logo.width);
        ctx.drawImage(
          logo,
          (canvas.width - logoWidth) / 2,
          200 - logoHeight / 2,
          logoWidth,
          logoHeight,
        );
      } else {
        // Fallback if the logo can't be loaded
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 50px Inter, sans-serif";
        ctx.fillText("RECHARGE", canvas.width / 2, 200);
      }

      // Divider
      ctx.strokeStyle = "#334155"; // slate-700
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 300);
      ctx.lineTo(500, 300);
      ctx.stroke();

      // Attendee tag
      ctx.fillStyle = "#4f46e5";
      ctx.font = "bold 24px monospace";
      ctx.fillText("ATTENDEE", canvas.width / 2, 380);

      // Name
      const fullName =
        `${firstName} ${lastName}`.trim().toUpperCase() || "GUEST";

      // Auto-scale text to fit width
      let fontSize = 64;
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      while (ctx.measureText(fullName).width > 500 && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillText(fullName, canvas.width / 2, 480);

      // Dates
      ctx.fillStyle = "#94a3b8"; // slate-400
      ctx.font = "15px monospace";
      ctx.fillText("JULY 1st - 5th, 2026", canvas.width / 2, 650);

      // Location — word-wrapped so it stays inside the badge box
      const address =
        "THE GOODLAND, IFAKO BUS-STOP, OGUDU OWOROSHOKI EXPRESSWAY, LAGOS";
      ctx.font = "14px monospace";
      const maxWidth = 480;
      const words = address.split(" ");
      const lines: string[] = [];
      let current = "";
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (ctx.measureText(candidate).width > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = candidate;
        }
      }
      if (current) lines.push(current);
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 685 + i * 22);
      });

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Recharge_Badge_${firstName || "Guest"}.png`;
      a.click();
    };

    const logo = new Image();
    logo.onload = () => renderBadge(logo);
    logo.onerror = () => renderBadge(null);
    logo.src = "/images/RC2026-logo.png";
  };

  const toggleHotelDetails = (name: string) => {
    setExpandedHotelName((prev) => (prev === name ? null : name));
  };

  return (
    <section id="register" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Join Us
            </h2>
            <h3 className="text-4xl font-black uppercase text-slate-900 leading-none tracking-tight mb-6">
              Reserve Your Seat
            </h3>
            <p className="text-sm font-mono text-slate-600 mb-6 leading-relaxed">
              Registration is completely free, but space is limited. Please let
              us know you're coming so we can prepare for you!
            </p>

            {hasConvex && (
              <div
                className="mb-10 inline-flex items-center gap-3 self-start border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-700"
                aria-live="polite"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#dd7b30] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#dd7b30]"></span>
                </span>
                <span>
                  {registeredCount === undefined
                    ? "Loading attendees…"
                    : `${registeredCount.toLocaleString()} ${
                        registeredCount === 1 ? "person" : "people"
                      } registered`}
                </span>
              </div>
            )}

            <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between mt-auto">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#dd7b30] flex items-center gap-2">
                    <MapPin size={14} /> Accommodation
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={handleHotelPrev}
                      aria-label="Previous hotels"
                      className="p-1 border border-slate-200 hover:bg-slate-100 text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={handleHotelNext}
                      aria-label="Next hotels"
                      className="p-1 border border-slate-200 hover:bg-slate-100 text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-4 font-mono text-[11px] min-h-35">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHotelPage}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {displayedHotels.map((hotel, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div className="mb-2 sm:mb-0">
                              <p className="font-bold text-slate-900 uppercase">
                                {hotel.name}
                              </p>
                              <p className="text-slate-500">
                                {hotel.type}{" "}
                                {hotel.distance ? `• ${hotel.distance}` : ""}
                              </p>
                              <button
                                onClick={() => toggleHotelDetails(hotel.name)}
                                aria-expanded={expandedHotelName === hotel.name}
                                aria-controls={`hotel-details-${idx}`}
                                className="text-[#dd7b30] mt-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1 flex items-center gap-1 font-bold text-[10px] uppercase tracking-widest rounded-sm"
                              >
                                View Details{" "}
                                {expandedHotelName === hotel.name ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                )}
                              </button>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                              <span
                                className={`font-bold border px-2 py-0.5 ${hotel.isPrimary ? "text-[#dd7b30] border-[#dd7b30] bg-white" : "text-slate-500 border-slate-200 bg-slate-100"}`}
                              >
                                {hotel.rateType}
                              </span>
                              <a
                                href={hotel.bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-slate-900 px-3 py-1.5 text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-colors w-full sm:w-auto text-center inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                              >
                                Book Now
                              </a>
                            </div>
                          </div>
                          <AnimatePresence>
                            {expandedHotelName === hotel.name && (
                              <motion.div
                                id={`hotel-details-${idx}`}
                                role="region"
                                aria-label={`${hotel.name} details`}
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  marginTop: 12,
                                }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden bg-white border border-slate-200 p-3 flex flex-col gap-2 rounded-sm"
                              >
                                <p className="text-slate-600">
                                  <span className="font-bold text-slate-900">
                                    Amenities:
                                  </span>{" "}
                                  {hotel.amenities.join(", ")}
                                </p>
                                <p className="text-slate-600">
                                  <span className="font-bold text-slate-900">
                                    Contact:
                                  </span>{" "}
                                  {hotel.contactNumber}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 p-8 shadow-none h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 border-l border-b border-slate-100 flex items-center justify-center -mr-16 -mt-16 rotate-45 z-0"></div>

              <div className="relative z-10 h-full">
                {formStatus === "success" ? (
                  <div className="h-full min-h-100 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 bg-[#dd7b30] text-white flex items-center justify-center">
                        <CheckCircle size={32} />
                      </div>
                    </motion.div>
                    <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                      You're Registered!
                    </h4>
                    <p className="text-sm font-mono text-slate-600 max-w-sm mb-6">
                      We're so excited to have you join us. Check your email for
                      further details and your digital badge.
                    </p>
                    <button
                      type="button"
                      onClick={downloadBadge}
                      className="border-2 border-[#dd7b30] bg-[#dd7b30] text-white px-6 py-3 text-xs font-black uppercase tracking-tighter hover:bg-transparent hover:text-[#dd7b30] transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={16} /> Download Event Badge
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleRegister}
                    className="space-y-6 flex flex-col h-full justify-center"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="regFirstName"
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                          First Name *
                        </label>
                        <input
                          id="regFirstName"
                          required
                          type="text"
                          placeholder="John"
                          className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="regLastName"
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                          Last Name *
                        </label>
                        <input
                          id="regLastName"
                          required
                          type="text"
                          placeholder="Doe"
                          className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="regPhone"
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="regPhone"
                        required
                        type="tel"
                        placeholder="08012345678"
                        className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="regEmail"
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                      >
                        Email Address *
                      </label>
                      <input
                        id="regEmail"
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="regOrg"
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                      >
                        Church/Organization
                      </label>
                      <input
                        id="regOrg"
                        type="text"
                        placeholder="City Church"
                        className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="regType"
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                          Attendee Type
                        </label>
                        <select
                          id="regType"
                          className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                          value={attendeeType}
                          onChange={(e) => {
                            const next = e.target.value as AttendeeType;
                            setAttendeeType(next);
                            if (next !== "Volunteer") setDepartment("");
                          }}
                        >
                          <option>General Attendee</option>
                          <option>Ministry Leader</option>
                          <option>Worship Team</option>
                          <option>Volunteer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="regChildcare"
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                          Childcare
                        </label>
                        <select
                          id="regChildcare"
                          className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                          value={childcare}
                          onChange={(e) =>
                            setChildcare(e.target.value as ChildcareOption)
                          }
                        >
                          <option>No</option>
                          <option>Yes</option>
                        </select>
                      </div>
                    </div>

                    {attendeeType === "Volunteer" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="regDepartment"
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                          Volunteer Department *
                        </label>
                        <select
                          id="regDepartment"
                          required
                          className="bg-slate-50 w-full focus:outline-none focus:ring-2 focus:ring-[#dd7b30] focus:border-transparent px-3 py-2"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        >
                          <option value="" disabled>
                            Select a department…
                          </option>
                          {VOLUNTEER_DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {formError && (
                      <div
                        role="alert"
                        className="border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-xs font-mono"
                      >
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting"
                        ? "Reserving Your Seat…"
                        : "Complete Registration"}{" "}
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAndContact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactStatus, setContactStatus] = useState<"idle" | "sent">("idle");

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sent");
    setTimeout(() => {
      setContactStatus("idle");
      (e.target as HTMLFormElement).reset();
    }, 4000);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ Area */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Answers
            </h2>
            <h3 className="text-4xl font-black uppercase text-slate-900 leading-none tracking-tight mb-10">
              Frequently Asked Questions
            </h3>

            <div className="border border-slate-200 bg-white">
              {FAQS.map((faq, idx) => {
                const isExpanded = openFaq === idx;
                const contentId = `faq-content-${idx}`;
                const buttonId = `faq-button-${idx}`;
                return (
                  <div
                    key={idx}
                    className="border-b border-slate-200 last:border-0"
                  >
                    <button
                      id={buttonId}
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      onClick={() => setOpenFaq(isExpanded ? null : idx)}
                      className="flex items-center justify-between w-full p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-inset"
                    >
                      <span className="font-bold uppercase text-sm">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#dd7b30]"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={contentId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50"
                        >
                          <div className="p-6 pt-0 font-mono text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-2">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Area */}
          <div
            id="location"
            className="bg-[#dd7b30] text-white border border-[#dd7b30] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6 border-b border-[#dd7b30] pb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  Direct Inquiry
                </h3>
                <svg
                  className="w-6 h-6 text-[#dd7b30]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <form onSubmit={handleContact} className="space-y-4 mb-8">
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    className="bg-indigo-950/50 border-[#dd7b30] text-white placeholder-[#dd7b30] focus:border-[#dd7b30] focus:outline-none focus:ring-1 focus:ring-white w-full px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    className="bg-indigo-950/50 border-[#dd7b30] text-white placeholder-[#dd7b30] focus:border-[#dd7b30] focus:outline-none focus:ring-1 focus:ring-white w-full px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Your Message"
                    aria-label="Your Message"
                    className="bg-indigo-950/50 border-[#dd7b30] text-white placeholder-[#dd7b30] focus:border-[#dd7b30] focus:outline-none focus:ring-1 focus:ring-white resize-none w-full px-3 py-2 text-xs"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="border-2 border-white text-white px-6 py-3 text-xs font-bold uppercase tracking-tighter hover:bg-white hover:text-[#dd7b30] transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-900"
                >
                  {contactStatus === "sent" ? "Message Sent" : "Submit"}
                </button>
              </form>
            </div>

            {/* Venue Map */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/30">
                <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} /> Find Us
                </h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Goodland+Ifako+Bus+Stop+Ogudu+Oworoshoki+Expressway+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-widest text-white underline hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get Directions →
                </a>
              </div>
              <div className="aspect-video border-2 border-white/30 overflow-hidden bg-indigo-950/30">
                <iframe
                  src="https://www.google.com/maps?q=The+Goodland+Ifako+Bus+Stop+Ogudu+Oworoshoki+Expressway+Lagos&output=embed"
                  title="The Goodland venue location on Google Maps"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ border: 0, display: "block" }}
                />
              </div>
            </div>

            <div className="bg-indigo-950/50 border border-[#dd7b30] p-4 font-mono text-[10px] text-white">
              <p className="font-bold text-white uppercase mb-1">
                Venue Information
              </p>
              <p>
                The Goodland, Ifako Bus Stop, Ogudu, Oworoshoki Expressway,
                Lagos
              </p>
              <p className="mt-2 text-white">info@globalimpactng.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0f172b] border-t border-slate-200">
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/images/RC2026-logo.png"
              alt="Recharge Conference 2026"
              className="h-10 w-auto"
            />
          </a>
          <div className="text-[10px] text-white font-mono uppercase tracking-widest text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()}</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>

        <div className="p-8 flex items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white">
          <a href="#" className="hover:text-[#dd7b30]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#dd7b30]">
            Terms
          </a>
          <a href="#" className="hover:text-[#dd7b30]">
            Press
          </a>
        </div>

        <div className="p-8 flex items-center justify-center sm:justify-end gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#dd7b30] mr-2">
            Connect
          </span>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="Follow us on Facebook"
              className="w-8 h-8 border border-slate-200 flex items-center justify-center hover:border-[#dd7b30] hover:text-[#dd7b30] transition-colors text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
            >
              <Facebook size={14} />
            </a>
            <a
              href="#"
              aria-label="Follow us on Instagram"
              className="w-8 h-8 border border-slate-200 flex items-center justify-center hover:border-[#dd7b30] hover:text-[#dd7b30] transition-colors text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              aria-label="Follow us on Twitter"
              className="w-8 h-8 border border-slate-200 flex items-center justify-center hover:border-[#dd7b30] hover:text-[#dd7b30] transition-colors text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
            >
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>
      {/* Sticky Mobile Register */}
      <div className="md:hidden border-t border-slate-900 bg-slate-900 p-4 sticky bottom-0 z-50">
        <a
          href="#register"
          className="block text-center text-white text-xs font-bold uppercase tracking-tighter w-full"
        >
          Register Now
        </a>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page is scrolled down more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-100 p-3 bg-[#dd7b30] text-white border-2 border-[#dd7b30] hover:bg-transparent hover:text-[#dd7b30] transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#dd7b30]"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Gallery />
        <RegistrationAndHotel />
        <FaqAndContact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
