import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { UserContext } from '../context'
import { useContext } from 'react'

export default function Header({title, user}){
	//const user = useContext(UserContext)

	//console.log("Header user:", user)

	function myLoader({src}){
		return src
	}

	return (
		<header className={styles.header}>
			<h1 className='inline-block center-content'>{title}</h1>
			{user ?
			<div className='right inline-block no-show-mobile'>
				<div>
					{/*(user?.avatar_url) ? <Image src={user.avatar_url} width={48} height={48} loader={myLoader} className="profile-picture" /> : null*/}
					<div className='username-logged-in'>
						{user.login}
					</div>
				</div>
				<div className='full-width'>
					<button className='logout-button full-width'>Logout</button>
				</div>
				
			</div>
			: null}
		</header>
	)
}