/* eslint-disable react/no-unescaped-entities */
import styless from '../styles/loader.module.css'

export default function Loader() {
    return (
        <div id="owo2" className={styless.covers}>
            <div id="owo" className={styless.loader}>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
                <span className={styless.loaderBlock}></span>
            </div>
        </div>
    )
}