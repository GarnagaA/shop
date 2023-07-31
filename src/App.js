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
			// Чтобы избежать бесконечного цикла ререндера функции App и запроса axios(который обновляет state), мы обращаемся к backend один раз
			try {
				const [favoriteItemsResponse, basketItemsResponse, itemsResponse] =
					await Promise.all([
						axios.get('https://64c5521ec853c26efadab8a4.mockapi.io/favorites'),
						axios.get('https://64c54e60c853c26efadab373.mockapi.io/basket'),
						axios.get('https://64c54e60c853c26efadab373.mockapi.io/items')
					])
				// const checkedImageUrl = src => {
				// 	const img = new Image();
				// 	img.onload = function () {return true}
				// 	img.onerror = function () {return false}
				// 	}
				// 	//На случай если ссылки будут не валидными, мы подменим src на локальные файлы
				// 	//
				// ;[...itemsResponse.data].map( item => {
				// 	if (checkedImageUrl) {
				//
				// 	} else return item
				// })
				setIsLoading(false)
				setFavoriteItems(prev => [...prev, ...favoriteItemsResponse.data])
				setBasketItems(prev => [...prev, ...basketItemsResponse.data])
				setItems(prev => [...prev, ...itemsResponse.data])
			} catch (error) {
				alert('Ошибка при запросе данных с сервера;(')
			}
		}
		fetchData() // вызываем нашу async ф-цию

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
		const checkedObject = basketItems.find(
			item => Number(item.pureId) === Number(obj.pureId)
		)
		try {
			if (checkedObject) {
				setBasketItems(prevItems =>
					prevItems.filter(
						prevObj => Number(prevObj.pureId) !== Number(obj.pureId)
					)
				)
				await axios.delete(
					`https://64c54e60c853c26efadab373.mockapi.io/basket/${checkedObject.id}`
				)
				console.log(`удалили объект c id = ${checkedObject.id}`)
			} else {
				setBasketItems(prev => [...prev, obj])
				const { data } = await axios.post(
					'https://64c54e60c853c26efadab373.mockapi.io/basket/',
					obj
				)
				setBasketItems(prev =>
					prev.map(item => {
						if (item.pureId === data.pureId) {
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

	const checkedImageUrl = (src, index) => {
		const img = new Image()
		img.onload = function () {
			return true
		}
		img.onerror = function () {
			return false
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

	const isItemAdded = pureId => {
		return basketItems.some(obj => Number(obj.pureId) === Number(pureId))
	}

	const isItemLiked = pureId => {
		return favoriteItems.some(item => Number(item.pureId) === Number(pureId))
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
				openBasket,
				checkedImageUrl
			}}
		>
			<div className='wrapper clear'>
				{basket && <Basket />}
				<Header />
				<Routes>
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}
