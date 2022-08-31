/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import * as Icon from "phosphor-react";
import React from "react"
import styles from '../../styles/Home.module.css'
import Loader from '../../components/loader'
import TopBar from '../../components/topbar'
import Footer from '../../components/footer'
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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


export default function Dashboard() {
    const [verifyIsOpen, setIsOpen] = useState(false);
    const [modifyOpen, openModify] = useState(false);

    const [loading, setLoading] = useState(true);
    const [emails, setEmails] = useState([])

    const [desc, setDesc] = useState('')
    const [plan, setPlan] = useState('free')
    const [userToken, setToken] = useState('')
    const [sent, setSent] = useState('')
    const [ohNo, setOhNo] = useState('sent.png')
    const [takeout, setTakeout] = useState(false)
    const [lolHREF, setLOLHREF] = useState('https://github.com/Takeout-bysourfruit/takeout.docs')
    const [snarkyButton, setButt] = useState("Read Takeout's documentation")

    const router = useRouter();
    const { data: session, status } = useSession()
    useSession({
        required: true,
        onUnauthenticated() {
            router.push('/flow/login')
        },
    })

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
    const [cEmail, setCEmail] = useState('')
    const [cDomain, setCDomain] = useState('')

    const [error, setError] = useState('')
    const [dnsError, setDNSError] = useState('DNS changes can take hours to propagate. Takeout won\'t save your progress until you completely register a custom email.')
    // const [cVerify, setCVerify] = useState('')
    const [cisVerified, setCisVerified] = useState(false)

    const [vDP, setVDP] = useState(false)

    const handleChange = event => {
        setCDomain(event.target.value);
        console.log('value is:', event.target.value);
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
                .then(function (response) {
                    console.log('Reset')

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('Cancelled')
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            axios.get(`/api/get/ui?email=${session.user.email}`)
                .then(function (response) {
                    const rJSON = response.data.plan
                    console.log('user:')
                    createDescription(rJSON.name, rJSON.plan, rJSON.usageInfo.emails_sent, rJSON.usageInfo.dateStarted)
                    setToken(rJSON.token)
                })
                .catch(function (error) {
                    console.log(error);
                })

            axios.get(`/api/get/emails?token=${userToken}`)
                .then(function (response) {
                    const eJSON = response.data.emails.items
                    setEmails(eJSON)
                    console.log(JSON.stringify(eJSON))
                })
                .catch(function (error) {
                    console.log(error);
                });

            setTimeout(() => { setLoading(false) }, 1000)
        }
    }, [status, session])

    function createDescription(name, plan, emails_sent, dateStarted) {
        const options = { month: 'long' };
        const date = dateStarted.split('/')
        const now = new Date();
        const nownext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const next = new Intl.DateTimeFormat('en-US', options).format(nownext)

        let amountLeft
        let snarkyUpgrade

        if (plan === 'paid') { amountLeft = `infinite`; setTakeout(true) } else {amountLeft = 500 - emails_sent; snarkyUpgrade = `You'll get 500 more emails in ${next}. Upgrade to Takeout+ to enjoy unlimited emails. and more.` }
        if (amountLeft === 0) { setOhNo('ohno.png'); setButt(`Subscribe to Takeout+`); setLOLHREF('#buy') } else if (emails_sent === 0) { setOhNo('sad.png') } else { setOhNo('sent.png'); setButt("Read Takeout's documentation") }

        setDesc(`As of ${date[0]} ${date[1]}, you have ${amountLeft} emails left. `)
        setPlan(plan)
        setSent(`You've sent ${emails_sent} emails.`)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="Dashboard | A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverlow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Takeout" />
                <meta property="og:description" content="Dashboard | A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Takeout" />
                <meta name="twitter:description" content="Dashboard | A simple, affordable, developer-oriented email service." />
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

            <main className={styles.main}>
                <TopBar />
                <section className={styles.intro}>
                    <div className={styles.mumboJumbo}>
                        <h1 className={styles.headingWhite}>{sent}</h1>
                        <h2 className={styles.descriptionWhite}>{desc}</h2>
                        <a href={lolHREF} className={styles.whiteButton}>{snarkyButton}</a>
                    </div>
                    <div className={styles.jumboMumbo}>
                        <img className={styles.imgIntro} src={ohNo} alt="email" />
                    </div>
                </section>
                <section className={styles.widgetSection}>
                    <div id="lm" className={styles.widgetDashboard}>
                        <h1 className={styles.headingBlue}>
                            <Icon.Wrench weight="bold" className={styles.icon} />
                            <br />
                            Configure Takeout
                        </h1>
                        <h2 className={styles.widgetDescription}>
                            If you don't want to use takeout@bysourfruit.com, set a custom email to send emails from. Available only to Takeout+ subscribers.<br/><br/>
                            This feature is in beta, and may not alert you if an error occurs when configuring your email. If it doesn't, it may reveal itself during development. When in doubt, just reset your configuration via the convenient reset button.<br/><br/>
                            {takeout ? <b>Thanks for subscribing to Takeout+ - configure away!</b> : 'Subscribe to Takeout+ to configure this.'}
                            <br /><br />
                            <span className={styles.error} id="error"></span><br />
                            {takeout ? <div><a id="configure" onClick={openModal} className={styles.blueButton}>Configure</a><a onClick={resetEmail} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Reset</a></div> : <div><a href="/plans" className={styles.blueButton}>Access this and loads of other features</a></div>}
                        </h2>
                    </div>

                    <div className={styles.widgetDashboard}>
                        <h1 className={styles.headingBlue}>
                            <Icon.Envelope weight="bold" className={styles.icon} />
                            <br />
                            Recent emails
                        </h1>

                        <h2 className={styles.widgetDescription}>
                            {emails.length === 0 ? (
                                <>
                                    You haven't sent any emails recently. Recently is defined as within the last 48 hours.
                                </>
                            ) :
                                emails.map((email) => (
                                    <div className={styles.recentEmail} key={email.token}>
                                        <b>To:</b>&nbsp;{email.exchange.to}<br />
                                        <b>Subject:</b>&nbsp;{email.subject}<br />
                                        <b>Content:</b>&nbsp;{email.bodies.text ? email.bodies.text.substring(0, 51) + ' ...' : <span style={{ color: 'var(--background-navy-blue', fontWeight: 'bold' }}><a href={`/preview/${email.key}`} target="_blank">View HTML email in new tab</a></span>}
                                    </div>
                                ))}
                        </h2>
                    </div>

                    <div className={styles.widget}>
                        <h1 className={styles.headingBlue}>
                            <Icon.Eye weight="bold" className={styles.icon} />
                            <br />
                            Credentials
                        </h1>
                        <h2 className={styles.widgetDescription}>
                            <b>Your token:</b> {userToken}
                            <br /><br />
                            Use this to send emails using Takeout.js, Takeout.py, or via a POST request.
                            If your token leaks, contact us immediately and we'll try to assist you.
                            <br />
                            <br />
                            <a className={styles.anchor} href="https://www.npmjs.com/package/takeout.js">Takeout.js {'>'}</a>
                            <br /><br />
                            <a className={styles.anchor} href="https://github.com/Takeout-bysourfruit/takeout.py">Takeout.py {'>'}</a>
                        </h2>
                    </div>

                    <div id="buy" className={styles.widget}>
                        <h1 className={styles.headingBlue}>
                            <Icon.DotsThree weight="bold" className={styles.icon} />
                            <br />
                            Takeout+
                        </h1>

                        <h2 className={styles.widgetDescription}>
                            {takeout ? <div>We hope Takeout+ not only matches, but exceeds your expectations. We doubt you will, but if you do ever have an issue with Takeout, contact us at anytime.  <br /><br /> <a className={styles.anchor} href="mailto:takeout@bysourfruit.com?subject=So, about Takeout+ ...">Contact us {'>'}</a></div> : <div>Takeout+ is a monthly subscription plan that allows you to send unlimited emails. Yeah, really. But, not only that... for the same $3 a month, you get the ability to (e.g) change the domain your emails send from, exclusive access to new features, and more. <br /><br /><a className={styles.anchor} href='/#pricing'>Subscribe to Takeout+ {'>'}</a></div>}
                        </h2>
                    </div>

                </section>

                <Modal
                    isOpen={verifyIsOpen}
                    onRequestClose={verifyClose}
                    style={customStyles}
                    contentLabel="Takeout DNS Modal"
                >
                    {vDP ? (cisVerified ? (
                        <div>
                            <h1 className={styles.headingWhite}>Yay!</h1>
                            <h2 className={styles.descriptionWhite}>
                                {cDomain} has been verified. Don't remove the TXT record, as we may check for it periodically. Now, add your email's credentials. We'll try to keep them secure.
                            </h2>

                            <input onChange={e => { setFrom(e.currentTarget.value); }} type='text' placeholder="test@example.com" className={styles.widgetInput} id="from" />
                            <input onChange={e => { setPass(e.currentTarget.value); }} type='password' placeholder="verySecure123)" className={styles.widgetInput} id="password" />
                            <input onChange={e => { setHost(e.currentTarget.value); }} type='text' placeholder="smtp.example.com" className={styles.widgetInput} id="host" /><br /><br />

                            <a onClick={saveEmail} style={{ background: 'white', color: 'black' }} className={styles.blueButton}>Save</a><a onClick={() => { setVDP(false); cisVerified(false) }} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Retreat</a>
                        </div>
                    ) : (
                        <div>
                            <h1 className={styles.headingWhite}>Add the TXT record</h1>
                            <h2 className={styles.descriptionWhite}>
                                You'll need to add a TXT record that looks like: <br /><br />
                                _takeoutverify.{cDomain}<br /> with an answer of {generatedTxt}
                            </h2>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{dnsError}</span><br/><br/>
                            <a onClick={retryDomain} style={{ background: 'white', color: 'black' }} className={styles.blueButton}>Try</a><a onClick={() => { setVDP(false) }} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Retreat</a>
                        </div>
                    )) : (
                        <div>
                            <h1 className={styles.headingWhite}>First and foremost...</h1>
                            <h2 className={styles.descriptionWhite}>
                                We'll have to verify you own the domain you want to send emails from.
                                Once you submit your domain, you'll have to add a TXT record to verify it's yours.
                            </h2>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
                            <input
                                type='text'
                                onChange={handleChange}
                                value={cDomain}
                                placeholder="test.com"
                                className={styles.widgetInput}
                                id="from" />
                            <br /><br />

                            <a onClick={verifyDomain} style={{ background: 'white', color: 'black' }} className={styles.blueButton}>Verify</a><a onClick={verifyClose} style={{ background: 'var(--accent-color-danger' }} className={styles.blueButton}>Cancel</a>
                        </div>
                    )}

                </Modal>
            </main>
            <Footer/>
        </div>
    )
}

/* 

    const [cEmail, setCEmail] = useState('')
    const [cDomain, setCDomain] = useState('')
    const [cVerify, setCVerify] = useState('')
    const [cisVerified, setCisVerified] = useState('')
*/