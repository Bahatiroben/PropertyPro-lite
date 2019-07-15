/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.should();
chai.use(chaiHttp);
// Test error 404
describe('Error 404 test', () => {
	it('it should handle error 404', (done) => {
		chai.request(app)
			.get('/notexist')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});
});

describe('Property creation', () => {
	describe('properties', () => {
		let token;
		let ownerId;
		let propertyId;
		it('user should create a user account', (done) => {
			const data = {
				firstName: 'Nyagatare',
				lastName: 'James',
				email: 'nyatare@gmail.com',
				password: 'Aa!12345'
			};
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send(data)
				.end((err, res) => {
					ownerId = res.body.data.id;
					// eslint-disable-next-line prefer-destructuring
					token = res.body.data.token;
					res.should.have.status(201);
					res.body.should.have.property('status').eql(201);
					res.body.should.have.property('data');
					res.body.data.should.have.property('firstName').eql('Nyagatare');
					res.body.data.should.have.property('lastName').eql('James');
					res.body.data.should.have.property('email').eql('nyatare@gmail.com');
					res.body.data.should.not.have.property('password');
					res.body.data.should.have.property('id');
					res.body.data.should.have.property('createdDate');
					res.body.data.should.have.property('isAdmin').eql(false);
					done();
				});
		});

		it('it should create a property', (done) => {
			const data = {
				title: 'a brand new property',
				price: 15000,
				imageUrl: 'https://picsart.com/',
				address: 'kigali',
			};
			chai.request(app)
				.post('/api/v1/property/')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property('status').eql(201);
					done();
				});
		});
		// user edit delete and update his properties
		describe('user can alter his properties', () => {
			beforeEach('create a property', (done) => {
				const data = {
					title: 'testing properties title2',
					price: 20000,
					imageUrl: 'https://via.sample.com/',
					address: 'Muhanga',
				};
				chai.request(app)
					.post('/api/v1/property/')
					.set('Authorization', `Bearer ${token}`)
					.send(data)
					.end((err, res) => {
						propertyId = res.body.data.id;
						res.should.have.status(201);
						res.body.should.have.property('status').eql(201);
						done();
					});
			});
			it('user can edit a property', (done) => {
				const data = {
					title: 'an edited title',
					price: 30000,
					imageUrl: 'https://picsart.com/',
					address: 'kigali',
				};
				chai.request(app)
					.patch(`/api/v1/property/${propertyId}`)
					.set('Authorization', `Bearer ${token}`)
					.send(data)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.have.property('data');
						res.body.data.should.have.property('price').eql(30000);
						res.body.should.have.property('status').eql(201);
						done();
					});
			});

			it('user can mark his property as sold if it is available', (done) => {
				chai.request(app)
					.patch(`/api/v1/property/${propertyId}/sold`)
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.have.property('data');
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('status').eql('sold');
						res.body.should.have.property('status').eql(201);
						done();
					});
			});

			describe('user can mark his property as available ', () => {
				beforeEach('first mark it as sold', (done) => {
					const data = {
						status: 'sold',
					};
					chai.request(app)
						.patch(`/api/v1/property/${propertyId}/`)
						.set('Authorization', `Bearer ${token}`)
						.send(data)
						.end((error) => {
							if (error) done(error);
							done();
						});
				});
				it('should mark property available if sold', (done) => {
					chai.request(app)
						.patch(`/api/v1/property/${propertyId}/sold`)
						.set('Authorization', `Bearer ${token}`)
						.end((err, res) => {
							res.should.have.status(201);
							res.body.should.have.property('data');
							res.body.data.should.be.a('object');
							res.body.data.should.have.property('status').eql('available');
							res.body.should.have.property('status').eql(201);
							done();
						});
				});
			});

			it('user can not mark a non existing property', (done) => {
				chai.request(app)
					.patch('/api/v1/property/0/sold')
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.have.property('data');
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('error').eql('Property Not found');
						res.body.should.have.property('status').eql(404);
						done();
					});
			});

			it('user can not delete a non existing property', (done) => {
				chai.request(app)
					.delete('/api/v1/property/0')
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.have.property('data');
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('error').eql('Property Not found');
						res.body.should.have.property('status').eql(404);
						done();
					});
			});

			it('user can not update a non existing property', (done) => {
				chai.request(app)
					.delete('/api/v1/property/0')
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.have.property('data');
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('error').eql('Property Not found');
						res.body.should.have.property('status').eql(404);
						done();
					});
			});
		});
	});
});
