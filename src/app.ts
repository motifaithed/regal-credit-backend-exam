import express from 'express';
import * as dotenv from 'dotenv';

import colorAnimalRoutes from './routes/color-animal.routes';
import { notFoundMiddleware } from './middlewares/not-found';
import { generalServerErrorMiddleware } from './middlewares/general-error';



dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/color-animal', colorAnimalRoutes)

app.use(notFoundMiddleware);
app.use(generalServerErrorMiddleware);

app.listen(port,()=>{
    console.log(`server is now active on port: ${port}`);
})