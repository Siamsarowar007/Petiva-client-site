// import React, { useState, useMemo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { FaImage } from "react-icons/fa";
// import useAxios from "../../../hooks/useAxios";
// import useAuth from "../../../hooks/useAuth";

// const PRIMARY = "#4CA3B8";
// const PAGE_SIZE = 10;

// const MakeAnnouncement = () => {
//   const axios = useAxios();
//   const { user } = useAuth();
//   const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

//   const [announcement, setAnnouncement] = useState({
//     authorName: "",
//     title: "",
//     description: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);

//   const {
//     data: announcements = [],
//     refetch,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["announcements"],
//     queryFn: async () => {
//       const res = await axios.get("/announcements");
//       return res.data;
//     },
//   });

//   const posts = announcements;
//   const totalPages = Math.ceil(posts.length / PAGE_SIZE) || 1;
//   const indexOfLast = currentPage * PAGE_SIZE;
//   const indexOfFirst = indexOfLast - PAGE_SIZE;
//   const currentPosts = posts.slice(indexOfFirst, indexOfLast);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [totalPages]);

//   const autoAuthorName = useMemo(
//     () => user?.displayName || user?.name || "",
//     [user]
//   );

//   useEffect(() => {
//     if (!editingId && !announcement.authorName && autoAuthorName) {
//       setAnnouncement((s) => ({ ...s, authorName: autoAuthorName }));
//     }
//   }, [autoAuthorName, editingId]);

//   const resetForm = () => {
//     setEditingId(null);
//     setAnnouncement({
//       authorName: autoAuthorName || "",
//       title: "",
//       description: "",
//     });
//     setImageFile(null);
//   };

//   const uploadImageIfNeeded = async () => {
//     if (!imageFile) return "";
//     if (!imgbbAPIKey) {
//       Swal.fire("Image API Missing", "No IMGBB API key found.", "warning");
//       return "";
//     }
//     const formData = new FormData();
//     formData.append("image", imageFile);
//     const uploadRes = await axios.post(
//       `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
//       formData
//     );
//     const imageUrl = uploadRes?.data?.data?.url;
//     if (!imageUrl) throw new Error("Image upload failed");
//     return imageUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let imageUrl = await uploadImageIfNeeded();

//       const payload = {
//         authorName: announcement.authorName || autoAuthorName || "Admin",
//         authorImage: imageUrl || "",
//         title: announcement.title,
//         description: announcement.description,
//         createdAt: new Date().toISOString(),
//       };

//       if (editingId) {
//         await axios.put(`/announcements/${editingId}`, payload);
//         Swal.fire("Updated!", "Announcement updated successfully.", "success");
//       } else {
//         await axios.post("/announcements", payload);
//         Swal.fire("Success!", "Announcement posted successfully.", "success");
//       }

//       resetForm();
//       refetch();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong!", "error");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setAnnouncement({
//       authorName: item.authorName || autoAuthorName || "",
//       title: item.title,
//       description: item.description,
//     });
//     setImageFile(null);
//     Swal.fire("Edit Mode", "You're editing the announcement", "info");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       confirmButtonColor: PRIMARY,
//       cancelButtonColor: "#d33",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(`/announcements/${id}`);
//       Swal.fire("Deleted!", "Announcement has been deleted.", "success");
//       if (currentPosts.length === 1 && currentPage > 1) {
//         setCurrentPage((p) => p - 1);
//       }
//       refetch();
//     } catch (err) {
//       Swal.fire("Error!", "Could not delete.", "error");
//     }
//   };

//   const handleCancelEdit = () => {
//     resetForm();
//   };

//   const handleImageClick = (url) => {
//     Swal.fire({
//       imageUrl: url,
//       imageAlt: "Announcement Image",
//       showCloseButton: true,
//       showConfirmButton: false,
//       background: "#fefefe",
//     });
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h2
//         className={`text-3xl font-bold text-center mb-6 ${
//           editingId ? "text-yellow-600" : "text-gray-800"
//         }`}
//       >
//         {editingId ? "✏️ Edit Announcement" : "📢 Make Announcement"}
//       </h2>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-3 bg-white p-4 rounded shadow border text-sm"
//         style={{ borderColor: PRIMARY }}
//       >
//         {/* Author Name */}
//         <div>
//           <label className="font-medium block mb-1 text-gray-700 text-xs">
//             Your Name
//           </label>
//           <input
//             type="text"
//             className="input input-bordered w-full h-9 text-sm"
//             value={announcement.authorName}
//             disabled
//             style={{ cursor: "not-allowed", backgroundColor: "#f9f9f9" }}
//             readOnly
//           />
//         </div>

