const { User, Thought } = require('../models');

module.exports = {
	//Get all Users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// Get a single User by id
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that Id...' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a User
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	// Update a User by id
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that Id...' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Delete a User by id
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that Id...' })
					: Thought.deleteMany({ _id: { $in: user.thoughts } })
			)
			.then(() =>
				res.json({ message: 'User, and their Thoughts deleted!' })
			)
			.catch((err) => res.status(500).json(err));
	},
	// Add a friend to a User
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.body } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that Id...' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Delete a friend from a User
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { userId: req.params.userId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No user found with that Id...' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	}
};
