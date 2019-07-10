/* eslint-disable no-tabs */
import uuid from 'uuid';
import moment from 'moment';

const data = {
	users: [
		{
			id: '1',
			email: 'bahatiroben@gmail.com',
			first_name: 'Bahati',
			last_name: 'Robben',
			password: '12345',
			phoneNumber: '+250780475911',
			address: 'Kigali/Rwanda',
			is_admin: true
		},

		{
			id: '2',
			email: 'rubajohnq@gmail.com',
			first_name: 'Rubanzabigwi',
			last_name: 'John',
			password: '54321',
			phoneNumber: '+250788554931',
			address: 'Butare/Rwanda',
			is_admin: false
		},
	],
	properties: [
		{
			id: '1',
			owner: uuid.v4(), // user id

			// status sold,available - default is available

			price: 150000.00,
			state: 'Nyarugenge', // State where property is located
			city: 'Kigali', // City where property is located
			address: 'Kigali/Rwanda',
			type: '2 bedroom', // 3 bedroom etc
			created_on: moment.now(),
			image_url: 'https: //www.imagesplaceholder.com/150/150',
			flags: [
				{
					id: '3d3cd24d-ead7-4548-9a71-345edb93866e',
					created_on: moment.now(),
					reason: 'weird price', // [pricing, weird demands, etc]
					description: 'the price doesnt match the regular prices',
				}
			]
		},

		{
			id: '2',
			owner: uuid.v4(), // user id
			// status sold,available - default is available
			price: 150000.00,
			state: 'Gasabo', // State where property is located
			city: 'Kigali', // City where property is located
			address: 'Kigali/Rwanda',
			type: 'flat', // 3 bedroom etc
			created_on: moment.now(),
			image_url: 'https: //www.imagesplaceholder.com/200/200',
		}
	],

};
export default data;
// {
// “id”: Integer,
// “property_id”: Integer,
// “created_on”: DateTime,
// “reason”: String, // [pricing, weird demands, etc]
// “description”: String,
// ...
// }

// Users
// {
// “id”: Integer,
// “email”: String,
// “first_name”: String,
// “last_name”: String,
// “password”: String,
// “phoneNumber”: String,
// “address”: String,
// “is_admin”: Boolean,
// ...
// }

// ___________________________________________
// Property
// {
// “id”: Integer,
// “owner”: Integer, // user id
// “status”: String, // sold,available - default is available
// “price”: Float,
// “state”: String, // State where property is located
// “city”: String, // City where property is located
// “address”: String,
// “type”: String, // 2 bedroom, 3 bedroom etc
// “created_on”: DateTime,
// “image_url”: String,
// ...
// }
