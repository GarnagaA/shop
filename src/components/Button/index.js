import styles from './Button.module.scss'
import { useContext } from 'react'
import AppContext from '../context'

function Button() {
	const { setBasket } = useContext(AppContext)

	return (
		<button className={styles.button} onClick={() => setBasket(prev => !prev)}>
			<img src='/img/arrow.svg' alt='arrow' />
			<span>Вернуться назад</span>
		</button>
	)
}
export default Button;