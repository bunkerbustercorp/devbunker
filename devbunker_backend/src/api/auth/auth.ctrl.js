const Joi = require('joi');
const User = require('db/models/User');
const { getProfile } = require('lib/social');

exports.checkEmail = async (ctx) => {
    const { email } = ctx.params;
    
    if(!email) {
        ctx.status = 400;
        return;
    }

    try {
        const account = await User.findByEmail(email);
        ctx.body = {
            exists: !!account
        };
    } catch (e) { 
        ctx.throw(e, 500);
    }
};

exports.checkDisplayName = async (ctx) => {
    const { displayName } = ctx.params;

    if(!displayName) {
        ctx.status = 400;
        return;
    }

    try {
        const account = await User.findByDisplayName(displayName);
        ctx.body = {
            exists: !!account
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
};

exports.localRegister = async (ctx) => {
    const { body } = ctx.request;

    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    });

    const result = Joi.validate(body, schema);

    // Schema Error
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { displayName, email, password } = body;

    try {
        // check email / displayName existancy
        const exists = await User.findExistancy({
            displayName,
            email
        });

        if(exists) {
            ctx.status = 409;
            const key = exists.email === email ? 'email' : 'displayName';
            ctx.body = {
                key
            };
            return;
        }

        // creates user account
        const user = await User.localRegister({
            displayName, email, password
        });

        ctx.body = {
            displayName,
            _id: user._id
            // metaInfo: user.metaInfo
        };
            
        const accessToken = await user.generateToken();

        // configure accessToken to httpOnly cookie
        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
    } catch (e) {
        ctx.throw(e, 500);
    }
};

exports.localLogin = async (ctx) => {
    const { body } = ctx.request;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    });

    const result = Joi.validate(body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    const { email, password } = body;

    try {
        // find user
        const user = await User.findByEmail(email);
        
        if(!user) {
            // user does not exist
            ctx.status = 403;
            return;
        }

        const validated = user.validatePassword(password);
        if(!validated) {
            // wrong password
            ctx.status = 403;
            return;
        }

        const accessToken = await user.generateToken();

        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        const { displayName, _id } = user;

        ctx.body = {
            _id,
            displayName
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
};

exports.socialLogin = async (ctx) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    const { provider } = ctx.params;
    const { accessToken } = ctx.request.body;

    // get social info
    let profile = null;
    try {
        profile = await getProfile(provider, accessToken);
    } catch (e) {
        ctx.status = 403;
        return;
    }

    if(!profile) {
        ctx.status = 403;
        return;
    }

    const {
        id, email
    } = profile;

    // check acount existancy  
    let user = null;
    try {
        user = await User.findSocialId({provider, id});
    } catch (e) {
        ctx.throw(e, 500);
    }

    if(user) {
        // set user status
        try {
            const devbunkerToken = await user.generateToken();
            ctx.cookies.set('access_token', devbunkerToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
        } catch (e) {
            ctx.throw(e, 500);
        }     
        const { _id, displayName } = user;
        ctx.body = {
            displayName,
            _id
        };    
        return;
    }

    if(!user && profile.email) {
        let duplicated = null;
        try {
            duplicated = await User.findByEmail(email);
        } catch (e) {
            ctx.throw(e, 500);
        }
        
        // if there is a duplicated email, merges the user account
        if(duplicated) {
            duplicated.social[provider] = {
                id,
                accessToken
            };
            try {
                await duplicated.save();
            } catch (e) {
                ctx.throw(e, 500);
            }
            try {
                // set user status
                const devbunkerToken = await duplicated.generateToken();
                ctx.cookies.set('access_token', devbunkerToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });        
            } catch (e) {
                ctx.throw(e, 500);
            }
            const { _id, displayName } = duplicated;
            ctx.body = {
                displayName,
                _id
            };
        }
    }

    if(!user) {
        ctx.status = 204;
    }
};

exports.socialRegister = async (ctx) => {
    const { body } = ctx.request;
    const { provider } = ctx.params;

    // check schema
    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,12}$/).required(),
        accessToken: Joi.string().required()
    }); 

    const result = Joi.validate(body, schema);
    
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { 
        displayName,
        accessToken
    } = body;

    // get social info
    let profile = null;
    try {
        profile = await getProfile(provider, accessToken);
    } catch (e) {
        ctx.status = 403;
        return;
    }
    if(!profile) {
        ctx.status = 403;
        return;
    }

    const { 
        email, 
        id: socialId
    } = profile;

    // check email (+1 time)
    if(profile.email) {
        // will check only email exists
        // service allows social accounts without email .. for now
        try {
            const exists = await User.findByEmail(profile.email);
            if(exists) {
                ctx.body = {
                    key: 'email'
                };
                ctx.status = 409;
                return;
            }
        } catch (e) {
            ctx.throw(e, 500);
        }
    } 

    // check displayName existancy
    try {
        const exists = await User.findByDisplayName(displayName);
        if(exists) {
            ctx.body = {
                key: 'displayName'
            };
            ctx.status = 409;
        }
    } catch (e) {
        ctx.throw(e, 500);
    }

    // create user account
    let user = null;
    try {
        user = await User.socialRegister({
            displayName,
            email,
            provider,
            accessToken,
            socialId
        });
    } catch (e) {
        ctx.throw(e, 500);
    }

    ctx.body = {
        displayName,
        _id: user._id
    };
    
    try {
        const devbunkerToken = await user.generateToken();
        ctx.cookies.set('access_token', devbunkerToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
    } catch (e) {
        ctx.throw(e, 500);
    }
};

exports.check = (ctx) => {
    const { user } = ctx.request;
    
    if(!user) {
        ctx.status = 403;
        return;
    }
    
    ctx.body = {
        user
    };
};

exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true
    });
    ctx.status = 204;
};