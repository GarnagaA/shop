import styles from './Card.module.scss'
import {useContext, useState} from "react";
import AppContext from "../context";
import ContentLoader from "react-content-loader"


function Card (props) {

    const {title,
        price,
        imageUrl,
        id,
        onAddToBasket,
        onAddToFavorites,
        // added = false,
        favorited = false,
        loading = false
    } = props

    const { isItemAdded } = useContext(AppContext)
    const obj = {id, parentId: id, title, price, imageUrl}
    const [isFavorite, setIsFavorite] = useState(favorited) // хранит состояние лайка нажат/не нажат
    // const [isAdded, setIsAdded] = useState(added) // хранит состояния крестика добавления добавлен/ не добавлен ????? проверить нужен ли

    const onClickFavorite = () => {
        setIsFavorite(prev => !prev)
        onAddToFavorites(obj)
        console.log('onClickFavorite' + obj)
    }

    const onClickPlus = () => { // Добавить отдельный метод removeBasket...????????????????????????????????????????????????????????????????????
        // setIsAdded( prevAdded => !prevAdded)
        onAddToBasket(obj)
        console.log('onBasket' + obj)
    }

    return (
        <div className={styles.card}>
            { loading ? (
                <ContentLoader
                    speed={2}
                    width={210}
                    height={260}
                    viewBox="0 0 210 260"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="83" y="50" rx="0" ry="0" width="0" height="1" />
                    <rect x="-117" y="-170" rx="0" ry="0" width="226" height="154" />
                    <rect x="0" y="36" rx="10" ry="10" width="150" height="91" />
                    <rect x="186" y="79" rx="0" ry="0" width="1" height="0" />
                    <rect x="0" y="142" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="162" rx="3" ry="3" width="93" height="15" />
                    <rect x="118" y="192" rx="8" ry="8" width="32" height="32" />
                    <rect x="0" y="199" rx="8" ry="8" width="80" height="24" />
                </ContentLoader>
             ) : (
                 <div>
                     {onAddToFavorites && (
                         <div className={styles.favorite} onClick={() => onClickFavorite}>
                             <img src={ isFavorite ? "/img/unliked.svg" :'/img/liked.svg'} alt="unliked"/>
                         </div>
                     )}
                     <img src={imageUrl} alt="sneakers"/>
                     <h5>Мужские Кроссовки<br/>{title}</h5>
                     <div className='d-flex justify-between align-center'>
                         <div className='d-flex flex-column'>
                             <span>Цена:</span>
                             <b>{price} руб.</b>
                         </div>
                         {onAddToBasket && (
                             <button onClick={onClickPlus}>
                                 <img width={22} height={22}
                                      src={ isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg" } alt="button add"/>
                             </button>
                         )}
                     </div>
                 </div>
             )}
        </div>
    );
}
export default Card;