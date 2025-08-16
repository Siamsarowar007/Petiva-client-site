import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee'; 

const partners = [
  { id: 1, name: "PetFood Pro", logo: "https://i.ibb.co/Q7DQHC5z/1.png", url: "#" },
  { id: 2, name: "VetCare Clinic", logo: "https://i.ibb.co/9kGR2q3R/2.png", url: "#" },
  { id: 3, name: "Happy Tails Adoption", logo: "https://i.ibb.co/gZ0bvBpm/3.png", url: "#" },
  { id: 4, name: "Pet Training Experts", logo: "https://i.ibb.co/C5VH8p7P/4.png", url: "#" },
  { id: 5, name: "Grooming World", logo: "https://i.ibb.co/V09rnLX1/5.png", url: "#" },
  { id: 6, name: "PetInsurance Co", logo: "https://i.ibb.co/gZSJ15cf/6.png", url: "#" },

];

const PartnersSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 bg-gray-50 rounded-xl shadow-lg mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-extrabold text-[#4CA3B8] text-center mb-12 tracking-tight"
      >
        Our Valued Partners
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Marquee
          gradient={true}
          gradientWidth={70}
          gradientColor={[249, 250, 251]} 
          speed={40} 
          pauseOnHover={true} 
          direction="right" 
          className="py-4"
        >
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-8 block transition-transform duration-300 hover:scale-105"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
               
                className="h-20 max-h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default PartnersSection;