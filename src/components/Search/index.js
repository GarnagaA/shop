import styles from './Search.module.scss'
import { useContext } from 'react'
import AppContext from '../context'

function Search() {
	const { searchValue, setSearchValue } = useContext(AppContext)
	// Функция по фильтрации State items на основе данный из Input
	const onChangeSearchValue = event => {
		setSearchValue(event.target.value)
	}

	return (
		<div className={styles.search}>
			<h2>
				{searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки`}
			</h2>
			<label>
				<img className={styles.imgSearch} src='img/search.svg' alt='search' />
				<input
					placeholder='Поиск...'
					onChange={onChangeSearchValue}
					value={searchValue}
				/>
				<img
					className={styles.buttonClose}
					src='img/btn-remove.svg'
					alt='btn-remove'
					onClick={() => setSearchValue('')}
				/>
			</label>
		</div>
	)
}

export default Search
