import { } from 'node';
import { writeFile } from 'fs';
import { argv } from 'yargs';
// @ts-ignore
require('dotenv').config();

/**
 * Generates dynamic environment.ts file from .env or local exported variables and
 * saves it in the angular environments folder.
 *
 * Note:
 * - Execute this file with ts-node before angular serves the app
 * - If you don't need multiple environment.ts files, you should remove the replacement in angular.json
 * - It is recommended to add environment.ts to your.gitignore file, otherwise your keys will not be secure.
 */

const isProd = argv.environment === 'prod';
const targetPath = `./src/environments/environment.ts`;
// @ts-ignore
const envConfigFile = `
export const environment = {
  production: ${isProd},
  clientId: "${process.env.CLIENT_ID}",
  redirectUri: "${process.env.REDIRECT_URI}" 
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
