import Card from './components/Card'
import Header from './components/Header'
import Basket from './components/Basket'
import Search from './components/Search'

import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [basket, setBasket] = useState(false) // хранит состояние корзины open/close
    const [basketItems, setBasketItems] = useState([]) // хранит товары переданные в корзину
    const [items, setItems] = useState([]) // хранит карточки (main content)
    const [searchValue, setSearchValue] = useState('') // хранит текст введённый в input


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


    } ,[]);

    const onOpenBasket = ( ) => { // Открываем/закрываем корзину при первом рэндаре
        setBasket( prevDrawer => !prevDrawer)
    }
    // Метод post() должен отправлять объект на сервер
    const onAddCardToBasket = (obj) => { // Добавляем объекты в корзину при первом рэндаре
        setBasketItems( prevBasketItems => ([...prevBasketItems, obj]))
        axios.post('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/', obj)
    }
    // Метод delete() должен удалять объект с сервера по id
    const onRemoveFromBasket = (id) => {
        axios.delete(`https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/basket/${id}`)
        setBasketItems( prevBasketItems => prevBasketItems.filter(item => item.id !== id))
    }


        return (
      <div className="wrapper clear">
          {basket && <Basket onCloseBasket={onOpenBasket}
                             setBasketItems={setBasketItems}
                             basketItems={basketItems}
                             onRemoveFromBasket={onRemoveFromBasket}
          />}
          <Header onDrawer={onOpenBasket}/>
          <div className="content2 p-40">
              <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
              <div className='d-flex flex-wrap'>{items
                    .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map( item =>
                        <Card title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            key={item.id}
                            // onAddBasket={(obj) => onAddToCard(obj)}
                            onAddBasket={() => onAddCardToBasket(item)}
                        />)}
              </div>
          </div>
      </div>
  )
}

export default App;
