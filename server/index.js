/* eslint-disable no-console */
import uuid from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import propertyRoute from './routes/propertyRoutes';
import userRoute from './routes/userRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);
const app = express();
// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.status(200).json('you have successfully set upa server');
});
app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/auth', userRoute);


app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}...`);
});
module.exports = app;
