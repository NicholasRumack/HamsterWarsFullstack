import HamsterCard from '../components/HamsterCard'
import {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';

function Battles() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hamster1, sethamnster1] = useState([]);
	const [hamster2, sethamnster2] = useState([]);
	const [EnableResults, SetEnableResults] = useState(false)
	const [winner, setwinner] = useState([]);


	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		fetch("/hamsters/random")
		  .then(res => res.json())
		  .then(
			(result) => {
			  setIsLoaded(true);
			  sethamnster1(result);
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  setIsLoaded(true);
			  setError(error);
			}
		  )
	  }, [])

	useEffect(() => {
		fetch("/hamsters/random")
		  .then(res => res.json())
		  .then(
			(result) => {
			  setIsLoaded(true);
			  sethamnster2(result);
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  setIsLoaded(true);
			  setError(error);
			}
		  )
	  }, [])

	  async function SendWinner(winner) {
		console.log(EnableResults);

		if (!EnableResults) {
			setwinner(winner)
			if(winner === hamster1) {

                let hamster1Wins = (hamster1.wins + 1)
                let hamster1Games = (hamster1.games + 1)
                const hamster1PackageData = {
                    "id": hamster1.id,
                    "name": hamster1.name,         
                    "age": hamster1.age,         
                    "favFood": hamster1.favFood,         
                    "loves": hamster1.loves,          
                    "imgName": hamster1.imgName,          
                    "wins": hamster1Wins,           
                    "defeats": hamster1.defeats,           
                    "games": hamster1Games
                }
                let hamster2Defeats = (hamster2.defeats + 1)
                let hamster2Games = (hamster2.games + 1)
                const hamster2PackageData = {
                    "id": hamster2.id,
                    "name": hamster2.name,         
                    "age": hamster2.age,         
                    "favFood": hamster2.favFood,         
                    "loves": hamster2.loves,          
                    "imgName": hamster2.imgName,          
                    "wins": hamster2.wins,           
                    "defeats": hamster2Defeats,           
                    "games": hamster2Games
                }
                console.log("hamster2.id loggen " + hamster2.id + " och hamster 1 " + hamster1.id);

                await fetch("/hamsters/" + hamster1.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(hamster1PackageData) 
                })
                await fetch("/hamsters/" + hamster2.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(hamster2PackageData) 
                })

			} else {

				let hamster2Wins = (hamster2.wins + 1)
                let hamster2Games = (hamster2.games + 1)
                const hamster2PackageData = {
                    "id": hamster2.id,
                    "name": hamster2.name,         
                    "age": hamster2.age,         
                    "favFood": hamster2.favFood,         
                    "loves": hamster2.loves,          
                    "imgName": hamster2.imgName,          
                    "wins": hamster2Wins,           
                    "defeats": hamster2.defeats,           
                    "games": hamster2Games
                }
                let hamster1Defeats = (hamster1.defeats + 1)
                let hamster1Games = (hamster1.games + 1)
                const hamster1PackageData = {
                    "id": hamster1.id,
                    "name": hamster1.name,         
                    "age": hamster1.age,         
                    "favFood": hamster1.favFood,         
                    "loves": hamster1.loves,          
                    "imgName": hamster1.imgName,          
                    "wins": hamster1.wins,           
                    "defeats": hamster1Defeats,           
                    "games": hamster1Games
                }
                console.log("hamster2.id loggen " + hamster2.id + " och hamster 1 " + hamster1.id);
                await fetch("/hamsters/" + hamster1.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(hamster1PackageData) 
                })
                await fetch("/hamsters/" + hamster2.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(hamster2PackageData) 
                })


			}

			SetEnableResults(true)
		}
	}

	function NewBattles(){
        window.location.reload();
    } 

	  if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {

  return (
<div>
	<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        	<Modal.Title>Hamster Winner</Modal.Title>
			<p>{winner.name}</p>
        </Modal.Header>
        <Modal.Body>
        	<p>Name: {hamster1.name} Name: {hamster2.name}</p>
        	<p>Wins: {hamster1.wins} Wins: {hamster2.wins}</p>
        	<p> Defeats: {hamster1.defeats}  Defeats: {hamster2.defeats}</p>
			<Button onClick={() => handleClose + NewBattles()}>New Battle!</Button>
        </Modal.Body>
    </Modal>

	<div onClick={handleShow}>
		<HamsterCard hamster={hamster1} onClick={() => SendWinner(hamster1)} />
	</div>
	<div onClick={handleShow}>
		<HamsterCard hamster={hamster2} onClick={() => SendWinner(hamster2)}/>
	</div>
</div>
  );
}
}
export default Battles