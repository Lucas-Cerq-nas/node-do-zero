// Essa database sera igual a do database-memory! só que usando um banco de dados "real" (neon.tech)
import { randomUUID } from 'node:crypto'
import { sql } from './db.js'
export class DatabasePostgres {

   async list(search){
       let videos 

       if(search){  // Vê se tem algo na caixa de texto
        videos = await sql`select * from videos where title ilike ${'%' + search + '%'}` // Vẽ se o titulo contem uma string e indica se o titulo contem a palavra da string/TITULO
       }else{
        videos = await sql`select * from videos` // Mostra todos os vídeos

       }

       return videos // retorna o videos depois da operação
    } 

   async create(video){
        const videosId = randomUUID()
        const {title, description, duration} = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videosId}, ${title}, ${description}, ${duration})`
    }

   async update(id ,video){
        const {title, description, duration} = video
     
        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id){
        await sql`delete from videos where id = ${id}`
    } 
}   