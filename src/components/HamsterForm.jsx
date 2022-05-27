import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

const HamsterForm = () => {

	const [HamsterName, SetHamsterName] = useState("")
    const [HamsterAge, SetHamsterAge] = useState("")
    const [HamsterFavFood, SetHamsterFavFood] = useState("")
    const [HamsterLoves, SetHamsterLoves] = useState("")
    const [HamsterImgName, SetInputImgName] = useState("")
    const [Wins] = useState(0)
    const [Defeats] = useState(0)
    const [Games, SetGames] = useState(0)

	async function SendHamster() {
        SetGames(Wins + Defeats)

        if (HamsterName.length < 1 || HamsterFavFood.length < 1 || HamsterLoves.length < 1) {
            console.log("Name, FavFood or Loves has a lower case count then one");
            return;
        }

        const NewHamster = {
            "name": HamsterName,
            "age": HamsterAge,
            "favFood": HamsterFavFood,
            "loves": HamsterLoves,
            "imgName": HamsterImgName,
            "wins": Wins,
            "defeats": Defeats,
            "games": Games
        }

        console.log("NewHamster: " + NewHamster);

        await fetch("/hamsters", { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(NewHamster) 
		})
}


  return (
<Form className='m-3'> 
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Control type="Name" placeholder="Enter Name" onChange={event => { SetHamsterName(event.target.value) }} value={HamsterName}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicAge">
    <Form.Control type="Age" placeholder="Age" onChange={event => { SetHamsterAge(event.target.value) }} value={HamsterAge}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicfavFood">
    <Form.Control type="favFood" placeholder="Favorite Food" onChange={event => { SetHamsterFavFood(event.target.value) }} value={HamsterFavFood}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicLoves">
    <Form.Control type="loves" placeholder="Loves" onChange={event => { SetHamsterLoves(event.target.value) }} value={HamsterLoves}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicImgName">
    <Form.Control type="img" placeholder="ex. Hamster-1.jpg" onChange={event => { SetInputImgName(event.target.value) }} value={HamsterImgName}/>
  </Form.Group>

  <Button variant="primary" type="submit" onClick={SendHamster}>
    Submit
  </Button>
</Form>
  )
}
export default HamsterForm