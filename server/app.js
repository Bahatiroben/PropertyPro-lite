import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './database/database';
import propertyRoute from './routes/propertyRoutes';
import userRoute from './routes/userRoutes';


dotenv.config();

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
// middle wares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/auth', userRoute);

app.get('/', (req, res)=>{
	res.status(200).json('you are welcome to propertypro-lite');
});
app.listen(PORT, () => {
	console.log(`listening on port ${PORT} ...`);
});
module.exports = app;
