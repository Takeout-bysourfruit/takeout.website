/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../../../styles/homie/db.module.css'

import Lstyles from '../../../styles/loader.module.css'

import WidgetLoading from '../../../components/loaders/widget'


import TopBar from '../../../components/homie/topbar'
import DashTop from '../../../components/homie/dashtop'
import SideBar from '../../../components/homie/sidebar'
import Footer from '../../../components/footer'
import { useSession, getSession } from "next-auth/react"
import { useState, useEffect } from 'react'

export default function Dashboard(props) {
    const [loading, setLoading] = useState(true)
    const [emails, setEmails] = useState([])
    const [userToken, setToken] = useState('')

    useEffect(() => {
        const { dateStarted, emails_sent } = props.userData.usageInfo
        const { name, email, token, plan } = props.userData
        setToken(token)
        setEmails(props.emailData.items)
        setTimeout(() => { setLoading(false) }, 1000)
    }, [props])


    

    return (
        <div className={styles.container}>
            <Head>
                <title>Recent Emails | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Recent Emails | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Recent Emails | Takeout" />
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

            <DashTop />
            {/* Serves as the mobile dashboard menu too ^^' */}
            <main className={styles.main}>
                <section className={styles.dashboardfuck}>
                    <SideBar />
                    <section className={styles.dashboardRecent}>

                        <h1 style={{ textAlign: 'center' }} className={styles.dashboardYouSent}>Recent emails</h1>
                        {!loading ? (
                            <div className={styles.recentEmails}>
                                {emails.length === 0 ? (
                                    <h2 className={styles.dashboardYouDesc} style={{ textAlign: 'center' }}>
                                        You haven't sent any emails recently.
                                    </h2>
                                ) :
                                    emails.map((email) => (
                                        <div key={email.key} className={styles.recentEmail} style={{ marginBottom: '10px' }}>
                                            <b>To:</b>&nbsp;{email.exchange.to}<br />
                                            <b>Subject:</b>&nbsp;{email.subject}<br />
                                            <b>Opened:&nbsp;</b>{email.bodies.text ? <span>Not Tracked</span> : <span>{email.track.wasOpened ? 'Yes' : 'No/Unknown'}</span>}<br />
                                            <b>{email.bodies.text ? 'Text' : 'HTML'}:</b>&nbsp;{email.bodies.text ? email.bodies.text.substring(0, 48) + ' ...' : <span style={{ color: 'rgb(23,63,156)', fontWeight: 'bold' }}><a href={`/preview/${email.key}`} target="_blank">View HTML email in new tab</a></span>}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <WidgetLoading/>
                        )}
                    </section>

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

        // get the emails here too
        const emails = await fetch(`https://takeout.bysourfruit.com/api/get/emails?token=${userData.token}`)
        const ejson = await emails.json()
        const emailData = ejson.emails

        return { props: { userData, emailData } }

    } catch (error) {
        console.log(error);
    }
}