const express = require("express");
const taskRoutes = require ('./routes/tasks')
const DbConnection = require("./config/db_connect");
const errorHandlerMiddleware = require ('./middleware/error-handler')
const notFound = require ("./middleware/not-found")
const connectDB = require('./config/db_connect')
const app = express()


// Middleware
app.use(express.static("./public"))
app.use(express.json())
app.use(notFound)
app.use(errorHandlerMiddleware)

// Routes
app.use('/api/v1/tasks', taskRoutes)

const PORT = process.env.PORT || 9000;

const startServer = async () => {
    try {
        await DbConnection("mongodb://localhost:27017/taskDb")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}..`)
    })
}catch (error){
    console.log(error)
}
}

startServer()



