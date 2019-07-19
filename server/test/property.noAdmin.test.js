import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('before each', () => {
  beforeEach((done) => {
    done();
  });
});

describe('Property Tests', () => {

  it('Should not be able to create new property when price is empty', (done) => {
    chai.request(app).post('/api/v1/property').send({
      title: 'asgdagsdjahdjk',
      price: '',
      state: 'kahskjadhbh',
      city: 'nyanasjjahgdnaxa',
      address: 'rqmnasdwrfds',
      type: 'house asdgjh',
      imageUrl: 'https://via.localstorage.com/pic'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });
  it('Should not be able to create new property when price is invalid', (done) => {
    chai.request(app).post('/api/v1/property').send({
      title: 'mansdmjhgsdad',
      price: '10jhs0s',
      state: 'kbh',
      city: 'nyanaxa',
      address: 'rqwrfds',
      type: 'house',
      imageUrl: 'https://kjkaskdhaksdjhljfupnnfjfrk.png'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });
  it('Should not be able to create new property when price has whitespaces', (done) => {
    chai.request(app).post('/api/v1/property').send({
      price: '   ',
      state: 'kbh',
      city: 'nyanaxa',
      address: 'rqwrfds',
      type: 'house tha works',
      imageUrl: 'https://res.closdkjfhsfupnnfjfrk.png'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });
  it('Should not be able to create new property when address is empty', (done) => {
    chai.request(app).post('/api/v1/property').send({
      title: 'ashjagsjhdga',
      city: 'nyanaxa',
      address: ' ',
      type: 'house',
      price:1000,
      imageUrl: 'https://lkisdufd/v1562855584/bit0gxxhljfupnnfjfrk.png'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });


  it('Should not be able to create new property when type is missing', (done) => {
    chai.request(app).post('/api/v1/property').send({
      title: 'ajhsdga ahgd',
      price: 100,
      state: 'kgl',
      city: 'gasab1',
      address: 'daudbaub',
      image: 'https://res.cloudinary.com/prolite/image/upload/v1562855584/bit0gxxhljfupnnfjfrk.png'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });
  });



  it('Should not be able to flag a property when reason is empty', (done) => {
    chai.request(app).post('/api/v1/property/flag/1').send({
      email: 'bagda@jhsda.com',
      reason: '',
      description: 'too much'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });
  it('Should not be able to flag a property when reason has whitespaces', (done) => {
    chai.request(app).post('/api/v1/property/flag/1').send({
      email: 'jahsda@jhsd.com',
      reason: '    ',
      description: 'too much'
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });

  it('Should not be able to flag a property when the property id is not a number', (done) => {
    chai.request(app).post('/api/v1/property/flag/v').send({
      email: 'absdha@ahsdas.com',
      reason: 'pricing',
      description: 'jhahjkjh '
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });
  it('Should not be able to flag a property when the property id is less than zero', (done) => {
    chai.request(app).post('/api/v1/property/flag/-5').send({
      email: 'absdha@ahsdas.com',
      reason: 'pricing',
      description: 'jhahjkjh '
    })
      .end((err, res) => {
        res.should.has.status(400);
        done();
      });

  });


});

