import styles from '../../styles/loader.module.css'
import { useState, useEffect } from 'react'

export default function WidgetLoading() {
    const [newMsg, setMsg] = useState()

    function getRandomMessage() {
        const msg = [
            "Making paper airplanes...",
            "Figuring out the fax machine...",
            "Booting up Windows Server 2008...",
            "Bringing your data past TSA...",
            "Our hamsters are fetching your emails...",
            "Tip: You can send emails using Takeout"
        ]

        const chosenMsg = msg[Math.floor(Math.random() * msg.length)];
        setMsg(chosenMsg)
    }


    useEffect(() => {
        getRandomMessage()
    }, [])

    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.loadingSpinner}></div>
            <h3 style={{fontWeight: 'normal', marginTop: '40px'}}>{newMsg}</h3>
        </div>
    )
}