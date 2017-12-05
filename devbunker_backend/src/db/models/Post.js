const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;

const Post = new Schema({
    language: String,
    title: String,
    content: String,
    writerid: { type: Number, ref: 'User' },
    writer: String,
    temp: Boolean,
    recommend: Number,
    reply: [{
        replywriterid: { type: Number, ref: 'User' },
        replywriter: String,
        replycontent: String,
        replycreatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    postedAt: {
        type: Date,
        default: Date.now
    }
});

Post.statics.insertPost = async function({ language, title, content, writerid, writer, temp }) {
    const post = new this({
        language,
        title, 
        content,
        writerid,
        writer,
        temp
    });

    return post.save();
};

Post.statics.updatePost = async function({ _id, language, title, content, temp }) {
    return this.findOneAndUpdate({_id}, {
        language,
        title,
        content,
        temp,
        postedAt: new Date()
    }, { upsert: false, new: true }).exec();
}

Post.statics.deletePost = async function({ _id }) {
    return this.remove({_id}).exec();
}

Post.plugin(autoIncrement.plugin, 'Post');

module.exports = mongoose.model('Post', Post);