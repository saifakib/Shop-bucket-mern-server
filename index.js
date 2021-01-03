const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        msg : "End Point"
    })
})

app.listen(8000, ()=>{
console.log('Server listening on 8000')
})