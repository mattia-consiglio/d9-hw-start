import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import Job from './Job'
import { useNavigate } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQueryAction } from '../redux/actions'

const MainSearch = () => {
	const [query, setQuery] = useState('')
	const jobs = useSelector(state => state.search.results)
	const queryState = useSelector(state => state.search.query)
	const { isLoading, error } = useSelector(state => state.search)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleChange = e => {
		setQuery(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(setSearchQueryAction(query))
	}

	useEffect(() => {
		if (queryState) setQuery(queryState)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					{isLoading && (
						<div className='d-flex justify-content-center mt-4'>
							<Spinner animation='border' variant='primary' className='mx-auto' />
						</div>
					)}
					{error && (
						<Alert variant='danger' className='mt-4'>
							{error}
						</Alert>
					)}
					{!isLoading && !error && jobs.map(jobData => <Job key={jobData._id} data={jobData} />)}
				</Col>
			</Row>
		</Container>
	)
}

export default MainSearch
