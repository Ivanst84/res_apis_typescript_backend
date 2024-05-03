import { Request, Response } from 'express';
import  { validationResult} from 'express-validator';
import Products from '../models/Product.model';

export const getProductsById = async(req: Request , res: Response) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        if (product) {
            return res.json({ data: product });
        }
        return res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
}
export const getProducts = async(req: Request , res: Response) => {
   try	{
        const products = await Products.findAll({
        attributes : {exclude:['createdAt','updatedAt']}	 }  );    
        return res.json({data: products});

   } catch(error){
         console.log(error);
         return res.status(500).json({error: 'Error al obtener los productos'});                           

   }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Products.create(req.body);
    await product.save(); // No es necesario utilizar 'await' aquí, pero es buena práctica
    return res.json({ data: product }); // Envía la respuesta con el producto creado
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola para depuración
    return res.status(500).json({ error: 'Error al crear el producto' }); // Maneja el error y envía una respuesta de error al cliente
  }
};

export const updateProduct=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const product=await Products.findByPk(id);
        if(product){
            await product.update(req.body);
            return res.json({data:product});
        }
        return res.status(404).json({error:'Producto no encontrado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Error al actualizar el producto'});
    }
}
export const updateAvailability=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const product=await Products.findByPk(id);
        if(product){
             product.available=!Boolean(product.dataValues.available);
                await product.save();	
             return res.json({data:product});
        }
        return res.status(404).json({error:'Producto no encontrado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Error al actualizar la disponibilidad del producto'});
    }
}
export const deleteProduct=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const product=await Products.findByPk(id);
        if(product){
            await product.destroy();
            return res.json({data:product});
        }
        return res.status(404).json({error:'Producto no encontrado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Error al eliminar el producto'});
    }
}