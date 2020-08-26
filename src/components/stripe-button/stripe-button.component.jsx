import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HKEbTEOJjei54XctZKVJSqn0ST76m44yeLpiBok1kjzIaIpndecIJ5M4zz56OQyXksT0g0VTViLNl4X31dUgFzE00AgKbe1gj";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful wala ka na pera");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingaddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
