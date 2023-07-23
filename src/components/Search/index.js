import styles from './Search.module.scss'


function Search (props) {
    const {searchValue, setSearchValue} = props //
    // Функция по фильтрации State items на основе данный из Input

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className={styles.search}>
            <h2>
                { searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки` }
            </h2>
            <label>
                <img className={styles.imgSearch} src="/img/search.svg" alt="search"/>
                <input
                       placeholder='Поиск...'
                       onChange={onChangeSearchValue}
                       value={searchValue}
                />
                <img className={styles.buttonClose} src="/img/btn-remove.svg" alt="btn-remove"
                     onClick={() => setSearchValue('')}/>
            </label>
        </div>
    )
}

export default Search;