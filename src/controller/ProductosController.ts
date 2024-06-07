import { Request, Response } from "express";

class ProductosController{

    static getAll= async(req: Request, res:Response)=>{


        return res.status(200).json("TODO BIEN EN GET ALL...");
    }

    static create= async(req: Request, res:Response)=>{

        return res.status(200).json("TODO BIEN EN CREATE...");
    }


}
export default ProductosController;