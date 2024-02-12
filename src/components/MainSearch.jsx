import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Job from './Job'
import { useNavigate } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

const MainSearch = () => {
	const [query, setQuery] = useState('')
	const [jobs, setJobs] = useState([])
	const savedSearch = useSelector(state => state.search.query)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?search='

	const handleChange = e => {
		setQuery(e.target.value)
	}

	const fetchData = async () => {
		try {
			const response = await fetch(baseEndpoint + query + '&limit=20')
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

	const handleSubmit = async e => {
		e.preventDefault()
		fetchData()
		dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
	}

	useEffect(() => {
		if (savedSearch) {
			setQuery(savedSearch)
			fetchData()
		}
	}, [])

	return (
		<Container>
			<Row className='align-items-center'>
				<Col xs={10} className='mx-auto my-3'>
					<h1 className='display-1'>Remote Jobs Search</h1>
				</Col>
				<Col xs={2} className='my-3 d-flex justify-content-end'>
					<Button
						variant='warning'
						size='lg'
						onClick={() => {
							navigate('/favourites')
						}}
					>
						<IoStar />
					</Button>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs={10} className='mx-auto'>
					<Form onSubmit={handleSubmit}>
						<Form.Control
							type='search'
							value={query}
							onChange={handleChange}
							placeholder='type and press Enter'
						/>
					</Form>
				</Col>
				<Col xs={10} className='mx-auto mb-5'>
					{jobs.map(jobData => (
						<Job key={jobData._id} data={jobData} />
					))}
				</Col>
			</Row>
		</Container>
	)
}

export default MainSearch
