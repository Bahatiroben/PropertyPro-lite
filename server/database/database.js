import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    });
    this.connect = async () => this.pool.connect();
    this.initialize();
  }

   createUserTable =
    `
    CREATE TABLE IF NOT EXISTS userTable (
      id serial PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastName VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      phoneNumber VARCHAR(20) NOT NULL
      isAdmin BOOLEAN
      createdDate DATE
    )`;

  createPropertyTable =
    `
    CREATE TABLE IF NOT EXISTS propertyTable (
      id serial PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      createdOn DATE,
      price DECIMAL,
      state VARCHAR(128),
      imageUrl VARCHAR(100),
      address VARCHAR(80),
      description VARCHAR(128),
      ownerEmail REFERENCES userTable (email) ON DELETE CASCADE,
      ownerPhoneNumber REFERENCES userTable (phoneNumber) ON DELETE CASCADE,
      ownerId serial REFERENCES userTable (id) ON DELETE CASCADE
    )`;

    signUpQery =`
      INSERT INTO userTable
      VALUES($1, $2, $3, $4, $5, $6, $7)
      `;
    

    // CONNECTING TO THE DATABASE
    async execute(sql, data = []) {
      const connection = await this.connect();

      try {
        if (data.length) return await connection.query(sql, data);
        return await connection.query(sql);
      } catch (error) {
        return error;
      } finally {
        connection.release();
      }
    }
    // inserting the user into the database
    async createUser() {
      try{
      const { rows } = await this.execute('SELECT * FROM userTable WHERE email = $1', [email]);
      if (!rows[0]) {
        this.execute(this.signUpQuery, [
          firstName,
          lastName,
          email,
          helper.hashThePassword('admin'),
          phoneNumber,
          isAdmin,
          new Date()
        ]);
        return 'User created successfully';
      } else {
        return 'User already exist';
      }
    } catch (error){
      return error;
    }

    }

    // inserting a property into the database

    async initialize() {
      await this.execute(this.createUserTable);
      await this.execute(this.createParcelTable);
      this.createAdmin();
    }
}

export default new Database();
