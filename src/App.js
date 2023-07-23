// ссылка на дизайн проета в Figme https://www.figma.com/file/fw0toTyXMwM1y4WIe0YFrJ/React-Sneakers?type=design&node-id=60-1005
import React from "react";
import Header from './components/Header';
import Basket from './components/Basket';
import AppContext from "./components/context";
import axios from "axios";

import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";

import {Favorites} from "./pages/Favorites";
import {Home} from "./pages/Home";


export default function App() {
   // хранит карточки (main content)
   //  const sneakers = [
   //      {
   //          "parentId": "543213453322",
   //          "title": "Кроссовки Invisible White Black | BLAZE-BY",
   //          "price": "9990",
   //          "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__57780__product_zoom_large_800x800/314205222004_01.jpg"
   //      },
   //      {
   //          "parentId": "3816426285433",
   //          "title": "Кроссовки Nike Dunk Low Retro White Black | BLAZE-BY",
   //          "price": "9990",
   //          "imageUrl": "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/4NYAAOSwrUNgWKva/$_58.png"
   //      },
   //      {
   //          "parentId": "3746382022323",
   //          "title": "Nike M2K Tekno",
   //          "price": "32200",
   //          "imageUrl": "https://m2k.com.ua/image/cache/catalog/m2kphoto/black_team_orange/krossovki_nike_m2k_tekno_black_team_orange_ao3108_101_1-500x500-product_list.jpg"
   //      },
   //      {
   //          "parentId": "239523162784",
   //          "title": "Nike Air Force 1 07 QS Valentines Day Love Letter",
   //          "price": "20100",
   //          "imageUrl": "https://myreact.ru/wp-content/uploads/2021/04/Nike-Air-Force-1-Low-Valentines-Day-DD3384-600-Release-Date-2.jpg"
   //      },
   //      {
   //          "parentId": "394023216453",
   //          "title": "Кроссовки Nike Air 200",
   //          "price": "10700",
   //          "imageUrl": "https://ir.ozone.ru/s3/multimedia-z/c1000/6383869691.jpg"
   //      },
   //      {
   //          "parentId": "2958734213983",
   //          "title": "Кроссовки Nike Elephant One",
   //          "price": "21990",
   //          "imageUrl": "https://cdn.shopify.com/s/files/1/0598/3669/4689/products/77338-116-original_800x_1e32a3fb-2855-4078-b297-742815405dde_1800x1800.png?v=1657936107"
   //      },
   //      {
   //          "parentId": "482623214905",
   //          "title": "Кроссовки Nike Model 69",
   //          "price": "10700",
   //          "imageUrl": "https://static.tildacdn.com/tild3638-3866-4132-b833-643132653638/12.jpg"
   //      },
   //      {
   //          "parentId": "1937521314163",
   //          "title": "Yeezy Boost 350 V2 Black (Non-Reflective)",
   //          "price": "10230",
   //          "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__127613__product_zoom_large_800x800/314215228504_01.jpg"
   //      },
   //      {
   //          "parentId": "5873732112339",
   //          "title": "Air Jordan 1 Retro High Hyper Royal",
   //          "price": "10400",
   //          "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__123227__product_zoom_large_800x800/314214700404_01.jpg"
   //      }
   //  ]
    const [items, setItems] = useState([])
    const [basketItems, setBasketItems] = useState([]) // хранит товары переданные в корзину
    const [favoriteItems, setFavoriteItems] = useState([]) // Избранные товары

    const [basket, setBasket] = useState(false) // хранит состояние корзины open/close
    const [searchValue, setSearchValue] = useState('') // хранит текст введённый в input
    const [isLoading, setIsLoading] = useState(true)



    useEffect( () => {     // Чтобы избежать бесконечного цикла ререндера функции App и запроса fetch(который обновляет state), мы обращаемся к backend один раз

        async function fetchData () {
            try {
                const [favoriteItemsResponse, basketItemsResponse, itemsResponse] = await Promise.all([
                    axios.get('https://8827e7cbec62594a.mokky.ru/favorites'),
                    axios.get('https://8827e7cbec62594a.mokky.ru/basket'),
                    axios.get('https://8827e7cbec62594a.mokky.ru/items')
                ]);

                setIsLoading(false)
                setFavoriteItems(favoriteItemsResponse.data)
                setBasketItems(basketItemsResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при запросе данных ;(')
                console.error(error)
            }
        }

        fetchData(); // вызываем нашу async ф-цию

        //     Вариант отправки запроса через встроенный в браузер метод fetch() (window.fetch)
        //     fetch('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/cards')
        //         .then( res => {
        //             return res.json()
        //         }).then(json => {
        //         console.log(json)
        //         setItems(json)
        //     });
        // }, []);

    } ,[]);

    const onAddToBasket = async (obj) => { // Добавляем и удаляем объекты
        try{
            const findItem = basketItems.find(item => Number(item.parentId) === Number(obj.id))
            if (findItem) { // удаление из корзины
                setBasketItems( prevItems => prevItems.filter(prevObj => Number(prevObj.parentId) !== Number(obj.id)))
                await axios.delete(`https://8827e7cbec62594a.mokky.ru/basket/${obj.id}`)
                console.log(`удалили объект c id = ${obj.parentId}`)
            } else {
            setBasketItems( (prev )=> ([...prev, obj]))
                const {data} = await axios.post('https://8827e7cbec62594a.mokky.ru/basket/', obj)
                setBasketItems( (prev) =>
                    (prev.map( (item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                        })
                    )
                )
            }
        } catch (error) {
            alert('Не удалось добавить товар в Корзину...')
            console.error( error )
        }
    }

    const onAddToFavorites = async (obj) => { // Добавляем объекты в закладки
        try {
            if (favoriteItems.find( (favObj) => Number(favObj.id) === Number(obj.id) )) {
                axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/${obj.id}`)
                setFavoriteItems( (prev) => (prev.filter((item) => Number(item.id) !== Number(obj.id))))
                // не убираем из State карточку, на случай случайного клика, но удаляем с Backend
            } else {
                const {data} = await axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/favorites/', obj)
                setFavoriteItems( prev => ([...prev, data]))
                console.log(obj)
            }
        } catch (error) {
            alert('Не удалось добавить в Избранное...')
        }
        console.log(favoriteItems)
    }

    //  Метод delete() должен удалять объект с сервера по id ?????????????
    const  onRemoveFromBasket = (id) => {
        try {
            axios.delete(`https://8827e7cbec62594a.mokky.ru/basket/${id}`)
            setBasketItems( (prev) => (prev.filter(obj => obj.id !== id)))
        } catch (error) {
            alert('Ошибка при удалении из корзины')
            console.error(error)
        }
    }

    const isItemAdded = (id) => {
        return  basketItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            items,
            setBasket,
            basketItems,
            favoriteItems,
            setIsLoading,
            onAddToBasket,
            onAddToFavorites,
            isItemAdded,
        }}>
            <div className="wrapper clear">
                {basket && <Basket
                    setBasket={setBasket}
                    basketItems={basketItems}
                    onRemove={onRemoveFromBasket}
                />}

                <Header setBasket={setBasket}/>

                <Routes>
                    <Route path="/favorites" element={<Favorites
                        items={favoriteItems}
                        onAddToFavorites={onAddToFavorites}
                        // onRemoveFromFavorites={(obj) => onRemoveFromFavorites(obj.id)}
                    />}/>

                    <Route path="/" element={
                        <Home
                            items={items}
                            basketItems={basketItems}
                            favoriteItems={favoriteItems}
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                            onAddToFavorites={(obj) => onAddToFavorites(obj)}
                            onAddToBasket={(obj) => onAddToBasket(obj)}
                            isLoading={isLoading}
                        />
                    }/>
                </Routes>
            </div>
        </AppContext.Provider>
  )
}

