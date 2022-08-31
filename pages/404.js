
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../styles/Home.module.css'
import TopBar from '../components/topbar'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import * as Icon from "phosphor-react";

export default function NotFound() {
    const [face, setFace] = useState('\\(o_o)/')
    useEffect(() => {
        const faceArr = [
            '(;-;)',
            '(^-^*)',
            '\\(^Д^)/',
            '(·_·)',
            '\\(o_o)/',
            '(=\'X\'=)',
            '(≥o≤)',
            '\\(^_^)/',
            '(>_<)',
        ];
        const chosenface = faceArr[Math.floor(Math.random() * faceArr.length)];
        setFace(chosenface)
    }, [face])

    return (
        <div className={styles.container}>
            <Head>
                <title>404 | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="404 | A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="404 | Takeout" />
                <meta property="og:description" content="404 | A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="404 | Takeout" />
                <meta name="twitter:description" content="404 | A simple, affordable, developer-oriented email service." />
                <meta name="twitter:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta name="twitter:image:alt" content="Takeout" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <main className={styles.main}>
                <TopBar />
                <section className={styles.intro}>
                    <div className={styles.two}>
                        <h1 style={{fontSize: '90px'}} className={styles.headingWhite}>{face}</h1><br/>
                        <h2 className={styles.descriptionWhite}>We couldn't find the page you tried to reach.</h2>
                        <a href="/" className={styles.whiteButton}>Take me out of here</a>
                    </div>
                </section>
                <section className={styles.widgetSection}>
                    <div className={styles.thiccWidgetSales}>
                        <h1 className={styles.headingBlue}>
                            <Icon.Question weight="bold" className={styles.icon} />
                            <br />
                            Questions?
                        </h1>
                        <h2 className={styles.widgetDescriptionCut}>You can contact us at takeout@bysourfruit.com. Or, tweet at @s0urfruit. You can also go read our FAQ. <br/><br/><a className={styles.anchor} href="/faq">Read the FAQ {'>'}</a></h2>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}
/* 
        const faceArr = [
            '(;-;)',
            '(^-^*)',
            '\\(^Д^)/',
            '(·_·)',
            '\\(o_o)/',
            '(=\'X\'=)',
            '(≥o≤)',
        ];
        const UwUFace = document.getElementById("defined");
        const chosenface = faceArr[Math.floor(Math.random() * faceArr.length)];
        UwUFace.innerText = chosenface;
*/