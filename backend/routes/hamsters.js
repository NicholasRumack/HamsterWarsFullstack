const getDatabase = require ('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
	console.log('GET /hamsters')
/* 	res.send('Frontend!') */

	const hamsterRef = db.collection("hamsters")
	const snapshot = await hamsterRef.get()

	if( snapshot.empty ) {
		res.send([])
		return
	}

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id //id needed for post+put+delete
		items.push( data )
	})
	res.send(items)
})

//Random function
router.get('/random', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()
  
	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push( data )
	})
	var randomobject = items[Math.floor(Math.random() * items.length)];
	res.send(randomobject)
  })

//Get by id
  router.get('/:id', async (req, res) => {
	var searchid = req.params.id;

	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()
  
	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		if (doc.id == searchid) {
			items.push( data )
			res.send(data)
	  }
	}) 
		if (items == false) {
			res.sendStatus(404)
      }
  })

  router.put('/:id', async (req, res) => {
	const bodycontent = req.body;
	var searchid = req.params.id;
	const docRef = await db.collection('hamsters').doc(searchid).get()
  
	if (!docRef.exists) {
		return res.sendStatus(404)
  }
	else if ((bodycontent && Object.keys(bodycontent).length === 0 && bodycontent.constructor === Object)) {
		return res.sendStatus(400)
  }
	else {
		await db.collection('hamsters').doc(searchid).set(bodycontent, {merge: true})
		return res.sendStatus(200)
  }
  
  })
//Post function
router.post('/', async (req, res) => {
	const posthamsterobject = req.body;
  
		if(fullhamster(posthamsterobject) == true){  
			const docRef = await db.collection('hamsters').add(posthamsterobject);
			res.send({ id: docRef.id });
		}
		else {
			res.sendStatus(400);
			return;
		}
  })

//Getting hamster info
function fullhamster(hamster) {
  
	if (hamster == {}) {
		return false
	}
	else if( !hamster.name || !hamster.age || !hamster.favFood || !hamster.loves || !hamster.imgName || !hamster.wins || !hamster.defeats || !hamster.games )
	{
		return true;
	}
	else {
		return false
	}
	}

//delete 
router.delete('/:id', async (req, res) =>{
	var searchid = req.params.id;
	console.log(searchid);
	const docRef = await db.collection('hamsters').doc(searchid).get();
	if (!docRef.exists) {
		res.sendStatus(404);
		return
	}
	else {
		await db.collection('hamsters').doc(searchid).delete()
		res.sendStatus(200);
	}
  })

module.exports = router