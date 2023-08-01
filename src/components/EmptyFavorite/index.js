import styles from './EmptyFavorite.module.scss'
import { useContext } from 'react'
import AppContext from '../context'

function EmptyFavorite() {
	const {} = useContext(AppContext)

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img src='/img/emoji-cry.png' width={70} height={70} alt='' />
				<h3 className='mt-25'>Закладок нет :(</h3>
				<span className='opacity-4 mt-10'>
					Вы ничего не добавляли в закладки
				</span>
				<button className='mt-50'>
					<img src='/img/arrow.svg' alt='стрелка назад' />
					<span>Вернуться назад</span>
				</button>
			</div>
		</div>
	)
}
export default EmptyFavorite;