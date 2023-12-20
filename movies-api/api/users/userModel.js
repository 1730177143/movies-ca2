import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    playlist: [{ type: Number }],
    favourites: [{ type: Number }],
    follows: [{ type: Number }]
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
UserSchema.path("password").validate(passwordValidator,'Invalid password');
UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
  }
  UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  };
  UserSchema.pre('save', async function(next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified('password') || this.isNew) {
      try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (error) {
       next(error);
    }
  
    } else {
        next();
    }
  });
// 添加电影到播放列表
UserSchema.methods.addToPlaylist = async function(movieId) {
    if (!this.playlist.includes(movieId)) {
        this.playlist.push(movieId);
        await this.save();
    }
};

// 从播放列表中删除电影
UserSchema.methods.removeFromPlaylist = async function(movieId) {
    const index = this.playlist.indexOf(movieId);
    if (index > -1) {
        this.playlist.splice(index, 1);
        await this.save();
    }
};

// 添加电影到收藏夹
UserSchema.methods.addToFavourites = async function(movieId) {
    if (!this.favourites.includes(movieId)) {
        this.favourites.push(movieId);
        await this.save();
    }
};

// 从收藏夹中删除电影
UserSchema.methods.removeFromFavourites = async function(movieId) {
    const index = this.favourites.indexOf(movieId);
    if (index > -1) {
        this.favourites.splice(index, 1);
        await this.save();
    }
};

// 关注人物
UserSchema.methods.followPerson = async function(personId) {
    if (!this.follows.includes(personId)) {
        this.follows.push(personId);
        await this.save();
    }
};

// 取消关注人物
UserSchema.methods.unfollowPerson = async function(personId) {
    const index = this.follows.indexOf(personId);
    if (index > -1) {
        this.follows.splice(index, 1);
        await this.save();
    }
};


export default mongoose.model('User', UserSchema);