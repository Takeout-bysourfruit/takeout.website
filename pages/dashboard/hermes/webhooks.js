/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"

import styles from '../../../styles/homie/db.module.css'
import mmstyles from '../../../styles/Home.module.css'

import Loader from '../../../components/loaders/loader'
import TopBar from '../../../components/homie/topbar'
import DashTop from '../../../components/homie/dashtop'
import SideBar from '../../../components/homie/sidebar'
import Footer from '../../../components/footer'
import { useSession, getSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import axios from "axios"

import Modal from 'react-modal';
const customStyles = {
    content: {
        backgroundColor: 'rgb(31, 32, 46)',
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        minWidth: '500px',
    },
};

Modal.setAppElement("#__next");

export default function Dashboard(props) {
    const [verifyIsOpen, setIsOpen] = useState(false);
    const [pageTwo, setPageTwo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [userToken, setToken] = useState('')
    const [takeout, setTakeout] = useState(false)


    function openModal() {
        setIsOpen(true);
    }

    function verifyClose() {
        setIsOpen(false);
        setPageTwo(false)
        setError('')
        setButtTextVerify('Send test')
    }

    const [webURL, setWebURL] = useState('')
    const [error, setError] = useState('')

    const urlChanged = event => {
        setWebURL(event.target.value)
    };

    function isValidURL(urlString) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

        return !!urlPattern.test(urlString);
    }

    async function verifyDomain() {
        setError('')

        if (webURL.length === 0) {
            setError('Enter a URL first')
        } else {
            if (isValidURL(webURL)) {
                console.log(isValidURL(webURL))
                setPageTwo(true)
                await createWebhook()
            } else {
                setError('Enter a valid URL')
            }
        }
    }

    const [verifyButtText, setButtTextVerify] = useState('Verify')

    async function createWebhook() {
        axios.post('https://verify-takeout.bysourfruit.com/verify/create', {
            webhook_url: webURL,
            token: userToken
        })
    }

    async function deleteWebhook() {
        if (confirm("Are you sure you'd like to reset your webhook configuration? If you do, you won't get notifications from us anymore.") == true) {
            axios.post('https://verify-takeout.bysourfruit.com/verify/delete', {
                token: userToken
            })
            .then(function (response) {console.log('Reset')})
            .catch(function (error) {console.log(error)});

        } else {
            console.log('Cancelled')
        }
    }

    async function sendTest() {
        setButtTextVerify('Sent successfully')

        axios.post('https://verify-takeout.bysourfruit.com/verify/test', {
            token: userToken
        })

        setTimeout(() => {setButtTextVerify('Retry?')}, 3000)
    }


    useEffect(() => {
        const { dateStarted, emails_sent, tracking } = props.userData.usageInfo
        const { name, email, token, plan } = props.userData
        if (plan === 'paid') setTakeout(true)
        setToken(token)
        setLoading(false)
    }, [props])


    return (
        <div className={styles.container}>
            <Head>
                <title>Webhooks | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Webhooks | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Webhooks | Takeout" />
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
                    <SideBar />
                    <section className={styles.dashboardConfig}>
                        <h1 style={{ textAlign: 'center' }} className={styles.dashboardYouSent}>Configure Webhooks</h1>
                        <div className={styles.configureOption}>
                            <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                                <h2 className={styles.configureOptionHeading}>Add an endpoint</h2>
                                <h3 className={styles.configureOptionDesc}>
                                    Takeout will send a POST request with JSON to a URL you specify.
                                    It'll include details like whether or not the email will *bounce, 
                                    and the email address Takeout tried delivering to. 
                                    Even if Takeout detects that an email may not deliver, 
                                    it'll try sending it anyways.
                                    <br/><br/>
                                    Takeout sends notifications for the following: 
                                    <ul>
                                        <li>- Email successfully sent</li>
                                        <li>- Email may bounce</li>
                                        <li>- Email opened</li>
                                    </ul>
                                    <br/>
                                    *Currently, Takeout doesn't check if an email <i>actually</i> bounces, it only does certain checks (email is correctly formed, domain has MX records, etc) and will send an event notification stating the email bounced if a check fails. <b>The only way to reliably verify that a supplied email is a working/valid email is to send an email with a verification link</b>.
                                </h3>
                                <span className={styles.error} id="error"></span>
                                <a id="configure" onClick={openModal} className={styles.blueButton} style={{marginRight: '10px'}}>Configure</a><a onClick={deleteWebhook} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Reset</a>
                            </div>

                            <Modal
                                isOpen={verifyIsOpen}
                                onRequestClose={verifyClose}
                                style={customStyles}
                                contentLabel="Takeout Webhook Modal"
                            >
                                {pageTwo ? (
                                    <div>
                                        <h1 className={mmstyles.headingWhite}>Now, let's test!</h1>
                                        <h2 className={mmstyles.descriptionWhite}>
                                            Takeout allows you to test whether or not you receive our notifications. You should receive JSON similar to this:<br/><br/>
                                            <code>{'{"bounced": true, "data": {"email": "pika@chu.com", "from": "takeout@bysourfruit.com"}}'}</code><br/><br/>
                                        </h2>
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
                                        <a onClick={sendTest} style={{ background: 'white', color: 'black', border: '2px solid white'}} className={mmstyles.blueButton}>{verifyButtText}</a><a onClick={verifyClose} style={{ background: 'transparent', border: '2px solid white'}} className={mmstyles.blueButton}>I got it / won't test</a>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className={mmstyles.headingWhite}>First and foremost...</h1>
                                        <h2 className={mmstyles.descriptionWhite}>
                                            We'll need the URL to send POST requests to. Include the protocol (http, https). If you set this up before, this new URL will overwrite the old one automatically.
                                        </h2>
                                        <span style={{ color: 'red', fontWeight: 'bold', display: error ? "block" : "none" }}>{error}<br /><br /></span>
                                        <input
                                            type='text'
                                            onChange={urlChanged}
                                            value={webURL}
                                            placeholder="http://test.com/api/post"
                                            className={mmstyles.widgetInput}
                                            id="from" />
                                        <br /><br />

                                        <a onClick={verifyDomain} style={{ background: 'white', color: 'black' }} className={mmstyles.blueButton}>Confirm</a><a onClick={verifyClose} style={{ background: 'var(--accent-color-danger' }} className={mmstyles.blueButton}>Cancel</a>
                                    </div>
                                )}

                            </Modal>
                        </div>
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

        return { props: { userData } }

    } catch (error) {
        console.log(error);
    }
};
