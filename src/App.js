import Card from './components/Card'
import Header from './components/Header'
import Basket from './components/Basket'
import Search from './components/Search'

import {useEffect, useState} from "react";

function App() {

    const [basket, setBasket] = useState(false)
    const [basketItems, setBasketItems] = useState([])
    const [items, setItems] = useState([])

    const onOpenBasket = ( ) => {
        setBasket( prevDrawer => !prevDrawer)
    }

    // создать ф-цию и получить объект из Card
    const onAddCardToBasket = (obj) => {
        setBasketItems( prevBasketItems => ([...prevBasketItems, obj]))
    }


    // Чтобы избежать бесконечного цикла ререндера функции App и запроса fetch(который обновляет state), мы обращаемся к backend один раз
    useEffect( () => {
        fetch('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/cards')
            .then( res => {
                return res.json()
            }).then(json => {
            console.log(json)
            setItems(json)
        });
    }, []);

  return (
      <div className="wrapper clear">
          {basket && <Basket onCloseBasket={onOpenBasket} onRemoveCard={setBasketItems}/>}
          <Header onDrawer={onOpenBasket}/>
          <div className="content2 p-40">
              <Search />
              {/*<div className='d-flex justify-between mb-40'>*/}
              {/*    <h1 className='header__title'>Все кроссовки</h1>*/}
              {/*    <div className='search-block d-flex'>*/}
              {/*        <img width={20} src="/img/search.svg" alt="search"/>*/}
              {/*        <input height={50} type="text" placeholder='Поиск...' />*/}
              {/*    </div>*/}
              {/*</div>*/}
              <div className='d-flex flex-wrap'>
                  {items.map( item =>
                          <Card title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                key={item.id}
                                // onAddBasket={(obj) => onAddToCard(obj)}
                                onAddBasket={(item) => onAddCardToBasket(item)}
                          />)}
              </div>
          </div>
      </div>
  )
}

export default App;
