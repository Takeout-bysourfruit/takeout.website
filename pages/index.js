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
import * as Icon from "phosphor-react";

import Head from 'next/head'
import React from "react"
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'
import round from 'round'
import CountUp from 'react-countup';
import axios from 'axios';

export default function Home(props) {
    const [href, setHREF] = useState('/flow/on-board')
    const [buttText, setText] = useState('Get started')
    const [sent, setSent] = useState(0)
    const [takeoutPlus, setTakeout] = useState(false)

    const [randomHTML, setRandomHTML] = useState(<div style={{ marginTop: '40px' }}><a onClick={() => { signIn('github', { callbackUrl: '/#pricing' }) }} className={styles.blueButton}>Login to subscribe</a><h4 className={styles.tinyPrint}>You'll have to login in order to subscribe to Takeout+</h4></div>)
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            setHREF('/dashboard')
            setText('Get emailin\'')
        }
        setSent(round(`${props.allSent.stats}`, 1000, 'up'))
    }, [status, props.allSent.status])


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




    useEffect(() => {
        if (status === "authenticated") {
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
                <section className={styles.firstHomeSection} style={{ marginBottom: '100px' }} id="sectionContent">
                    <div className={styles.firstDivImage}>
                        <img src="sentsucc.png" width='300px' />
                    </div>

                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            The easier way to <b>send emails to millions</b>
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            Use Takeout and send millions of transactional emails without fear of being charged extraordinary amounts.
                        </h2>
                        <div className={styles.buttonContainer}>
                            <a href={href} className={styles.blueButton} style={{ verticalAlign: 'middle' }}>{buttText} <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                            <div className={styles.buttonTextInside}>
                                <b>Start building with Takeout for free.</b>
                                <br />
                                <span className={styles.skinnyText}>Questions? <a className={styles.supportLink} href="mailto:takeout@bysourfruit.com?subject=Question about Takeout">Contact our support team</a></span>
                            </div>
                        </div>
                    </div>
                </section>


                <section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <h1 className={styles.miniSectionText} style={{ maxWidth: '600px' }}>
                        Over <CountUp start={0} end={sent} duration={4} separator="," suffix=" emails" /> sent using Takeout
                    </h1>
                </section>


                <section className={styles.furtherSections} style={{ marginBottom: '100px' }} id="sectionContent">
                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            Set Takeout up <b>in minutes</b>
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            With easy to use packages (JavaScript and Python, more coming soon) and a simple yet well-documented API allows developers to quickly send emails using any programming language and an internet connection.
                        </h2>
                        <div className={styles.buttonContainer}>
                            <a href='https://takeout.js.org' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Takeout.js <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                            <a href='https://github.com/Takeout-bysourfruit/takeout.py' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Takeout.py <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                        </div>
                        <br />
                        <div className={styles.buttonTextInside2} style={{ lineHeight: '25px' }}>
                            <b>Can't find a package for your language?</b><br />
                            <span className={styles.skinnyText}>We encourage others to build API wrappers for Takeout, or you can <a className={styles.supportLink} href='https://github.com/Takeout-bysourfruit/takeout.docs#using-the-api-'>use the API yourself.</a></span>
                        </div>
                    </div>

                    <div className={styles.secondDivImage}>
                        <img src="code/odp.png" className={styles.marketingImageHome} />
                    </div>
                </section>


                <section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <div className={styles.textCunt}>
                        <h1 className={styles.miniSectionText}>
                            Amazing deliverability
                        </h1>
                        <h2 className={styles.miniSectionMiniText}>
                            Takeout isn't meant to send promotional emails, and we're making sure those emails are sent through the same, but different infrastructure. This work allows your transactional emails to almost never make it into someone's spam folder.
                        </h2>
                    </div>
                </section>


                <section className={styles.furtherSections} style={{ marginBottom: '50px' }} id="sectionContent">
                    <div className={styles.firstDivImage}>
                        <img src="pig.png" width='300px' />
                    </div>

                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            The most affordable way to <b>send emails to millions</b>
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            Takeout's pricing structure is extremely simple, and provides amazing features for $3 a month.
                        </h2>

                    </div>
                </section>

                <section className={styles.pricingHome} style={{ marginBottom: '100px' }} id="pricing">
                    <div className={styles.pricingCards}>
                        <div className={styles.pricingCardSingle} id="sectionContent">
                            <h1 className={styles.pricingCardTier}>
                                Free
                            </h1>
                            <h2 className={styles.pricingCardDesc} style={{ marginBottom: '40px' }}>
                                Perfect for small projects.<br />Free, forever.
                            </h2>
                            <ul className={styles.pricingList} style={{ marginBottom: '40px' }}>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Send up to 500 emails per month</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Access to Takeout's API/packages</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Webooks</li>
                                <li className={styles.pricingListLI}><Icon.XSquare className={styles.xIcon} weight="bold" /> <span className={styles.striketh}>Setting a custom email</span></li>
                                <li className={styles.pricingListLI}><Icon.XSquare className={styles.xIcon} weight="bold" /> <span className={styles.striketh}>Takeout Cloud</span></li>
                                <li className={styles.pricingListLI}><Icon.XSquare className={styles.xIcon} weight="bold" /> <span className={styles.striketh}>Early-access to new features</span></li>
                                <li className={styles.pricingListLI}><Icon.XSquare className={styles.xIcon} weight="bold" /> <span className={styles.striketh}>Priority Support</span></li>
                            </ul>
                            <a href="https://github.com/Takeout-bysourfruit/takeout.docs" className={styles.blueButton}>Read Takeout's documentation</a>
                            <h4 className={styles.tinyPrint}>You're automatically enrolled in the free plan when signing up for Takeout</h4>
                        </div>

                        <div className={styles.pricingCardSingle} id="sectionContent">
                            <h1 className={styles.pricingCardTier}>
                                Takeout+
                            </h1>
                            <h2 className={styles.pricingCardDesc} style={{ marginBottom: '40px' }}>
                                Get awesome benefits, <br /> for $3 a month.
                            </h2>
                            <ul className={styles.pricingList}>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Send unlimited emails</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Access to Takeout's API/packages</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Webooks</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Setting a custom email</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Takeout Cloud</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Early-access to new features</li>
                                <li className={styles.pricingListLI}><Icon.CheckSquare className={styles.checkIcon} weight="bold" /> Priority Support</li>
                            </ul>

                            {randomHTML}

                        </div>
                    </div>
                </section>

                {
                // ONLY WHEN WE ACTUALLY GET 1000+ USERS!!!!!!!!!!!!!!
                /*<section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <div className={styles.textCunt}>
                        <h1 className={styles.miniSectionText} >
                            Dependable sending at scale
                        </h1>
                        <h2 className={styles.miniSectionMiniText}>
                            Send 500 emails or 500 million with confidence, knowing Takeout has sent over {sent} emails since August 2022.
                        </h2>
                    </div>
                </section>*/}

                <section className={styles.miniHomeSection} style={{ marginBottom: '100px' }}>
                    <div className={styles.textCunt}>
                        <h1 className={styles.miniSectionText} >
                            Built for developers
                        </h1>
                        <h2 className={styles.miniSectionMiniText}>
                            We're not trying to appeal to giant enterprises with $10,000 tiers. We won't spam you to buy Takeout+, we won't lock cool features behind paywalls.
                        </h2>
                    </div>
                </section>

                <section className={styles.furtherSections} style={{ marginBottom: '100px' }} id="sectionContent">
                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            The service with a <br/><b>??? Cloud ???</b>
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            Takeout Cloud stores your recently sent emails (up to 48 hours) and your templates (indefinitely) that are retrievable using Takeout's packages or API.
                        </h2>
                        <div className={styles.buttonContainer}>
                            <a href='/flow/on-board' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Sign up and float in the clouds <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                        </div>
                        <br />
                        <div className={styles.buttonTextInside2} style={{ lineHeight: '25px' }}>
                            <b>*You won't actually float in clouds</b><br />
                            {/*<span className={styles.skinnyText}>We'd love it if you <a className={styles.supportLink} href='https://twitter.com/intent/tweet?text=.%40useTakeout+I+got+an+idea%21'>tweeted at us!</a></span>*/}
                            <span className={styles.skinnyText}>If you know how to accomplish such a feat, please <a className={styles.supportLink} href='https://twitter.com/useTakeout'>tweet at us.</a></span>
                        </div>
                    </div>

                    <div className={styles.secondDivImage}>
                        <img src="tcloud2.png" width='300px' />
                    </div>
                </section>

                <section className={styles.miniHomeSection}>
                    <div className={styles.textCunt}>
                        <h1 className={styles.miniSectionText} >
                            We're currently in beta
                        </h1>
                        <h2 className={styles.miniSectionMiniText}>
                            Takeout launched in the early Fall of 2022 and certainly isn't perfect. We're trying to make it, though ????. We'll be adding more and more features. Stay tuned!
                        </h2>
                    </div>
                </section>


                {/*<section className={styles.furtherSections} style={{ marginBottom: '100px' }} id="sectionContent">
                <div className={styles.secondDivImage}>
                        <img src="options.png" width='300px' />
                    </div>

                    <div className={styles.firstDivText}>
                        <h1 className={styles.homeHook} style={{ marginBottom: '30px' }}>
                            The service that's <b>updated constantly.</b>
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            Takeout gets updated almost every day, adding new features to the dashboard, API, and packages.
                        </h2>
                        <div className={styles.buttonContainer}>
                            <a href='https://paypal.me/s0urfruit' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Donate <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                            <a href='https://github.com/Takeout-bysourfruit' className={styles.blueButton} style={{ verticalAlign: 'middle' }}>Contribute on GitHub <Icon.CaretRight className={styles.buttIcon} style={{ fontSize: '1.1rem' }} weight='bold' /> </a>
                        </div>
                        <br />
                        <div className={styles.buttonTextInside2} style={{ lineHeight: '25px' }}>
                            <b>Have a suggestion for a new feature?</b><br />
                            <span className={styles.skinnyText}>We'd love it if you <a className={styles.supportLink} href='https://twitter.com/useTakeout'>tweeted at us!</a></span>
                        </div>
                    </div>
                </section>*/}

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