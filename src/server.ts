import express from 'express' 
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router  from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD...') )
    }
}
connectDB()

// Instancia de express
const server = express()

const allowedOrigin = "https://rest-api-typescript-frontend-rho.vercel.app";

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        try {
            console.log("Valor de origin:", origin); // Agregar registro para imprimir el valor de origin
            if (!origin) {
                origin = "unknown"; // Establecer un valor predeterminado para el origen
            }
            // Ajustar la comparación del origen para ser más flexible
            if (origin && (origin === allowedOrigin || origin === `${allowedOrigin}/` || origin === `${allowedOrigin}:443`)) {
                callback(null, true);
            } else {
                const error: Error = new Error(`La solicitud desde ${origin} tiene un origen no permitido por CORS.`);
                console.error(error); // Imprimir el error en consola
                callback(error);
            }
        } catch (err) {
            console.log("Error en la función de origen:", err); // Registro de error en el catch
            callback(err as Error); // Asegurar que el error sea de tipo Error
        }
    }
};
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server
