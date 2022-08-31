/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as Icon from "phosphor-react";
import React from "react"
import styles from '../../styles/homie/db.module.css'
import { signIn, useSession } from "next-auth/react"

export default function SideBar() {
    const { data: session, status } = useSession()
    const isNone = session ? 'inline' : 'none'
    return (
        <div className={styles.sideBar}>
            <li className={styles.sideBarLink}>
                <Icon.HouseSimple className={styles.icon} weight="bold" />
                <a href="/dashboard/beta">Dashboard</a>
            </li>
            <li className={styles.sideBarLink}>
                <Icon.Wrench className={styles.icon} weight="bold" />
                <a href="/dashboard/hermes/configure">Configure</a>
            </li>

            <li className={styles.sideBarLink}>
                <Icon.Envelope className={styles.icon} weight="bold" />
                <a href="/dashboard/hermes/recent">Recent emails</a>
            </li>

            <li className={styles.sideBarLink}>
                <Icon.IdentificationBadge className={styles.icon} weight="bold" />
                <a href="/dashboard/hermes/credentials">Credentials</a>
            </li>

            <li className={styles.sideBarLink}>
                <Icon.PaperPlaneTilt className={styles.icon} weight="bold" />
                <a href="/#pricing">Takeout+</a>
            </li>
        </div>
    )
}
