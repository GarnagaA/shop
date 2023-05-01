import styles from './Card.module.scss'
import {useState} from "react";

function Card(props) {
    const {title, price, imageUrl, onAddBasket} = props

    const [liked, setLiked] = useState(false) // хранит состояние лайка нажат/не нажат
    const [added, setAdded] = useState(false) // хранит состояния крестика добавления добавлен/ не добавлен

    const onLiked = ( ) => {
        setLiked( prevLiked => !prevLiked)
    }

    const onAdd = () => {
        onAddBasket({title, price, imageUrl})
        setAdded( prevAdded => !prevAdded)
    }


    return (
            <div className={styles.card}>
                <div className={styles.favorite}>
                    { liked ? <img onClick={onLiked} src='/img/liked.svg' alt='liked' />
                            : <img onClick={onLiked} src="/img/unliked.svg" alt="unliked"/> }
                </div>
                <img src={imageUrl} alt="sneakers"/>
                <h5>Мужские Кроссовки<br/>{title}</h5>
                <div className='d-flex justify-between align-center'>
                    <div className='d-flex flex-column'>
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    <button type='submit' onClick={onAdd}>
                        { added ? <img width={22} height={22} src="/img/btn-checked.svg" alt="button add"/>
                                : <img width={22} height={22} src="/img/plus.svg" alt="button remove"/> }
                    </button>
                </div>
            </div>
    );
}

export default Card;