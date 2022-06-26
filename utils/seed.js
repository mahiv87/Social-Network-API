const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserName, getRandomThought } = require('./data');

connection.on('error', async () => {
	console.log('connected');

	await User.deleteMany({});
	await Thought.deleteMany({});

	const users = [];
	const thoughts = getRandomThought(10);

	for (let i = 0; i < 10; i++) {
		const username = getRandomUserName();
		const email = `${username}@mail.com`;

		users.push({
			username,
			email
		});
	}

	await User.collection.insertMany(users);
	await Thought.collection.insertMany(thoughts);

	console.table(users);
	console.table(thoughts);
	console.info('Seeding complete! 🌱');
	process.exit(0);
});
