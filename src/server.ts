import express from 'express';
import colors from 'colors';
import cors,{CorsOptions} from 'cors';
import morgan from'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec,{swaggerUiOptions} from './config/swagger';
import router from './router';
import db from './config/db';

export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
      //  console.log(colors.bgGreen.bold('Conectado a la base de datos'));
    } catch (error) {
        console.error(colors.bgRed.white('Error al conectar a la base de datos'));
        //console.error(error);
       // throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
}

connectDB();

const server = express();

// Permitir conexiones
console.log("Valor de process.env.FRONTEND_URL:", process.env.FRONTEND_URL);
const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    console.log('Valor de origin:', origin); // Imprime el valor de origin
    console.log('Valor de process.env.FRONTEND_URL:', process.env.FRONTEND_URL); // Imprime el valor de process.env.FRONTEND_URL
    
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      console.error('Error de CORS:', new Error('No permitido por CORS, verifica la configuración CORS'));
      callback(new Error('No permitido por CORS, verifica la configuración CORS'));
    }
  }
}

server.use(cors(corsOptions));



server.use(express.json());
server.use(morgan('dev'));

server.use('/api/products', router);

// Inicia el servidor solo después de que la conexión a la base de datos sea exitosa

// documentacion

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));

export default server;
