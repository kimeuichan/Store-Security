import {Entity, PrimaryColumn, Column, BaseEntity, Unique} from "typeorm";
import { createHash } from "crypto"


@Entity('user')
@Unique(["serial"])
export class User extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    serial: string;


    setPassword(password:string){
        const sha256 = createHash("sha256");
        this.password = sha256.update(password).digest('hex')
    }

    validation(password:string): boolean{
        const sha256 = createHash("sha256");
        password = sha256.update(password).digest('hex')
        
        return this.password == password;
    }

}

export default User;
