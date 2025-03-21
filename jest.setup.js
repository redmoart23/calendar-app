import jest from 'jest-mock';

// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
import dotenv from 'dotenv';
import process from 'process';

dotenv.config({
    path: '.env.test'
});

// Realizar el mock completo de las variables de entorno
jest.mocked('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));