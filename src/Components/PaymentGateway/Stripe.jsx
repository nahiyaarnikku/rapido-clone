'use client'

import React, { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import './Stripe.css'; 

const stripePromise = loadStripe("pk_test_51LokRoSIzhZEMyrFwcAgsDuJRnCb5KAbqsfTSUUTMpSMTSxOmeTdJB73Xh1TiVNWWyWVgqbPZsZkv2CiN0rKYmOR00rRfEfa6W");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-success", // Corrected URL
          payment_method_data: {
            billing_details: {
              name,
              email,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred");
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {isSuccess ? (
          <div className="text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your payment.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Complete Your Payment</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <PaymentElement />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Stripe = () => {
  const options = {
    clientSecret: "sk_test_51LokRoSIzhZEMyrFd8wgPNcuHbYSIgSxjhtRyW8dEFNcu3OSEjdtxklqb6rCezocYSQ4lQTq73MDCpg4dZuMsLia00ktPeebLT",
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#EAB308",
        colorBackground: "#ffffff",
        colorText: "#1F2937",
        colorDanger: "#EF4444",
        borderRadius: "5px",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
