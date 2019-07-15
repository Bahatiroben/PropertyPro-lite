import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

let propertyId;

chai.use(chaiHttp);
chai.should();
describe('Signup Test', () => {
	it('it should create a user account', (done) => {
		const data = {
			firstName: 'Nyagatare',
			lastName: 'Jameson',
			email: 'nyagatare@gmail.com',
			password: 'Aa!12345'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(data)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.property('status').eql(201);
				res.body.should.have.property('data');
				res.body.data.should.have.property('email').eql('nyagatare@gmail.com');
				res.body.data.should.not.have.property('password');
				res.body.data.should.have.property('id');
				res.body.data.should.have.property('createdDate');
				res.body.data.should.have.property('isAdmin').eql(false);
				done();
			});


		it('it should not sign up a user account when input are not complete', (done) => {
			const data = {
				firstName: 'James',
				phoneNumber: '+250788554931',
				email: 'james@propertyPro.com'
			};
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property('data');
					res.body.should.have.property('status').eql(400);
					res.body.data.should.have.property('error').eql('All fields are required');
					done();
				});
		});

		it('it should not sign up a user account when password is not valid', (done) => {
			const data = {
				firstName: 'Nyagatare',
				lastName: 'James',
				email: 'nyagatare@gmail.com',
				password: 'bienaime'
			};
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property('status').eql(400);
					res.body.should.have.property('data');
					res.body.data.should.have.property('error').eql('The password must contain an uppercase, lowercase, number, special character and at least 8 characters long');
					done();
				});
		});
	});
});

// no signup if already exist
describe('User sign up ', () => {
	beforeEach('Create a user', (done) => {
		const data = {
			password: 'Aa!12345',
			firstName: 'robben',
			lastName: 'bahati',
			email: 'bahati@prolite.com'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(data)
			.end((error, res) => {
				if (error) done(error);
				done();
			});
	});

	it('it should not sign up an already existing a user', (done) => {
		const data = {
			password: 'Aa!12345',
			firstName: 'robben',
			lastName: 'bahati',
			email: 'bahati@prolite.com'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(data)
			.end((err, res) => {
				res.body.should.have.property('status').eql(403);
				res.body.should.have.property('data');
				res.body.data.should.have.property('error').eql('User already exist')
			});
		done();
	});

	// login

	describe('User Login ', () => {
		beforeEach('Create a user', (done) => {
			const data = {
				password: 'Aa!12345',
				firstName: 'robben',
				lastName: 'bahati',
				email: 'bahati@prolite.com'
			};
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send(data)
				.end((error) => {
					if (error) done(error);
					done();
				});
		});
		it('it should login a user', (done) => {
			const data = {
				email: 'bahati@prolite.com',
				password: 'Aa!12345'
			};
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('status').eql(200);
					res.body.should.have.property('data');
					res.body.data.should.have.property('token');
					res.body.data.should.have.property('id');
					res.body.data.should.have.property('firstName').eql('robben');
					res.body.data.should.have.property('lastName').eql('bahati');
					res.body.data.should.have.property('email').eql('bahati@prolite.com');
					done();
				});
		});
		it('it should not login user without email', (done) => {
			const data = {
				password: 'Aa!12345'
			};
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property('status').eql(400);
					res.body.should.have.property('data');
					res.body.data.should.have.property('error').eql('All fields are required');
					done();
				});
		});
		it('it should not login user without password', (done) => {
			const data = {
				email: 'bahatiroben@gmail.com',

			};
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property('status').eql(400);
					res.body.should.have.property('data');
					res.body.data.should.have.property('error').eql('All fields are required');
					done();
				});
		});

		// incorrect password
		it('it should not login user with wrong password', (done) => {
			const data = {
				email: 'bahati@prolite.com',
				password: 'a!12345'
			};
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property('status').eql(401);
					res.body.should.have.property('data');
					res.body.data.should.have.property('error').eql('The password is incorrect');
					done();
				});
		});


		// user not found
		it('it should not login user who does not have acount', (done) => {
			const data = {
				email: 'robben@prolite.com',
				password: 'Aa!12345'
			};
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property('status').eql(404);
					res.body.should.have.property('data');
					res.body.data.should.have.property('error').eql('User Not found');
					done();
				});
		});
	});
});
