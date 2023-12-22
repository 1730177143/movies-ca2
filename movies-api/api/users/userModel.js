import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    playlist: [{type: Number}],
    favourites: [{type: Number}],
    follows: [{type: Number}]
});

const emailValidator = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
UserSchema.path("email").validate(emailValidator, 'Invalid email format');

const passwordValidator = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
}
UserSchema.path("password").validate(passwordValidator, 'Invalid password');
UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
}
UserSchema.statics.findByUserName = function (username) {
    return this.findOne({username: username});
};
UserSchema.pre('save', async function (next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, saltRounds);
            next();
        } catch (error) {
            next(error);
        }

    } else {
        next();
    }
});

export default mongoose.model('User', UserSchema);