import {useState} from "react";
import styles from './Search.module.scss'


function Search () {
    // const {searchBlock, searchInput} = styles.search
    const [searchValue, setSearchValue] = useState('')

    // Функция по фильтрации State items на основе данный из Input
    const onChangeSearchValue = (event) => {
        // const {name, value} = event.target
        console.log(event.target.value)
        setSearchValue(event.target.value)

    }

    return (
        <div className={styles.search}>
            <h2>
                { searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки` }
            </h2>
            <div className={styles.searchBlock}>
                <img className='pl-5' width={20} src="/img/search.svg" alt="search"/>
                <input className={styles.searchInput}
                       type="text"
                       placeholder='Поиск...'
                       onChange={onChangeSearchValue}
                       // value={searchValue}
                />
            </div>
        </div>
    )
}

export default Search;