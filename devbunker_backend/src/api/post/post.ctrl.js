const Joi = require('joi');
const Post = require('db/models/Post');

exports.insertPost = async (ctx) => {
     // 스키마 검사
     const schema = {
        language: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        writerid: Joi.number().required(),
        writer: Joi.string().required(),
        temp: Joi.boolean().required()
    };

    const validate = Joi.validate(ctx.request.body, schema);

    if(validate.error) {
        ctx.status = 400;
        ctx.body = validate.error;
        return;
    }

    const { language, title, content, writerid, writer, temp } = ctx.request.body;

    try {
        const post = await Post.insertPost({
            language, title, content, writerid, writer, temp
        });

        ctx.body = {
            _id: post._id,
            language: language,
            title: title,
            content: content,
            temp: temp,
            saved: true
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
};


exports.updatePost = async (ctx) => {
    // 스키마 검사
    const schema = {
        _id: Joi.number().required(),
        language: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        temp: Joi.boolean().required()
   };

   const validate = Joi.validate(ctx.request.body, schema);

   if(validate.error) {
       ctx.status = 400;
       ctx.body = validate.error;
       return;
   }

   const { _id, language, title, content, temp } = ctx.request.body;

   try {
       const post = await Post.updatePost({
            _id, language, title, content, temp
       });

       ctx.body = {
           _id: post._id,
           language: language,
           title: title,
           content: content,
           temp: temp,
           saved: true
       };
   } catch (e) {
       ctx.throw(e, 500);
   }
};

exports.deletePost = async (ctx) => {
    // 스키마 검사
    const schema = {
        _id: Joi.number().required()
   };

   const validate = Joi.validate(ctx.request.body, schema);

   if(validate.error) {
       ctx.status = 400;
       ctx.body = validate.error;
       return;
   }

   const { _id } = ctx.request.body;

   try {
       const post = await Post.deletePost({_id});

       ctx.body = {
           delete: true
       };
   } catch (e) {
       ctx.throw(e, 500);
   }
};

exports.loadPost = async (ctx) => {
    // 스키마 검사
    const schema = {
        _id: Joi.number().required()
   };

   const validate = Joi.validate(ctx.request.body, schema);

   if(validate.error) {
       ctx.status = 400;
       ctx.body = validate.error;
       return;
   }

   const { _id } = ctx.request.body;

    try {
        const data = await Post.find({_id : _id});
 
        ctx.body = data
    } catch (e) {
        ctx.throw(e, 500);
    }
 };

exports.loadPostList = async (ctx) => {
   try {
       const data = await Post.find().sort({'postedAt':-1});

       ctx.body = data
   } catch (e) {
       ctx.throw(e, 500);
   }
};