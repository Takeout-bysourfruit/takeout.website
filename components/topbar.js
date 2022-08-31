/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import * as Icon from "phosphor-react";
import React from "react"
import styles from '../styles/Home.module.css'
import { signIn, useSession } from "next-auth/react"

export default function TopBar() {
    const { data: session, status } = useSession()
    const isNone = session ? 'inline' : 'none'
    return (
        <div className={styles.topbar}>
            <h1 className={styles.logo}>
                <a href="/"><img height="50px" src="https://i.ibb.co/sg4kTs1/takeout-logo.png" /></a>
            </h1>
            <ul className={styles.menuOptions}>
                <li className={styles.menuOption}><a href="/plans">Plans</a></li>
                <li className={styles.menuOption}><a href="https://github.com/Takeout-bysourfruit/takeout.docs">Docs</a></li>
                <li style={{display: `${isNone}`}} className={styles.menuOption}><a href={session ? "/dashboard" : ""}>{session && 'Dashboard' }</a></li>
                <li className={styles.menuOption}><a href={session ? "/flow/sign-out" : "/flow/login"}>{session ? 'Sign out' : 'Login'}</a></li>
            </ul>
            {/* 
                black magic fuckery that's totally not stolen. css resides in globals.css
            */}
            <input type="checkbox" id="toggle-menu" />
            <label htmlFor="toggle-menu"><span>menu</span></label>
            <nav className="navy">
            <a href="/plans">Plans</a>
            <a href="https://github.com/Takeout-bysourfruit/takeout.docs">Docs</a>
            <a style={{display: `${isNone}`}} href="/dashboard">Dashboard</a>
            <a href={session ? "/flow/sign-out" : "/flow/login"}>{session ? 'Sign out' : 'Login'}</a>
            </nav>
        </div>
    )
}
