import joi from 'joi';

const schema = {
	property: joi.object().keys({
		title: joi.string().min(2).max(50).required(),
		imageUrl: joi.string().required(),
		price: joi.number().required(),
		address: joi.string().min(2).max(128).required()
	}),
	user: joi.object().keys({
		firstName: joi.string().min(2).max(20).required(),
		lastName: joi.string().min(2).max(20).required(),
		email: joi.string().email().required(),
		phoneNumber: joi.string().regex(/^\+?[0-9]{3}-?[0-9]{7,12}$/).optional(), // +threedigits-sixto12digits
		password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/).required()
	}),
	flag: joi.object().keys({
		propertyId: joi.string().required(),
		email: joi.string().email().required(),
		reason: joi.string().min(5).max(30).required(),
		description: joi.string().min(10).required()
	})
};

export default schema;
