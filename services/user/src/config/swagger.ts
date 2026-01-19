import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NavruzShop User API",
      version: "1.0.0",
      description: "User profile service for NavruzShop",
    },
  },
  apis: ["./src/routes/*.ts"],
});
