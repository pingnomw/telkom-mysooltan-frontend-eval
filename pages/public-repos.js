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
	const [isOrg, setIsOrg] = useState(false)
	const [repos, setRepos] = useState([])

	const userContext = useContext(UserContext).user

	async function list_repos(){
		try {
			if (userContext.token){
				const octokit = new Octokit({
					auth: userContext.token
				})
			
			
				const res = await octokit.request('GET /users/{username}/repos', {
					username
				})
				console.log(res)
				setRepos(res.data)

			} else {
				alert("Logged out")
			}

		} catch (err) {
			console.error(err)
			alert(err.message)
		}
	}

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
						<label className='text-input-label' htmlFor='username'>GitHub username</label><br />
						<input className='text-input' type="text" id="username" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
					</div>
					<div className='input-with-label'>
						<input className='text-input' type="checkbox" id="is-org" placeholder="Username" onChange={(event) => {setIsOrg(event.target.checked)}} />
						<label className='text-input-label' htmlFor='is-org'>User is organization</label>
					</div>
					<div className='input-with-label'>
						<button className='primary-button' onClick={() => {list_repos()}}>Get Repos</button>
					</div>
				</section>
				<section>
					{repos.map((repo) => {return (
						<div key={String(repo.id)}>
							<h2>{repo.name}</h2>
							{repo.description ? <p>{repo.description}</p> : <p><em>no description</em></p>}
							{repo.language ? <p>{repo.language}</p> : <p><em>unknown language</em></p>}
						</div>
						
					)})}
				</section>
			</main>

			<footer className={styles.footer}>
				
			</footer>
		</div>
	)
}
