const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: dayjs(),
			get: (date) => dayjs(date).format('MMM Do, YYYY [at] hh:mm a')
		}
	},
	{
		toJSON: {
			getters: true
		},
		id: false
	}
);

module.exports = reactionSchema;
