import { IConexion } from "./IConexion";

export class Conexion {
  path: string;
  conexion: IConexion;

  public constructor(path: string, conexion: IConexion) {
    this.path = path;
    this.conexion = conexion;
  }

  public async connect() {
    await this.conexion.connectDB(this.path);
  }
}
