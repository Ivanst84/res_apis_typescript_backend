import express from 'express';
import colors from 'colors';
import cors from 'cors'; // Importa solo 'cors' en lugar de '{ CorsOptions }'

import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router  from './router';
import db from './config/db';

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la BD'));
    }
}
connectDB();

// Instancia de express
const server = express();

// Permitir conexiones CORS
server.use(cors());

// Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
