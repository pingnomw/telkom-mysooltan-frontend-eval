import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { UserContext } from '../context'
import { useContext } from 'react'

export default function Header({title, user}){
	//const user = useContext(UserContext)

	//console.log("Header user:", user)

	const userContext = useContext(UserContext)
	const router = useRouter()

	function myLoader({src}){
		return src
	}

	function logout(){
		userContext.changeUser(null)
		router.replace("/")
	}


	return (
		<header className="header">
			{user ?
			<div className='full-width'>
				<div className='mini-profile-container-mobile'>
					<div className='mini-profile-mobile'>
						<span className='logged-in-as'>Logged in as </span>
						{(user?.avatar_url) ? <Image src={user.avatar_url} width={24} height={24} loader={myLoader} className="profile-picture" /> : null}
						<span className='username-logged-in'>{user.login}</span>
					</div>
					<button className='logout-button' onClick={() => {logout()}}>Logout</button>
				</div>
			</div>
			
			: null}

			<h1 className='inline-block center-content'>{title}</h1>

			{user ?
			<div className='right inline-block no-show-mobile'>
				<div className='mini-profile-nomobile'>
					{(user?.avatar_url) ? <Image src={user.avatar_url} width={24} height={24} loader={myLoader} className="profile-picture" /> : null}
					<span className='username-logged-in'>{user.login}</span>
				</div>
				<div className='full-width'>
					<button className='logout-button full-width' onClick={() => {logout()}}>Logout</button>
				</div>
			</div>
			: null}
		</header>
	)
}