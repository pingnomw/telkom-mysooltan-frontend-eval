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
	const [prev, setPrev] = useState("")
	const [next, setNext] = useState("")

	const userContext = useContext(UserContext).user

	async function list_repos(user){
		try {
			console.log("listing repos for user " + user)
			if (userContext.token){
				const octokit = new Octokit({
					auth: userContext.token
				})
			
			
				const res = await octokit.request('GET /users/{user}/repos', {
					user
				})
				console.log(res)
				setRepos(res.data)

				if (res.headers.link){
					const links = res.headers.link.split(",")
					var _next = ""
					var _prev = ""
					links.forEach((link) => {
						let [url, rel] = link.split(";")
						url = url.replace("<", "").replace(">", "").trim()
						rel = rel.replace("rel=\"", "").replace("\"", "").trim()
						console.log(rel + ": " + url)
						if (rel == "next"){
							_next = url
						} else if (rel == "prev"){
							_prev = url
						}
					})
					setNext(_next)
					setPrev(_prev)
				}

			} else {
				alert("Logged out")
			}

		} catch (err) {
			console.error(err)
			alert(err.message)
		}
	}

	async function change_page(link){
		try {
			console.log("listing repos: " + link)
			if (userContext.token){
				const octokit = new Octokit({
					auth: userContext.token
				})

				const res = await octokit.request(link)
				console.log(res)
				setRepos(res.data)

				if (res.headers.link){
					const links = res.headers.link.split(",")
					var _next = ""
					var _prev = ""
					links.forEach((link) => {
						let [url, rel] = link.split(";")
						url = url.replace("<", "").replace(">", "").trim()
						rel = rel.replace("rel=\"", "").replace("\"", "").trim()
						console.log(rel + ": " + url)
						if (rel == "next"){
							_next = url
						} else if (rel == "prev" || rel == "previous"){
							_prev = url
						}
					})
					setNext(_next)
					setPrev(_prev)
				}

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
						<button className='primary-button' onClick={() => {list_repos(username)}}>Get Repos</button>
					</div>
					<div className='input-with-label'>
						<button className='primary-button' onClick={() => {list_repos(userContext.login)}}>My Repos</button>
					</div>
				</section>
				<section>
					{repos.map((repo) => {return (
						<div key={String(repo.id)}>
							<h2>
								<a href={repo.html_url} target="_blank">
									{repo.name}
								</a>
							</h2>
							{repo.description ? <p>{repo.description}</p> : <p><em>no description</em></p>}
							{repo.language ? <p>{repo.language}</p> : <p><em>unknown language</em></p>}
						</div>
						
					)})}
					<div className='page-selector'>
						<button className={"page-selector-prev " + (Boolean(prev) ? 'primary-button' : 'primary-button-disabled')} onClick={() => {change_page(prev)}} disabled={!prev}>{"<<"}</button>
						<button className={"page-selector-next " + (Boolean(next) ? 'primary-button' : 'primary-button-disabled')} onClick={() => {change_page(next)}} disabled={!next}>{">>"}</button>
					</div>
					
				</section>
			</main>

			<footer className={styles.footer}>
				
			</footer>
		</div>
	)
}
