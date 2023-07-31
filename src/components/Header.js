import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from './context'

function Header() {
	const { openBasket } = useContext(AppContext)

	return (
		<header className='d-flex justify-between p-40 align-center'>
			<Link to='/'>
				<div className='d-flex justify-center'>
					<img
						width={40}
						height={40}
						src='/img/logo.png'
						alt='Логотип компании'
					/>
					<div>
						<h3>React-test</h3>
						<p className='opacity-5'>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className='d-flex'>
				<li className='mr-30'>
					<img
						className='cu-p'
						onClick={() => openBasket}
						width={18}
						height={18}
						src='/img/cart.svg'
						alt='Корзина'
					/>
					<span className='ml-5'>1205 руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
						<img
							className='mr-30 cu-p'
							width={18}
							height={18}
							src='/img/heart.svg'
							alt='Закладки'
						/>
					</Link>
				</li>
				<li>
					<img
						className='cu-p'
						width={18}
						height={18}
						src='/img/user.svg'
						alt='Пользователь'
					/>
				</li>
			</ul>
		</header>
	)
}

export default Header
