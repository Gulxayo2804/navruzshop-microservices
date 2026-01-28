import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NavruzShop Product API",
      version: "1.0.0",
      description: "Product catalog service",
    },
  },
  apis: ["./src/routes/*.ts"],
});