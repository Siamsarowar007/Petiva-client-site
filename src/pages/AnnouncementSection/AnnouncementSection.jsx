// import React, { useState } from "react";
// import useAxios from "../../hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import { FaBullhorn, FaRegCalendarAlt } from "react-icons/fa";

// const AnnouncementSection = () => {
//   const axios = useAxios();
//   const [expandedId, setExpandedId] = useState(null);

//   const { data: announcements = [], isLoading, isError } = useQuery({
//     queryKey: ["announcements"],
//     queryFn: async () => {
//       const res = await axios.get("/announcements");
//       return res.data;
//     },
//   });

//   if (isLoading || isError || announcements.length === 0) return null;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center flex items-center justify-center gap-2">
//         <FaBullhorn /> Announcements
//       </h2>

//       {/* Horizontal Cards */}
//       <div className="flex overflow-x-auto gap-5 scrollbar-thin scrollbar-thumb-orange-400 pb-3">
//         {announcements.map((item) => (
//           <div
//             key={item._id}
//             className={`flex-shrink-0 w-72 bg-white rounded-lg shadow-md border cursor-pointer transition hover:shadow-lg ${
//               expandedId === item._id ? "border-orange-500" : "border-gray-200"
//             }`}
//             onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
//           >
//             {item.image && (
//               <img
//                 src={item.image}
//                 alt="Announcement"
//                 className="w-full h-40 object-cover rounded-t-lg"
//               />
//             )}
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-orange-600 mb-1 line-clamp-1">
//                 {item.title}
//               </h3>
//               <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
//               <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
//                 <FaRegCalendarAlt className="text-orange-500" />
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Expanded Details */}
//       {expandedId && (
//         <div className="mt-8 bg-white rounded-xl shadow p-6 max-w-4xl mx-auto border border-orange-400">
//           {(() => {
//             const selected = announcements.find((a) => a._id === expandedId);
//             if (!selected) return null;

//             return (
//               <>
//                 <h2 className="text-2xl font-bold text-orange-600 mb-2">{selected.title}</h2>
//                 {selected.image && (
//                   <img
//                     src={selected.image}
//                     alt="Announcement"
//                     className="w-full h-64 object-cover rounded-lg mb-4"
//                   />
//                 )}
//                 <p className="text-gray-800 whitespace-pre-line mb-4">{selected.description}</p>
//                 <p className="text-sm text-gray-500 flex items-center gap-2">
//                   <FaRegCalendarAlt /> Posted on{" "}
//                   {new Date(selected.createdAt).toLocaleString()}
//                 </p>
//               </>
//             );
//           })()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnnouncementSection;

import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaBullhorn, FaRegCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AnnouncementSection = () => {
  const axios = useAxios();
  const [expandedId, setExpandedId] = useState(null);

  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/announcements");
      return res.data;
    },
  });

  if (isLoading || isError || announcements.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-[#4CA3B8] text-center flex items-center justify-center gap-2">
        <FaBullhorn /> Announcements
      </h2>

      {/* Horizontal Cards */}
      <div className="flex overflow-x-auto gap-5 scrollbar-thin scrollbar-thumb-[#4CA3B8] pb-3">
        {announcements.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-72 bg-white rounded-xl shadow-md border cursor-pointer hover:shadow-xl transition-all duration-300 ${
              expandedId === item._id ? "border-[#4CA3B8]" : "border-gray-200"
            }`}
            onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
          >
            {item.image && (
              <img
                src={item.image}
                alt="Announcement"
                className="w-full h-40 object-cover rounded-t-xl"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#4CA3B8] mb-1 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm line-clamp-3">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <FaRegCalendarAlt className="text-[#4CA3B8]" />
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Details */}
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
                    <FaRegCalendarAlt /> Posted on {" "}
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