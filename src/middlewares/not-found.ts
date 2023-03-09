import {Request,Response} from 'express';

export const notFoundMiddleware = (_: Request,res: Response)=>{
    console.log(res);
    res.status(404).send({resourceNotFound: true});
}