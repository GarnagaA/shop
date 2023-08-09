import { useContext, useState } from 'react'
import AppContext from '../components/context'

export function useBasket() {
	const { onAddToBasket, basketItems, setBasket, setOrders } =
		useContext(AppContext)

	const [isLoading, setIsLoading] = useState(false)
	const [isOrderId, setIsOrderId] = useState(null)
	const [isOrderComplete, setIsOrderComplete] = useState(false)

	const totalPrice = () =>
		basketItems.reduce((sum, obj) => sum + Number(obj.price), 0)

	return {
		onAddToBasket,
		basketItems,
		setBasket,
		setOrders,
		isOrderComplete,
		setIsOrderComplete,
		totalPrice,
		isLoading,
		setIsLoading,
		isOrderId,
		setIsOrderId
	}
}