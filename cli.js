#!/usr/bin/env node

const inquirer = require('inquirer')
const os = require('os')
const path = require('path')
const getImages = require('./app')

var questions = [
    {
        type: 'input',
        name: 'keywords',
        message: "What are you looking for ?",
    },
    {
        type: 'number',
        name: 'iterations',
        message: "How many iterations ?",
    },
    {
        type: 'input',
        name: 'location',
        message: `Where to save ? \n enter absolute path if not found will be created \n default (${path.resolve(os.homedir(),'Downloads')})`,
    },
    {
        type: 'confirm',
        name: 'moderate',
        message: 'Moderate search results ?',
        default : true
    },
    {
        type: 'confirm',
        name: 'go',
        message: 'proceed with download ?',
        default : true
    },

]

inquirer.prompt(questions).then(answers => {
    if(answers['go']){
        getImages(answers)
        .then((res)=>console.log('Done.'))
        .catch(err=>console.log(err))
    }
})
