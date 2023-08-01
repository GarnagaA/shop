import Card from '../components/Card'
import AppContext from '../components/context'
import { useContext } from 'react'
import EmptyFavorite from '../components/EmptyFavorite'

export function Favorites() {
	const { favoriteItems } = useContext(AppContext)

	const renderItems = () => {
		return favoriteItems.map((item, index) => <Card {...item} key={index} />)
	}

	return (
		<div className='p-40 w100p h100p '>
			{favoriteItems.length > 0 ? (
				<div>
					<h1 className=''>Мои закладки</h1>
					<ul className='d-flex flex-wrap'>{renderItems()}</ul>
				</div>
			) : (
				<EmptyFavorite />
			)}
		</div>
	)
}
