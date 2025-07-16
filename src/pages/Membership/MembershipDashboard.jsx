import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const MembershipDashboard = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const email = user?.email;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["membership-status", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `/api/membership/status?email=${encodeURIComponent(email)}`
      );
      return res.data; 
    },
  });

  if (!email) return <p className="text-center mt-10">Please log in.</p>;
  if (isPending) return <p className="text-center mt-10">Loading membership...</p>;
  if (isError) {
    console.error(error);
    return (
      <p className="text-center mt-10 text-red-500">
        Could not load membership. Try refreshing.
      </p>
    );
  }

  const { membership, caps } = data || {};
  const { plan, status, startDate, endDate, autoRenew } = membership || {};
  const fmt = (d) => (d ? new Date(d).toLocaleDateString("en-BD") : "—");
  const postLimitText =
    caps?.postLimit < 0 ? "Unlimited" : caps?.postLimit ?? "—";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Membership</h1>
      <p><strong>Plan:</strong> {plan}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Start:</strong> {fmt(startDate)}</p>
      <p><strong>End:</strong> {fmt(endDate)}</p>
      <p><strong>Auto Renew:</strong> {autoRenew ? "Yes" : "No"}</p>
      <p><strong>Posts Allowed:</strong> {postLimitText}</p>
    </div>
  );
};

export default MembershipDashboard;
