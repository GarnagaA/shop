import Card from '../components/Card'
import Info from '../components/Info'

import AppContext from '../components/context'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Favorites() {
	const { favoriteItems } = useContext(AppContext)

	const renderItems = () => {
		return favoriteItems.map(item => <Card {...item} key={uuidv4()} />)
	}

	return (
		<div className='p-40 w100p h100p'>
			{favoriteItems.length > 0 ? (
				<div>
					<h1 className=''>Мои закладки</h1>
					<ul className='d-flex flex-wrap justify-between'>{renderItems()}</ul>
				</div>
			) : (
				<Info
					title={'Закладок нет :('}
					img={'/img/emoji-cry.png'}
					text={'Вы ничего не добавляли в закладки'}
					size={70}
				/>
			)}
		</div>
	)
}
