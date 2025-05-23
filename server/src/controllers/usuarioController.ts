import {Request,response,Response} from 'express';
import pool from '../database';
class UsuariosController
{
public async verificaUsuario(req: Request, res: Response ): Promise<void>{
console.log(req.body)
const consulta = `SELECT tipo FROM usuarios WHERE correo="${req.body.correo}" and password="${req.body.password}"`;
console.log(consulta)
const respuesta = await pool.query(consulta);
if(respuesta.length==0){
    res.json(null);
}else{
    res.json(respuesta[0])
}


}
public async esActivo(req: Request, res: Response ): Promise<void>{
    console.log(req.body)
    const {id} = req.params;
    
    const consulta = `SELECT * FROM clientes WHERE CURRENT_DATE>= fechaIni and CURRENT_DATE<= fechaFin and id=${id}`;
    console.log(consulta)
    const respuesta = await pool.query(consulta);
    console.log(respuesta);
    res.json( respuesta );
    
    }
public async list(req: Request, res: Response ): Promise<void>{
    console.log(req.params)
    const consulta = 'SELECT * FROM usuarios';
    console.log(consulta)
    const respuesta = await pool.query(consulta);
    console.log(respuesta);
    res.json( respuesta );
        
    }
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO usuarios set ?",
        [req.body]);
        res.json(resp);
        }

}
export const usuariosController = new UsuariosController();

