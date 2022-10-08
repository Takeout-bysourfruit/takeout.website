/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../../styles/homie/db.module.css'

import WidgetLoading from '../../components/loaders/widget'

import TopBar from '../../components/homie/topbar'
import DashTop from '../../components/homie/dashtop'
import SideBar from '../../components/homie/sidebar'
import Footer from '../../components/footer'
import { useSession, getSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import Script from 'next/script'


export default function Dashboard(props) {
    const [loading, setLoading] = useState(true);
    const [desc, setDesc] = useState('')
    const [sent, setSent] = useState('')
    const [lolHREF, setLOLHREF] = useState('https://github.com/Takeout-bysourfruit/takeout.docs')
    const [snarkyButton, setButt] = useState("Read Takeout's documentation")


    useEffect(() => {
        const { dateStarted, emails_sent } = props.userData.usageInfo
        const { name, email, token, plan } = props.userData
        createDescription(name, plan, emails_sent, dateStarted)
        setTimeout(() => { setLoading(false) }, 500)
    }, [props])


    function createDescription(name, plan, emails_sent, dateStarted) {
        const options = { month: 'long' };
        const date = dateStarted.split('/')
        const now = new Date();
        const nownext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const next = new Intl.DateTimeFormat('en-US', options).format(nownext)

        let amountLeft
        let snarkyUpgrade

        if (plan === 'paid') { amountLeft = `infinite` } else { amountLeft = 500 - emails_sent; snarkyUpgrade = `You'll get 500 more emails in ${next}. Upgrade to Takeout+ to enjoy unlimited emails. and more.` }
        if (amountLeft === 0) { setButt(`Subscribe to Takeout+`); setLOLHREF('/#pricing') } else if (emails_sent === 0) { } else { setButt("Read Takeout's documentation") }

        setDesc(`As of ${date[0]} ${date[1]}, you have ${amountLeft} emails left. `)
        setSent(`You've sent ${emails_sent} emails.`)
    }

    const jsSnip = `
    const TakeoutClient = require('takeout.js')
    const client = new TakeoutClient()
    client.login('your token here')

    const emailTemplate = {
        to: 'test@example.com',
        from: 'Takeout.js',
        subject: 'I just sent an email using Takeout!',
        text: 'My first email!',
    }

    client.send(emailTemplate)
    `

    const pySnip = `
    from takeout import TakeoutClient
    TakeoutClient.login('your token here')

    emailTemplate = {
        'to': 'test@example.com',
        'from': 'Takeout.py',
        'subject': 'I just sent an email using Takeout!',
        'text': 'My first email!',
    }

    TakeoutClient.send(**emailTemplate)
    `

    const cURLSnip = `
    curl -X POST \\
        'https://takeout.bysourfruit.com/api/email/send' \\
        --header 'Accept: */*' \\
        --header 'Content-Type: application/x-www-form-urlencoded' \\
        --header 'Authorization: Token YOUR_TOKEN' \\
        --data-urlencode 'sender=Takeout.cURL' \\
        --data-urlencode 'receiver=test@example.com' \\
        --data-urlencode 'subject=I just sent an email using Takeout!' \\
        --data-urlencode 'bodyText=My first email!'
    `

    function handleClick(id) {
        const js = document.getElementById('js')
        const py = document.getElementById('py')
        const sh = document.getElementById('bash')
        if (id === 'js') {js.style.display = 'block'; py.style.display = 'none'; sh.style.display = 'none'}
        if (id === 'py') {py.style.display = 'block'; js.style.display = 'none'; sh.style.display = 'none'}
        if (id === 'bash') {sh.style.display = 'block'; py.style.display = 'none'; js.style.display = 'none'}
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

                <link href="/prisma/prism.css" rel="stylesheet" />
            </Head>

            <DashTop />
            {/* Serves as the mobile dashboard menu too ^^' */}
            <main className={styles.main}>
                <section className={styles.dashboardfuck}>
                    <SideBar/>
                    <section className={styles.dashboardIndexJS}>
                        <div style={{ backgroundColor: 'var(--white)' }} className={styles.dashboardWidgetMed}>
                                {!loading ? (
                                        <div className={styles.textBlockMed}>
                                        <h1 style={{ color: 'var(--navy)' }} className={styles.smallHeadText}>{sent}</h1>
                                        <h2 style={{ color: 'var(--text-sharp)' }} className={styles.smallDescText}>{desc}</h2>
                                        <br />
                                        <a href={lolHREF} className={styles.blueButton}>{snarkyButton}</a>
                                    </div>
                                ) : (
                                    <WidgetLoading/>
                                )}
                        </div>

                        <div className={styles.dashboardWidgetLarge}>
                            <h1 className={styles.dashboardYouSent}>Send an email, easily</h1>
                            <div className={styles.languageOptions}>
                                <a onClick={() => handleClick('js')} className={styles.langOption}>JavaScript</a>
                                <a onClick={() => handleClick('py')} className={styles.langOption}>Python</a>
                                <a onClick={() => handleClick('bash')} className={styles.langOption}>cURL</a>
                            </div>

                            <div id="js" className={styles.jsBlock}>
                                <pre><code className="language-js">{jsSnip}</code></pre>
                            </div>
                            <div id="py" className={styles.pyBlock} style={{ display: 'none' }}>
                                <pre><code className="language-py">{pySnip}</code></pre>
                            </div>
                            <div id="bash" className={styles.bashBlock} style={{ display: 'none' }}>
                                <pre><code className="language-shell">{cURLSnip}</code></pre>
                            </div>
                        </div>
                    </section>
                </section>
                <div style={{ height: '100px' }} />
            </main>
            <Footer />
            <Script id="prism-js" src="/prisma/prism.js" />
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
