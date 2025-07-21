import React from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecureFile";

const ReportButton = ({ commentId }) => {

  const axiosInstance = useAxiosSecure();
  const reportComment = async () => {
    const feedback = prompt("Reason for reporting this comment?");
    if (!feedback) return;
    try {
      await axiosInstance.post("/comments/report", {
        commentId,
        feedback,
      });
      toast.success("Reported successfully");
    } catch (err) {
      toast.error("Report failed");
    }
  };

  return (
    <div>
      <title>Report || Petiva</title>
      <button
        onClick={reportComment}
        className="text-xs text-red-500 underline ml-2"
      >
        Report
      </button>
    </div>
  );
};

export default ReportButton;
