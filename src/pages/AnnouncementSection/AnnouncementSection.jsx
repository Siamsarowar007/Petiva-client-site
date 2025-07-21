import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBullhorn, FaRegCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecureFile";

const AnnouncementSection = () => {
  // const axiosInstance = useAxios();
  const [expandedId, setExpandedId] = useState(null);
  const [isPaused, setIsPaused] = useState(false); 
  const axiosInstance = useAxiosSecure();
  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/announcements");
      return res.data;
    },
  });

  if (isLoading || isError || announcements.length === 0) return null;


  const AnnouncementCard = ({ item }) => (
    <motion.div
   
      className={`
        flex-shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl
        border-2 transition-all duration-300 transform
        hover:-translate-y-1 cursor-pointer mx-4
        ${expandedId === item._id ? "border-[#4CA3B8]" : "border-gray-200"}
      `}
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => {
        if (expandedId === null) { 
          setIsPaused(false);
        }
      }}
      onClick={() => {
        const newExpandedId = expandedId === item._id ? null : item._id;
        setExpandedId(newExpandedId);
        setIsPaused(newExpandedId !== null); 
      }}
      style={{ minWidth: '288px' }}
    >
      {item.image && (
        <img
          src={item.image}
          alt="Announcement"
          className="w-full h-40 object-cover rounded-t-xl"
        />
      )}
      <div className="p-5"> 
        <h3 className="text-lg font-bold text-[#4CA3B8] mb-2 line-clamp-1"> 
          {item.title}
        </h3>
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed"> 
          {item.description}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-2 mt-3"> 
          <FaRegCalendarAlt className="text-[#4CA3B8] text-sm" />
          <span className="font-medium">
             {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl px-4 mx-auto py-10">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#4CA3B8] text-center flex items-center justify-center gap-2">
        <FaBullhorn /> Announcements
      </h2>

    
      <div className="overflow-hidden py-3">
        <div className={`flex scrolling-container ${isPaused ? 'paused' : ''}`}> 
          
          {announcements.map((item) => (
            <AnnouncementCard key={item._id} item={item} />
          ))}
          
          {announcements.map((item, index) => (
            <AnnouncementCard key={`duplicate-${item._id}-${index}`} item={item} />
          ))}
        </div>
      </div>

    
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto border border-[#4CA3B8]"
          >
            {(() => {
              const selected = announcements.find((a) => a._id === expandedId);
              if (!selected) return null;

              return (
                <>
                  <h2 className="text-2xl font-bold text-[#4CA3B8] mb-2">
                    {selected.title}
                  </h2>
                  {selected.image && (
                    <img
                      src={selected.image}
                      alt="Announcement"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-gray-800 whitespace-pre-line mb-4">
                    {selected.description}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaRegCalendarAlt /> Posted on{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementSection;