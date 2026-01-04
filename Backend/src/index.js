import { connect } from "mongoose";
import { connectToDB } from "./config/db.js";
import { app } from "./app.js";

import dotenv from "dotenv";
dotenv.config({path : './.env'});

await connectToDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("Error while connecting to DB ", error);
});