//         {/* Title & Image in one row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-medium block mb-1 text-gray-700 text-xs">
//               Title
//             </label>
//             <input
//               type="text"
//               className="input input-bordered w-full h-9 text-sm"
//               value={announcement.title}
//               onChange={(e) =>
//                 setAnnouncement((s) => ({ ...s, title: e.target.value }))
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="font-medium block mb-1 text-gray-700 text-xs">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               className="file-input file-input-bordered w-full text-sm"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="font-medium block mb-1 text-gray-700 text-xs">
//             Description
//           </label>
//           <textarea
//             className="textarea textarea-bordered w-full min-h-[90px] text-sm"
//             value={announcement.description}
//             onChange={(e) =>
//               setAnnouncement((s) => ({ ...s, description: e.target.value }))
//             }
//             required
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="btn w-full text-white h-9 text-sm"
//             style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
//           >
//             {editingId ? "Update" : "Post"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={handleCancelEdit}
//               className="btn btn-ghost w-full h-9 text-sm"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Announcements Table */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold mb-4">All Announcements</h3>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : isError ? (
//           <p className="text-red-500">Failed to load announcements.</p>
//         ) : posts.length === 0 ? (
//           <p className="text-gray-500">No announcements yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table w-full border">
//               <thead>
//                 <tr className="bg-[#F0FAFC]">
//                   <th className="border px-4 py-2 text-left">Image</th>
//                   <th className="border px-4 py-2 text-left">Title</th>
//                   <th className="border px-4 py-2 text-left">Author</th>
//                   <th className="border px-4 py-2 text-left">Date</th>
//                   <th className="border px-4 py-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentPosts.map((item) => (
//                   <tr key={item._id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2 align-middle">
//                       {item.authorImage ? (
//                         <button
//                           type="button"
//                           onClick={() => handleImageClick(item.authorImage)}
//                           className="block"
//                           title="Click to view"
//                         >
//                           <img
//                             src={item.authorImage}
//                             alt={item.title}
//                             className="w-16 h-12 object-cover rounded border"
//                           />
//                         </button>
//                       ) : (
//                         <div className="w-16 h-12 flex items-center justify-center text-gray-400 border rounded">
//                           <FaImage />
//                         </div>
//                       )}
//                     </td>
//                     <td className="border px-4 py-2 font-semibold text-gray-800 truncate max-w-[220px]">
//                       {item.title}
//                     </td>
//                     <td className="border px-4 py-2">{item.authorName || "—"}</td>
//                     <td className="border px-4 py-2 whitespace-nowrap">
//                       {new Date(item.createdAt).toLocaleDateString("en-GB")}
//                     </td>
//                     <td className="border px-4 py-2 text-center">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-sm font-semibold text-[#2563eb] hover:underline mr-3"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="text-sm font-semibold text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
//               <p className="text-sm text-gray-500 text-center sm:text-left">
//                 Showing {currentPosts.length} of {posts.length} posts
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => paginate(currentPage - 1)}
//                   className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   « Previous
//                 </button>
//                 {[...Array(totalPages).keys()].map((num) => (
//                   <button
//                     key={num}
//                     onClick={() => paginate(num + 1)}
//                     className={`px-3 py-2 rounded text-sm border ${
//                       currentPage === num + 1
//                         ? "bg-[#4CA3B8] text-white border-[#4CA3B8]"
//                         : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
//                     }`}
//                   >
//                     {num + 1}
//                   </button>
//                 ))}
//                 <button
//                   disabled={currentPage === totalPages}
//                   onClick={() => paginate(currentPage + 1)}
//                   className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next »
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MakeAnnouncement;






import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import Swal from "sweetalert2";
import { FaImage, FaPlusCircle, FaTimesCircle, FaTags, FaSpinner } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios"; 
import useAuth from "../../../hooks/useAuth"; 

const PRIMARY = "#4CA3B8";
const PAGE_SIZE = 10;

