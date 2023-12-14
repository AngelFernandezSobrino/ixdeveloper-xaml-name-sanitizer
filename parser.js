const fs = require('fs');
const path = require('path');

//Hard coded directory has been used.
//Put your path here...
const dir = process.cwd();

// Function to get the filenames present
// in the directory
const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (error, filenames) => {
            if (error) {
                reject(error);
            } else {
                resolve(filenames);
            }
        });
    });
};
let dataPath = path.resolve(process.argv[2])

readdir(dataPath).then((filenames) => {
    filenames = filenames.filter(filterXamlFiles);

    for (let i = 0; i < filenames.length; i++) {
        let currFilePath = dataPath + '\\' + filenames[i];

        //Use fast-csv to parse the files
        let fileData = fs.readFileSync(currFilePath, 'utf8');

        let newData = fileData.replace(/Name="[^\s]+"/g,'');
        let newDirectory = dataPath + '\\parsed'
        if (!fs.existsSync(newDirectory)) {
            fs.mkdirSync(newDirectory)
        }
        console.log(newDirectory + filenames[i])
        fs.writeFileSync(process.argv[2] + '\\parsed\\' + filenames[i], newData)
        
    }
});


//XAML filter to filter out the xaml files
//in the directory
const filterXamlFiles = (filename) => {
    return filename.split('.')[1] === 'xaml';
};