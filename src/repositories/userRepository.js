const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {

    constructor() { }

    async findAll() {
        return await User.find();

    }

    async findById(id) {
        return await User.findById(id);
    }

    async save(user) {
        const saltRounds= 10;
        user.password = await bcrypt.hash(user.password, saltRounds);

        return await User.create(user);

    }

    async update(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true })
    }

    async remove(id) {
        return await User.findByIdAndRemove(id);
    }

}

module.exports = UserRepository;