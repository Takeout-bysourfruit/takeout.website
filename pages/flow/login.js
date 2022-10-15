/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-target-blank */
import styles from '../../styles/homie/Revamp.module.css'
import TopBar from '../../components/homie/topbar'
import Footer from '../../components/footer'
import Head from 'next/head'
import React from "react"
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

export default function Home(props) {
    const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (status === "authenticated") {
            router.push('/dashboard')
        }
    }, [session, status])


    return (
        <div className={styles.containerLogin}>
            <Head>
                <title>Login | Takeout</title>
                <meta name="viewport" content="width=device-width, initial-scale=0.7" />
                <meta name="description" content="A simple, affordable, developer-oriented email service." />
                <meta name="keywords" content="Takeout, email, nodemailer, email for node, webmail, developer mail, mail in js, mail in python, sendgrid, product hunt, oO, [], SO, object Object, [object Object] Stack Overflow, Stack, Programmer, Forum, Sourfruit, s0urfruit, sour, fruit, StackOverflow sourfruit, Google Analytics, privacy, analytics, TrackerKit, sourfruit analytics, anal, security, privacy first, developer analytics, easy" />
                <meta name="author" content="Sourfruit" />
                <meta property="og:url" content="https://takeout.bysourfruit.com" />

                <meta property="og:title" content="Login | Takeout" />
                <meta property="og:description" content="A simple, affordable, developer-oriented email service." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://i.ibb.co/28RgWJs/takeout.png" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Login | Takeout" />
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
            <div className={styles.sections}>
                <section className={styles.loginSecLeft}>
                    <img height="200px" src="../hi.png" />
                </section>
                <section className={styles.loginSecRight}>
                    <div className={styles.loginRightText}>
                        <h1 className={styles.hookText} style={{ marginBottom: '30px' }}>
                            Login
                        </h1>
                        <h2 className={styles.reelinText} style={{ marginBottom: '50px' }}>
                            Welcome back! You can login via GitHub using the button below.
                        </h2>
                        <a onClick={() => { signIn('github', { callbackUrl: '/flow/login' })}} className={styles.blueButton}>Login with GitHub</a>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
