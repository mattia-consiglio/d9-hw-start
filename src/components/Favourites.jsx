import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Favourite from './Favourite'
import { IoCaretBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Favourites() {
	const favourites = useSelector(state => state.favourites.items)
	return (
		<Container>
			<Row>
				<Col xs={10} className='mx-auto my-3'>
					<h1 className='display-1'>
						<Link to='/' className='btn btn-secondary me-3' type='button'>
							<IoCaretBack />
						</Link>{' '}
						Favourites
					</h1>
				</Col>

				<Col xs={10} className='mx-auto mb-5'>
					{favourites.map(favorite => (
						<Favourite key={favorite} data={favorite} />
					))}
				</Col>
			</Row>
		</Container>
	)
}

export default Favourites
