import mongoose from 'mongoose' ;
import { db_name } from '../constants.js' ;

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(
            `${process.env.MONGO_URI}/${db_name}`
        )
        console.log(`MongoDB connected: ${connection.connection.host}`) ;
    }
    catch (error) {
        console.error(`Error: ${error.message}`) ;
        process.exit(1) ;
    }
} ;

export {connectToDB} ;