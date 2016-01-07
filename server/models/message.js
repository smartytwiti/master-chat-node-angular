module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    //    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket'},
    //createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
        //Socket.emit("msg", {nickname: $rootScope.user.username, message:msg, toRoom: $rootScope.activeRoom});

    var messageSchema = new Schema({
        toRoom: String,
        nickname: String,
        message: String,
        created: Date,
        updated: Date
    });

    /*
    // methods ======================
    userSchema.methods.generateHash = function(password) {
    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    */
    // checking if password is valid
    messageSchema.methods.validPassword = function(password) {
        //	return bcrypt.compareSync(password, this.password);   //warning!!! must be uncommented in the future for security ! Marwen
        return this.password == password;
    };

    messageSchema.pre('save', function(next) {
        now = new Date();
        this.updated = now;


        if (!this.created) {
            this.created = now;
        }
        next();
    });

    return mongoose.model('Message', messageSchema);
};