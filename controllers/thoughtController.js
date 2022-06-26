const { Thought, User } = require('../models');

module.exports = {
	// Get all Thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	// Get a single Thought
	getSingleThought(req, res) {
		Thought.fineOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with that Id...' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a Thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ username: thought.username },
					{ $addToSet: { thoughts: thought._id } },
					{ runValidators: true, new: true }
				);
			})
			.then((user) =>
				!user
					? res
							.status(404)
							.json({
								message:
									'Thought created, but found no user with that Id...'
							})
					: res.json('Thought created..')
			)
			.catch((err) => res.status(500).json(err));
	},
	// Update a Thought
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with that Id...' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Delete a Thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with that Id...' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a Reaction
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with that Id...' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Delete a Reaction
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactionId: req.params.reactionId } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'No thought with that Id...' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	}
};
