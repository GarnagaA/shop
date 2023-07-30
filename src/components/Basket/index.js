import styles from './Basket.module.scss'
import { useContext } from 'react'
import AppContext from '../context'

function Basket() {
	const { setBasket, basketItems, onRemoveFromBasket } = useContext(AppContext)

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
							onClick={() => setBasket(false)}
						/>
					</h2>
					{basketItems.length > 0 ? (
						<ul className={styles.cardsContainer}>
							{basketItems.map((item, index) => (
								<li className={styles.card} key={index}>
									<div className='d-flex'>
										<img
											width={133}
											height={112}
											src={item.imageUrl}
											alt='sneakers'
										/>
										<div className='justify-between'>
											<h5>{item.title}</h5>
											<b>{item.price} руб.</b>
										</div>
									</div>
									<img
										className={styles.delete}
										width={32}
										height={32}
										src='/img/btn-remove.svg'
										alt='btn-remove'
										onClick={onRemoveFromBasket(item.parentId)} // onRemove
									/>
								</li>
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
							<button
								className={styles.button}
								onClick={() => setBasket(false)}
							>
								<img className={styles.img} src='/img/arrow.svg' alt='arrow' />
								<span className=''>Вернуться назад</span>
							</button>
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
							<li>
								<span>Налог 5%:</span>
								<div className='emptyContainer'></div>
								<b>1074 руб.</b>
							</li>
						</ul>
						<button></button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Basket
