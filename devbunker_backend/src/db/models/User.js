const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
const crypto = require('crypto');
const token = require('lib/token');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

const User = new Schema({
    displayName: String,
    email: String,
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.statics.findByDisplayName = function(displayName) {
    return this.findOne({displayName}).exec();
};

User.statics.findExistancy = function({email, displayName}) {
    return this.findOne({
        $or: [
        {email},
        {displayName}
        ]
    }).exec();
};

User.statics.findSocialId = function({provider, id}) {
    const key = `social.${provider}.id`;

    return this.findOne({
        [key]: id
    });
};

User.statics.localRegister = async function({ displayName, email, password }) {
    const user = new this({
        displayName, 
        email,
        password: hash(password)
    });

    return user.save();
};

User.statics.socialRegister = async function({
    displayName,
    email,
    provider,
    accessToken,
    socialId
}) {
    const user = new this({
        displayName,
        email,
        social: {
        [provider]: {
            id: socialId,
            accessToken: accessToken
        }
        }
    });

    return user.save();
};

User.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

User.methods.generateToken = function() {
    const { _id, displayName } = this;
    return token.generateToken({
        user: {
            _id,
            displayName
        }
    }, 'user');
};

User.plugin(autoIncrement.plugin, 'User');

module.exports = mongoose.model('User', User);