// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "./PaymentForm";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const plan = searchParams.get("name");  
//   const priceRaw = searchParams.get("price"); 
  
//   // price 
//   const priceMatch = priceRaw ? priceRaw.match(/\d+/) : null;
//   const price = priceMatch ? priceMatch[0] : priceRaw || "";

//   return (
//     <div className="max-w-lg mx-auto p-6 mt-10 shadow-lg rounded-lg bg-white">
//       <h1 className="text-3xl font-bold mb-4 text-center">Pay for {plan} Plan</h1>
//       <p className="text-xl mb-6 text-center">Price: ৳{price}/month</p>
//       <Elements stripe={stripePromise}>
//         <PaymentForm plan={plan} price={price} />
//       </Elements>
//     </div>
//   );
// };

// export default PaymentPage;

import React from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import useAuth from "../../hooks/useAuth"; // তোমার auth hook ইম্পোর্ট করো

// Stripe public key load
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth(); // লগইন করা ইউজার

  const plan = searchParams.get("plan") || searchParams.get("name");
  const priceParam = searchParams.get("price");
  const priceMatch = priceParam ? priceParam.match(/\d+/) : null;
  const price = priceMatch ? priceMatch[0] : priceParam || "";

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Pay for {plan} Plan
      </h1>
      <p className="text-xl mb-6 text-center">Price: ৳{price}/month</p>
      <Elements stripe={stripePromise}>
        <PaymentForm plan={plan} price={price} userEmail={user?.email} />
      </Elements>
    </div>
  );
};

export default PaymentPage;

