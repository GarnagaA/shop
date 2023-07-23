import Search from "../components/Search";
import Card from "../components/Card";

export function Home({
        setSearchValue,
        searchValue,
        items,
        onAddToFavorites,
        onAddToBasket,
        isLoading,
}) {

    const renderItems = () => {
        const filteredItems = items.filter(obj =>
            obj.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
                <Card
                    key={index}
                    onAddToFavorites={(item) => onAddToFavorites(item)}
                    onAddToBasket={(item) => onAddToBasket(item)}
                    loading={isLoading}
                    {...item}
                />
        ))
    };

    return (
        <div className="content2 p-40">
            <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
            <ul className='d-flex flex-wrap'>
                {renderItems()}
            </ul>
        </div>
    )
}