import { AutoIncrement } from 'sequelize-typescript'
import swaggerJSDoc from 'swagger-jsdoc'
const options : swaggerJSDoc.Options = {
    swaggerDefinition : {	
        openapi:'3.0.0',
        tags: [
            {

                    name: 'Products',
                    description: 'Endpoints para productos'

            }    
        ],
        info: {
            title: 'API de productos',
            version: '1.0.0',
            description: 'API  para productos',
    
    
    }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions = {
        customCss:  `
        .topbar-wrapper .link {
            content:url ('https://www.ivanst.me/_astro/DsaTz1j_Z1t6XDq.webp')
                height:120;
                width:auto; 
        }
        `
}
export default swaggerSpec
export {swaggerUiOptions}