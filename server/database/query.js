
const queries = {
	user: {
        create: `INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        getUser: `SELECT * FROM users WHERE email = $1`
	}
};

module.exports = queries;
