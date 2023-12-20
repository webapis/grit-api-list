
function mergeFiles(gender) {


    require('dotenv').config()


    console.log('--------------------------------------------------------------')


    const path = require('path')

    const { walkSync } = require('./walkSync')

    const fs = require('graceful-fs')






    fs.rmSync(path.join(process.cwd(), `${gender}/_files/data`), { recursive: true, force: true });




    let markaProducts = []
    walkSync(path.join(process.cwd(), `kadin/unzipped-data`), async (filepath) => {
        const data = JSON.parse(fs.readFileSync(filepath))

        markaProducts.push(...data)
    })

    console.log('PRODUCTS TO MERGE', markaProducts.length)






}



