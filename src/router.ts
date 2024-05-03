
import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { hadleInputError } from './middleware';
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del producto
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: Producto 1
 *         price:
 *           type: number
 *           description: Precio del producto
 *           example: 10.5
 *         available:
 *           type: boolean
 *           description: Indica si el producto está disponible
 *           example: true
 */

/**
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene una lista de productos
 *     tags:
 *       - Productos
 *     description: Lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/',getProducts)
/**
 * @swagger
 * /api/products/id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags:
 *       - Productos
 *     description: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al obtener el producto
 */


router.get('/:id',

param('id').isNumeric().withMessage('El id debe ser un numero'),

getProductsById)
router.post('/', // Validacion
body('name').notEmpty().withMessage('El nombre es obligatorio'),
body('price')
.isNumeric().withMessage('Valor no valido')
.notEmpty().withMessage('El precio es obligatorio')
.custom(value =>value>0).withMessage('El precio no debe ser negativo'),
hadleInputError,
createProduct
)
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     description: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error al crear el producto
 */


 /**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Productos]
 *     description: Actualiza un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al actualizar el producto
 */

router.put('/:id',
body('name').notEmpty().withMessage('El nombre es obligatorio'),
body('price')
.isNumeric().withMessage('Valor no valido')
.notEmpty().withMessage('El precio es obligatorio')
.custom(value =>value>0).withMessage('El precio no debe ser negativo'),
body('available')
.isBoolean().withMessage('Valor no valido'),
hadleInputError,
updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Actualiza la disponibilidad de un producto
 *     tags: [Productos]
 *     description: Actualiza la disponibilidad de un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al actualizar la disponibilidad del producto
 */

router.patch('/:id', updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     description: Elimina un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al eliminar el producto
 */
router.delete('/:id',deleteProduct)
export default router;