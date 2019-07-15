import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import propertyRoute from './routes/propertyRoutes';
import userRoute from './routes/userRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
// middle wares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/auth', userRoute);
app.use('/', (req, res) => {
    res.status(200).json('You are welcome to property prolite, a platform where you can buy, rent and sell your properties');
} );
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next();
});
app.listen(PORT);
module.exports = app;
