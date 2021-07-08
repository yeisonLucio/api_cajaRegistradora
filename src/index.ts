import * as dotenv from 'dotenv';
dotenv.config({path: __dirname+"/.env"});
import { Mongodb } from './db/Mongodb';
import { Conexion } from './db/Conexion';
import { Server } from './Server';

const {USER_DB, PASSWORD_DB, HOST_DB, PORT_DB, DATABASE_DB} = process.env;
const mongo = new Mongodb();
const url_db = `mongodb://${HOST_DB}:${PORT_DB}/${DATABASE_DB}`;
const connectionDB = new Conexion(url_db, mongo);
connectionDB.connect();

const app = new Server(Number(process.env.PORT) || 4000);
app.listener();
