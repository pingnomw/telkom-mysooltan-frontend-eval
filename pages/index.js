import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, createContext, useContext } from "react"
import { Octokit, App } from "octokit"

export default function Home() {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showTokenInfo, setShowTokenInfo] = useState(false)

	async function login(token){
		try {

			// login
			const octokit = new Octokit({
				auth: token
			})
			const res = await octokit.request('GET /user', {})
			console.log(res)

			// if login was successful (200 = OK, 304 = not modified)
			if (res.headers.status == "200" || res.headers.status == "304") {

			}

		} catch (err) {
			console.log(err)
			alert(err.message)
		}
	}

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className={styles.header}>
				<h1>Login</h1>
			</header>

			<main className={styles.main}>
				<div>
					<div>
						{/*<div className='input-with-label'>
							<label className='text-input-label' htmlFor='login-username'>GitHub username:</label><br />
							<input className='text-input' type="text" id="login-username" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
						</div>*/}
						<div className='input-with-label'>
							<label className='text-input-label' htmlFor='login-passwowrd'>GitHub personal access token</label><br />
							<input className='text-input' type="password" id="login-password" placeholder="Token" onChange={(event) => {setPassword(event.target.value)}} />
						</div>
					</div>
					
					<section>
						<p className='no-bottom-space'>
							When you generate your access token, be sure to allow access to the following:
						</p>
						<ul className='no-top-space'>
							<li>public_repo</li>
							<li>read_user</li>
						</ul>
					
						{/*<mark>Remember to treat your personal access tokens like passwords (i.e. keep them secret)!</mark>*/}

						<p><a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank">
							Read more about GitHub personal access tokens and how to generate one.
						</a></p>
					</section>
					
					<div>
						<button className='primary-button' onClick={() => {login(password)}}>Login</button>
					</div>
					
				</div>
			</main>

			<footer className={styles.footer}>
				
			</footer>
		</div>
	)
}
