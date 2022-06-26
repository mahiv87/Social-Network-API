const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxLength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			get: format
		},
		username: {
			type: String,
			required: true
		},
		reactions: [reactionSchema]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
	}
);

thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

function format(date) {
	return formatDate(date);
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
