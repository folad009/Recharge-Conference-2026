import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Download,
  ArrowRight,
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { HOTELS } from "../data/hotels";
import { hasConvexBackend } from "../lib/convex";

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

export function RegistrationAndHotel() {
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

  const hasConvex = hasConvexBackend;
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
        ctx.font = "bold 50px \"Inter Variable\", Inter, sans-serif";
        ctx.fillText("RECHARGE", canvas.width / 2, 200);
      }

      // Divider
      ctx.strokeStyle = "#334155"; // slate-700
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 300);
      ctx.lineTo(500, 300);
      ctx.stroke();

      // Attendee type — rendered as an indigo role pill
      const typeLabel = attendeeType.toUpperCase();
      ctx.font = "bold 22px monospace";
      const pillPadX = 24;
      const pillWidth = ctx.measureText(typeLabel).width + pillPadX * 2;
      const pillHeight = 44;
      const pillX = (canvas.width - pillWidth) / 2;
      const pillY = 358;
      ctx.fillStyle = "#4f46e5"; // indigo-600
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
      } else {
        ctx.rect(pillX, pillY, pillWidth, pillHeight);
      }
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "middle";
      ctx.fillText(typeLabel, canvas.width / 2, pillY + pillHeight / 2 + 1);
      ctx.textBaseline = "alphabetic";

      // Name
      const fullName =
        `${firstName} ${lastName}`.trim().toUpperCase() || "GUEST";

      // Auto-scale text to fit width
      let fontSize = 64;
      ctx.font = `bold ${fontSize}px "Inter Variable", Inter, sans-serif`;
      while (ctx.measureText(fullName).width > 500 && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px "Inter Variable", Inter, sans-serif`;
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
