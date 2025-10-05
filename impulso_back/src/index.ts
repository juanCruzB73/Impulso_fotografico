import express from 'express';
import userRoute from './routes/userRoute';
import dotenv from 'dotenv';

const app=express();
app.use(express.json());
dotenv.config();

app.use("/users",userRoute);

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server runnig in port: ${port}`);
})