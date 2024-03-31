"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const PaymentPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // ? submit the card details to myfatoorah server Second approach

  // function submit() {
  //   console.log("called!!!");
  //   if (window === undefined || !window.myFatoorah) {
  //     console.warn("Please wait for the page to load.");
  //     return;
  //   }

  //   window.myFatoorah.submit().then(
  //     function (response: any) {
  //       // In case of success
  //       // Here you need to pass session id to you backend here
  //       var sessionId = response.sessionId;
  //       var cardBrand = response.cardBrand; //cardBrand will be one of the following values: Master, Visa, Mada, Amex
  //       console.log("Success", response, sessionId, cardBrand);
  //     },
  //     function (error: any) {
  //       // In case of errors
  //       console.error(error);
  //     }
  //   );

  //   // try {
  //   //   window.myFatoorah.submit().then(
  //   //     function (response: FatoorahResponse) {
  //   //       // In case of success
  //   //       // Here you need to pass session id to you backend here
  //   //       var sessionId = response.sessionId
  //   //       var cardBrand = response.cardBrand //cardBrand will be one of the following values: Master, Visa, Mada, Amex
  //   //       console.log("Payment Successful", response)
  //   //       setSessionUpdate({
  //   //         sessionId,
  //   //         cardBrand,
  //   //       })
  //   //       // setLoadingPayment(false)
  //   //       // await checkoutComplete({
  //   //       //   variables: {
  //   //       //     checkoutId,
  //   //       //     paymentData: JSON.stringify({
  //   //       //       // gateway: "myfatoorah",
  //   //       //       // PaymentMethodId: "myfatoorah",
  //   //       //       session_id: sessionId,
  //   //       //     }),
  //   //       //   },
  //   //       // })
  //   //     },
  //   //     function (error: any) {
  //   //       // In case of errors
  //   //       console.log(error)
  //   //       setLoadingPayment(false)
  //   //       if (error instanceof Error) {
  //   //         toast.error(error.message)
  //   //         throw new Error(error.message)
  //   //       }
  //   //       toast.error("Something went wrong, please try again later.")
  //   //       throw new Error("Something went wrong, please try again later.")
  //   //     }
  //   //   )
  //   // } catch (error) {
  //   //   console.error("Error submitting form to Fatoorah:", error)
  //   // }

  //   // const response: FatoorahResponse = new Promise(
  //   //   (resolve, reject) => {
  //   //     window.myFatoorah &&
  //   //       window.myFatoorah
  //   //         .submit()
  //   //         .then(function (response: FatoorahResponse) {
  //   //           console.log("Response from Fatoorah:", response)
  //   //           resolve(response)
  //   //         })
  //   //         .catch(function (error: Error) {
  //   //           console.error("Error submitting form to Fatoorah:", error)
  //   //           reject(error)
  //   //         })
  //   //   }
  //   // )
  // }

  // function handleBinChanges(bin: any) {
  //   console.log(bin);
  // }

  useEffect(() => {
    if (!isLoaded) return;
    const config = {
      countryCode: "KWT",
      sessionId: "a140e3f4-ad93-4811-a735-922701a81255",
      cardViewId: "card-element",
      onCardBinChanged: function handleBinChanges(bin: any) {
        console.log(bin);
      },
      style: {
        hideCardIcons: true,
        direction: "ltr",
        cardHeight: 230,
        tokenHeight: 230,
        input: {
          color: "black",
          fontSize: "13px",
          fontFamily: "sans-serif",
          inputHeight: "32px",
          inputMargin: "10px",
          borderColor: "c7c7c7",
          borderWidth: "1px",
          borderRadius: "8px",
          boxShadow: "",
          placeHolder: {
            holderName: "Name On Card",
            cardNumber: "Number",
            expiryDate: "MM / YY",
            securityCode: "CVV",
          },
        },
        text: {
          saveCard: "Save card info for future payment.",
          addCard: "Use another Card!",
          deleteAlert: {
            title: "Delete",
            message: "Test",
            confirm: "yes",
            cancel: "no",
          },
        },
        label: {
          display: true,
          color: "black",
          fontSize: "13px",
          fontWeight: "normal",
          fontFamily: "sans-serif",
          text: {
            holderName: "Card Holder Name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            securityCode: "Security Code",
          },
        },
        error: {
          borderColor: "red",
          borderRadius: "8px",
          boxShadow: "0px",
        },
      },
    };
    window.myFatoorah && window.myFatoorah.init(config);
    console.log("Loaded config ", isLoaded);

    function submit() {
      console.log("called!!!");
      const myFatoorah = window?.myFatoorah;
      if (!myFatoorah) {
        console.warn("Please wait for the page to load.");
        return;
      }
      myFatoorah
        .submit()
        // On success
        .then(function (response: any) {
          // Here you need to pass session id to you backend here
          var sessionId = response.sessionId;
          var cardBrand = response.cardBrand;
          console.log("Success", response, sessionId, cardBrand);
        })
        // In case of errors
        .catch(function (error: any) {
          console.error(error);
        });
    }

    const cardWrapper = document.getElementById("card-wrapper");
    const submitButton = document.createElement("button");
    submitButton.textContent = "Pay";
    submitButton.className = "pay-btn";
    submitButton.addEventListener("click", submit);
    cardWrapper?.appendChild(submitButton);

    return () => {
      submitButton?.removeEventListener("click", submit);
      console.log("Unmounted");
    };
  }, [isLoaded]);

  return (
    <>
      <Script
        id="payment-load"
        src="https://demo.myfatoorah.com/cardview/v2/session.js"
        type="text/javascript"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      <section className="relative grid min-h-screen w-full place-items-center">
        <div
          id="card-wrapper"
          className="mx-auto grid max-w-2xl place-items-center rounded-md bg-secondary p-4"
        >
          <h1 className="text-center text-2xl font-semibold text-secondary-foreground">
            Card View
          </h1>
          {/* Form injection */}
          <div id="card-element"></div>
        </div>
      </section>
    </>
  );
};

export default PaymentPage;
