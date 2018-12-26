import { writeFile } from 'fs'
import { argv } from 'yargs'
// tslint:disable-next-line
require('dotenv').config()

/**
 * Generates dynamic environment.ts file from .env or local exported variables and
 * saves it in the angular environments folder.
 * (https://medium.com/@natchiketa/angular-cli-and-os-environment-variables-4cfa3b849659)
 *
 * Note:
 * - Execute this file with ts-node before angular serves the app
 * - If you don't need multiple environment.ts files, you should remove the replacement in angular.json
 * - It is recommended to add environment.ts to your.gitignore file, otherwise your keys will not be secure.
 */

const isProd = argv.environment === 'prod'
const targetPath = `./src/environments/environment.ts`
const envConfigFile = `
export const environment = {
  production: ${isProd},
  clientId: '${process.env.CLIENT_ID}',
  redirectUri: '${process.env.REDIRECT_URI}' 
}
`
writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    // tslint:disable-next-line
    console.log(err)
  }
  // tslint:disable-next-line
  console.log(`Output generated at ${targetPath}`)
})
