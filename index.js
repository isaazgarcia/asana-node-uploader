
require('dotenv').config()
const asana = require('asana')
const chalk = require('chalk')
const fs = require("fs")
const yargs = require("yargs")

const argv = yargs
    .option('file', {
        alias: 'f',
        description: 'File to upload.',
        type: 'string',
    })
    .option('taskId', {
        alias: 'tid',
        description: 'Asana Task Id to upload files to.',
        type: 'string',
    })
    .option('accessToken', {
        alias: 'at',
        description: 'Asana Personal Access Token.',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv

const fileToUpload = argv.file || process.env.FILE_TO_UPLOAD
const taskId = argv.taskId || process.env.ASANA_TASK_ID
const accessToken = argv.accessToken || process.env.ASANA_ACCESS_TOKEN

if (!fileToUpload || !taskId || !accessToken) {
    console.log(chalk.red(`
${!fileToUpload? 'Set a file to upload with -f. Example: -f=file.txt' : ''}
${!taskId? 'Set an Asana Task Id with -tid. Example: -tid=123456' : ''}
${!accessToken? 'Set an Asana Personal Access Token with -at. Example: -at=123456' : ''}
    `))
    return
}

console.log(chalk.yellow("\n⚡︎" + (`Uploading ${fileToUpload} to Asana!`))+"\n")

const client = asana.Client.create().useAccessToken(accessToken)
const params = {
    method: 'POST',
    url: `https://app.asana.com/api/1.0/tasks/${taskId}/attachments`,
    formData: {
        file: fs.createReadStream(fileToUpload)
    },
    headers: {
        "Content-Type": "multipart/form-data"
    },
}

client.dispatcher.dispatch(params, {}).then(function (){
    console.log(chalk.yellow("\n⚡Done uploading to Asana!" +"\n"))
}).catch(function (){
    console.log(chalk.red(`Done uploading to Asana!`)+"\n")
})
