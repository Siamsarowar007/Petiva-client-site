import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: { fontSize: "16px", color: "#32325d", "::placeholder": { color: "#a0aec0" } },
        invalid: { color: "#e53e3e" },
    },
};

const PaymentForm = ({ plan, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const userEmail = user?.email || localStorage.getItem("userEmail") || null;

    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!stripe || !elements) return;
        if (!plan) return setErrorMsg("Invalid plan.");
        if (!userEmail) {
            setErrorMsg("Please log in before paying.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);

        try {
            // Create PI
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/membership/create-payment-intent`,
                { packageName: plan }
            );
            const clientSecret = res.data?.clientSecret;
            if (!clientSecret) throw new Error("Payment init failed.");

            // Confirm
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: { email: userEmail },
                },
            });

            if (paymentResult.error) {
                setErrorMsg(paymentResult.error.message);
                setProcessing(false);
                return;
            }

            const pi = paymentResult.paymentIntent;
            if (pi?.status !== "succeeded") {
                setErrorMsg("Payment not completed.");
                setProcessing(false);
                return;
            }

            // Save membership
            console.log("Saving membership:", { email: userEmail, plan, tx: pi.id });
            await axios.post(`${import.meta.env.VITE_API_URL}/api/membership/payments`, {
                email: userEmail,
                packageName: plan,
                transactionId: paymentResult.paymentIntent.id,
                price, 
            });

         

            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: `You are now a ${plan} member!`,
            }).then(() => {
                window.location.href = "/dashboard/payment-membership";
            });
        } catch (error) {
            console.error("Save membership error:", error.response?.data || error);
            setErrorMsg(error.response?.data?.message || "Payment failed. Try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-md">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold disabled:opacity-50"
            >
                {processing ? "Processing..." : `Pay ৳${price}`}
            </button>
        </form>
    );
};

export default PaymentForm;

