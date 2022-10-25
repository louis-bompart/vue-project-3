const {spawn} = require('child_process');
const {resolve, join} = require('path');
const {config} = require('dotenv');
const {appendCmdIfWindows} = require('./utils');
config();

function getEnvVariables() {
  var envVars = Object.assign(
    {
      SERVER_PORT: process.env.VITE_APP_SERVER_PORT,
      API_KEY: process.env.VITE_APP_API_KEY,
      ORGANIZATION_ID: process.env.VITE_APP_ORGANIZATION_ID,
      PLATFORM_URL: process.env.VITE_APP_PLATFORM_URL,
      USER_EMAIL: process.env.VITE_APP_USER_EMAIL,
    },
    process.env
  );
  return envVars;
}

function startServer() {
  const serverPath = join(process.cwd(), 'server');
  const child = spawn(appendCmdIfWindows`npm`, ['run', 'start'], {
    stdio: 'inherit',
    env: getEnvVariables(),
    cwd: resolve(serverPath),
  });
  process.on('SIGINT', () => {
    child.kill();
  });
}

function main() {
  startServer();
}

main();