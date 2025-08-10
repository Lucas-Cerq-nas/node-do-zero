import { randomUUID } from 'node:crypto'

// console.log(randomUUID()) me manda uma criptografia aleatoria :)

export class DatabaseMemory {
    #videos = new Map()

// Set, Map
    list(search){
       // return this.#videos.values()

//Encapsular o this.#videos.values(), Que retorna como uma class e não como uma array!
        // return Array.from(this.#videos.values())

//Fazendo com que retorne o ID tbm!
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0] 
                //console.log(videoId) // Mostra o Id
                const data = videoArray[1]
                //console.log(data) // Mostra o body: title, description, duration 
                //console.log(data.title) .description .duration ...
                
                return {
                    id,
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    // ou ...data
                }
            })
            .filter(video => { // video = cada um dos vídeos
                if(search) { // se tiver uma busca
                    return video.title.includes(search) // retorna o titulo includes no search
                }

                return true // se não, retorna todos.
            })
    }

    create(video){
        const videoId = randomUUID() // Faz com que cada vídeo, possua sua propria Identificação/ID
            //.set(key, value) = (id, video)
        this.#videos.set(videoId, video) // video{ body }
    }

    update(id ,video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    } 
}   