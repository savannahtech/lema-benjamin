"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserTemplate = exports.selectCountOfUsersTemplate = exports.selectUsersTemplate = void 0;
exports.selectUsersTemplate = `
SELECT *
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id
ORDER BY name
LIMIT ?, ?
`;
exports.selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
exports.selectUserTemplate = `
SELECT *
FROM users
WHERE users.id = ?
`;
