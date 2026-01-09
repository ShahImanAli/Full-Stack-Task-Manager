import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// configuration for Json data
app.use(express.json({ limit: '16kb' }));

//configuration for url data (matlab jb url sy data aaye gaa)
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

//yeh public assets folder hai koi bhi access kar sakta hai
app.use(express.static('public'));

//mai apnay server sy user ky browser mai cookies set and access kar sako
app.use(cookieParser());



//Routes are imported in similar way as below in the end of app.js file

//Routes import
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";



//Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//aab yahan pr koi change nhi aaye gaa jaisay hee /users hoya control pass ho jay ga user.Routes pr
//i.e htttps://localhost:8000/api/v1/users/register or
//https://localhost:8000/api/v1/users/login

export { app };


