import {Request,Response} from 'express';

export function notFoundMiddleware(req: Request,res: Response){
    console.log(res);
    res.status(404).send({resourceNotFound: true});
}