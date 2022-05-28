import React from 'react'
import { Container, Card } from 'react-bootstrap';

export default function HamsterCard(data) {
  return (
	<div>
		<Container className='align-items.center justify-content-center'>
			<Card className='p-3 m-2 width 400px'>

			<div className='width 400px'>
				<img src={"./img/" + data.hamster.imgName} alt="" style={{width: 400, height: 300}} />
			</div>
				<h4>Name: {data.hamster.name}</h4>
				<p>Age: {data.hamster.age}</p>
				<p>Loves: {data.hamster.loves}</p>
				<p>Favorite Food: {data.hamster.favFood}</p>
			</Card>
		</Container>
	</div>
  )
}
