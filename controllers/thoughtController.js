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
			.then((thought) => res.json(thought))
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
