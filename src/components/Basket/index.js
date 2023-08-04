import styles from './Basket.module.scss'
import { useContext } from 'react'
import AppContext from '../context'
import BasketCard from '../BasketCard'
import Button from '../Button'
import { v4 as uuidv4 } from 'uuid'

const obj = {}
const createOrder = obj => {
	console.log(obj)}

function Basket() {
	const { basketItems, setBasket } = useContext(AppContext)
	console.log(basketItems.length)
	return (
		<div className={styles.overlay}>
			<div className={styles.basket}>
				<div>
					<h2 className='d-flex justify-between mr-20'>
						Корзина
						<img
							className={styles.delete}
							width={32}
							height={32}
							src='/img/btn-remove.svg'
							alt='btn-remove'
							onClick={() => setBasket(prev => !prev)}
						/>
					</h2>
					{basketItems.length > 0 ? (
						<ul className={styles.cardsContainer}>
							{basketItems.map(item => (
								<BasketCard key={uuidv4()} {...item} />
							))}
						</ul>
					) : (
						<div className={styles.emptyBasket}>
							<h3 className='fw-bold m-5'>Корзина пустая</h3>
							<p className={styles.text}>
								Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
							</p>
							<div className='container'>
								<img src='/img/empty-cart.jpg' alt='empty basket' />
							</div>
							<Button />
						</div>
					)}
				</div>


				{basketItems.length > 0 && (
					<div className={styles.total}>
						<ul>
							<li>
								<span>Итого:</span>
								<div className='emptyContainer'></div>
								<b>21 498 руб.</b>
							</li>
							<li className='mb-10'>
								<span>Налог 5%:</span>
								<div className='emptyContainer'></div>
								<b>1074 руб.</b>
							</li>
						</ul>
						<button
							onClick={() => setBasket(prev => !prev)}
						>
							<span>Оформить заказ</span>
							<img src='/img/arrow.svg' alt='arrow' />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Basket
