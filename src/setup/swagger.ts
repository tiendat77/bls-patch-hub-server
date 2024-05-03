import { Express } from 'express';
import swaggerJsdoc from 'express-jsdoc-swagger';

const swaggerSetup = (app: Express) => {
  swaggerJsdoc(app)({
    info: {
      version: '1.0.0',
      title: 'Patch Hub API',
      description: 'Patch Hub API Documentation',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: ['../**/*.ts', '../**/*.js'],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/swagger',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
  });
};

export default swaggerSetup;
