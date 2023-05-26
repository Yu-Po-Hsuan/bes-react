import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51N9kGxGHiZLsI8cAwSyBj4K7Y6IFh8Lx6MUk80VuAPDe0sesU6yPUexgkpMedYsJBpNFUH1774eK0CcTX84H73M2007YyLr371");

function Payment() { const [clientSecret, setClientSecret] = useState("");

useEffect(() => {
  // Create PaymentIntent as soon as the page loads
  fetch("http://localhost:8080/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
}, []);



    const appearance = {
    theme: 'stripe',
    };
    const options = {
    clientSecret,
    appearance,
    };

    return (
    <>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
        )}
    </>
    );
}

export default Payment;