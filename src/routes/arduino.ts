import {Router, Request, Response, NextFunction} from "express";

const arduinoRouter = Router();

arduinoRouter.get('/', (req: Request, res:Response) => {
    console.log(req.query);
    res.send(req.query.test);
});


export default arduinoRouter;