import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeCheckoutButton({ currentUser, price }) {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_NlI0UzB8uRJ1s0lECLdgMney004Q87nk40";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  };

  // return (
  //   <StripeCheckout
  //     label="Pay Now"
  //     name="CRWN Cloothing Ltd."
  //     image="https://svgshare.com/i/CUz.svg"
  //     description={`Your total is $${price}`}
  //     amount={priceForStripe}
  //     panelLabel="Pay Now"
  //     token={onToken}
  //     stripeKey={publishableKey}
  //   ></StripeCheckout>
  // );
  return (
    <a
      without
      rel="noopener noreferrer"
      target="_blank"
      href={`http://ec2-3-226-29-78.compute-1.amazonaws.com:3456/v1/paymentButton/?name=CRWN Clothing Ltd.&amount=${price}&businessKey=B-TdbRvHYA5pD2&customerName=${currentUser?.displayName ||
        ""}&customerEmail=${currentUser?.email ||
        ""}&isAmountFixed=true&acceptedCurrencies=btc,eth,ltc,xrp&description=Your total is ₦${price}&useCurrenciesInWalletSettings=false`}
    >
      Pay now
    </a>
  );
}
