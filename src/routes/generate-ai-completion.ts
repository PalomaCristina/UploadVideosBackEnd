import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createReadStream } from 'fs'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'

export async function generateAiCompletionRoute(app: FastifyInstance) { //ela deve receber a minha aplicação como parâmetro (definida em server.ts) e preciso falar que ela é fastify
    app.post('/ai/complete', async (req, res) =>{ // transação deve ser assincrona, pois iremos consultar os dados do banco de dados e não podemos "prender" a interação

        const bodySchema = z.object({
            videoId: z.string(),
            template: z.string(),
            temperature: z.number().min(0).max(2).default(0.5),

        })
        const { videoId, template, temperature } = bodySchema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })
        
        if(!video.transcription){
            return res.status(400).send({error: "video transcription was not generate yet."})
        }

        const promptMessage = template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            temperature,
            messages: [{
                role: 'user', content: promptMessage
            }],

        })

        return {
            response
        }

        })
}
