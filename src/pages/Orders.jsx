import Info from '../components/Info'
import AppContext from '../components/context'
import { useContext } from 'react'
import { Order } from '../components/Order'

export function Orders() {
	const { orders } = useContext(AppContext)

	const renderOrders = () => {
		return orders.map((item, index) => <Order {...item} key={index} />)
	}
	return (
		<div className='p-40'>
			{orders.length > 0 ? (
				<div>
					<h2 className='ml-10'>Мои покупки</h2>
					<ul className='d-flex flex-wrap justify-between overlay'>
						{renderOrders()}
					</ul>
				</div>
			) : (
				<Info
					title={'У вас нет заказов'}
					img={'/img/emoji-sad.png'}
					text={'Может оформите хотя бы один заказ.'}
					size={70}
				/>
			)}
		</div>
	)
}