import {Router, Request, Response} from "express";
import async_handler from "express-async-handler";
import { getRepository } from "typeorm";

import { Arduino_log } from "../models";

const arduinoRouter = Router();

arduinoRouter.get('/save', async_handler(async (req: Request, res:Response) => {
    console.log(req.query);
    if(req.query.serial && req.query.data) {
        const arduino:Arduino_log = new Arduino_log();
        arduino.data = req.query.data;
        arduino.serial = req.query.serial;
        await arduino.save();
    }
    res.send(req.query);
}));

arduinoRouter.get('/get', async_handler(async (req: Request, res:Response) => {
    if(!req.session['user']){
        res.send({
            status: "fail",
            msg: "You have to login for this method"
        });
        return;
    }

    if(req.session['user'].serial != req.query.serial){
        res.send({
            status: "fail",
            msg: "You can't access this serial"
        });
        return;
    }

    else{
        const arudino:Arduino_log[] = await Arduino_log.find({serial:req.query.serial});

        res.send({
            status: "success",
            data: arudino,
        });
    }
}));

export default arduinoRouter;