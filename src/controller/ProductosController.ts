import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Producto";

class ProductosController{

    static getAll= async(req: Request, res:Response)=>{

    try {
        // instancia bd
    const repo=AppDataSource.getRepository(Productos);

    // consulta de bd x metodo find
    const listaProductos= await repo.find({where:{estado:true}});

    // valido si trajo datos, sino devuelvo error
    if( listaProductos.length==0){
        return res.status(404).json({message:"No hay datos registrados."})

    }
    return res.status(200).json(listaProductos);

    } catch (error) {
        return res.status(404).json({message:"Error al acceder a la base de datos."})   
    }
    }

    static create= async(req: Request, res:Response)=>{

        return res.status(200).json("TODO BIEN EN CREATE...");
    }


}
export default ProductosController;