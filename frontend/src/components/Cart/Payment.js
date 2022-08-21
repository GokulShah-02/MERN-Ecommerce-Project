import React, {Fragment, useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import {Navigate} from "react-router-dom";
import PaymentCard from "./PaymentCard";

function Payment() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const {data} = await axios.get("/api/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, [stripeApiKey]);

  return (
    <Fragment>
      {stripeApiKey !== "" &&
        <Elements stripe={loadStripe(stripeApiKey)}>
          <PaymentCard />
        </Elements>
      }
    </Fragment>
  );
}

export default Payment;
