import Card from "../components/Card";

export function Favorites( props ) {

    const {items, onAddToFavorites} = props


    return (
        <div className="content2 p-40">
            <h1 className="">Мои закладки</h1>
            <ul className='d-flex flex-wrap'>{items
                .map( item =>
                    <Card {...item}
                        key={item.id}
                        favorited={true}
                        onAddToFavorites={onAddToFavorites}
                    />)}
            </ul>
        </div>
    )
}