import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios"; 
import toast from "react-hot-toast";
import { gsap } from "gsap";

const Booking = () => {
  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const treeRef = useRef(null);
  const leavesRef = useRef([]);

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosInstance.get("/booking/all");
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load bookings", {
        style: { background: "#1a5c38", color: "#ffffff" },
      });
    },
  });

  useEffect(() => {
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

    // Table animation
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
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

    // Tree animation
    if (treeRef.current) {
      gsap.fromTo(
        treeRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.6,
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

    // Cleanup
    return () => {
      gsap.killTweensOf([headingRef.current, tableRef.current, treeRef.current, ...leavesRef.current]);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background with Animated Trees and Leaves */}
      <div className="absolute inset-0">
        {/* Tree SVG */}
        <svg
          ref={treeRef}
          className="absolute top-0 left-0 w-1/3 h-full"
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
        {/* Animated Leaves */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (leavesRef.current[index] = el)}
            className="absolute w-3 h-3 bg-green-700 rounded-full"
            style={{
              top: `${gsap.utils.random(10, 30)}%`,
              left: `${gsap.utils.random(5, 25)}%`,
            }}
          />
        ))}
      </div>
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-display text-center mb-10"
        >
          Manage Bookings
        </h1>
        {/* Table */}
        <div className="w-full max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-6 w-6 text-teal-600"
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
            </div>
          ) : error ? (
            <p className="text-red-600 text-sm text-center font-body">
              Failed to load bookings. Please try again.
            </p>
          ) : bookings?.length === 0 ? (
            <p className="text-gray-600 text-sm text-center font-body">
              No bookings found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table
                ref={tableRef}
                className="w-full bg-white bg-opacity-90 rounded-lg shadow-lg text-xs"
              >
                <thead>
                  <tr className="bg-teal-600 text-white font-display text-sm">
                    <th className="py-2 px-3 text-left">Sr No</th>
                    <th className="py-2 px-3 text-left">Name</th>
                    <th className="py-2 px-3 text-left">Email</th>
                    <th className="py-2 px-3 text-left">Phone</th>
                    <th className="py-2 px-3 text-left">Trip</th>
                    <th className="py-2 px-3 text-left">Date & Time</th>
                    <th className="py-2 px-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-2 px-3 text-gray-900 font-body">
                        {index + 1}
                      </td>
                      <td className="py-2 px-3 text-gray-900 font-body">
                        {booking.name}
                      </td>
                      <td className="py-2 px-3 font-body">
                        <a
                          href={`mailto:${booking.email}`}
                          className="text-teal-600 hover:underline"
                          title={`Email ${booking.email}`}
                        >
                          {booking.email}
                        </a>
                      </td>
                      <td className="py-2 px-3 font-body">
                        <a
                          href={`tel:${booking.phone}`}
                          className="text-teal-600 hover:underline"
                          title={`Call ${booking.phone}`}
                        >
                          {booking.phone}
                        </a>
                      </td>
                      <td className="py-2 px-3 text-gray-900 font-body">
                        {booking.trip}
                      </td>
                      <td className="py-2 px-3 text-gray-900 font-body">
                        {new Date(booking.dateTime).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-gray-900 font-body">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;