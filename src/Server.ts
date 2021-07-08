const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./index.routes');

export class Server {

    port: number;
    app: any;

    public constructor(port: number){
        this.port = port;
        this.app = express();
        this.init();
    }

    init(){
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(routes);
    }


    public listener(){
        this.app.listen(this.port,()=>{
            console.log("Servidor en el puerto: ",this.port);
        })
    }       



}