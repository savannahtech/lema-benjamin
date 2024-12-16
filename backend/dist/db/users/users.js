"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.getUsersCount = void 0;
const connection_1 = require("../connection");
const query_templates_1 = require("./query-templates");
const getUsersCount = () => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectCountOfUsersTemplate, (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.count);
    });
});
exports.getUsersCount = getUsersCount;
const getUsers = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersTemplate, [pageNumber * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        results.forEach((user) => {
            if (user.street && user.city && user.state && user.zipcode) {
                user.address = `${user.street}, ${user.city}, ${user.state}, ${user.zipcode}`;
            }
            else {
                user.address = "No address provided";
            }
        });
        resolve(results);
    });
});
exports.getUsers = getUsers;
const getUserById = (id) => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectUserTemplate, id, (error, result) => {
        if (error) {
            reject(error);
        }
        if (!result) {
            resolve(null);
            return null;
        }
        resolve(result);
    });
});
exports.getUserById = getUserById;
