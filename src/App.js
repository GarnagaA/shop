// ссылка на дизайн проета в Figme https://www.figma.com/file/fw0toTyXMwM1y4WIe0YFrJ/React-Sneakers?type=design&node-id=60-1005
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Basket from './components/Basket'
import AppContext from './components/context'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'

import { Favorites } from './pages/Favorites'
import Home from './pages/Home'

export default function App() {
	const [items, setItems] = useState([])
	const [basketItems, setBasketItems] = useState([]) // хранит товары переданные в корзину
	const [favoriteItems, setFavoriteItems] = useState([]) // Избранные товары

	const [basket, setBasket] = useState(false) // хранит состояние корзины open/close
	const [searchValue, setSearchValue] = useState('') // хранит текст введённый в input
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			// Чтобы избежать бесконечного цикла ререндера функции App и запроса fetch(который обновляет state), мы обращаемся к backend один раз
			try {
				const [favoriteItemsResponse, basketItemsResponse, itemsResponse] =
					await Promise.all([
						axios.get('https://64c5521ec853c26efadab8a4.mockapi.io/favorites'),
						axios.get('https://64c54e60c853c26efadab373.mockapi.io/basket'),
						axios.get('https://64c54e60c853c26efadab373.mockapi.io/items')
					])

				setIsLoading(false)
				setFavoriteItems(prev => [...prev, ...favoriteItemsResponse.data])
				setBasketItems(prev => [...prev, ...basketItemsResponse.data])
				setItems(prev => [...prev, ...itemsResponse.data])
				console.log(favoriteItemsResponse.data)
				console.log(basketItemsResponse.data)
				console.log(itemsResponse.data)
			} catch (error) {
				alert('Ошибка при запросе данных ;(')
				console.error(error)
			}
		}
		//
		fetchData() // вызываем нашу async ф-цию
		//
		//     //     Вариант отправки запроса через встроенный в браузер метод fetch() (window.fetch)
		//     //     fetch('https://64492443b88a78a8f0feddc9.mockapi.io/api/react-sneakers/cards')
		//     //         .then( res => {
		//     //             return res.json()
		//     //         }).then(json => {
		//     //         console.log(json)
		//     //         setItems(json)
		//     //     });
		//     // }, []);
		//
	}, [])

	const onAddToBasket = async obj => {
		// Добавляем и удаляем объекты
		const checkObject = basketItems.find(
			item => Number(item.pureId) === Number(obj.pureId)
		)
		try {
			if (checkObject) {
				// удаление из корзины
				setBasketItems(prevItems =>
					prevItems.filter(
						prevObj => Number(prevObj.pureId) !== Number(obj.pureId)
					)
				)
				await axios.delete(
					`https://64c54e60c853c26efadab373.mockapi.io/basket/${obj.id}`
				)
				console.log(`удалили объект c id = ${obj.parentId}`)
			} else {
				setBasketItems(prev => [...prev, obj])
				const { data } = await axios.post(
					'https://64c54e60c853c26efadab373.mockapi.io/basket/',
					obj
				)
				setBasketItems(prev =>
					prev.map(item => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id
							}
						}
						return item
					})
				)
			}
		} catch (error) {
			alert('Не удалось добавить товар в Корзину...')
			console.error(error)
		}
	}

	const onAddToFavorites = async obj => {
		try {
			if (
				favoriteItems.some(
					favObj => Number(favObj.pureId) === Number(obj.pureId)
				)
			) {
				axios.delete(
					`https://64c5521ec853c26efadab8a4.mockapi.io/favorites/${obj.id}`
				)
				// setFavoriteItems(prev =>
				// 	prev.filter(item => Number(item.pureId) !== Number(obj.pureId))
				// ) // не убираем из State карточку, на случай случайного клика, но удаляем с Backend
			} else {
				const { data } = await axios.post(
					'https://64c5521ec853c26efadab8a4.mockapi.io/favorites',
					obj
				)
				setFavoriteItems(prev => [...prev, data])
				console.log('onAddToFavorites добавили item.pureId = ' + obj.pureId)
			}
		} catch (error) {
			alert('Не удалось добавить в Избранное...')
		}
		// console.log(favoriteItems)
	}

	//  Метод delete() должен удалять объект с сервера по id ?????????????
	const onRemoveFromBasket = (id, pureId) => {
		try {
			axios.delete(`https://64c54e60c853c26efadab373.mockapi.io/basket/${id}`)
			setBasketItems(prev => prev.filter(obj => obj.pureId !== pureId))
		} catch (error) {
			// alert('Ошибка при удалении из корзины')
			console.error(error)
		}
	}

	const isItemAdded = async pureId => {
		const { data } = await axios.get(
			'https://64c5521ec853c26efadab8a4.mockapi.io/basket'
		)
		return data.some(obj => Number(obj.pureId) === Number(pureId))
	}

	const isItemLiked = async pureId => {
		const { data } = await axios.get(
			'https://64c5521ec853c26efadab8a4.mockapi.io/favorites'
		)
		return data.some(obj => Number(obj.pureId) === Number(pureId))
	}

	const openBasket = () => setBasket(prev => !prev)

	return (
		<AppContext.Provider
			value={{
				items,
				basketItems,
				favoriteItems,
				setIsLoading,
				isLoading,
				searchValue,
				setSearchValue,
				setBasket,
				onAddToBasket,
				onAddToFavorites,
				onRemoveFromBasket,
				isItemAdded,
				isItemLiked,
				openBasket
			}}
		>
			<div className='wrapper clear'>
				{basket && <Basket />}
				<Header />
				<Routes>
					<Route
						path='/favorites'
						element={
							<Favorites
								items={favoriteItems}
								onAddToFavorites={onAddToFavorites}
								// onRemoveFromFavorites={(obj) => onRemoveFromFavorites(obj.id)}
							/>
						}
					/>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}
