import { version } from 'react';
import { Op } from 'sequelize';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Express API for User Profile',
        version: '1.0.0',
        description: "Simple boilerplate code base for creating APIs with `Node.js Express` framework using `Sequelize` with `PostgreSQL` database",
        contact: {
            name: 'Yunus Celik',
            url: 'https://github.com/yunuscelikk'
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development Server',
        },
    ],
};

const options = {
    definition: swaggerDefinition,
    apis: ['src/routes/**/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export {
    swaggerSpec
};