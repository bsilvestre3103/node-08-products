const express = require('express');
const userService = require('../services/userService');
const logger = require('../loaders/logger');
const { json } = require('express');
const Success = require('../handlers/successHandler');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        res.json(new Success(users));
    } catch (err) {
        next(err);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getById = async (req, res, next) => {
    try {

        const user = await userService.findById(req.params.id);
        return res.json(new Success(user));
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

        //logger.info('Usuario a crear: ' + JSON.stringify(user));
        user = await userService.save(user);

        res.status(201).json(new Success(user));
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

        const userUpdated = await userService.update(id, user);

        res.json(new Success(userUpdated));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.remove(id);

        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    deleteUser
}