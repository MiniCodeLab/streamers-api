const express = require('express');
const cors = require('cors')
const CountryRoutes = require('./src/api/countries/country.routes');
const StreamerRoutes = require('./src/api/streamers/streamer.routes');
const { connect } = require('./src/db/connect');
const cloudinary = require('cloudinary').v2

const PORT = process.env.PORT || 8000;
const app = express();

connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
}));

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/countries', CountryRoutes);
app.use('/streamers', StreamerRoutes);
app.use('/', (req, res, next) => {
    return res.json('End Point Not Found')
})

app.use('*', (req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
})