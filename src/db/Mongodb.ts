import { connect } from 'mongoose';
import { IConexion } from "./IConexion";

export class Mongodb implements IConexion {

    public constructor(){
        
    }

    public connectDB(path: string): boolean {

        let respuesta: boolean = false;
        console.log(path);
        
        connect(path, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        .then((db) => console.log("Base de datos conectada"))
        .catch((error) => console.log(error))

        return respuesta;

    }
    
}