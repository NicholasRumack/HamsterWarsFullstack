import React from 'react';
import axios from "axios";

const Hamsters = () => {
	React.useEffect(() => {
		getHamster();
	}, []);

	const getHamster = () => {
		const hamster = "apiurl";
		axios (hamster).then((response) =>{
			console.log("RES", response.data);
			}).catch(error =>  {
				console.log("An error happened", error);
			}) 
	}

	return <h1>Hamsters</h1>
};

export default Hamsters;
