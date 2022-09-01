/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-target-blank */
import styles from '../styles/homie/Revamp.module.css'
import TopBar from '../components/homie/topbar'
import Footer from '../components/footer'
import PayPal from '../components/homie/paypal'


import Head from 'next/head'
import React from "react"
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'
import round from 'round'
import CountUp from 'react-countup';
import axios from 'axios';

export default function Home(props) {
    const [href, setHREF] = useState('/flow/on-board')
    const [buttText, setText] = useState('Get started with Takeout 👀')
    const [sent, setSent] = useState(0)
    const [takeoutPlus, setTakeout] = useState(false)
    
    const [randomHTML, setRandomHTML] = useState(<div style={{ marginTop: '40px' }}><a onClick={() => { signIn('github', { callbackUrl: '/#pricing' }) }} className={styles.blueButton}>Login to subscribe</a><h4 className={styles.tinyPrint}>You'll have to login in order to subscribe to Takeout+</h4></div>)
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            setHREF('/dashboard')
            setText('Explore Takeout\'s Dashboard 👀')
        }
        setSent(round(`${props.allSent.stats}`, 50, 'up'))
    }, [status, props.allSent.status])

    useEffect(() => {
        setSent(round(`${props.allSent.stats}`, 50, 'up'))
    }, [props.allSent.status])


    useEffect(() => {
        console.log('Running fetch bitchy')
        if (status === "authenticated") {
            console.log('Authenticated, checking plan status')
            axios.get(`/api/get/status?email=${session.user.email}`)
                .then(function (response) {
                    const planData = response.data.plan
                    if (planData === 'paid') {
                        setTakeout('true')
                        setRandomHTML(<div style={{ marginTop: '40px' }}>
                            <a href='/dashboard' className={styles.blueButton}>Go to Dashboard</a>
                            <h4 className={styles.tinyPrint}>Thanks for subscribing! We hope Takeout+ not only matches, but exceeds your expectations.</h4>
                        </div>)
                    } else if (planData === 'free') {
                        setRandomHTML(<PayPal id="thefuckingPayPal" />)
                    } else if (!planData) {
                        setRandomHTML(`Some error has happened, and has clearly been forseen (considering the error is being 'handled') - kindly contact Sourfruit with the error code of "PLAN500" and possibly receive a prize of sorts.`)
                    }
                })
                .catch(function (error) {
                    setDescription(`Some error has happened, and has clearly been forseen (considering the error is being 'handled') - kindly contact Sourfruit with the error code of "PLAN500" and possibly receive a prize of sorts.`)
                    console.log(error);
                });
        }
    }, [status, session])


    return (
        <div className={styles.container}>
            <Head>
                <title>Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, mail in python, sendgrid, product hunt, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverflow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
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
            <TopBar />
            <main className={styles.main} style={{ marginTop: '30px' }}>
                <section className={styles.firstHomeSection} style={{ marginBottom: '100px' }}>
                    <h1 className={styles.hookText} style={{ marginBottom: '30px' }}>
                        Sending emails to users has never been easier
                    </h1>
                    <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                        Use Takeout and send transactional emails to millions without fear of being charged extraordinary amounts.
                    </h2>
                    <a href={href} className={styles.blueButton}>{buttText}</a>
                    <br/><br/>
                    <a href="https://www.producthunt.com/posts/takeout?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-takeout" target="_blank"><img className={styles.producthunt} src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=356489&theme=light" alt="Takeout - Just&#0032;another&#0032;email&#0032;service&#0046;&#0032;But&#0032;10x&#0032;better&#0046; | Product Hunt" /></a>
                </section>


                <section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <h1 className={styles.miniSectionText}>
                        Over <CountUp start={0} end={sent} duration={3.69} separator="," suffix=" emails" onEnd={() => console.log('Ended! 👏')} onStart={() => console.log('Started! 💨')} /> sent using Takeout
                    </h1>
                </section>


                <section className={styles.furtherSections} style={{ marginBottom: '100px' }}>
                    <h1 className={styles.secondaryHookText} style={{ marginBottom: '30px' }}>
                        Set Takeout up in minutes
                    </h1>
                    <h2 className={styles.secondaryReelinText}>
                        With easy to use packages (JavaScript and Python, more coming soon) and a simple yet well-documented API allows developers to quickly send emails using any programming language and an internet connection.
                    </h2>
                    <img src="https://i.ibb.co/HCHTVSb/Marketing-Image-4.png" className={styles.marketingImageHome} />
                    
                    {/*<img src="https://i.ibb.co/hgTQ5Hz/Marketing-Image-3.png" className={styles.marketingImageHome} /> */}
                </section>



                {/*<section className={styles.miniHomeSection2} style={{ marginBottom: '150px' }}>
                    <div className={styles.miniSection2Card}>
                    <h1 className={styles.miniSectionText}>
                        Amazing deliverability
                    </h1>
                    <h2 className={styles.miniSectionMiniText} style={{marginTop: '-70px'}}>
                            Takeout isn't meant to send promotional emails, and we're making sure those emails are sent through the same, but different infrastructure. This work allows your transactional emails to almost never make it into someone's spam folder.
                        </h2>
                    </div></section>*/}



                <section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <h1 className={styles.miniSectionText}>
                        Amazing deliverability
                    </h1>
                    <h2 className={styles.miniSectionMiniText} style={{ marginTop: '-70px' }}>
                        Takeout isn't meant to send promotional emails, and we're making sure those emails are sent through the same, but different infrastructure. This work allows your transactional emails to almost never make it into someone's spam folder.
                    </h2>
                </section>


                <section className={styles.pricingHome} style={{ marginBottom: '100px' }} id="pricing">
                    <h1 className={styles.secondaryHookText} style={{ marginBottom: '30px' }}>
                        Pricing
                    </h1>
                    <h2 className={styles.secondaryReelinText} style={{ marginBottom: '60px' }}>
                        Explore Takeout's simple pricing structure.
                    </h2>
                    <div className={styles.pricingCards}>
                        <div className={styles.pricingCardSingle}>
                            <h1 className={styles.pricingCardTier}>
                                Free
                            </h1>
                            <h2 className={styles.pricingCardDesc} style={{ marginBottom: '40px' }}>
                                Perfect for small projects.<br />Free, forever.
                            </h2>
                            <ul className={styles.pricingList} style={{ marginBottom: '40px' }}>
                                <li className={styles.pricingListLI}>✅ Send up to 500 emails per month</li>
                                <li className={styles.pricingListLI}>✅ Access to Takeout's API and packages</li>
                                <li className={styles.pricingListLI}>❌ <span className={styles.striketh}>Setting a custom email</span></li>
                                <li className={styles.pricingListLI}>❌ <span className={styles.striketh}>Early-access to new features</span></li>
                                <li className={styles.pricingListLI}>❌ <span className={styles.striketh}>Priority Support</span></li>
                            </ul>
                            <a href="https://github.com/Takeout-bysourfruit/takeout.docs" className={styles.blueButton}>Read Takeout's documentation</a>
                            <h4 className={styles.tinyPrint}>You're automatically enrolled in the free plan when signing up for Takeout</h4>
                        </div>

                        <div className={styles.pricingCardSingle} >
                            <h1 className={styles.pricingCardTier}>
                                Takeout+
                            </h1>
                            <h2 className={styles.pricingCardDesc} style={{ marginBottom: '40px' }}>
                                Get awesome benefits, <br /> for $3 a month.
                            </h2>
                            <ul className={styles.pricingList}>
                                <li className={styles.pricingListLI}>✅ Send unlimited emails</li>
                                <li className={styles.pricingListLI}>✅ Access to Takeout's API and packages</li>
                                <li className={styles.pricingListLI}>✅ Setting a custom email</li>
                                <li className={styles.pricingListLI}>✅ Early-access to new features</li>
                                <li className={styles.pricingListLI}>✅ Priority Support</li>
                            </ul>
                            {/* 
                            DO THE RANDOM HTML BULLSHIT
                            <PayPal id="thefuckingPayPal" />
                            */} 
                            {randomHTML}
                            
                        </div>
                    </div>
                </section>

                <section className={styles.miniHomeSection}>
                    <h1 className={styles.miniSectionText} >
                        We're currently in beta
                    </h1>
                    <h2 className={styles.miniSectionMiniText} style={{ marginTop: '-30px' }}>
                        Takeout launched in August 2022, and certainly isn't perfect. We're trying to be, though 😉. We'll be adding more and more features over the next couple of months. Stay tuned!
                    </h2>
                </section>
            </main>
            <Footer />

        </div>
    )
}

Home.getInitialProps = async () => {
    const res = await fetch('https://takeout.bysourfruit.com/api/get/stats')
    const allSent = await res.json()
    return { allSent }
}
