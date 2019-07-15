import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../index';
import data from '../data/data';

const propertyId = 1;
chai.should();
chai.use(chaiHttp);
describe('get all properties', () => {
	beforeEach('create a dummy property', (done) => {
		data.properties.push({
			title: 'a brand new house for sale',
			id: 1,
			ownerId: 3,
			location: 'kigali',
			address: 'Rwanda',
			flags: [],
			type: 'flat',
			imageUrl: 'https://via.placeholder.com'
		});
		done();
	});
	it('it should give all properties', (done) => {
		chai.request(app)
			.get('/api/v1/property')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(200);
				res.body.should.have.property('data');
				res.body.data.should.be.a('Array');
				done();
			});
	});

	it('it should find a property by id', (done) => {
		chai.request(app)
			.get('/api/v1/property/1')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(200);
				done();
			});
	});

	it('should return 404 on non existing property', (done) => {
		chai.request(app)
			.get('/api/v1/property/0')
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(404);
				res.body.should.have.property('data');
				res.body.data.should.have.property('error').eql('Property Not found');
				done();
			});
	});

	it('it should get a property by type', (done) => {
		chai.request(app)
			.get('/api/v1/property/?type=flat')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(200);
				res.body.should.have.property('data');
				res.body.data.should.be.a('Array');
				done();
			});
	});

	it('it get a 404 when a property is not found', (done) => {
		chai.request(app)
			.get('/api/v1/property/?type=couva')
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(404);
				res.body.should.have.property('data');
				res.body.data.should.be.a('object');
				res.body.data.should.have.property('error').eql('Property not found');
				done();
			});
	});
});

describe('Flag endpoint', () => {
	it('it should flag an existing property', (done) => {
		const data = {
			email: 'barakajean@proplite.com',
			reason: 'the prices are weird',
			description: 'the prices are way different from the quality offered'
		};
		chai.request(app)
			.post('/api/v1/property/flag/1')
			.send(data)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(201);
				res.body.should.have.property('data');
				res.body.data.should.have.property('message').eql('flagged successfully');
				done();
			});
	});

	it('it should not flag a non existing property', (done) => {
		const data = {
			email: 'barakajean@proplite.com',
			reason: 'the prices are weird',
			description: 'the prices are way different from the quality offered'
		};
		chai.request(app)
			.post('/api/v1/property/flag/0')
			.send(data)
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql(404);
				res.body.should.have.property('data');
				res.body.data.should.have.property('error').eql('Property not found');
				done();
			});
	});
});
