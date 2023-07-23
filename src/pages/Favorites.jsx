import Search from "../components/Search";
import Card from "../components/Card";

export function Home( props ) {

const {setSearchValue,
    searchValue,
    items,
    onAddToFavorites,
    onAddToBasket,
} = props
    return (
        <div className="content2 p-40">
            <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
            <ul className='d-flex flex-wrap'>{items
                .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map( (item, index) =>
                    <Card
                        {...item} // сокращённая запись
                        key={index}
                        // onRemoveFromBasket={ () => onRemoveFromBasket(item.id)}
                        // onRemoveFromFavorites={() => onRemoveFromFavorites(item.id)}
                        onAddToFavorites={() => onAddToFavorites(item)}
                        onAddToBasket={() => onAddToBasket(item)}
                        // favorites={favorites}
                        // setFavorites={setFavorites}
                    />)}
            </ul>
        </div>    )
}