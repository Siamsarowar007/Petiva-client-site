import React from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || searchParams.get("name");
  const priceParam = searchParams.get("price");
  const priceMatch = priceParam ? priceParam.match(/\d+/) : null;
  const price = priceMatch ? priceMatch[0] : priceParam || "";

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 mb-14 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Pay for {plan} Plan</h1>
      <p className="text-xl mb-6 text-center">Price: ৳{price}/month</p>
      <Elements stripe={stripePromise}>
        <PaymentForm plan={plan} price={price} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
