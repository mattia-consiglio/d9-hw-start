import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { IoStarOutline, IoStar } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Favourite = ({ data }) => {
	const favourites = useSelector(state => state.favourites.items)
	const isFavourite = favourites.some(favourite => favourite === data)
	const dispatch = useDispatch()

	return (
		<Row className='mx-0 mt-3 p-3' style={{ border: '1px solid #00000033', borderRadius: 4 }}>
			<Col xs={12}>
				<Button
					variant={isFavourite ? 'warning' : 'outline-warning'}
					className='me-3'
					onClick={() => {
						isFavourite
							? dispatch({ type: 'REMOVE_FAVOURITE', payload: data })
							: dispatch({ type: 'ADD_FAVOURITE', payload: data })
					}}
				>
					{isFavourite ? <IoStar /> : <IoStarOutline />}
				</Button>
				<Link to={`/${data}`}>{data}</Link>
			</Col>
		</Row>
	)
}

export default Favourite
