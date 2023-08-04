import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context'
import styles from './Header.module.scss'

function Header() {
	const { setBasket } = useContext(AppContext)

	return (
		<header className={styles.wrapper}>
			<Link to='/'>
				<div className='d-flex justify-center'>
					<img
						className={styles.logo}
						height={80}
						src='/img/logo(3).png'
						alt='Логотип компании'
					/>
					<div className='m-auto'>
						<h3>React-Shop</h3>
						<p className='opacity-5'>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className={styles.navbar}>
				<li className='mr-30'>
					<img
						className='cu-p'
						onClick={() => setBasket(prev => !prev)}
						width={20}
						height={20}
						src='/img/cart.svg'
						alt='Корзина'
					/>
					<span className='ml-5'>1205 руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
						<img
							className='mr-30 cu-p'
							width={20}
							height={20}
							src='/img/heart.svg'
							alt='Закладки'
						/>
					</Link>
				</li>
				<li>
					<img
						className='cu-p'
						width={20}
						height={20}
						src='/img/user.svg'
						alt='Пользователь'
					/>
				</li>
			</ul>
		</header>
	)
}

export default Header
