import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [trip, setTrip] = useState("");
  const [specialReq, setSpecialReq] = useState("");

  const headingRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const sidebarRef = useRef(null);
  const treeRef = useRef(null);
  const leavesRef = useRef([]);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: bookingMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/booking/book", data);
      return res;
    },
    onSuccess: () => {
      toast.success("Booking created successfully!", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setName("");
      setEmail("");
      setPhone("");
      setTrip("");
      setDateTime("");
      setSpecialReq("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
    },
  });

  useEffect(() => {
    // Background video transitions
    const videos = [videoRef1.current, videoRef2.current, videoRef3.current].filter(Boolean);
    if (videos.length > 0) {
      gsap.set(videos[2], { opacity: 1, zIndex: 1 });
      gsap.set(videos.slice(0, 2), { opacity: 0, zIndex: 0 });

      const tl = gsap.timeline({ repeat: -1 });
      videos.forEach((_, index) => {
        const nextIndex = (index + 1) % videos.length;
        tl.to(videos[index], {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            videos.forEach((v, i) => {
              if (v) v.style.zIndex = i === nextIndex ? "1" : "0";
            });
          },
        })
          .to(videos[nextIndex], { opacity: 1, duration: 1, ease: "power2.inOut" }, "-=0.8")
          .to({}, { duration: 8 });
      });
    }

    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    // Form container animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // Input fields animation
    if (inputRefs.current.length) {
      gsap.fromTo(
        inputRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.4)",
          delay: 0.5,
        }
      );
    }

    // Button animation
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1,
        }
      );
    }

    // Sidebar animation with floating effect
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.8,
          onComplete: () => {
            gsap.to(sidebarRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );
    }

    // Tree animation
    if (treeRef.current) {
      gsap.fromTo(
        treeRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.5,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
        }
      );
    }

    // Leaves animation
    leavesRef.current.forEach((leaf, index) => {
      if (leaf) {
        gsap.fromTo(
          leaf,
          {
            opacity: 1,
            y: -50,
            x: gsap.utils.random(-50, 50),
            rotation: gsap.utils.random(-30, 30),
          },
          {
            opacity: 0,
            y: 200,
            x: `+=${gsap.utils.random(-20, 20)}`,
            rotation: `+=${gsap.utils.random(-60, 60)}`,
            duration: gsap.utils.random(2, 4),
            delay: index * 0.5,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }
    });

    // Interactive hover effects for inputs
    const inputListeners = inputRefs.current.map((el) => {
      if (!el) return null;
      const onMouseEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.7)",
          borderColor: "#10b981",
          duration: 0.3,
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          boxShadow: "none",
          borderColor: "#d1d5db",
          duration: 0.3,
        });
      };
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      return { el, onMouseEnter, onMouseLeave };
    }).filter(Boolean);

    // Button hover effect
    let buttonEnter, buttonLeave;
    if (buttonRef.current) {
      buttonEnter = () => {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          boxShadow: "0 0 15px rgba(16, 185, 129, 0.8)",
          background: "linear-gradient(45deg, #1a5c38, #10b981)",
          duration: 0.3,
        });
      };
      buttonLeave = () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "none",
          background: "#10b981",
          duration: 0.3,
        });
      };
      buttonRef.current.addEventListener("mouseenter", buttonEnter);
      buttonRef.current.addEventListener("mouseleave", buttonLeave);
    }

    // Cleanup
    return () => {
      inputListeners.forEach(({ el, onMouseEnter, onMouseLeave }) => {
        if (el) {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
        }
      });
      if (buttonRef.current && buttonEnter && buttonLeave) {
        buttonRef.current.removeEventListener("mouseenter", buttonEnter);
        buttonRef.current.removeEventListener("mouseleave", buttonLeave);
      }
      gsap.killTweensOf([
        videoRef1.current,
        videoRef2.current,
        videoRef3.current,
        headingRef.current,
        formRef.current,
        inputRefs.current,
        buttonRef.current,
        sidebarRef.current,
        treeRef.current,
        leavesRef.current,
      ]);
    };
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Email is required", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      toast.error("Phone number is required", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 10 digits", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }

    if (!dateTime) {
      toast.error("Date and time are required", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }
    const selectedDate = new Date(dateTime);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selectedDate <= now) {
      toast.error("Date and time must be in the future", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }

    if (!trip) {
      toast.error("Trip selection is required", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
      return false;
    }

    return true;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    bookingMutation({ name, email, phone, dateTime, trip, specialReq });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Videos */}
      <video
        ref={videoRef1}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video1.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <video
        ref={videoRef2}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video4.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <video
        ref={videoRef3}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video3.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display text-center mb-10"
        >
          Book Your Next Adventure
        </h1>
        {/* Form and Sidebar Container */}
        <div className="flex flex-col md:flex-row w-full max-w-3xl gap-6">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleBooking}
            className="w-full max-w-sm p-4 bg-white bg-opacity-80 rounded-lg shadow-lg text-gray-900"
          >
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  ref={(el) => (inputRefs.current[0] = el)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  ref={(el) => (inputRefs.current[1] = el)}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  ref={(el) => (inputRefs.current[2] = el)}
                />
              </div>
              <div>
                <label
                  htmlFor="dateTime"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  ref={(el) => (inputRefs.current[3] = el)}
                />
              </div>
              <div>
                <label
                  htmlFor="trip"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Destination
                </label>
                <select
                  id="trip"
                  value={trip}
                  onChange={(e) => setTrip(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  ref={(el) => (inputRefs.current[4] = el)}
                >
                  <option value="" disabled>
                    Select destination
                  </option>
                  <option value="Manali">Manali</option>
                  <option value="Kedarnath">Kedarnath</option>
                  <option value="Ladakh">Ladakh</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="specialReq"
                  className="block text-xs font-medium text-gray-900 font-display"
                >
                  Special Request
                </label>
                <textarea
                  id="specialReq"
                  value={specialReq}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  placeholder="Any special requests"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  rows="3"
                  ref={(el) => (inputRefs.current[5] = el)}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              
              <button
                ref={buttonRef}
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 bg-teal-600 text-white rounded-full font-semibold text-sm font-body transition-all duration-300 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? (
                  <svg
                    className="animate-spin h-4 w-4 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>

          {/* Sidebar with Travel Assistance Info */}
          <div
            ref={sidebarRef}
            className="w-full max-w-sm p-4 bg-white bg-opacity-80 rounded-lg shadow-lg text-gray-900"
          >
            <h2 className="text-xl font-bold mb-3 font-display">
              Travel Assistance
            </h2>
            <p className="text-sm mb-3 font-body">📞 Plan Your Dream Trip</p>
            <p className="text-xs mb-3 font-body">
              Not sure where to go? Our travel specialists have curated journeys
              for thousands of travelers. Let’s make your trip extraordinary.
            </p>
            <ul className="list-disc list-inside text-xs font-body space-y-1">
              <li>Best destination for you</li>
              <li>Plan for the best season</li>
              <li>Exclusive travel tips</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animated Tree and Leaves */}
      <div className="absolute inset-0 z-0">
        <svg
          ref={treeRef}
          className="absolute top-0 left-0 w-1/4 h-full"
          viewBox="0 0 200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 350 L80 200 C60 150 40 100 60 50 C80 0 120 0 140 50 C160 100 140 150 120 200 L100 350"
            fill="#14532d"
          />
          <path
            d="M90 200 C70 170 50 140 70 110 C90 80 110 80 130 110 C150 140 130 170 110 200"
            fill="#15803d"
          />
        </svg>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (leavesRef.current[index] = el)}
            className="absolute w-2 h-2 bg-green-700 rounded-full"
            style={{
              top: `${gsap.utils.random(10, 30)}%`,
              left: `${gsap.utils.random(5, 20)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingForm;