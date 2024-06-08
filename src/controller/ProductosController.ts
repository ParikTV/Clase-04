import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Producto";
import { json } from "stream/consumers";

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
        const repoProducto= AppDataSource.getRepository(Productos);

        try {

            //destructuring
            const{id,nombre,precio,stock,categoria}=req.body;

            //validar datos
            if(!id){
                return res.status(400).json({message:"Debe indiciar un id del producto."});
            }
            if(!nombre){
                return res.status(400).json({message:"Debe indiciar el nombre del producto."});
            }
            if(!precio){
                return res.status(400).json({message:"Debe indiciar el precio del producto."});
            }
            if(!stock){
                return res.status(400).json({message:"Debe indiciar el stock del producto."});
            }
            if(!categoria){
                return res.status(400).json({message:"Debe indiciar la categoria del producto."});
            }

            //reglas de negocio
            //validar si el producto ya existe
                let product= await repoProducto.findOne({where:{id}});
                if(product){
                    return res.status(400).json({message:"Ese producto ya se encuentra registrado en la base de datos "})
                }
                if(stock<=0){
                    return res.status(400).json({message:"El stock debe ser mayor o igual a 0 "})
                }
                
            product= new Productos;

            product.id= id;
            product.nombre;
            product.precio=precio;
            product.categoria=categoria;
            product.stock=stock;
            product.estado=true;



            
            await repoProducto.save(product);

        } catch (error) {
            return res.status(400).json({message:"Error al guardar"})

            
        }

        return res.status(200).json({message:"Producto guardado correctamente"});
    }
    static getOne= async(req: Request, res:Response)=>{
      try {
        const id= parseInt (req.params['id']);
        //validacion de mas, por lo que vimos en clase.
        if(!id){
            return res.status(400).json({message:"Debe indicar el ID"})
        }
        const repo= AppDataSource.getRepository(Productos);

        try {
            const producto= await repo.findOneOrFail({where:{id}});
            return res.status(200).json(producto)
        } catch (error) {
            return res.status(404).json({message:"El producto con el ID indicado no fue encontrado"})         
        }
 
      } catch (error) {
      }
    }
}
export default ProductosController;