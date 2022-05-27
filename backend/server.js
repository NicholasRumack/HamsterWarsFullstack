const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const hamsters = require(path.join(__dirname, 'routes/hamsters.js'))

//Heroku uses process.env.PORT
const PORT = process.env.PORT || 1337
const buildFolder = path.join(__dirname, '../build')

/* const staticFolder = path.join(__dirname, '../public') */
/* const staticimgs = path.join(__dirname, '../img') */

//Middleware
//Logger - skriver ut info om inkommande request
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json())
app.use( cors())
app.use( express.static(buildFolder))
/* app.use( '/img', express.static(staticimgs)) */

//routes
app.get('/', (req, res) => {
	res.send('Welcome to HamsterWars')
})

//REST API
app.use('/hamsters', hamsters)

//Last catches all the other requests
app.get('*', (req, res) => {
	console.log("detta kommer från app.get efter app.use");
	res.sendFile(path.join(__dirname, '../build/index.html'))
})
//Starta Servern
app.listen(PORT, () => {
	console.log('server listening on port ' + PORT)
})

