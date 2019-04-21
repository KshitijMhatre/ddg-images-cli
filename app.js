const { image_search_generator } = require('duckduckgo-images-api');
const download = require('image-downloader')
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

async function getImages(config) {

    let { keywords, iterations, location, moderate } = config;


    const options = {
        query: keywords,
        iterations: iterations ? iterations : undefined,
        moderate
    }

    if (location === '')
        location = path.resolve(os.homedir(), "Downloads")

    if (!fs.existsSync(location)) {
        fs.mkdirSync(location);
    }

    for await (let resultSet of image_search_generator(options)) {

        let [success, fail] = [0, 0];

        await Promise.all(resultSet.map(async (result) => {

            try {
                const { filename, image } = await download.image({ url: result.image, dest: location ,timeout :6000})
                // console.log(filename) // => /path/to/dest/image.jpg 
                success += 1;                
            } catch (e) {
                // console.error(e)
                fail += 1;                
            } finally {
                
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`(success:${success},failed:${fail}) of ${resultSet.length}`)                
            }

        }))
        console.log('\n');

    }
    
}

module.exports = getImages