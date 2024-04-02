import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/User/user.routes';
import { AdminRoutes } from './modules/Admin/admin.routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request: Request, response: Response) => {
    response.send({
        Message: "Virtual Health Care Server Running"
    });
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', AdminRoutes);

export default app;