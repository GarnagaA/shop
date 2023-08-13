import styles from './Info.module.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context'

function Info({ img, title, text, width, height }) {
	const { setBasket } = useContext(AppContext)

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img src={img} width={width} height={height} alt='emoji sad' />
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.text}>{text}</div>
				<Link to='/'>
					<div className='m-0'>
						<button className={styles.button} onClick={() => setBasket(false)}>
							<img src='/img/arrow.svg' alt='arrow' />
							<span>Вернуться назад</span>
						</button>
					</div>
				</Link>
			</div>
		</div>
	)
}
export default Info;