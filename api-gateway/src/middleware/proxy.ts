import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
});

export const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
});

export const productProxy = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/products": "",
  },
});
