const fs = require('fs');
const registrator = require('./components/registration')

const getPage = async(targetPage) =>{
    
    const createPathAndFiles = () => {
        return new Promise((resolve, reject) => {
        if (!fs.existsSync(`./screenshots`)){fs.mkdirSync(`./screenshots`);}
        resolve("ready")
    });
}
await createPathAndFiles()    
await registrator.forms(targetPage)
process.exit()
}    
getPage("https://abz4.typeform.com/to/mMRFLi");   



