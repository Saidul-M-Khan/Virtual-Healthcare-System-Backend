import { Server } from 'http';
import app from './app';

const port = 3000;

const main = async() => {
    const server: Server = app.listen(port, () => {
        console.log("Server is listening on port", port);
    });
}

main();
