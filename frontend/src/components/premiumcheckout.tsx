// src/PremiumCheckout.tsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { STRIPE_KEY } from '../constants/config';

// https://docs.stripe.com/testing#cards
const stripePromise = loadStripe(STRIPE_KEY);

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const res = await fetch('http://localhost:8000/create-payment-intent/');
    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        background: "#f9fafb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "1rem", color: "#2d3748" }}>
        Premium Checkout
      </h2>

      <div
        style={{
          padding: "12px",
          border: "1px solid #cbd5e0",
          borderRadius: "8px",
          marginBottom: "1rem",
          background: "white",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#2d3748",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          padding: "12px",
          background: loading ? "#a0aec0" : "#3182ce",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!loading) (e.currentTarget.style.background = "#2b6cb0");
        }}
        onMouseLeave={(e) => {
          if (!loading) (e.currentTarget.style.background = "#3182ce");
        }}
      >
        {loading ? "Processing..." : "Pay (Test)"}
      </button>
    </form>
  );
}

export default function PremiumCheckout({ onSuccess }: { onSuccess: () => void }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
}