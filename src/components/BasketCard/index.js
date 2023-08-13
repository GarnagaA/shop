import styles from './BasketCard.module.scss'
import { useContext } from 'react'
import AppContext from '../context'

function BasketCard({ title, price, src, id, pureId }) {
	const { onAddToBasket } = useContext(AppContext)
	const obj = { title, price, src, id, pureId, parentId: id }

	return (
		<li className={styles.card}>
			<div className='d-flex'>
				<img width={133} height={112} src={src} alt='sneakers' />
				<div className=''>
					<h5>{title}</h5>
					<b>{price} руб.</b>
				</div>
			</div>
			<img
				className={styles.delete}
				width={32}
				height={32}
				src='/img/btn-remove.svg'
				alt='btn-remove'
				onClick={() => onAddToBasket(obj)}
			/>
		</li>
	)
}

export default BasketCard;