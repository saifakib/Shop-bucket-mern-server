require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const { useMorgan }  = require('./middleware')
const { logger } = require('./utils')

const app = express()

useMorgan(app)
app.use(cors())
//app.use(urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

const MONGO_URI = process.env.DATABASE

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "End Point"
    })
})

app.use((req, res, next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).json({
            msg: error.message,
            status: error.status
        })
    }
    res.status(500).json({
        msg: error.message,
        status: 500
    })
})

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            logger.info(`Server listening on this ${process.env.PORT}`)
        })
    })
    .catch(err => {
        logger.error(err.message)
    })

