const data = {
	users: [{
		firstName: 'Bahati',
		lastName: 'Robben',
		email: 'bahatiroben@gmail.com',
		password: 'BahatiRobben123!',
		isAdmin: true,
	}],
	properties: [{
		id: 1,
		title: 'a brand new property',
		price: 12000,
		ownerId: 1,
		type:'flat',
		location: 'gisagara',
		address: 'huye',
		imageUrl: 'https://via.placeholder.com/150',
		flags: []
	},
	{
		id: 2,
		title: 'a big and old property',
		price: 15000,
		ownerId: 2,
		type: '2 bedroom',
		location: 'ruhango',
		address: 'ruhango',
		imageUrl: 'https://via.placeholder.com/150',
		flags: []
	}
	],
};
module.exports = data;
