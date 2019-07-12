import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import data from '../data/data';
import app from '../index';

chai.should();
chai.use(chaiHttp);
let propertyId = 1;
let userToken;
// Testing create property
describe('/property routes', () => {
	let ownerId = 1;
	before((done) => {
		chai.request(app);
		// Database.createAdmin();
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send({
				email: 'bahati@prolite.com',
				password: 'Aa!12345',
				firstName: 'Robben',
				lastName: 'Bahati'
			})
			.end((err, res) => {
				userToken = res.body.data.token;
				ownerId = res.body.data.id;
				done();
			});
	});
	describe('Create property ad ', () => {
		it('it should create a property ad', (done) => {
			const data = {
				title: 'A remote placed house for rent',
				imageUrl: 'https://via.placeholder.com',
				price: 2000,
				address: 'kigali',
				type: 'flat'
			};
			chai.request(app)
				.post('/api/v1/property')
				.set('authorization', `Bearer ${userToken}`)
				.send(data)
				.end((err, res) => {
					propertyId = res.body.data.id;
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('id');
					res.body.data.should.have.property('ownerId');
					res.body.data.should.have.property('flags').eql([]);
					res.body.data.should.have.property('status').eql('available');
					done();
				});
		});

		it('it should not create property with incomplete fields', (done) => {
			const data = {
				title: 'A remote placed house for rent',
				imageUrl: 'https://via.placeholder.com/150',
				address: 'kigali'
			};
			chai.request(app)
				.post('/api/v1/property/')
				.set('authorization', userToken)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('status').eql('All fields are required');
					done();
				});
		});

		it('it should not create parcel with wrong  token', (done) => {
			const data = {
				title: 'A remote placed house for rent',
				imageUrl: 'https://via.placeholder.com/150',
				price: 2000,
				address: 'kigali'
			};
			chai.request(app)
				.post('/api/v1/property')
				.set('authorization', 'Bearer hjhasanmsbahsdjhasduuhrnwehwwewhnscblasudalkdasda')
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('error');
					res.body.should.have.property('message').eql('Invalid Token');
					done();
				});
		});

		it('it should not create property without token', (done) => {
			const data = {
				title: 'A remote placed house for rent',
				imageUrl: 'https://via.placeholder.com/150',
				price: 2000,
				address: 'kigali'
			};
			chai.request(app)
				.post('/api/v1/parcels')
				.send(data)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('error');
					res.body.should.have.property('message').eql('Not authorized!');
					done();
				});
		});
	});
	// end of creating property
	describe('Mark property sold if available', () => {
		it('it should change the destination', (done) => {
			chai.request(app)
				.put(`/api/v1/property/${propertyId}/sold`)
				.set('authorization', `Bearer ${userToken}`)
				.send({ destination: 'Lagos' })
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('id').eql(propertyId);
					res.body.data.should.have.property('ownerId').eql(ownerId);
					res.body.data.should.have.property('status').eql('sold');
					res.body.data.should.have.property('title').eql('A remote placed house for rent');
					res.body.data.should.have.property('price').eql(2000);
					res.body.data.should.have.property('imageUrl').eql('https://via.placeholder.com');
					res.body.data.should.have.property('address').eql('kigali');
					res.body.should.have.property('price').eql(10350);
					done();
				});
		});
	});
	// end of mark sold

	// start of mask available
	describe('mark it available if sold', () => {
		it('it should change the destination', (done) => {
			chai.request(app)
				.patch(`/api/v1/property/${propertyId}/sold`)
				.set('authorization', `Bearer ${userToken}`)
				.send({ destination: 'Lagos' })
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('id').eql(propertyId);
					res.body.data.should.have.property('ownerId').eql(ownerId);
					res.body.data.should.have.property('status').eql('available');
					res.body.data.should.have.property('title').eql('A remote placed house for rent');
					res.body.data.should.have.property('price').eql(2000);
					res.body.data.should.have.property('imageUrl').eql('https://via.placeholder.com');
					res.body.data.should.have.property('address').eql('kigali');
					res.body.should.have.property('price').eql(10350);
					done();
				});
		});
	});

	// end of mark

	// update

	describe('update a property', () => {
		it('it should update a property', (done) => {
			chai.request(app)
				.patch(`/api/v1/property/${propertyId}/sold`)
				.set('authorization', `Bearer ${userToken}`)
				.send({
					title: ' a strong and and durable house for sale',
					price: 5000,
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('id').eql(propertyId);
					res.body.data.should.have.property('ownerId').eql(ownerId);
					res.body.data.should.have.property('title').eql('a strong and and durable house for sale');
					res.body.data.should.have.property('price').eql(5000);
					res.body.data.should.have.property('imageUrl').eql('https://via.placeholder.com');
					res.body.data.should.have.property('address').eql('kigali');
					done();
				});
		});
	});

	describe('flag a property', () => {
		it('it should flag a property', (done) => {
			chai.request(app)
				.patch(`/api/v1/property/${propertyId}/flag`)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message').eql('flagged successfully');
					done();
				});
		});
	});
	// end of flag
	// start of
	describe('get a property by id', () => {
		it('it should update a property', (done) => {
			chai.request(app)
				.get(`/api/v1/property/${propertyId}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql(200);
					res.body.should.have.property('data');
					res.body.data.should.have.property('id').eql(propertyId);
					res.body.data.should.have.property('ownerId').eql(ownerId);
					res.body.data.should.have.property('title').eql('a strong and and durable house for sale');
					res.body.data.should.have.property('price').eql(5000);
					res.body.data.should.have.property('imageUrl').eql('https://via.placeholder.com');
					res.body.data.should.have.property('address').eql('kigali');
					done();
				});
		});
	});
	describe('get all properties', () => {
		it('it should update a property', (done) => {
			chai.request(app)
				.get('/api/v1/property/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql(200);
					res.body.should.have.property('data');
					res.body.data.should.be.a('object');
					done();
				});
		});
	});
	// serach by type
	describe('get a property by id', () => {
		it('it should update a property', (done) => {
			chai.request(app)
				.get('/api/v1/property/?type=flat')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql(200);
					res.body.should.have.property('data');
					res.body.data.should.be.a('object');
					done();
				});
		});
	});

	// delete

	describe('delete a property ', () => {
		it('it should delete a property', (done) => {
			chai.request(app)
				.delete(`/api/v1/property/${propertyId}`)
				.set('authorization', `Bearer ${userToken}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message').eql('property deleted successfully');
					done();
				});
		});
	});
});
