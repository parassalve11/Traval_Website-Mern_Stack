import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { trips } from '../SeeAllUpcomingTrips';

const BookingForm = () => {
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const successMessageRef = useRef(null);
  const travelBoxRef = useRef(null);
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateTime: '',
    trip: trips[0]?.title || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Leaves and Trees Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Leaf {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.sway = Math.random() * 0.04 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.color = `hsl(${Math.random() * 30 + 90}, 70%, ${Math.random() * 20 + 50}%)`;
      }

      update(time) {
        this.y += this.speedY;
        this.x += Math.sin(time * this.sway);
        this.angle += 0.03;
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size / 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class Tree {
      constructor(x, height) {
        this.x = x;
        this.baseY = canvas.height;
        this.height = height;
        this.width = height / 4;
        this.swayAngle = 0;
      }

      draw() {
        ctx.fillStyle = '#4B2E1A';
        ctx.fillRect(this.x - this.width / 8, this.baseY - this.height, this.width / 4, this.height);
        ctx.save();
        ctx.translate(this.x, this.baseY - this.height);
        ctx.rotate(this.swayAngle);
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(120, 60%, 40%)';
        ctx.fill();
        ctx.restore();
      }
    }

    const leaves = Array(15).fill().map(() => new Leaf());
    const trees = [
      new Tree(canvas.width * 0.2, 80),
      new Tree(canvas.width * 0.5, 100),
      new Tree(canvas.width * 0.8, 70),
    ];

    trees.forEach((tree, index) => {
      gsap.to(tree, {
        swayAngle: Math.PI / 80,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    let time = 0;
    const animateScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      trees.forEach((tree) => tree.draw());
      leaves.forEach((leaf) => {
        leaf.update(time);
        leaf.draw();
      });

      time += 0.1;
      animationFrameId = requestAnimationFrame(animateScene);
    };

    animateScene();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Animations for Form, Heading, and Travel Box
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );
    gsap.fromTo(
      travelBoxRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );

    // Input field animations
    const inputs = formRef.current.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        gsap.to(input.parentElement.querySelector('label'), {
          y: -4,
          scale: 0.9,
          color: '#15803d',
          duration: 0.2,
        });
        gsap.to(input, {
          ringColor: '#16a34a',
          boxShadow: '0 0 8px rgba(22, 163, 74, 0.4)',
          duration: 0.2,
        });
      });
      input.addEventListener('blur', () => {
        gsap.to(input.parentElement.querySelector('label'), {
          y: 0,
          scale: 1,
          color: '#047857',
          duration: 0.2,
        });
        gsap.to(input, {
          ringColor: '#d1d5db',
          boxShadow: 'none',
          duration: 0.2,
        });
      });
    });

    // Button hover and ripple effect
    if (buttonRef.current) {
      const onMouseEnter = () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          background: 'linear-gradient(45deg, #047857, #16a34a)',
          boxShadow: '0 0 12px rgba(22, 163, 74, 0.6)',
          duration: 0.3,
          ease: 'back.out(1.2)',
        });
      };
      const onMouseLeave = () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          background: 'linear-gradient(45deg, #16a34a, #047857)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      };
      const onClick = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = '80px';
        ripple.style.height = '80px';
        ripple.style.left = `${x - 40}px`;
        ripple.style.top = `${y - 40}px`;
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        buttonRef.current.appendChild(ripple);
        gsap.to(ripple, {
          scale: 2,
          opacity: 0,
          duration: 0.4,
          onComplete: () => ripple.remove(),
        });
      };
      buttonRef.current.addEventListener('mouseenter', onMouseEnter);
      buttonRef.current.addEventListener('mouseleave', onMouseLeave);
      buttonRef.current.addEventListener('click', onClick);
      return () => {
        buttonRef.current?.removeEventListener('mouseenter', onMouseEnter);
        buttonRef.current?.removeEventListener('mouseleave', onMouseLeave);
        buttonRef.current?.removeEventListener('click', onClick);
      };
    }

    // Travel box hover effect
    if (travelBoxRef.current) {
      const onMouseEnter = () => {
        gsap.to(travelBoxRef.current, {
          scale: 1.02,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      };
      const onMouseLeave = () => {
        gsap.to(travelBoxRef.current, {
          scale: 1,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
        });
      };
      travelBoxRef.current.addEventListener('mouseenter', onMouseEnter);
      travelBoxRef.current.addEventListener('mouseleave', onMouseLeave);
      return () => {
        travelBoxRef.current?.removeEventListener('mouseenter', onMouseEnter);
        travelBoxRef.current?.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    // Modal animation
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isModalOpen]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = '10-digit phone number is required';
    if (!formData.dateTime) newErrors.dateTime = 'Date and time are required';
    else {
      const selectedDate = new Date(formData.dateTime);
      const now = new Date();
      if (selectedDate < now) newErrors.dateTime = 'Date and time must be in the future';
    }
    if (!formData.trip || !trips.find((t) => t.title === formData.trip))
      newErrors.trip = 'Valid trip is required';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      gsap.fromTo(
        successMessageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          dateTime: '',
          trip: trips[0]?.title || '',
        });
      }, 3000);
    }
  };

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsModalOpen(false),
    });
  };

  return (
    <section className="relative bg-white text-gray-800 py-8 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-teal-600 font-display text-center mb-6 tracking-tight"
        >
          Book Your Adventure
        </h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto bg-gray-100/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300/50"
          noValidate
        >
          {/* Your Name */}
          <div className="mb-4 relative">
            <label
              htmlFor="name"
              className="block text-teal-700 font-body text-sm mb-1 transition-all duration-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/80 text-gray-800 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 border border-gray-300"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="Full name"
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-xs mt-1 font-body" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-teal-700 font-body text-sm mb-1 transition-all duration-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/80 text-gray-800 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 border border-gray-300"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="Your email"
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-xs mt-1 font-body" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4 relative">
            <label
              htmlFor="phone"
              className="block text-teal-700 font-body text-sm mb-1 transition-all duration-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/80 text-gray-800 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 border border-gray-300"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              placeholder="10-digit phone"
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-600 text-xs mt-1 font-body" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Date and Time */}
          <div className="mb-4 relative">
            <label
              htmlFor="dateTime"
              className="block text-teal-700 font-body text-sm mb-1 transition-all duration-300"
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/80 text-gray-800 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 border border-gray-300"
              aria-invalid={!!errors.dateTime}
              aria-describedby={errors.dateTime ? 'datetime-error' : undefined}
              min={new Date().toISOString().slice(0, 16)}
            />
            {errors.dateTime && (
              <p id="datetime-error" className="text-red-600 text-xs mt-1 font-body" role="alert">
                {errors.dateTime}
              </p>
            )}
          </div>

          {/* Trip */}
          <div className="mb-4 relative">
            <label
              htmlFor="trip"
              className="block text-teal-700 font-body text-sm mb-1 transition-all duration-300"
            >
              Select Your Trip
            </label>
            <select
              id="trip"
              name="trip"
              value={formData.trip}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/80 text-gray-800 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 border border-gray-300"
              aria-invalid={!!errors.trip}
              aria-describedby={errors.trip ? 'trip-error' : undefined}
            >
              {trips.map((trip) => (
                <option key={trip.title} value={trip.title}>
                  {trip.title}
                </option>
              ))}
            </select>
            {errors.trip && (
              <p id="trip-error" className="text-red-600 text-xs mt-1 font-body" role="alert">
                {errors.trip}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            ref={buttonRef}
            type="submit"
            className="relative w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-full font-body text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Submit booking form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>

          {/* Success Message */}
          {isSubmitted && (
            <div
              ref={successMessageRef}
              className="mt-4 text-center text-green-600 font-body text-sm"
              role="alert"
            >
              Adventure Booked Successfully!
            </div>
          )}
        </form>

        {/* Travel Assistance Box */}
        <div
          ref={travelBoxRef}
          onClick={openModal}
          className="max-w-sm mx-auto mt-6 bg-gray-100/80 backdrop-blur-lg p-6 rounded-xl shadow-md border border-gray-300/50 cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-teal-600 font-display flex items-center">
            <span className="mr-2">📞</span> Exclusive Travel Assistance
          </h3>
          <p className="text-sm text-gray-700 font-body mt-2">
            Plan Your Dream Trip
          </p>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="max-w-md w-full bg-gray-100/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300/50"
            >
              <h3 className="text-xl font-bold text-teal-600 font-display flex items-center mb-4">
                <span className="mr-2">📞</span> Exclusive Travel Assistance
              </h3>
              <p className="text-base text-gray-700 font-body mb-4">
                Not sure where to go next? Let our travel specialists guide you! Our experts have curated journeys for thousands of travelers—let’s make your next trip effortless and extraordinary.
              </p>
              <ul className="text-sm text-gray-700 font-body mb-4 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Find the best destination for you
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Plan according to the best season
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Get exclusive travel tips & recommendations
                </li>
              </ul>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full font-body text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Contacting travel specialist...')} // Replace with actual contact logic
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-full font-body text-sm"
                >
                  Contact Specialist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;