const MakeAnnouncement = () => {
  
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
  const qc = useQueryClient(); 

  // --- Announcement Form State & Hooks ---
  const [announcement, setAnnouncement] = useState({
    authorName: "",
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: announcements = [],
    refetch,
    isLoading: announcementsLoading, 
    isError: announcementsError, 
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements"); 
      return res.data;
    },
  });

  const posts = announcements;
  const totalPages = Math.ceil(posts.length / PAGE_SIZE) || 1;
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
   
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
        setCurrentPage(1); 
    }
  }, [totalPages, currentPage]);

  const autoAuthorName = useMemo(
    () => user?.displayName || user?.name || "",
    [user]
  );

  useEffect(() => {
    if (!editingId && !announcement.authorName && autoAuthorName) {
      setAnnouncement((s) => ({ ...s, authorName: autoAuthorName }));
    }
  }, [autoAuthorName, editingId, announcement.authorName]);

  const resetForm = () => {
    setEditingId(null);
    setAnnouncement({
      authorName: autoAuthorName || "",
      title: "",
      description: "",
    });
    setImageFile(null);
  };

  const uploadImageIfNeeded = async () => {
    if (!imageFile) return "";
    if (!imgbbAPIKey) {
      Swal.fire("Image API Missing", "No IMGBB API key found.", "warning");
      return "";
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const uploadRes = await axiosSecure.post( 
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      const imageUrl = uploadRes?.data?.data?.url;
      if (!imageUrl) throw new Error("Image upload failed: URL not found");
      return imageUrl;
    } catch (uploadError) {
      console.error("Error uploading image to ImgBB:", uploadError);
      Swal.fire("Image Upload Failed", "Could not upload image. Please try again.", "error");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation for announcement
    if (!announcement.title.trim() || !announcement.description.trim()) {
      Swal.fire("Validation Error", "Title and Description are required.", "warning");
      return;
    }

    try {
      let imageUrl = await uploadImageIfNeeded();

      const payload = {
        authorName: announcement.authorName || autoAuthorName || "Admin",
        authorImage: imageUrl || "",
        title: announcement.title,
        description: announcement.description,
        createdAt: new Date().toISOString(),
      };

      if (editingId) {
        await axiosSecure.put(`/announcements/${editingId}`, payload);
        Swal.fire("Updated!", "Announcement updated successfully.", "success");
      } else {
        await axiosSecure.post("/announcements", payload);
        Swal.fire("Success!", "Announcement posted successfully.", "success");
      }

      resetForm();
      refetch(); 
    } catch (err) {
      console.error("Announcement operation failed:", err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong with the announcement!", "error");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setAnnouncement({
      authorName: item.authorName || autoAuthorName || "",
      title: item.title,
      description: item.description,
    });
    setImageFile(null); 
    Swal.fire("Edit Mode", "You're editing the announcement", "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: PRIMARY,
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/announcements/${id}`);
      Swal.fire("Deleted!", "Announcement has been deleted.", "success");
      refetch(); 
    } catch (err) {
      console.error("Announcement deletion failed:", err);
      Swal.fire("Error!", err.response?.data?.message || "Could not delete the announcement.", "error");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleImageClick = (url) => {
    Swal.fire({
      imageUrl: url,
      imageAlt: "Announcement Image",
      showCloseButton: true,
      showConfirmButton: false,
      background: "#fefefe",
    });
  };

  // --- Tag Management Section ---
  const [tagInput, setTagInput] = useState('');

  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/tags"); 
        return res.data || [];
      } catch (err) {
        console.error("Failed to load tags:", err);
        
        throw err; 
      }
    },
  });


  //  * Add tag
  
  const handleAddTag = async (e) => {
    e.preventDefault();
    const tagName = tagInput.trim();
    if (!tagName) {
      Swal.fire("Warning", "Tag name cannot be empty.", "warning");
      return;
    }

    try {
      const res = await axiosSecure.post("/tags", { name: tagName });
      if (res.status === 201) {
        Swal.fire("Success", "Tag added successfully!", "success");
        setTagInput("");
        qc.invalidateQueries({ queryKey: ["tags"] }); 
      }
    } catch (err) {
      console.error("Add tag failed:", err);
      const errorMessage = err.response?.data?.message || "Could not add tag. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

 
  //  * Delete tag
  
  const handleDeleteTag = async (tag) => {
    const confirm = await Swal.fire({
      title: `Delete tag "${tag.name}"?`,
      text: "This action cannot be undone and might affect posts using this tag.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/tags/${tag._id}`); 
      Swal.fire("Deleted!", "Tag has been removed.", "success");
      qc.invalidateQueries({ queryKey: ["tags"] }); 
    } catch (err) {
      console.error("Delete tag failed:", err);
      const errorMessage = err.response?.data?.message || "Could not delete tag. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  // --- End Tag Management Section ---

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <title>Admin Announcement || Petiva</title>
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          editingId ? "text-yellow-600" : "text-gray-800"
        }`}
      >
        {editingId ? "✏️ Edit Announcement" : "📢 Make Announcement"}
      </h2>

      {/* Announcement Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded shadow border text-sm"
        style={{ borderColor: PRIMARY }}
      >
        {/* Author Name */}
        <div>
          <label className="font-medium block mb-1 text-gray-700 text-xs">
            Your Name
          </label>
          <input
            type="text"
            className="input input-bordered w-full h-9 text-sm"
            value={announcement.authorName}
            disabled
            style={{ cursor: "not-allowed", backgroundColor: "#f9f9f9" }}
            readOnly
          />
        </div>

        {/* Title & Image in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1 text-gray-700 text-xs">
              Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full h-9 text-sm"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement((s) => ({ ...s, title: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="font-medium block mb-1 text-gray-700 text-xs">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="file-input file-input-bordered w-full text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium block mb-1 text-gray-700 text-xs">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full min-h-[90px] text-sm"
            value={announcement.description}
            onChange={(e) =>
              setAnnouncement((s) => ({ ...s, description: e.target.value }))
            }
            required
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="btn w-full text-white h-9 text-sm"
            style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
          >
            {editingId ? "Update" : "Post"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-ghost w-full h-9 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      ---

      {/* Tag Management Section */}
      <div className="mt-12 bg-white p-4 rounded shadow border text-sm" style={{ borderColor: PRIMARY }}>
        <h3 className="text-2xl font-semibold mb-4 text-center">
          <FaTags className="inline-block mr-2 text-[#4CA3B8]" /> Manage Tags
        </h3>
        {/* Add New Tag Form */}
        <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-3 mb-6 items-end">
          <div className="flex-grow w-full">
            <label htmlFor="tagName" className="font-medium block mb-1 text-gray-700 text-xs">
              Add New Tag
            </label>
            <input
              type="text"
              id="tagName"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="input input-bordered w-full h-9 text-sm"
              placeholder="e.g., Technology, Sports, News"
              required 
            />
          </div>
          <button
            type="submit"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={tagsLoading || !tagInput.trim()} 
          >
            {tagsLoading ? <FaSpinner className="animate-spin" /> : <FaPlusCircle />} Add Tag
          </button>
        </form>

        {/* Existing Tags List */}
        <h4 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          Existing Tags {tagsLoading && <FaSpinner className="animate-spin text-[#4CA3B8]" />}
        </h4>
        {tagsError ? (
          <p className="text-red-500 text-center py-4">Failed to load tags. Please try again.</p>
        ) : tags.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tags found. Add some new tags above!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag._id} 
                className="inline-flex items-center bg-[#4CA3B8] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <span className="mr-2">{tag.name}</span> 
                <button
                  onClick={() => handleDeleteTag(tag)}
                  className="text-white text-base hover:text-red-300 transition-colors duration-200"
                  aria-label={`Delete tag ${tag.name}`}
                >
                  <FaTimesCircle />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      ---

      {/* Announcements Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">All Announcements</h3>
        {announcementsLoading ? ( 
          <p>Loading announcements...</p>
        ) : announcementsError ? ( 
          <p className="text-red-500">Failed to load announcements.</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No announcements yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead>
                <tr className="bg-[#F0FAFC]">
                  <th className="border px-4 py-2 text-left">Image</th>
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Author</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 align-middle">
                      {item.authorImage ? (
                        <button
                          type="button"
                          onClick={() => handleImageClick(item.authorImage)}
                          className="block"
                          title="Click to view"
                        >
                          <img
                            src={item.authorImage}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded border"
                          />
                        </button>
                      ) : (
                        <div className="w-16 h-12 flex items-center justify-center text-gray-400 border rounded">
                          <FaImage />
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2 font-semibold text-gray-800 truncate max-w-[220px]">
                      {item.title}
                    </td>
                    <td className="border px-4 py-2">{item.authorName || "—"}</td>
                    <td className="border px-4 py-2 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-sm font-semibold text-[#2563eb] hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-sm font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing {currentPosts.length} of {posts.length} posts
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  « Previous
                </button>
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num + 1)}
                    className={`px-3 py-2 rounded text-sm border ${
                      currentPage === num + 1
                        ? "bg-[#4CA3B8] text-white border-[#4CA3B8]"
                        : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAnnouncement;