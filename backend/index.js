import './env.js'
import app from './app.js';
import connectDB from './db.js';

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    })
})
.catch((error)=>{
    console.log("Failed to start server", error)
    process.exit(1)
})


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(3000,()=>{
//     console.log('Server is running on port 3000');
// })