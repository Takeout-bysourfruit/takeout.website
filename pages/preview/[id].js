/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../../styles/Home.module.css'

// thank you.
import DOMPurify from 'isomorphic-dompurify';

export default function Preview(props) {

    // HOOOOLLLLLY FUCKING SHIT THIS WAS XSS WORLD! DISNEY WOULD'VE LOVED TO MAKE A PARK OUT OF THIS 

    function getData() {
        const safe =  DOMPurify.sanitize(props.ejson.email.bodies.html, {FORCE_BODY: true})
        return {__html: safe}
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>View | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="View Email in Browser | A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="View | Takeout" />
                <meta property="og:description" content="View Email in Browser | A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="View | Takeout" />
                <meta name="twitter:description" content="View Email in Browser | A simple, affordable, developer-oriented email service." />
                <meta name="twitter:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta name="twitter:image:alt" content="Takeout" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <div id='innerEmail' dangerouslySetInnerHTML={getData()}></div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const { id } = context.query;
    const email = await fetch(`https://takeout.bysourfruit.com/api/get/preview?ekey=${id}`)
    const ejson = await email.json()

    return {props: {ejson}}
}