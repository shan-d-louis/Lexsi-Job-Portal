const Express = require('express')
const app = Express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
app.use(bodyParser.json())

const db = require('./Database')
const route = require('./Router')
app.use(cors())

app.use('/', route)
app.use('/upload', Express.static(path.join(__dirname,'Uploads'))); //for uploading images

const PORT = 3007

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);

})
