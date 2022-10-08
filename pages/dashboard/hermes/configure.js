/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import * as Icon from "phosphor-react";
import React from "react"

import styles from '../../../styles/homie/db.module.css'
import mmstyles from '../../../styles/Home.module.css'

import Loader from '../../../components/loader'
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

import Switch from 'react-switch'

export default function Dashboard(props) {

    const [verifyIsOpen, setIsOpen] = useState(false);
    const [modifyOpen, openModify] = useState(false);

    const [loading, setLoading] = useState(true);
    const [userToken, setToken] = useState('')
    const [takeout, setTakeout] = useState(false)


    function openModal() {
        setIsOpen(true);
        setError('')
    }

    function verifyClose() {
        setIsOpen(false);
    }

    const rand = function () {
        return Math.random().toString(24).substr(2)
    };

    function createTxt() {
        return rand().toUpperCase() + rand().toUpperCase()
    }

    const [generatedTxt, generateTXT] = useState('')
    const [cDomain, setCDomain] = useState('')

    const [error, setError] = useState('')
    const [dnsError, setDNSError] = useState('DNS changes can take hours to propagate. Takeout won\'t save your progress until you completely register a custom email.')
    const [cisVerified, setCisVerified] = useState(false)

    const [vDP, setVDP] = useState(false)

    const domainChange = event => {
        setCDomain(event.target.value)
    };

    async function verifyDomain() {
        const txt = createTxt()
        generateTXT(txt)

        if (cDomain.length === 0) {
            setError('Enter a domain first...')
        } else {
            setVDP(true)
            let domain = (new URL(cDomain));
            domain = domain.hostname.replace('www.', '');
            setCDomain(domain)
        }
    }

    async function retryDomain() {
        setDNSError('DNS changes can take hours to propagate. Takeout won\'t save your progress until you completely register a custom email.')
        const res = await fetch(`https://takeout.bysourfruit.com/api/get/dns?token=${userToken}&domain=${cDomain}&generatedTXT=${generatedTxt}`)
        const json = await res.json()

        if (json.isVerified === true) {
            setCisVerified(true)
            return true
        } else {
            setDNSError("Couldn't verify, try again.")
            return false
        }
    }

    const [fromInput, setFrom] = useState('')
    const [hostInput, setHost] = useState('')
    const [passwordInput, setPass] = useState('')
    
    async function saveEmail() {
        axios.post(`/api/email/change`, {
            token: userToken,
            from: fromInput,
            host: hostInput,
            password: passwordInput,
            changed: true,
        })
            .then(function (response) {
                verifyClose()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function resetEmail() {
        if (confirm("Are you sure you'd like to reset your email configuration? If you do, your emails will send from takeout@bysourfruit.com.") == true) {
            axios.post(`/api/email/change`, {
                token: userToken,
                changed: false,
            })
            .then(function (response) {console.log('Reset')})
            .catch(function (error) {console.log(error)});

        } else {
            console.log('Cancelled')
        }
    }


    const [trackChecked, setTrackChecked] = useState(false)
    const [validChecked, setValidChecked] = useState(false)

    useEffect(() => {
        const { dateStarted, emails_sent, tracking} = props.userData.usageInfo
        const { name, email, token, plan } = props.userData

        if (plan === 'paid') setTakeout(true)

        setToken(token)
        setTrackChecked((tracking === 'true'))
        setLoading(false)

    }, [props])


    async function trackChange(value) {
        if (value === true) setTrackChecked(true)
        if (value === false) setTrackChecked(false)
        await fetch(`https://takeout.bysourfruit.com/api/user/update?token=${userToken}&track=${value}`)
    }

    async function validChange(value) {
        setValidChecked(value)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Configure | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Configure | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Configure | Takeout" />
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
                    <section className={styles.dashboardConfig}>
                        <h1 style={{textAlign: 'center'}} className={styles.dashboardYouSent}>Configure Takeout</h1>
                        <div className={styles.configureOption}>
                        <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                            <h2 className={styles.configureOptionHeading}>Custom email</h2>
                            <h3 className={styles.configureOptionDesc}>If you don't want to use takeout@bysourfruit.com, set a custom email to send emails from. Do note, Takeout will not host this email.</h3>
                            <span className={styles.error} id="error"></span>
                            {takeout ? <div><a id="configure" onClick={openModal} className={styles.blueButton} style={{marginRight: '10px'}}>Configure</a><a onClick={resetEmail} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Reset</a></div> : <div><a href="/#pricing" className={styles.blueButton}>Access this and loads of other features</a></div>}
                            <div style={{ marginBottom: '70px' }} />
                        </div>

                        <Modal
                        isOpen={verifyIsOpen}
                        onRequestClose={verifyClose}
                        style={customStyles}
                        contentLabel="Takeout DNS Modal"
                    >
                        {vDP ? (cisVerified ? (
                            <div>
                                <h1 className={mmstyles.headingWhite}>Yay!</h1>
                                <h2 className={mmstyles.descriptionWhite}>
                                    {cDomain} has been verified. Don't remove the TXT record, as we may check for it periodically. Now, add your email's credentials. We'll try to keep them secure.
                                </h2>

                                <input onChange={e => { setFrom(e.currentTarget.value); }} type='text' placeholder="test@example.com" className={mmstyles.widgetInput} id="from" />
                                <input onChange={e => { setPass(e.currentTarget.value); }} type='password' placeholder="verySecure123)" className={mmstyles.widgetInput} id="password" />
                                <input onChange={e => { setHost(e.currentTarget.value); }} type='text' placeholder="http://smtp.example.com" className={mmstyles.widgetInput} id="host" /><br /><br />

                                <a onClick={saveEmail} style={{ background: 'white', color: 'black' }} className={mmstyles.blueButton}>Save</a><a onClick={() => { setVDP(false); cisVerified(false) }} style={{ background: 'var(--accent-color-danger' }} className={mmstyles.blueButton}>Retreat</a>
                            </div>
                        ) : (
                            <div>
                                <h1 className={mmstyles.headingWhite}>Add the TXT record</h1>
                                <h2 className={mmstyles.descriptionWhite}>
                                    You'll need to add a TXT record that looks like: <br /><br />
                                    _takeoutverify.{cDomain}<br /> with an answer of {generatedTxt}
                                </h2>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>{dnsError}</span><br /><br />
                                <a onClick={retryDomain} style={{ background: 'white', color: 'black' }} className={mmstyles.blueButton}>Try</a><a onClick={() => { setVDP(false) }} style={{ background: 'var(--accent-color-danger' }} className={mmstyles.blueButton}>Retreat</a>
                            </div>
                        )) : (
                            <div>
                                <h1 className={mmstyles.headingWhite}>First and foremost...</h1>
                                <h2 className={mmstyles.descriptionWhite}>
                                    We'll have to verify you own the domain you want to send emails from.
                                    Once you submit your domain, you'll have to add a TXT record to verify it's yours.
                                </h2>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
                                <input
                                    type='text'
                                    onChange={domainChange}
                                    value={cDomain}
                                    placeholder="http://test.com"
                                    className={mmstyles.widgetInput}
                                    id="from" />
                                <br /><br />

                                <a onClick={verifyDomain} style={{ background: 'white', color: 'black' }} className={mmstyles.blueButton}>Verify</a><a onClick={verifyClose} style={{ background: 'var(--accent-color-danger' }} className={mmstyles.blueButton}>Cancel</a>
                            </div>
                        )}

                    </Modal>

                    <div className={styles.configureOption}>
                        <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                            <h2 className={styles.configureOptionHeading}>Track email opens</h2>
                            <h3 className={styles.configureOptionDesc}>Set whether or not Takeout adds additional HTML to your emails to track once an email is opened. This feature is only available for HTML emails and may not work due to email client protections.</h3>
                            <Switch onChange={trackChange} checked={trackChecked} />
                        </div>
                    </div>
                    <div style={{opacity: '0.5'}}  className={styles.configureOption}>
                        <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                            <h2 className={styles.configureOptionHeading}>Coming soon: Email validation</h2>
                            <h3 className={styles.configureOptionDesc}>Set whether or not Takeout attempts to verify email validity via MX records and attempting to connect via SMTP. If either fails, Takeout will still try to send the email but will notify you that the email may have bounced.</h3>
                            <Switch disabled onChange={validChange} checked={validChecked} />
                        </div>
                    </div>

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

        return { props: { userData }}

    } catch (error) {
        console.log(error);
    }
};
