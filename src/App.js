import Card from './components/Card'
import Header from './components/Header'
import Basket from './components/Basket'
import Search from './components/Search'


import {useEffect, useState} from "react";
import axios from "axios";
import {Routes, Route, Link } from "react-router-dom";


export default function App() {



    const [basket, setBasket] = useState(false) // хранит состояние корзины open/close
    const [basketItems, setBasketItems] = useState([]) // хранит товары переданные в корзину
    const [items, setItems] = useState([]) // хранит карточки (main content)
    const [searchValue, setSearchValue] = useState('') // хранит текст введённый в input
    const [favorites, setFavorites] = useState([])

    useEffect( () => {     // Чтобы избежать бесконечного цикла ререндера функции App и запроса fetch(который обновляет state), мы обращаемся к backend один раз

        //     Вариант отправки запроса через встроенный в браузер метод fetch() (window.fetch)

        //     fetch('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/cards')
        //         .then( res => {
        //             return res.json()
        //         }).then(json => {
        //         console.log(json)
        //         setItems(json)
        //     });
        // }, []);

        axios.get('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/cards').then(res => {
            setItems(res.data)
            console.log(res.data)
        });

        axios.get('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket').then(res => {
            setBasketItems(res.data)
            console.log(res.data)
        })

        axios.get('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket').then(res => {
            setFavorites(res.data)
        })


    } ,[]);

    const onOpenBasket = ( ) => { // Открываем/закрываем корзину при первом рэндаре
        setBasket( prevDrawer => !prevDrawer)
    }

    const onAddCardToBasket = async (obj) => { // Добавляем и удаляем объекты в корзину при первом рэндаре
        try{
            if (basketItems.find(basObj => basObj.id === obj.id)) {
                axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/${obj.id}`)
            } else {
                const {data} = axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/', obj)
                setBasketItems( prev => ([...prev, data]))
            }
        } catch (error) {
            alert('Не удалось добавить товар в Корзину...')
        }

        setBasketItems( prevBasketItems => ([...prevBasketItems, obj]))
        axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/', obj)
    }

    const onAddToFavorites = async (obj) => { // Добавляем объекты в закладки

        try {
            if (favorites.find( favObj => favObj.id === obj.id )) {
                axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/${obj.id}`)
            } else {
                const {data} = await axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/', obj)
                setFavorites( prev => ([...prev, data]))
            }
        } catch (error) {
            alert('Не удалось добавить в Избранное...')
        }
        setFavorites( prevFavorites => ([...prevFavorites, obj]))
        axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/', obj)
    }

     // Метод delete() должен удалять объект с сервера по id
    const  onRemoveFromBasket = (id) => {
        axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/${id}`)
        setBasketItems( prevBasketItems => prevBasketItems.filter(item => item.id !== id))
    }
        return (

    <div className="wrapper clear">
        {basket && <Basket onCloseBasket={onOpenBasket}
                         setBasketItems={setBasketItems}
                         basketItems={basketItems}
                         onRemoveFromBasket={onRemoveFromBasket}/>}
        <Header onDrawer={onOpenBasket}/>
        <div className="content2 p-40">
              <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
              <ul className='d-flex flex-wrap'>{items
                    .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map( (item, index) =>
                        <Card title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            key={index}
                            onRemoveFromBasket={ () => onRemoveFromBasket(item.id)}
                            // onRemoveFromFavorites={() => onRemoveFromFavorites(item.id)}
                            onAddToFavorites={() => onAddToFavorites(item)}
                            onAddToBasket={() => onAddCardToBasket(item)}
                            // favorites={favorites}
                            // setFavorites={setFavorites}
                        />)}
              </ul>
        </div>
        <Routes>
            {/*<Route path="/favorites" element={<Favorites/>}/>*/}
            {/*<Route path="/" element={<Home/>}/>*/}
            {/*<Route path="/" element={<Favorites/>}/>*/}
        </Routes>
    </div>
  )
}

