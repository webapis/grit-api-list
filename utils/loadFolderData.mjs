
import walkSync from "./walkSync.mjs"
import path from 'path'
import fs from 'fs'
export default function loadFolderData(pathname){

    let data = []
    walkSync(path.join(process.cwd(), pathname), async (filepath) => {

        const currentData = JSON.parse(fs.readFileSync(filepath))
    
        data.push(...currentData)

    })

  
    return data
}