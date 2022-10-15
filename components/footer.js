/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react"
import styles from '../styles/footer.module.css'
import { signIn, useSession } from "next-auth/react"

export default function Footer() {
    const { data: session, status } = useSession()
    const isNone = session ? 'inline' : 'none'
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footer}>
                <div className={styles.image}>
                    <img src="https://i.ibb.co/K2y1zfL/Takeout-icon-rounded.png" width="128px" />
                </div>
                <div className={styles.footerColumn}>
                    <ul>
                        <h3 className={styles.linkHead}>Takeout</h3>
                        <li><a className={styles.link} href="/">Home</a></li>
                        <li><a className={styles.link} href="/#pricing">Pricing</a></li>
                        <li><a className={styles.link} href="https://github.com/Takeout-bysourfruit">GitHub</a></li>
                        <li><a className={styles.link} href="https://twitter.com/useTakeout">Twitter</a></li>
                        <li><a className={styles.link} href={session ? "/flow/sign-out" : "/flow/login"}>{session ? 'Sign out' : 'Login'}</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <ul>
                        <h3 className={styles.linkHead}>Docs</h3>
                        <li><a className={styles.link} href="https://github.com/Takeout-bysourfruit/takeout.js">Takeout.js</a></li>
                        <li><a className={styles.link} href="https://github.com/Takeout-bysourfruit/takeout.py">Takeout.py</a></li>
                        <li><a className={styles.link} href="https://github.com/Takeout-bysourfruit/takeout.docs">Takeout API</a></li>
                        <li><a className={styles.link} href="">&nbsp;</a></li>
                        <li><a className={styles.link} href="">&nbsp;</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <ul>
                        <h3 className={styles.linkHead}>Sourfruit</h3>
                        <li><a className={styles.link} href="https://def-not-hacking-the.net">Website</a></li>
                        <li><a className={styles.link} href="https://twitter.com/s0urfruit">Twitter</a></li>
                        <li><a className={styles.link} href="mailto:hello@def-not-hacking-the.net?subject=So... about Takeout">Contact</a></li>
                        <li><a className={styles.link} href="https://bysourfruit.com">bysourfruit.com</a></li>
                        <li><a className={styles.link} href="https://support.discord.com/hc/en-us/articles/218344397-How-do-I-add-my-friend-to-my-friends-list-">s0urfruit#3033</a></li>
                    </ul>
                </div>
                <h3 className={styles.footerInCenter}>
                    <a className={styles.link} href="/terms">Terms</a> / <a className={styles.link} href="/privacy">Privacy</a>
                    <br/><br/>
                    &copy; Sourfruit, {new Date().getFullYear()}. Takeout is a project by Sourfruit, and is apart of the *.bysourfruit.com system.
                </h3>
            </div>
        </div>
    )
}

{/*
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
                        <a className={styles.footerHref} href="/">Explore the home page {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="/#pricing">Discover our simple pricing {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://twitter.com/useTakeout"> Immerse yourself in our Twitter {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href="https://github.com/Takeout-bysourfruit">Doomscroll the GitHub {'>'}</a>
                    </h2>
                    <h2 className={styles.descriptionWhite}>
                        <a className={styles.footerHref} href={session ? "/flow/sign-out" : "/flow/login"}>{session ? 'Sign out of Takeout >' : 'Login to Takeout >'}</a>
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
            </div>*/}

