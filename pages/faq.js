/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'

import React from "react"
import styles from '../styles/Home.module.css'
import TopBar from '../components/topbar'
import Footer from '../components/footer'
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'


export default function Home() {
    const [href, setHREF] = useState('/flow/login')
    const [buttText, setText] = useState('Get started with Takeout')
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            setHREF('/dashboard')
            setText('Go to Dashboard')
        }
    }, [status, session])


    return (
        <div className={styles.container}>
            <Head>
                <title>FAQ | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Takeout" />
                <meta name="twitter:description" content="A simple, affordable, developer-oriented email service." />
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
                    <div className={styles.mumboJumbo}>
                        <h1 className={styles.headingWhite}>Frequently Asked Questions.</h1>
                        <h2 className={styles.descriptionWhite}>We know that Takeout's features and pricing are too good to be true. Naturally, you may have some questions about our services, subscription, documentation, and more.</h2>
                        <a href="#read" className={styles.whiteButton}>Browse the FAQ</a>
                    </div>
                    <div className={styles.jumboMumbo}>
                        <img className={styles.imgIntro} src="que3.png" alt="email" />
                    </div>
                </section>
                <section className={styles.widgetSection}>
                    <div className={styles.widgetFAQ}>
                        <details>
                            <summary>
                                <h1 className={styles.headingBlue}>What's the catch?</h1>
                            </summary>

                            <h2 className={styles.widgetDescription}>There's none. We don't believe in charging developers small fortunes to send emails. Takeout is meant more for transactional emails, but we are working on Takeout for Marketing. </h2>
                        </details>
                    </div>

                    <div className={styles.widgetFAQ}>
                        <details>
                            <summary>
                                <h1 className={styles.headingBlue}>Is it truly unlimited?</h1>
                            </summary>

                            <h2 className={styles.widgetDescription}>Well, yes. You can send millions of emails, but certainly not all at once. Eventually, you will be ratelimited (you can send 1,000,000+ emails over the course of a month, but not in an hour). If you do ever believe that Takeout is not unlimited, contact us and tell us why! We'll be happy to assist you. <br/><br/><b>We're not big wireless carriers who want to scam you out of your hard-earned money using 'unlimited data'. We're just an email service.</b></h2>
                        </details>
                    </div>

                    <div className={styles.widgetFAQ}>
                        <details>
                            <summary>
                                <h1 className={styles.headingBlue}>How can I actually send emails?</h1>
                            </summary>

                            <h2 className={styles.widgetDescription}>
                                As of August 2022, you can send emails via a POST request,&nbsp;
                                <a className={styles.anchor} href="https://www.npmjs.com/package/takeout.js">Takeout.js</a>, 
                                and <a className={styles.anchor} href="https://github.com/Takeout-bysourfruit/takeout.py">Takeout.py</a>.
                            
                            </h2>
                        </details>
                    </div>

                    <a style={{maxWidth: '300px'}} href="mailto:contact@bysourfruit.com?subject=Your FAQ didn't answer my question ..." className={styles.blueButton}>Still got questions? Contact us!</a>

                </section>
            </main>
            <Footer/>
        </div>
    )
}
