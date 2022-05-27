import { useState, useEffect } from 'react'
import { Container, Card, Modal, Button } from 'react-bootstrap'
import HamsterCard from '../components/HamsterCard'
import HamsterForm from '../components/HamsterForm'


function Gallery() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [Hamster, setHamster] = useState([]);
	const [SelectedHamster, SetSelectedHamster] = useState([]);

	const [show, setShow] = useState(false);
	const [nmbReloads, setnmbReloads] = useState(true);
	const [showForm, setShowForm] = useState(false);

	const handleClose = () => setShow(false);
	const handleCloseForm = () => setShowForm(false);
	const handleShow = () => setShow(true);
	const handleShowForm = () => setShowForm(true);
  
	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
	  fetch("/hamsters")
		.then(res => res.json())
		.then(
		  (result) => {
			setIsLoaded(true);
			setHamster(result);
		  },
		  // Note: it's important to handle errors here
		  // instead of a catch() block so that we don't swallow
		  // exceptions from actual bugs in components.
		  (error) => {
			setIsLoaded(true);
			setError(error);
		  }
		)
	}, [nmbReloads])

	function SelectedHamsterInfo(hamster) {
        SetSelectedHamster(hamster)
      }
/* 	function DeleteHamster(hamsterId) {
        fetch("/hamsters/" + hamsterId, { method: 'DELETE'})
        setHamster( setHamster())
      } */
	function DeleteHamster(id) {
		fetch("/hamsters/" + id, {
		  method: "DELETE",
		});
		if (nmbReloads==true) {
			setnmbReloads(false)	
		} else {
			setnmbReloads(true)
		}
		window.location.reload();
	  }
 
  
	if (error) {
	  return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
	  return <div>Loading...</div>;
	} else {


	  return (

		<Container className='mt-4 pt3'>
		<div>
			<h1>Gallery</h1>
		</div>
		<div>
		<Button variant="primary" onClick={handleShowForm}> Add new Hamster </Button>

      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
        	<Modal.Title>Add New Hamster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<HamsterForm/>
        </Modal.Body>
      </Modal>
		</div>
		<div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body><HamsterCard hamster={SelectedHamster} style={{position: 'absolute'}}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={(e) => {e.stopPropagation(); DeleteHamster(SelectedHamster.id)}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
			<div className='d-flex flex-wrap'>
				{Hamster.map(hamster => (
					<div className='w-25' onClick={handleShow}>
					<Card className='align-items.center justify-content-center p-4 m-2' onClick={() => handleShow + SelectedHamsterInfo(hamster)} key={hamster.id} >
					{hamster.name} {hamster.img}
					</Card>
					</div>
				))}
			</div>
		</div>
		</Container>

	  );
	}
  }
  export default Gallery