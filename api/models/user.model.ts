import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
    avatar: {
        type: String,
        default: 'https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png',
        
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;