const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');

	await User.deleteMany({});
	await Thought.deleteMany({});

	const users = [
		{
			username: 'Zohair4',
			email: 'Zohair4@gmail.com'
		},
		{
			username: 'Zishan4',
			email: 'Zishan4@gmail.com'
		},
		{
			username: 'Abdulkadir3',
			email: 'Abdulkadir3@gmail.com'
		},
		{
			username: 'Aayan7',
			email: 'Aayan7@gmail.com'
		},
		{
			username: 'Aaren3',
			email: 'Aaren3@gmail.com'
		},
		{
			username: 'Zidane2',
			email: 'Zidane2@gmail.com'
		},
		{
			username: 'Aaryan7',
			email: 'Aaryan7@gmail.com'
		},
		{
			username: 'Zhuo9',
			email: 'Zhuo9@gmail.com'
		},
		{
			username: 'Abdihakim10',
			email: 'Abdihakim10@gmail.com'
		},
		{
			username: 'Abdulkadir7',
			email: 'Abdulkadir7@gmail.com'
		}
	];

	const thoughts = [
		{
			thoughtText: 'Firefox is great for privacy',
			username: 'Zohair4'
		},
		{
			thoughtText: 'Learn Piano is not very good for learning Piano',
			username: 'Zishan4'
		},
		{
			thoughtText: 'Tower Defense is okay',
			username: 'Abdulkadir3'
		},
		{
			thoughtText: 'Email is open on my computer',
			username: 'Aayan7'
		},
		{
			thoughtText:
				'Movie trailers are just the best parts of a movie distilled into 90 seconds',
			username: 'Aaren3'
		},
		{
			thoughtText: 'Notes is my most used app',
			username: 'Zidane2'
		},
		{
			thoughtText: 'Social media is a big waste of time',
			username: 'Aaryan7'
		},
		{
			thoughtText: 'Email is open on my computer',
			username: 'Zhuo9'
		},
		{
			thoughtText: 'Find My Phone is a useful app',
			username: 'Abdihakim10'
		},
		{
			thoughtText: 'Decision Trackers are awesome',
			username: 'Abdulkadir7'
		}
	];

	await User.collection.insertMany(users);
	await Thought.collection.insertMany(thoughts);

	console.table(users);
	console.table(thoughts);
	console.info('Seeding complete! 🌱');
	process.exit(0);
});
