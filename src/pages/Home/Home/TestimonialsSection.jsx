// src/components/TestimonialsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick'; // Import Slider component
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Quote icons

// Sample Testimonials - Replace with actual data from your backend if available
const testimonials = [
  {
    id: 1,
    quote: "Finding this pet forum was a game-changer! I got incredible advice for my shy rescue cat. The community is so supportive and knowledgeable.",
    author: "Neha Sharma",
    pet: "Whisker (Cat)",
    avatar: "https://i.ibb.co/VgY9pJf/avatar.png", // Generic avatar or user specific
  },
  {
    id: 2,
    quote: "As a first-time dog owner, I had so many questions. This forum helped me with everything from puppy training tips to understanding my dog's weird habits. Highly recommend!",
    author: "David Chen",
    pet: "Buddy (Dog)",
    avatar: "https://i.ibb.co/VgY9pJf/avatar.png",
  },
  {
    id: 3,
    quote: "I love sharing my parrot's antics here. It's a fantastic place to connect with other bird enthusiasts and learn new things about avian care. Truly a gem!",
    author: "Aisha Khan",
    pet: "Sunny (Parrot)",
    avatar: "https://i.ibb.co/VgY9pJf/avatar.png",
  },
  {
    id: 4,
    quote: "Thanks to the advice from this forum, my dog's diet has improved drastically! The nutrition section is incredibly detailed and helpful.",
    author: "Michael Brown",
    pet: "Max (Dog)",
    avatar: "https://i.ibb.co/VgY9pJf/avatar.png",
  },
  {
    id: 5,
    quote: "I was struggling with my cat's behavior issues, but the community here offered practical solutions. My cat is much happier now!",
    author: "Sophia Lee",
    pet: "Luna (Cat)",
    avatar: "https://i.ibb.co/VgY9pJf/avatar.png",
  },
];

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    arrows: false, // Hide default arrows
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-[#4CA3B8] text-center mb-12 tracking-tight"
      >
        What Our Community Says
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="testimonial-slider-container"
      >
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4 outline-none"> {/* p-4 for internal card padding */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-8 min-h-[250px] flex flex-col justify-between border-l-4 border-[#4CA3B8] transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                <div className="mb-4 relative">
                  <FaQuoteLeft className="absolute -top-4 -left-4 text-5xl text-[#4CA3B8] opacity-20" />
                  <p className="text-gray-700 text-lg italic leading-relaxed z-10 relative">
                    {testimonial.quote}
                  </p>
                  <FaQuoteRight className="absolute -bottom-4 -right-4 text-5xl text-[#4CA3B8] opacity-20" />
                </div>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-[#4CA3B8] ring-offset-2"
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.pet}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;