import Search from '../components/Search'
import Card from '../components/Card'
import { useContext } from 'react'
import AppContext from '../components/context'
import { v4 as uuidv4 } from 'uuid'

function Home() {
	const { items, isLoading, searchValue } = useContext(AppContext)
	const renderItems = () => {
		const filteredItems = items.filter(obj =>
			obj.title.toLowerCase().includes(searchValue.toLowerCase())
		)

		return (isLoading ? [...Array(8)] : filteredItems).map(item => (
			<Card key={uuidv4()} {...item} />
		))
	}

	return (
		<div className='content2 p-40'>
			<Search />
			<ul className='d-flex flex-wrap'>{renderItems()}</ul>
		</div>
	)
}
export default Home
