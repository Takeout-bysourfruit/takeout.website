/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"

import styles from '../../../styles/homie/db.module.css'
import * as Icon from "phosphor-react";
import Loader from '../../../components/loaders/loader'
import TopBar from '../../../components/homie/topbar'
import DashTop from '../../../components/homie/dashtop'
import SideBar from '../../../components/homie/sidebar'
import Footer from '../../../components/footer'
import { useSession, getSession } from "next-auth/react"
import { useState, useEffect } from 'react'


export default function Dashboard(props) {
    const [loading, setLoading] = useState(true);
    const [userToken, setToken] = useState('')
    const [seeCreds, setCredVis] = useState(false);

    function toggleVis() {
        setCredVis(!seeCreds);
    }
    
    useEffect(() => {
        const { name, email, token, plan } = props.userData
        setToken(token)
        setLoading(false)  
    }, [props])


    return (
        <div className={styles.container}>
            <Head>
                <title>Credentials | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Credentials | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Credentials | Takeout" />
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

            {!loading ? (
                <span style={{ display: "none" }}>hiiii</span>
            ) : (
                <Loader />
            )}

            <DashTop />
            {/* Serves as the mobile dashboard menu too ^^' */}
            <main className={styles.main}>
                <section className={styles.dashboardfuck}>
                    <SideBar/>
                    <section className={styles.dashboardRecent}>
                        <h1 style={{textAlign: 'center'}} className={styles.dashboardYouSent}>Your credentials</h1>
                        <div className={styles.credentials}>
                            <h2 className={styles.credText}>

                                <a className={styles.showHideCred} onClick={() => {navigator.clipboard.writeText(userToken); setTimeout(() => { document.getElementById('clipIcon').classList.add("raise")}); setTimeout(() => { document.getElementById('clipIcon').classList.remove("raise")}, 1000)}}><Icon.Clipboard weight='bold' className={styles.showHideIcon} id='clipIcon' /></a>
                                <a className={styles.showHideCred} onClick={toggleVis}>{seeCreds ? <Icon.EyeSlash weight='bold' className={styles.showHideIcon} /> : <Icon.Eye weight='bold' className={styles.showHideIcon} />}</a>
                                <span>{seeCreds ? userToken : '* * * * * * * * * * * * * * * * * * * * *'}</span>

                                <br /><br />
                                Use this to send emails using Takeout.js, Takeout.py, or via a POST request.
                                If your token leaks, contact us immediately and we'll try to assist you.
                                <br /><br /><br/>
                                <a href="https://github.com/Takeout-bysourfruit/takeout.docs" className={styles.blueButton}>Read the documentation</a>
                            </h2>
                        </div>
                    </section>
                    <div style={{height: '60vh', minHeight: '600px'}} />
                </section>
            </main>

            <Footer />
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const { req } = context;

    try {
        // Get the session
        const session = await getSession({ req });
        // If no session, redirect
        if (!session) return { redirect: { destination: '/flow/login', permanent: false } };
        // If session, get data
        const user = await fetch(`https://takeout.bysourfruit.com/api/get/ui?email=${session.user.email}`)
        const json = await user.json()
        const userData = json.plan

        return { props: { userData }}

    } catch (error) {
        console.log(error);
    }
}