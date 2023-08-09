import React from 'react'
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import Info from '../components/Info'
import { Orders } from '../pages/Orders'

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path='/Info'>
				<Info />
			</ComponentPreview>
			<ComponentPreview path='/Orders'>
				<Orders />
			</ComponentPreview>
		</Previews>
	)
}

export default ComponentPreviews
