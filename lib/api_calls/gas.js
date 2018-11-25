const gas = require('express').Router()
const { executeSP } = require('../database');
const {logAPICall} = require('../logging');

module.exports = gas;