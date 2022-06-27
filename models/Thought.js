const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxLength: 280
		},
		createdAt: {
			type: Date,
			default: dayjs(),
			get: (date) => dayjs(date).format('MMM Do, YYYY [at] hh:mm a')
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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
