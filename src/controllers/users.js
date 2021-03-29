const express = require('express');
const Iridium =require('iridium');
const User = require('../models/user')
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createUser = async (req, res, next) => {
    try {
        let user = req.body;
        user = await User.create(user);

        const result = {
            message: 'User created',
            user
        }
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        ///2###let user = await User.findById(id);
        let user = req.body;
        ///1-->user._id = id;

        ///2###await User.findOneAndUpdate(user);
        ///1-->await User.updateOne(user);

        user._id = await Iridium.toObjectID(user._id);
        await this.model.update(user._id, user, { multi: false });


        const result = {
            message: 'User updated',
            user
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updatePartialUser = (req, res) => {

    const result = {
        message: 'User updated with patch'
    }
    res.json(result);

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        await user.remove();

        //const id = req.params.id;
        const result = {
            message: `User with id: ${id} deleted`
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}