import styles from './Order.module.scss'
import Card from '../Card'

export function Order({ id, items, dateOrder, totalPrice }) {
	// const renderItems = () => {
	// 	return (
	//
	// }

	return (
		<li className={styles.order}>
			<div className={styles.orderInfo}>
				<span className={styles.firstChild}>Заказ #{id}</span>
				<span> от {dateOrder}</span>
				<span>сумма {totalPrice} руб.</span>

				<span> товаров в заказе - {items.length} шт.</span>
			</div>
			<ul className='d-flex flex-wrap mt-5'>
				{items.map((item, index) => (
					<Card {...item} key={index} />
				))}
			</ul>
		</li>
	)
}