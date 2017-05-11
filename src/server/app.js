process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

import express from 'express';
import { Server } from 'http';
import path from 'path';

const app = express();
const port = 8080;
const rootPath = path.resolve(__dirname, '..', '..');
const server = Server(app);
const staticPath = path.resolve(rootPath, 'dist', 'public');

//====================================================
// Middleware.
//====================================================

// Serve static assets.
app.use(express.static(staticPath));

//====================================================
// Routes.
//====================================================

// Use client-side routing.
//app.get('*', (request, response) => response.sendFile(path.resolve(staticPath, 'index.html')));
app.use('*', (request, response) => response.json({ hello: 'world' }));

//====================================================
// Errors...gotta catch 'em all.
//====================================================

app.use((error, request, response, next) => {
    next();
});

//====================================================
// Start server.
//====================================================

server.listen(port, () => {
    /* eslint-disable no-console */
    console.log('Environment: ' + process.env.NODE_ENV);
    console.log('The unicorns are running free on port ' + server.address().port);
    /* eslint-enable no-console */
});

// Export for testing.
export default app;
