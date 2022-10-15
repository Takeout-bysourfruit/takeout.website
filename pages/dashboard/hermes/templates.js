/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React from "react"
import styles from '../../../styles/homie/db.module.css'
import * as Icon from "phosphor-react";
import axios from 'axios'
import { useRouter } from 'next/router';
import WidgetLoading from '../../../components/loaders/widget'
import DashTop from '../../../components/homie/dashtop'
import SideBar from '../../../components/homie/sidebar'
import Footer from '../../../components/footer'
import { useSession, getSession } from "next-auth/react"
import { useState, useEffect } from 'react'

export default function Dashboard(props) {
    const router = useRouter();
    const [uploaded, setUploading] = useState('Choose a file & upload')

    const [loading, setLoading] = useState(true)
    const [files, setFiles] = useState([])
    const [userToken, setToken] = useState('')

    const [refreshKey, setRefreshKey] = useState(0);

    const refreshData = () => {
        console.log('Refreshing...')
        router.replace(router.asPath)
    }

    useEffect(() => {
        const { token } = props.userData
        setToken(token)
        setFiles(props.fileData)
        setTimeout(() => { setLoading(false) }, 1500)
    }, [props])


    useEffect(() => {
        const { token } = props.userData
        const input = document.getElementById('fileinput');

        const upload = (file) => {
            if (file.size / (1024 ** 2) > 5) {
                console.log(`More than, data: ${file.size} @ ${file.size / (1024 ** 2)}`)
                setUploading(<span className={styles.error}>Your file is larger than 5MB</span>)
                setTimeout(() => { setUploading('Choose a file & upload') }, 1500)
                return;
            } else {
                if (file.type.split('/')[1] === 'html' || file.type.split('/')[1] === 'plain' || file.type.split('/')[1] === 'rtf') {
                    console.log('a-OK')
                    setUploading(<span className={styles.willAnim}>Uploading</span>)

                    let formData = new FormData()
                    formData.set('file', file)

                    axios.post(`https://cdn-takeout.bysourfruit.com/cloud/upload?token=${token}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                        .then(function (response) {
                            setUploading('Uploaded!')
                            refreshData()
                            setTimeout(() => { setUploading('Choose a file & upload') }, 2500)
                        })
                        .catch(function (error) {
                            setUploading(<span className={styles.error}>You've uploaded too many files.</span>)

                            console.log(error)
                            setTimeout(() => { setUploading('Choose a file & upload') }, 2500)
                        })
                } else {
                    console.log(`File format is wrong, bitch.`)
                    setUploading(<span className={styles.error}>Your file's format isn't supported</span>)
                    setTimeout(() => { setUploading('Choose a file & upload') }, 1500)
                    return;
                }
            }
        }

        const onSelectFile = () => { setRefreshKey(refreshKey => refreshKey + 1); upload(input.files[0]) };
        input.addEventListener('change', onSelectFile, false);

    }, [refreshKey])


    return (
        <div className={styles.container}>
            <Head>
                <title>Cloud | Takeout</title>
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
                        <h1 style={{ textAlign: 'center' }} className={styles.dashboardYouSent}>Takeout Cloud</h1>

                        <section className={styles.dashboardConfig}>
                            <div className={styles.configureOption}>
                                <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                                    <h2 className={styles.configureOptionHeading}>Upload an email template</h2>
                                    <h3 className={styles.configureOptionDesc}>
                                        If you'd like Takeout Cloud to store your email templates (limited to 5),
                                        you can upload HTML and text files under 5MB here. You'll be able to retrieve them using the API, Takeout.js, and Takeout.py.
                                    </h3>

                                    <label className={styles.blueButton}>
                                        <input type="file" id='fileinput' accept=".html,.txt,.md" />
                                        {uploaded}
                                    </label>

                                    <div style={{ marginBottom: '70px' }} />
                                    <h3 className={styles.configureOptionDesc}>
                                        <i>While in ALPHA, Takeout Cloud is free for all users. By 15/09/2022, Takeout Cloud will be available only to Takeout+ subscribers. </i>
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.configureOption}>
                                <div className={styles.configureOptionText} style={{ marginBottom: '20px' }}>
                                    <h2 className={styles.configureOptionHeading}>Your templates</h2>
                                    <br />
                                    {!loading ? (
                                        <div className={styles.templates}>
                                            {files.length === 0 ? (
                                                <h2 className={styles.configureOptionDesc} style={{ textAlign: 'left' }}>
                                                    You haven't uploaded any templates yet.
                                                </h2>
                                            ) :
                                                files.map((file) => (
                                                    <div id={file} key={file} className={styles.templateWidget} style={{ marginBottom: '10px' }}>
                                                        <a href={`https://cdn-takeout.bysourfruit.com/cloud/read?name=${file.split('/')[1]}&token=${userToken}`}><Icon.Eye size={15} weight="bold" /></a>
                                                        &nbsp;
                                                        <a href={`https://cdn-takeout.bysourfruit.com/cloud/download?name=${file}`}><Icon.ArrowDown size={15} weight="bold" /></a>
                                                        &nbsp;
                                                        <a onClick={async () => { document.getElementById(file).style.opacity = '0.3'; document.getElementById(file).style.background = '#FF7F7F'; await fetch(`https://cdn-takeout.bysourfruit.com/cloud/delete?name=${file}&token=${userToken}`); refreshData() }}><Icon.Trash size={15} weight="bold" color="red" /></a>
                                                        &nbsp; &nbsp;
                                                        <b>{file.split('/')[1]}</b><br />
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <WidgetLoading />
                                    )}
                                    <div style={{ marginBottom: '70px' }} />
                                </div>
                            </div>
                        </section>

                    </section>

                </section>
            </main>

            <Footer />
        </div>
    )
}



export const getServerSideProps = async (context) => {
    const { req } = context

    try {
        // Get the session
        const session = await getSession({ req });
        // If no session, redirect
        if (!session) return { redirect: { destination: '/flow/login', permanent: false } };
        // If session, get data
        console.log('Getting User Data')
        const user = await fetch(`https://takeout.bysourfruit.com/api/get/ui?email=${session.user.email}`)
        const json = await user.json()
        const userData = json.plan

        // get the templates here too
        console.log('Getting Template Data')
        const files = await fetch(`https://cdn-takeout.bysourfruit.com/cloud/get?name=${userData.name}`)
        const efile = await files.json()
        const fileData = efile.names

        return { props: { userData, fileData } }

    } catch (error) {
        console.log(error);
    }
}