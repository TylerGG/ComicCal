var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	SALTINESS = 10;

var UserSchema = new mongoose.Schema({
	username: { type:String,require:true,index:{unique:true} },
	password: { type:String,require:true },
	api_token: { type:String }
});


UserSchema.methods.generateToken = function() {
	return crypto.createHash('md5').update(this.username + new Date().toString()).digest('hex');
};


/* Before save salt password */
UserSchema.pre('save', function(next) {
	var user = this;
	if(!user.isModified('password')) next();

	bcrypt.genSalt(SALTINESS,function(err,salt) {
		if(err) next(err);

		console.log(user);
		bcrypt.hash(user.password,salt,function(err,hash) {
			if(err) next(err);
			user.password = hash;
			user.api_token = user.generateToken();
			next();
		});
	});
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User',UserSchema);
