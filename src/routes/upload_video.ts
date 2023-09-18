import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getAllPromptsRoute(app: FastifyInstance) { //ela deve receber a minha aplicação como parâmetro (definida em server.ts) e preciso falar que ela é fastify
    app.post('/videos', async () =>{ // transação deve ser assincrona, pois iremos consultar os dados do banco de dados e não podemos "prender" a interação
        
    })
}