/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import * as Icon from "phosphor-react";
import React from "react"
import styles from '../../styles/homie/Revamp.module.css'
import { signIn, useSession } from "next-auth/react"

export default function Footer() {
    const { data: session, status } = useSession()
    const isNone = session ? 'inline' : 'none'
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footer}>
                <div className={styles.footerSideLeft}>
                    <h1 style={{fontSize: '30px'}} className={styles.headingWhite}>Takeout</h1>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="/">{'<'} Explore the home page</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="/#pricing">{'<'} Discover our simple pricing</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://twitter.com/useTakeout">{'<'} Immerse yourself in our Twitter</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://github.com/Takeout-bysourfruit">{'<'} Doomscroll the GitHub</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href={session ? "/flow/sign-out" : "/flow/login"}>{session ? '< Sign out of Takeout' : '< Login to Takeout'}</a>
                    </h2>
                </div>

                <div className={styles.footerSideSecret}>
                <h1 style={{fontSize: '30px'}} className={styles.headingWhite}>Takeout</h1>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="/">Go Home {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="/#pricing">See our plans {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://twitter.com/useTakeout"> Immerse yourself in our Twitter {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://github.com/Takeout-bysourfruit">Doomscroll the GitHub {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href={session ? "/flow/sign-out" : "/flow/login"}>{session ? 'Sign out >' : 'Login >'}</a>
                    </h2>
                </div>

                <div className={styles.footerSide}>
                <h1 style={{fontSize: '30px'}} className={styles.headingWhite}>bysourfruit</h1>
                <h2 className={styles.descriptionWhite}>
                        <a href="https://twitter.com/s0urfruit">Discover Sourfruit's Twitter {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://def-not-hacking-the.net">Critique Sourfruit's website {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="mailto:hello@def-not-hacking-the.net?subject=So... about Takeout">Contact Sourfruit via email {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://bysourfruit.com">Go to bysourfruit.com {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://support.discord.com/hc/en-us/articles/218344397-How-do-I-add-my-friend-to-my-friends-list-">Add s0urfruit#3033 on Discord</a>
                    </h2>
                </div>
            </div>
            <h3 className={styles.footerInCenter}>
                <a className={styles.footerHref} href="/terms">Terms</a> / <a className={styles.footerHref} href="/privacy">Privacy</a>
                <br/><br/>
                &copy; Sourfruit, 2022. Takeout is a project by Sourfruit, and is apart of the *.bysourfruit.com system.
            </h3>
        </div>
    )
}

/*
                <footer className={styles.footer}>
                    <br />
                    <h3 className={styles.descriptionWhite}>&copy; Sourfruit, 2022. Takeout is a project by Sourfruit, and is apart of the *.bysourfruit.com system.</h3>
                </footer>
*/