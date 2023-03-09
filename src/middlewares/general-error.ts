import {Request, Response, NextFunction} from 'express';
export function generalServerErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction){
    console.log(error);
    res.status(500).send({generalServerError: true});
}