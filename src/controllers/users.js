const express = require('express');
const User = require('../models/user')
const logger = require('../loaders/logger');

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
        let user = req.body;
        ///1-->user._id = id;
        ///1-->await User.updateOne(user);

        logger.info('Query Antes: ' + JSON.stringify(req.body));

        const userUpdated = await User.findByIdAndUpdate(id, user, { new: true });

        logger.info('Query Despues: ' + JSON.stringify(userUpdated));
        const result = {
            message: 'User updated',
            userUpdated
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
        //###const user = await User.findById(id);

        await User.findByIdAndRemove(id);
        //###await user.remove();

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