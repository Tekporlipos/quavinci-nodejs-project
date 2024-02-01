// Import necessary modules
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

// Function to setup Swagger documentation
export function setupSwagger(app: Express) {
    // Swagger definition
    const swaggerDefinition = {
        info: {
            title: 'Develop and Document a Typed REST API Endpoint with Custom Rate Limiting API',
            version: '1.0.0',
            description: 'The project is a TypeScript-based Node.js backend, and the task involves creating a RESTful API that adheres to modern development practices, using specific project dependencies.',
        },
        basePath: '/api/v1',
        schemes: ['http'],
        consumes: ["application/json"],
        produces: ["application/json"]
    };

    // Options for swagger-jsdoc
    const options = {
        swaggerDefinition,
        apis: [
            '**/swagger.json',
        ],
    };

    // Initialize swagger-jsdoc with ts-node
    const swaggerSpec = swaggerJSDoc(options);

    // Serve Swagger documentation at /api-docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get(`/swagger.json`, (req, res) => res.json(swaggerSpec));
}
