
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../styles/homie/Revamp.module.css'
import TopBar from '../components/homie/topbar'
import Footer from '../components/footer'
import * as Icon from "phosphor-react";

export default function NotFound() {
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
            <TopBar />
            <div className={styles.sections}>
                <section className={styles.loginSecLeft}>
                    <img src="https://i.ibb.co/fCVC3CW/404.png" width='300px' />
                </section>

                <section className={styles.loginSecRight}>
                    
                    <div className={styles.loginRightText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            We couldn't find what <b>you're looking for.</b>
                        </h1>
                        <a href='/' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Take me home <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                    </div>

                </section>
            </div>
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