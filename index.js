const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/:timestamp', (req, res) => {
  const { timestamp } = req.params
  console.log(timestamp)

  let date = new Date(timestamp)

  if (!/[-]/.test(timestamp) && Number(timestamp)) {
    date = new Date(Number(timestamp))
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
