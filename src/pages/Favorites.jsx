import Card from '../components/Card'
import AppContext from '../components/context'
import { useContext } from 'react'

export function Favorites() {
	const { items } = useContext(AppContext)

	return (
		<div className='content2 p-40'>
			<h1 className=''>Мои закладки</h1>
			<ul className='d-flex flex-wrap'>
				{items.map((item, index) => (
					<Card {...item} key={index} />
				))}
			</ul>
		</div>
	)
}
