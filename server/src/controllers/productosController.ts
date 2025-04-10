import {Request,response,Response} from 'express';
import pool from '../database';
class ProductosController
{

public async list(req: Request, res: Response ): Promise<void>{
    console.log(req.params)
    const consulta = 'SELECT * FROM productos';
    console.log(consulta)
    const respuesta = await pool.query(consulta);
    console.log(respuesta);
    res.json( respuesta );
        
    }
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO productos set ?",
        [req.body]);
        res.json(resp);
        }
        public async update(req: Request, res: Response): Promise<void> {
            const { idProducto } = req.params;
            console.log(req.params);
            const resp = await pool.query("UPDATE productos set ? WHERE id = ?", [req.body, idProducto]);
            res.json(resp);
            }

            public async delete(req: Request, res: Response): Promise<void> {
                const { idProducto } = req.params;
                const resp = await pool.query(`DELETE FROM productos WHERE id = ${idProducto}`);
                res.json(resp);
                }

}
export const productosController = new ProductosController();

