import styles from './Card.module.scss'
import { useContext } from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../context'

function Card({ title, price, src, id, pureId }) {
	const {
		isItemAdded,
		isItemLiked,
		onAddToBasket,
		onAddToFavorites,
		isLoading
	} = useContext(AppContext)

	// const parentId = ''

	const obj = { parentId: id, pureId, title, price, src }

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={210}
					height={260}
					viewBox='0 0 210 260'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='83' y='50' rx='0' ry='0' width='0' height='1' />
					<rect x='-117' y='-170' rx='0' ry='0' width='226' height='154' />
					<rect x='0' y='36' rx='10' ry='10' width='150' height='91' />
					<rect x='186' y='79' rx='0' ry='0' width='1' height='0' />
					<rect x='0' y='142' rx='3' ry='3' width='150' height='15' />
					<rect x='0' y='162' rx='3' ry='3' width='93' height='15' />
					<rect x='118' y='192' rx='8' ry='8' width='32' height='32' />
					<rect x='0' y='199' rx='8' ry='8' width='80' height='24' />
				</ContentLoader>
			) : (
				<div>
					{onAddToFavorites && (
						<div
							className={styles.favorite}
							onClick={() => onAddToFavorites(obj)}
						>
							<img
								width={30}
								height={30}
								src={
									isItemLiked(pureId) ? '/img/liked.svg' : '/img/unliked(2).svg'
								}
								alt='unliked'
							/>
						</div>
					)}
					<img src={src} alt='sneakers' />
					<h5>
						Мужские Кроссовки
						<br />
						{title}
					</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onAddToBasket && (
							<button onClick={() => onAddToBasket(obj)}>
								{isItemAdded(pureId) ? (
									<img
										width={32}
										height={32}
										src='/img/btn-checked.svg'
										alt='button '
									/>
								) : (
									<img
										width={11}
										height={11}
										src='/img/plus.svg'
										alt='button add'
									/>
								)}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
export default Card
