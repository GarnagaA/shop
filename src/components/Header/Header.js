import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useBasket } from '../../hooks/useBasket'

function Header() {
	const { totalPrice, setBasket } = useBasket()
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
				<li className='mr-30' onClick={() => setBasket(prev => !prev)}>
					<img
						className='cu-p'
						width={25}
						height={25}
						src='/img/cart.svg'
						alt='Корзина'
					/>
					<span>{totalPrice()} руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
						<img
							className='mr-30 cu-p'
							width={25}
							height={25}
							src='/img/heart.svg'
							alt='Закладки'
						/>
					</Link>
				</li>
				<Link to={'/orders'}>
					<li>
						<img
							className='cu-p'
							width={25}
							height={25}
							src='/img/user.svg'
							alt='Пользователь'
						/>
					</li>
				</Link>
			</ul>
		</header>
	)
}

export default Header
