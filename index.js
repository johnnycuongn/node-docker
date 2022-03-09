const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const cors = require('cors')

const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const app = express();
const connectDBwithRetry = () => {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
        .then(() => console.log('Successfully connected to db'))
        .catch((e) => {
            console.log("Failed to connect to DB: " + e);
            setTimeout(connectDBwithRetry, 4000)
        })
}

connectDBwithRetry()

// ----- MIDDLEWARE
app.enable('trust proxy')
app.use(cors())
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 1000,
    },

}))

app.use(express.json())

app.use(function (req, res, next) {
    console.log('Yeahhhhhh runningn')
    next()
})


// ----- API
const version = 1

app.get(`/api/v${version}`, (req, res) => {
    res.send('<h1>Welcome to Node-Docker<h1>')
})

const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoute')


app.use(`/api/v${version}/posts`, postRouter)
app.use(`/api/v${version}/user`, userRouter)




const port = process.env.port || 3000

app.listen(port, () => console.log('listening on port ' + port))