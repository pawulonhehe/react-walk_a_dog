import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-wad.herokuapp.com',
      changeOrigin: true,
    })
  );
};