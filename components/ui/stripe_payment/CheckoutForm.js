import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import BootstrapSpinner from "../spinner/BootstrapSpinner";
import BootstrapSpinner2 from "../spinner/BootstrapSpinner2";
import agent from "../../../utils/agent";

export default (props) => {

    // console.log("CheckoutForm props", props);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();

    const currency = props.currency ? props.currency : "inr"
    const booking_amount = props.booking_amount ? props.booking_amount : "50"
    const chat_id = props.chat_id
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();

        if (currency) {
            setProcessing(true);
            const cardEle = elements.getElement(CardElement)
            const payload = await stripe.createToken(cardEle)

            console.log("payload", payload);

            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
                setProcessing(false);
            } else {
                setError(null);
                setProcessing(false);
                setSucceeded(true);
                const item = {
                    token: payload.token.id,
                    booking_id: props.booking_id,
                    amount: booking_amount,
                    currency: currency,
                    chat_id: chat_id
                }
                console.log("makePayment", item);
                agent.Student.makePayment(item).then(res => {
                    console.log("makePayment res", res);
                    document.getElementById("closeCardModal").click()
                    props.changeMessageToDonePayment(res.chatDetail, chat_id)
                }).catch(err => {
                    console.log("makePayment err", err);
                })
            }
        }

    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button className="btn-stripe"
                disabled={processing || disabled || succeeded}
                id="submit">
                <span id="button-text">
                    {processing ? (
                        <BootstrapSpinner2 />
                    ) : (
                        "Submit"
                    )}
                </span>
            </button>
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
        </form>
    );
}
