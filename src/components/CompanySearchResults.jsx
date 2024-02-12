import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Job from './Job'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { IoStarOutline, IoStar, IoCaretBack } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

const CompanySearchResults = () => {
	const [jobs, setJobs] = useState([])
	const params = useParams()

	const favourites = useSelector(state => state.favourites.items)
	const isFavourite = favourites.some(favourite => favourite === params.company)
	const dispatch = useDispatch()

	const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?company='

	useEffect(() => {
		getJobs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getJobs = async () => {
		try {
			const response = await fetch(baseEndpoint + params.company)
			if (response.ok) {
				const { data } = await response.json()
				setJobs(data)
			} else {
				alert('Error fetching results')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<Row>
				<Col className='d-flex align-items-center'>
					<Link to='/' className='btn btn-secondary me-3' type='button'>
						<IoCaretBack />
					</Link>
					<Button
						variant={isFavourite ? 'warning' : 'outline-warning'}
						className='me-3'
						onClick={() => {
							isFavourite
								? dispatch({ type: 'REMOVE_FAVOURITE', payload: params.company })
								: dispatch({ type: 'ADD_FAVOURITE', payload: params.company })
						}}
					>
						{isFavourite ? <IoStar /> : <IoStarOutline />}
					</Button>
					<h1 className='display-4'> Job posting for: {params.company}</h1>
				</Col>
			</Row>
			<Row>
				<Col className='my-3'>
					{jobs.map(jobData => (
						<Job key={jobData._id} data={jobData} showFavourites={false} />
					))}
				</Col>
			</Row>
		</Container>
	)
}

export default CompanySearchResults
