import styles from './EmptyFavorite.module.scss'
import { Link } from 'react-router-dom'
import Button from '../Button'

function EmptyFavorite() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img src='/img/emoji-cry.png' width={70} height={70} alt='emoji sad' />
				<h3 className={styles.title}>Закладок нет :(</h3>
				<div className={styles.text}>Вы ничего не добавляли в закладки</div>
				<Link to='/'>
					<div>
						<Button />
					</div>
				</Link>
			</div>
		</div>
	)
}
export default EmptyFavorite;