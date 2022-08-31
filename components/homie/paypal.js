/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useState, useEffect } from 'react'
import  { useSession } from 'next-auth/react'
import styles from '../../styles/homie/Revamp.module.css'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import axios from 'axios'

const ButtonWrapper = ({ type }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const { data: session, status } = useSession()

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                intent: "subscription",
            },
        });

    }, [type]);

    if (status === 'unauthenticated') {
        if (typeof document !== 'undefined') {
            document.getElementById('thefuckingPayPal').style.display = 'none';
        }
    }

    /*
        We can get a little bit of useful data from this. 
        Mainly, the subscription ID. The order ID changes each month, so pointless (I think?)

        data.subscriptionID and data.orderID hold said info.        
    */
    async function approved(data) {
        // Ideally this function would just pass data to a function in minions.js
        // Use router to send this to some 'thank you ; here's an API key.'
        console.log('Approved!')
        axios.post('/api/auth/update', {
            email: session.user.email,
            subscriptionID: data.subscriptionID
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(JSON.stringify(data.subscriptionID))
    }

    return (
        <PayPalButtons
            createSubscription={(data, actions) => {
                return actions.subscription
                    .create({
                        plan_id: 'P-8S830931C2266703KMLENHTI'
                        // real ID: 'P-8S830931C2266703KMLENHTI'
                        // fake ID: 'P-46P65111BM138982SMLEOLZQ'
                    })
                    .then((orderId) => {
                        console.log(`Order ID: ${orderId}`)
                        return orderId;
                    })
            }}
            onApprove={(data) => approved(data)}
            style={{
                shape: 'rect',
                color: 'black',
                layout: 'vertical',
                label: 'paypal',
                tagline: 'false',
            }}
        />
    );
}

export default function PayPal() {
    return (
        <div className={styles.paypalDiv} id="thefuckingPayPal">
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CID,
                    components: "buttons",
                    'disable-funding': 'credit',
                    intent: "subscription",
                    vault: true,
                }}>
                <div className={styles.fuckPayPal}><ButtonWrapper type="subscription"/></div>
            </PayPalScriptProvider>
            <button className="customized-button">Subscribe via PayPal</button>
            <button className="customized-button-2">Pay using a debit/credit card</button>


        </div>
    )
}
