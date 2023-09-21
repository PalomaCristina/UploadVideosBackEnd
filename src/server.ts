import { fastify } from 'fastify'
import { prisma } from './lib/prisma'
import { getAllPromptsRoute } from './routes/get_all'
import { uploadVideoPrompt } from './routes/upload_video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoPrompt)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running perfectly!');
    
})

//DDL declaração do schema

