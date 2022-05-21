import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import { useState, useEffect, createContext, useContext } from "react"
import { Octokit, App } from "octokit"
import { UserContext } from '../context'

//export const UserToken = createContext("")

export default function Home() {

	const [username, setUsername] = useState("")
	const [repos, setRepos] = useState([])

	const userContext = useContext(UserContext).user

	return (
		<div>
			<Head>
				<title>Public Repos by User</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/*<header className={styles.header}>
				<h1>Public Repos by User</h1>
			</header>*/}
			<Header title={"Public Repos by User"} user={userContext} />

			<main className={styles.main}>
				<section>
					<div className='input-with-label'>
						<label className='text-input-label' htmlFor='login-username'>GitHub username</label><br />
						<input className='text-input' type="text" id="login-username" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
					</div>
					<div className='input-with-label'>
						<button className='primary-button' onClick={() => {login(password)}}>Get Repos</button>
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				
			</footer>
		</div>
	)
}
