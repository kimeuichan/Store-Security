import { Router, Request, Response, NextFunction } from "express";
import { createConnection, Connection } from "typeorm"

import async_handler from "express-async-handler"

import { User } from "../models";

const userRouter = Router();

userRouter.post('/login', async_handler( async(req:Request, res:Response) => {
    const id:string = req.body.id;
    const password:string = req.body.password;
    
    if(req.session['user']){
        res.send({
            "status": "fail",
            "msg": "already logined",            
        });
    }


    const user:User = await User.findOne(id);

    if(user){
        if(user.validation(password)){
            req.session['user'] = user;
            res.send({
                "status": "success",
                "msg": "success login",            
            });
        }

        else{
            res.send({
                "status": "fail",
                "msg": "wrong password",            
            });
        }
    }

    else{
        res.send({
            "status": "fail",
            "msg": "wrong user",            
        });
    }

   



    
}));

userRouter.post('/join', async_handler(async (req:Request, res:Response) => {
    const id:string = req.body.id;
    const password:string = req.body.password;
    const serial:string = req.body.serial;

    let user:User = await User.findOne(id);
    if(user){
        res.send({
            "status": "fail",
            "msg": "already used id",            
        });
    }

    user = new User();
    user.id = id;
    user.setPassword(password);
    user.serial = serial;

    await user.save();

    res.send({
        "status": "success",
        "msg": "create user success",            
    });
}));

export default userRouter;