import { join, parse } from 'path'
import { createWriteStream } from 'fs'
import fs from 'fs'

export const readFile = async(file: any | Buffer) =>{
    const { createReadStream, filename }= await file
    const stream = createReadStream()
    var { ext, name} = parse(filename)
    name = `single${Math.floor((Math.random() * 10000) + 1)}`
    let url = join(__dirname, `../upload/${name}-$${Date.now()}${ext}`)
    console.log(url)
    const imageStream = await createWriteStream(url)
    await stream.pipe(imageStream)
    url = `localhost:3001/${url.split('upload')[1]}`
    return url
}