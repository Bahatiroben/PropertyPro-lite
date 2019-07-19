import joi from 'joi';

const schema = {
	property: joi.object().keys({
		title: joi.string().min(5).max(50).trim().required(),
		imageUrl: joi.string().min(10).trim().required(),
		price: joi.number().positive().required(),
		address: joi.string().trim().required(),
		type: joi.string().min(3).max(10)
	}),
	user: joi.object().keys({
		firstName: joi.string().min(2).trim().regex(/^\S[A-Za-z]{1,}$/).required(),
		lastName: joi.string().min(2).trim().regex(/^\S[A-Za-z]{1,}$/).required(),
		email: joi.string().email().trim().required(),
		phoneNumber: joi.string().trim().regex(/^\+?[0-9]{3}-?[0-9]{7,12}$/).optional(), // +threedigits-sixto12digits
		password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/).required()
	}),

	flag: joi.object().keys({
		id: joi.number().required().min(0),
		email: joi.string().email().required(),
		reason: joi.string().min(5).max(50).required(),
		description: joi.string().min(5).required()
	})
};

export default schema;
