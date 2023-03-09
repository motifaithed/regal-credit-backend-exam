import {Request, Response, NextFunction} from 'express';
export const  generalServerErrorMiddleware = (error: Error, _: Request, res: Response, __: NextFunction)=>{
    console.log(error);
    res.status(500).send({generalServerError: true});
}