const ExpressServer = require ('./server/expressServer');
const mongoose = require ('mongoose');
const config = require ('../../config');

module.export = async () => {
    await mongoose();
    logger.info ('DB loaded and connected');

    const server = new ExpressServer();
    logger.info ('Express Loaded');



}