/* eslint-disable no-console */
import uuid from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import flagRoute from './routes/flagRoutes';
import propertyRoute from './routes/propertyRoutes';
import userRoute from './routes/userRoutes';

const PORT = process.env.PORT || 3000;
const app = express();
// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.status(200).json('you have successfully set upa server');
});
app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/flag', flagRoute);


app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}...`);
});
