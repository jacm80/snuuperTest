'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: { msg: "Phone number invalid." } } },
        phone: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { len: { args: [7, 20], msg: "Phone number invalid, too short." }, isNumeric: { msg: "not a valid phone number." } } },
        password: DataTypes.STRING,
        username: { type: DataTypes.STRING, allowNull: true },
    });
    Model.prototype.comparePassword = async function (pw) {
        if (pw !== this.password) return TE('invalid password');
        return this;
    }
    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };
    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return Model;
};