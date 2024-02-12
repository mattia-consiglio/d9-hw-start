import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IoStarOutline, IoStar } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

const Job = ({ data, showFavourites = true }) => {
	const favourites = useSelector(state => state.favourites.items)
	const isFavourite = favourites.some(favourite => favourite === data.company_name)
	const dispatch = useDispatch()
	return (
		<Row className='mx-0 mt-3 p-3' style={{ border: '1px solid #00000033', borderRadius: 4 }}>
			<Col xs={3}>
				{showFavourites && (
					<Button
						variant={isFavourite ? 'warning' : 'outline-warning'}
						className='me-3'
						onClick={() => {
							isFavourite
								? dispatch({ type: 'REMOVE_FAVOURITE', payload: data.company_name })
								: dispatch({ type: 'ADD_FAVOURITE', payload: data.company_name })
						}}
					>
						{isFavourite ? <IoStar /> : <IoStarOutline />}
					</Button>
				)}
				<Link to={`/${data.company_name}`}>{data.company_name}</Link>
			</Col>
			<Col xs={9}>
				<a href={data.url} target='_blank' rel='noreferrer'>
					{data.title}
				</a>
			</Col>
		</Row>
	)
}

export default Job
