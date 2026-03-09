import mongoose from "mongoose"

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected`)
    }catch(err){
        console.log(`Error`)
        throw err
    }
}

export default connectDB