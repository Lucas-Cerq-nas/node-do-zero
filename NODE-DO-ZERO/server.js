// import { createServer } from 'node:http' // Usando node

// const server = createServer((request, response) => {
//     response.write("Olá Mundo!")

//     return response.end()
// })

// server.listen(3333) //.listen(porta)

// localhost:3333
// localhost:3332  nas portas, vc pode colocar qualquer numero.
// localhost:3333

// POST localhost:3333/videos
// DELETE localhost:3333/videos/1


// Usando FrameWork fastify
// npm install fastify, para instalar ele!


import { fastify } from 'fastify' // Usando framework fastify

//Importar database
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
// import { title } from 'node:process'
// import { describe } from 'node:test'

const server = fastify()

// GET, POST, PUT, DELETE, PATCH

// POST http://localhost:3333/videos  criar os videos
// PUT http://localhost:3333/videos/id = 1, 2, 3...

// Route Paramater = serve para indentificar os id

// Request Body 

// const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/videos', async (request, reply) => { // Cria algum registro 
// const body = request.body  // Manda toda a requisição para mim 
    const { title, description, duration } = request.body;

    // console.log(title)
    // console.log(description)
    // console.log(duration)


    await database.create({ // Parâmetro: video
        title,
        description,
        duration, 
    })

   // console.log(database.list()) // Retorna os valores da criação  (key, value)

    // .status(status code)  201 = Criado/Algo foi criado!
    return reply.status(201).send() // manda o status do navegador: 401, 200, 403, etc.
 })

server.get('/videos', async (request, reply) => { // Busca alguma informação (padrão nos navegadores)
       // console.log("Isso é um get(padrão)")

    // Query Params 
    const search = request.query.search // Opcional, Quando quer pesquisar por um titulo expecifico!

    // console.log(search) Saída: node
       const videos = await database.list(search) // .list("node")

    // console.log(videos) 

        // return reply.send(videos)
       return videos // Ele já pega os valores já!
})

server.put('/videos/:id', async(request, reply) => { // Atualiza/Altera algo
      const videoId = request.params.id; // Pega o Parâmetro 'id' do put
        const { title, description, duration } = request.body
        await database.update(videoId, {
            title,
            description,
            duration,
        })
 
return reply.status(204).send() // 204: resposta q teve susseso mas, n tem conteudo 

    //return 'Atualizar os videos (1 unico video por id)'
})

server.delete('/videos/:id', async(request, reply) => { // Deleta algo (um unico "vídeo" por exemplo.)
    const videoId = request.params.id

    await database.delete(videoId)


    return reply.status(204).send()

    //return 'Deletar os videos (1 unico delete por id)'
})
        // configuração para o Render criar a minha propria porta! 
server.listen({
    port: process.env.PORT ?? 3333,
})
