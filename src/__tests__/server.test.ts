import request from 'supertest'
import server,{connectDB} from '../server' 
import db from '../config/db'

    
    jest.mock('../config/db')

    describe('connectDB',()=>{
        it('should connect to the database',async()=>{
            jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('Error al conectar a la base de datos'))
            const consoleSpy=jest.spyOn(console,'log')
            await connectDB()
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectar a la base de datos')
            )
        })
    })



    
