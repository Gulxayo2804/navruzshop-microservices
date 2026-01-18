import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NavruzShop Auth API",
      version: "1.0.0",
      description: "Authentication service for NavruzShop",
    },
  },
  apis: ["./src/routes/*.ts"],
});
