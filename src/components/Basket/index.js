import styles from './Basket.module.scss'
import BasketCard from '../BasketCard'
import { v4 as uuidv4 } from 'uuid'
import Info from '../Info'
import axios from 'axios'
import moment from 'moment/moment'
import { useBasket } from '../../hooks/useBasket'

function Basket() {
	const {
		onAddToBasket,
		basketItems,
		setBasket,
		setOrders,
		isOrderComplete,
		setIsOrderComplete,
		totalPrice,
		isLoading,
		setIsLoading,
		isOrderId,
		setIsOrderId
	} = useBasket()

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
	const dateOrder = () => {
		return moment().format('L')
	}
	const taxOrder = () => Math.floor(totalPrice() * 0.05)

	const onAddToOrders = async () => {
		setIsLoading(true)
		try {
			console.log(`onAddToOrders начала работу \n isLoading === ${isLoading}`)
			const { data } = await axios.post(
				'https://64c5521ec853c26efadab8a4.mockapi.io/orders',
				{
					items: basketItems,
					dateOrder: dateOrder(),
					totalPrice: String(totalPrice()),
					taxOrder: String(taxOrder())
				}
			)
			setOrders(prev => [...prev, data])
			setIsOrderId(data.id)
			setIsOrderComplete(true)

			for (let i = 0; i < basketItems.length; i++) {
				onAddToBasket(basketItems[i])
				await delay(1000)
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(')
		}
		setIsLoading(false)
	}
	console.log(isOrderId)
	return (
		<div className={styles.overlay}>
			<div className={styles.basket}>
				<h2 className='d-flex justify-between'>
					Корзина
					<img
						className={styles.delete}
						width={32}
						height={32}
						src='img/btn-remove.svg'
						alt='btn-remove'
						onClick={() => setBasket(false)}
					/>
				</h2>
				<div>
					{basketItems.length > 0 ? (
						<div className={styles.container}>
							<ul className={styles.cards}>
								{basketItems.map(item => (
									<BasketCard key={uuidv4()} {...item} />
								))}
							</ul>
							<div className={styles.total}>
								<ul>
									<li>
										<span>Итого:</span>
										<div className='emptyContainer'></div>
										<b>{totalPrice()} руб.</b>
									</li>
									<li className='mb-10'>
										<span>Налог 5%:</span>
										<div className='emptyContainer'></div>
										<b>{Math.floor(totalPrice() * 0.05)} руб.</b>
									</li>
								</ul>
								<button disabled={isLoading} onClick={() => onAddToOrders()}>
									<span>Оформить заказ</span>
									<img src='img/arrow.svg' alt='arrow' />
								</button>
							</div>
						</div>
					) : (
						<Info
							width={isOrderComplete ? 83 : 120}
							height={120}
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
							img={
								isOrderComplete
									? 'img/complete-order.jpg'
									: 'img/empty-cart.jpg'
							}
							text={
								isOrderComplete
									? `Ваш заказ #${isOrderId} скоро будет передан курьерской доставке`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Basket
