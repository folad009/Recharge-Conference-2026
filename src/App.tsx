import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  MessageSquare,
  Star,
  Download,
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
    image: "https://picsum.photos/seed/pastor/400/400",
  },
  {
    name: "Bimbo Davids",
    role: "Lead Pastor, Global Impact Church",
    image: "https://picsum.photos/seed/worship/400/400",
  },
  {
    name: "Nathaniel Bassey",
    role: "Guest Speaker",
    image: "https://picsum.photos/seed/speaker3/400/400",
  },
  {
    name: "Joshua Selman",
    role: "Community Outreach",
    image: "https://picsum.photos/seed/speaker4/400/400",
  },
  {
    name: "Bishop Funke Felix-Adejumo",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "Godman Akinlabi",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "Lawrence Oyor",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "David Oyedepo Jnr.",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "Michael Orokpo",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "Mercy Chinwo-Blessed",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },

  {
    name: "Chris Ugoh",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
  {
    name: "Sola Osunmakinde",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
   {
    name: "Niyi Eboda",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
   {
    name: "ID Cabasa",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
   {
    name: "Kaestrings",
    role: "Strategic Growth",
    image: "https://picsum.photos/seed/speaker5/400/400",
  },
];

const SCHEDULE = [
  {
    day: "Friday",
    date: "Oct 15",
    events: [
      {
        time: "05:00PM",
        title: "Registration & Check-in",
        description: "Grab your welcome packet and badge.",
        type: "General",
      },
      {
        time: "07:00PM",
        title: "Opening Night Worship",
        description: "Led by Sarah Jenkins and the City Church Band.",
        type: "Worship",
      },
      {
        time: "08:30PM",
        title: "Keynote Session 1",
        description: "Dr. Marcus Johnson on 'The Power of Renewal'.",
        type: "Keynote",
      },
    ],
  },
  {
    day: "Saturday",
    date: "Oct 16",
    events: [
      {
        time: "09:00AM",
        title: "Morning Devotion & Worship",
        description: "Start the day with prayer and music.",
        type: "Worship",
      },
      {
        time: "10:30AM",
        title: "Breakout Sessions",
        description:
          "Choose from Leadership, Youth Ministry, or Discipleship tracks.",
        type: "Breakout",
      },
      {
        time: "12:00PM",
        title: "Lunch Break",
        description: "Food trucks available on site.",
        type: "General",
      },
      {
        time: "02:00PM",
        title: "Keynote Session 2",
        description: "Rev. Thomas Mitchell.",
        type: "Keynote",
      },
      {
        time: "05:00PM",
        title: "Breakout Sessions",
        description: "Afternoon tracks and workshops.",
        type: "Breakout",
      },
      {
        time: "07:00PM",
        title: "Closing Night Celebration",
        description: "A final night of worship and an extended ministry time.",
        type: "Worship",
      },
    ],
  },
];

const FAQS = [
  {
    question: "Is there a cost to attend?",
    answer:
      "No, the Recharge Conference is completely free! We do ask that you register to help us prepare.",
  },
  {
    question: "Is childcare provided?",
    answer:
      "Yes, childcare is provided for children ages 6 months to 10 years during all main sessions. Please denote this on your registration.",
  },
  {
    question: "Will the sessions be recorded?",
    answer:
      "Yes, all main keynote sessions will be recorded and available on our church YouTube channel a week after the event.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a Bible, a notebook, and an open heart. We recommend dressing casually and comfortably.",
  },
];

const GALLERY = [
  "https://picsum.photos/seed/conf1/800/600",
  "https://picsum.photos/seed/conf2/800/600",
  "https://picsum.photos/seed/conf3/800/600",
  "https://picsum.photos/seed/conf4/800/600",
];

const HOTELS = [
  {
    name: "The Grand Marquee",
    type: "Official Partner Hotel",
    distance: "0 Miles from Venue",
    rateType: "Block Rate",
    bookingLink: "#",
    isPrimary: true,
    amenities: ["Free Wi-Fi", "Pool", "Fitness Center", "Breakfast Included"],
    contactNumber: "(555) 123-4567",
  },
  {
    name: "Riverside Suites",
    type: "Overflow Hotel",
    distance: "2 Miles from Venue",
    rateType: "Regular Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Free Wi-Fi", "Continental Breakfast", "Business Center"],
    contactNumber: "(555) 987-6543",
  },
  {
    name: "Downtown Inn",
    type: "Overflow Hotel",
    distance: "3 Miles from Venue",
    rateType: "Regular Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Free Parking", "Pet Friendly", "In-Room Kitchenette"],
    contactNumber: "(555) 246-8101",
  },
  {
    name: "Metropolis Boutique",
    type: "Premium Hotel",
    distance: "1 Mile from Venue",
    rateType: "Regular Rate",
    bookingLink: "#",
    isPrimary: false,
    amenities: ["Spa", "Valet Parking", "Rooftop Bar", "Fine Dining"],
    contactNumber: "(555) 369-1478",
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-500">
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
          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-center text-base md:text-lg font-mono border-y-2 border-[#dd7b30] py-4 mb-10">
            <div className="flex items-center gap-2">
              <span className="opacity-60 text-[#dd7b30]">Date:</span> July 1st
              - 5th, 2026
            </div>
            <div className="hidden sm:block text-[#dd7b30]">/</div>
            <div className="flex items-center gap-2">
              <span className="opacity-60 text-[#dd7b30]">Location:</span> The
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
              About Recharge Conference 2026
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-900 leading-none mb-6 tracking-tight">
              Kingdom
              <br />
              Greatness
            </h3>
            <p className="text-sm font-mono text-slate-600 mb-6 leading-relaxed">
              We live in a fast-paced world that constantly drains our energy.
              Recharge Conference is designed as a sanctuary—a dedicated time to
              disconnect from the noise and reconnect with God's presence.
            </p>
            <p className="text-sm font-mono text-slate-600 mb-8 leading-relaxed">
              Whether you're a ministry leader, a volunteer, or someone just
              looking to encounter God in a fresh way, these two days will equip
              and inspire you for the journey ahead.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
              <div>
                <div className="text-5xl font-black text-[#dd7b30] mb-1 leading-none">
                  05
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Days of Divine Encounter
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-[#dd7b30] mb-1 leading-none">
                  15<span className="text-3xl">+</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Keynote Speakers
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [feedbackEvent, setFeedbackEvent] = useState<{
    title: string;
    day: string;
  } | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "success">(
    "idle",
  );
  const [rating, setRating] = useState(0);

  const FILTER_TABS = [
    "All",
    "Friday",
    "Saturday",
    "Keynote",
    "Breakout",
    "Worship",
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus("success");
    setTimeout(() => {
      setFeedbackStatus("idle");
      setFeedbackEvent(null);
      setRating(0);
    }, 2000);
  };

  const filteredSchedule = SCHEDULE.map((day) => {
    // 1. Day-level filtering
    if (activeFilter === "Friday" && day.day !== "Friday") return null;
    if (activeFilter === "Saturday" && day.day !== "Saturday") return null;

    // 2. Type-level filtering
    const filteredEvents = day.events.filter((event) => {
      if (["All", "Friday", "Saturday"].includes(activeFilter)) return true;
      return event.type === activeFilter;
    });

    if (filteredEvents.length === 0) return null;

    return { ...day, events: filteredEvents };
  }).filter((day): day is (typeof SCHEDULE)[number] => day !== null);

  return (
    <section
      id="schedule"
      className="py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Itinerary
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-slate-900 leading-none tracking-tight">
              Conference Schedule
            </h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 w-full lg:w-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                aria-pressed={activeFilter === tab}
                className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30] focus-visible:ring-offset-1 ${activeFilter === tab ? "bg-[#dd7b30] border-[#dd7b30] text-white" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredSchedule.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-1 border border-slate-200 bg-white text-center py-12 text-slate-500 font-mono text-[11px] uppercase tracking-widest"
              >
                No sessions found for this filter.
              </motion.div>
            )}
            {filteredSchedule.map((day, dIdx) => (
              <motion.div
                key={day.day}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 flex flex-col h-fit"
              >
                <div className="p-6 border-b border-slate-200 bg-slate-100 flex justify-between items-center">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">
                    {day.day}
                  </h4>
                  <span className="text-[10px] text-[#dd7b30] font-bold uppercase tracking-widest border border-[#dd7b30]/200 bg-white px-3 py-1">
                    {day.date}
                  </span>
                </div>

                <div className="p-6 space-y-4 font-mono text-[11px] overflow-hidden">
                  <AnimatePresence>
                    {day.events.map((evt, eIdx) => (
                      <motion.div
                        key={`${day.day}-${evt.title}-${evt.time}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="grid grid-cols-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0 group"
                      >
                        <span className="text-[#dd7b30] font-bold col-span-1">
                          {evt.time}
                        </span>
                        <div className="col-span-3 flex flex-col items-start">
                          <span className="uppercase font-bold text-slate-900 block mb-1 group-hover:text-[#dd7b30] transition-colors">
                            {evt.title}
                            <span className="ml-2 inline-block px-1.5 py-0.5 border border-slate-200 text-[9px] text-slate-500 leading-none align-middle group-hover:border-indigo-200 group-hover:text-indigo-500 transition-colors">
                              {evt.type}
                            </span>
                          </span>
                          <span className="text-slate-500 hidden sm:block">
                            {evt.description}
                          </span>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                setFeedbackEvent({
                                  title: evt.title,
                                  day: day.day,
                                })
                              }
                              className="text-[9px] font-bold uppercase tracking-widest text-[#dd7b30] hover:text-[#b86a2a] transition-colors flex items-center gap-1 border border-[#dd7b30] hover:border-[#b86a2a] px-2 py-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dd7b30]"
                            >
                              <MessageSquare size={10} /> Rate Session
                            </button>
                            <button
                              onClick={() => {
                                const text = `I'm attending the "${evt.title}" session on ${day.day} at the Recharge Conference!`;
                                const url = "https://rechargeconf.org";
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                                  "_blank",
                                );
                              }}
                              className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 border border-slate-200 hover:border-blue-200 px-2 py-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            >
                              <Twitter size={10} /> Share
                            </button>
                            <button
                              onClick={() => {
                                const url = "https://rechargeconf.org";
                                const text = `I'm attending the "${evt.title}" session on ${day.day} at the Recharge Conference!`;
                                window.open(
                                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
                                  "_blank",
                                );
                              }}
                              className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 border border-slate-200 hover:border-blue-300 px-2 py-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            >
                              <Facebook size={10} /> Share
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {feedbackEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0"
              onClick={() => setFeedbackEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-md shadow-2xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3
                    id="feedback-title"
                    className="text-xl font-black uppercase text-slate-900 tracking-tight mb-1"
                  >
                    Session Feedback
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {feedbackEvent.day} • {feedbackEvent.title}
                  </p>
                </div>
                <button
                  onClick={() => setFeedbackEvent(null)}
                  className="text-slate-500 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  aria-label="Close feedback modal"
                >
                  <span className="text-lg font-bold">&times;</span>
                </button>
              </div>

              {feedbackStatus === "success" ? (
                <div
                  className="p-8 flex flex-col items-center text-center justify-center min-h-62.5"
                  aria-live="polite"
                >
                  <h4 className="text-lg font-bold uppercase tracking-tight text-indigo-600 mb-2">
                    Thank You!
                  </h4>
                  <p className="text-xs font-mono text-slate-500">
                    Your feedback helps us improve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-6">
                  <fieldset>
                    <legend className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                      Rate your experience
                    </legend>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                          aria-pressed={rating >= star}
                          className={`p-2 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${rating >= star ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "border-slate-200 text-slate-300 hover:text-indigo-400 hover:border-indigo-200"}`}
                        >
                          <Star
                            size={24}
                            className={rating >= star ? "fill-indigo-600" : ""}
                          />
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="feedbackComments"
                      className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2"
                    >
                      Comments (Optional)
                    </label>
                    <textarea
                      id="feedbackComments"
                      rows={3}
                      placeholder="What were your key takeaways?"
                      className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-mono focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="w-full bg-slate-900 text-white py-3 text-xs font-bold uppercase tracking-tighter hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + GALLERY.length) % GALLERY.length,
      );
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#dd7b30] mb-2">
              Past Events
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight">
              Recharge Highlights
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedImageIndex(idx)}
              className={`border border-slate-700 bg-slate-800 overflow-hidden relative group cursor-pointer ${idx === 0 || idx === 3 ? "col-span-2 aspect-video" : "col-span-2 md:col-span-1 aspect-square"} focus-within:ring-2 focus-within:ring-[#dd7b30]`}
            >
              <button
                className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 sr-only md:not-sr-only md:opacity-0 focus:outline-none"
                aria-label={`View gallery image ${idx + 1} larger`}
              />
              <img
                src={img}
                alt={`Conference moment ${idx + 1}`}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div
                aria-hidden="true"
                className="absolute top-4 left-4 border border-white/20 bg-black/50 backdrop-blur-sm px-2 py-1 text-[9px] font-mono uppercase tracking-widest group-hover:bg-[#dd7b30] transition-colors"
              >
                Capture 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery fullscreen view"
          >
            {/* Overlay click handler */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedImageIndex(null)}
            />

            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-indigo-400 transition-colors z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Close gallery"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center z-10">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={GALLERY[selectedImageIndex]}
                alt={`Enlarged gallery photo ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain border border-slate-700"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />

              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-indigo-600 text-white p-3 rounded-full backdrop-blur-md transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-indigo-600 text-white p-3 rounded-full backdrop-blur-md transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <ChevronRight size={24} />
              </button>

              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 font-mono text-xs uppercase tracking-widest text-white border border-white/20 rounded-full"
                aria-live="polite"
              >
                {selectedImageIndex + 1} / {GALLERY.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function RegistrationAndHotel() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [currentHotelPage, setCurrentHotelPage] = useState(0);
  const [expandedHotelName, setExpandedHotelName] = useState<string | null>(
    null,
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("success");
    // Mocks successful submission
    setTimeout(() => {
      setFormStatus("idle");
      setFirstName("");
      setLastName("");
      (e.target as HTMLFormElement).reset();
    }, 8000); // Increased timeout so they have time to download the badge
  };

  const downloadBadge = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0f172a"; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#4f46e5"; // indigo-600
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Header
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("RECHARGE", canvas.width / 2, 180);

    ctx.fillStyle = "#818cf8"; // indigo-400
    ctx.font = "bold 20px monospace";
    ctx.fillText("RECHARGE CONFERENCE 2026", canvas.width / 2, 220);

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
    const fullName = `${firstName} ${lastName}`.trim().toUpperCase() || "GUEST";

    // Auto-scale text to fit width
    let fontSize = 64;
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    while (ctx.measureText(fullName).width > 500 && fontSize > 20) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillText(fullName, canvas.width / 2, 480);

    // Dates & Location
    ctx.fillStyle = "#94a3b8"; // slate-400
    ctx.font = "20px monospace";
    ctx.fillText("JULY 1st - 5th, 2026", canvas.width / 2, 650);
    ctx.fillText("THE GOODLAND, IFAKO BUS-STOP, OGUDU OWOROSHOKI EXPRESSWAY, LAGOS", canvas.width / 2, 690);

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Recharge_Badge_${firstName || "Guest"}.png`;
    a.click();
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
            <p className="text-sm font-mono text-slate-600 mb-10 leading-relaxed">
              Registration is completely free, but space is limited. Please let
              us know you're coming so we can prepare for you!
            </p>

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
                        >
                          <option>No</option>
                          <option>Yes, 1 child</option>
                          <option>Yes, 2 children</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                    >
                      Complete Registration <ArrowRight size={14} />
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
                          <div className="p-6 pt-0 font-mono text-[11px] text-slate-600 leading-relaxed border-t border-slate-200 mt-2">
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
