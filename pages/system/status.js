/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-target-blank */
import styles from '../../styles/homie/Revamp.module.css'
import WidgetLoading from '../../components/loaders/widget'
import TopBar from '../../components/homie/topbar'
import Footer from '../../components/footer'
import * as Icon from "phosphor-react";
import Head from 'next/head'
import React from "react"
import { useState, useEffect } from 'react'


export default function Home(props) {
    const [message, setMessage] = useState(<b style={{color: 'green'}}>operating normally.</b>)
    const [json, setJSON] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('https://takeout.bysourfruit.com/api/service/status')
            const uptime = await res.json()
            setJSON(uptime)
            uptime.isDown ? setMessage(<b style={{color: 'red'}}>operating with disruptions.</b>) : console.log('It ok')
            setTimeout(() => { setLoading(false) }, 1500)
        }

        getData()
    }, [props])

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('#sectionContent')

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry)
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                }
            })
        })

        hiddenElements.forEach((el) => observer.observe(el))
    }, [props])


    return (
        <div className={styles.container}>
            <Head>
                <title>System Status | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, mail in python, sendgrid, product hunt, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverflow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="System Status | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="System Status | Takeout" />
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
            <TopBar />
            <main className={styles.main} style={{ marginTop: '30px' }}>
                <section className={styles.firstHomeSection} style={{ marginBottom: '100px' }} id="sectionContent">
                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            Takeout is currently {message}
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            In the last 7 days, Takeout has had {json.disruption ? json.disruption : 0} service disruptions.
                        </h2>
                        <div className={styles.buttonContainer}>
                            <a href="https://twitter.com/useTakeout" className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Notify us <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                            <div className={styles.buttonTextInside}>
                                <b>Experiencing degraded service?</b>
                                <br />
                                <span className={styles.skinnyText}>Please tweet at us!</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.statusSection} style={{ marginBottom: '100px' }} id="sectionContent">
                    {!loading ? (
                        <div className={styles.statusMore}>
                            <div className={styles.statusWidget}>
                                <div className={json.api ? styles.greenCircle : styles.redCircle} /> Takeout <b>API</b><br/><div className={styles.statusDesc}>{json.api ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.api ? styles.greenCircle : styles.redCircle} /> Takeout <b>Auth Engine</b><br/><div className={styles.statusDesc}>{json.api ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.cloud ? styles.greenCircle : styles.redCircle} /> Takeout <b>Cloud</b><br/><div className={styles.statusDesc}>{json.cloud ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.dns ? styles.greenCircle : styles.redCircle} /> Takeout <b>DNS</b><br/><div className={styles.statusDesc}>{json.dns ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.api ? styles.greenCircle : styles.redCircle} /> Takeout <b>Email Services</b><br/><div className={styles.statusDesc}>{json.api ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.cloud ? styles.greenCircle : styles.redCircle} /> Takeout <b>Paperbase</b><br/><div className={styles.statusDesc}>{json.cloud ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.paypal ? styles.greenCircle : styles.redCircle} /> Takeout <b>Payments</b><br/><div className={styles.statusDesc}>{json.paypal ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.cs ? styles.greenCircle : styles.redCircle} /> Takeout <b>Support</b><br/><div className={styles.statusDesc}>{json.cs ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.tracking ? styles.greenCircle : styles.redCircle} /> Takeout <b>Tracking</b><br/><div className={styles.statusDesc}>{json.tracking ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.bounce ? styles.greenCircle : styles.redCircle} /> Takeout <b>Verify Engine</b><br/><div className={styles.statusDesc}>{json.bounce ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.webhooks ? styles.greenCircle : styles.redCircle} /> Takeout <b>Webhooks</b><br/><div className={styles.statusDesc}>{json.webhooks ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.statusWidget}>
                                <div className={json.site ? styles.greenCircle : styles.redCircle} /> Takeout's <b>Website</b><br/><div className={styles.statusDesc}>{json.site ? <span style={{color: 'green'}}>Available</span> : <span style={{color: 'red'}}>Unavailable</span>}</div>
                            </div>

                            <div className={styles.lastUpdatedWidget}>
                                Last updated on {(new Date()).toLocaleString([], {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: 'numeric',month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric'})} {new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                    </div>
                ) : (
                    <WidgetLoading/>
                )}
                </section>

            </main>
            <Footer />

        </div>
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch('https://takeout.bysourfruit.com/api/get/stats')
    const uptime = await res.json()
    return { props: { uptime } }
}