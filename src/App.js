import Card from './components/Card'
import Header from './components/Header'
import Basket from './components/Basket'
import Search from './components/Search'

import {useEffect, useState} from "react";
import axios from "axios";
import {Routes, Route, Link } from "react-router-dom";
import {Favorites} from "./pages/Favorites";
import {Home} from "./pages/Home";



export default function App() {
    const [items, setItems] = useState([
        {
            "title": "Кроссовки Invisible White Black | BLAZE-BY",
            "price": 9990,
            "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__57780__product_zoom_large_800x800/314205222004_01.jpg",
            "id": 3421423425
        },
        {
            "title": "Кроссовки Nike Dunk Low Retro White Black | BLAZE-BY",
            "price": 9990,
            "imageUrl": "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/4NYAAOSwrUNgWKva/$_58.png",
            "id": 32142154315
        },
        {
            "title": "Nike M2K Tekno",
            "price": 32200,
            "imageUrl": "https://m2k.com.ua/image/cache/catalog/m2kphoto/black_team_orange/krossovki_nike_m2k_tekno_black_team_orange_ao3108_101_1-500x500-product_list.jpg",
            "id": 532531
        },
        {
            "title": "Nike Air Force 1 07 QS Valentines Day Love Letter",
            "price": 20100,
            "imageUrl": "https://myreact.ru/wp-content/uploads/2021/04/Nike-Air-Force-1-Low-Valentines-Day-DD3384-600-Release-Date-2.jpg",
            "id": 343154382
        },
        {
            "title": "Кроссовки Nike Air 200",
            "price": 10700,
            "imageUrl": "https://ir.ozone.ru/s3/multimedia-z/c1000/6383869691.jpg",
            "id": 38221321641
        },
        {
            "title": "Кроссовки Nike Elephant One",
            "price": 21990,
            "imageUrl": "https://cdn.shopify.com/s/files/1/0598/3669/4689/products/77338-116-original_800x_1e32a3fb-2855-4078-b297-742815405dde_1800x1800.png?v=1657936107",
            "id": "38221321642"
        },
        {
            "title": "Кроссовки Nike Model 69",
            "price": 10700,
            "imageUrl": "https://static.tildacdn.com/tild3638-3866-4132-b833-643132653638/12.jpg",
            "id": "1234185237"
        },
        {
            "title": "Yeezy Boost 350 V2 Black (Non-Reflective)",
            "price": 10230,
            "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__127613__product_zoom_large_800x800/314215228504_01.jpg",
            "id": "12341832124"
        },
        {
            "title": "Air Jordan 1 Retro High Hyper Royal",
            "price": 10230,
            "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__123227__product_zoom_large_800x800/314214700404_01.jpg",
            "id": "32143214"
        }
    ]) // хранит карточки (main content)

    const [basket, setBasket] = useState(false) // хранит состояние корзины open/close
    const [basketItems, setBasketItems] = useState([]) // хранит товары переданные в корзину
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

    const onAddToBasket = async (obj) => { // Добавляем и удаляем объекты в корзину при первом рэндаре
        try{
            if (basketItems.find(basObj => basObj.id === obj.id)) {
                axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/${obj.id}`)
                setBasketItems( prev => prev.filter(prevObj => prevObj !== obj.id)) // убираем из State
            } else {
                const {data} = axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/', obj)
                setBasketItems( prev => ([...prev, data]))
                console.log(data)
            }
        } catch (error) {
            alert('Не удалось добавить товар в Корзину...')
        }
    }

    const onAddToFavorites = async (obj) => { // Добавляем объекты в закладки

        try {
            if (favorites.find( favObj => favObj.id === obj.id )) {
                axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/${obj.id}`)
                // не убираем из State карточку, на случай случайного клика, но удаляем с Backend
            } else {
                const {data} = await axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/', obj)
                setFavorites( prev => ([...prev, data]))
            }
        } catch (error) {
            alert('Не удалось добавить в Избранное...')
        }
        // setFavorites( prevFavorites => ([...prevFavorites, obj]))
        // axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/', obj)
    }

    //  Метод delete() должен удалять объект с сервера по id ?????????????
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
        </div>
        <Routes>
            {/*<Route path="/favorites" element={<Favorites/>}/>*/}
            {/*<Route path="/" element={<Home/>}/>*/}
            {/*<Route path="/" element={<Favorites/>}/>*/}
        </Routes>
    </div>
  )
}

