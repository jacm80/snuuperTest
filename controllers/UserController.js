const User = require('../models').User;
const authService = require('./../helpers/AuthService');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        [err, user] = await to(authService.createUser(body));
        if (err) return ReE(res, err, 422);
        return ReS(res, {
            message: 'Successfully created new user.',
            user: user.toWeb(),
            token: user.getJWT()
        }, 201);
    }
}
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const _id = req.params.id;
    const user = await User.findOne({ where: { id: _id }});
    if (user !== null){
        return ReS(res, { user: user.toWeb() });
    } else {
        return ReE(res, `User not exist with id ${_id}`,404);
    }

}
module.exports.get = get;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const users = await User.findAll({ });
    return ReS(res, { user: users });
}
module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, user;
    const _id = req.params.id;
    const data = req.body;
    user = await User.findOne({ where: { id: _id }});
    [err, user] = await to(user.update(data));
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' + user.email });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    const _id = req.params.id;
    user = await User.findOne({ where: { id: _id } });
    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');
    return ReS(res, { message: 'Deleted User' }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);
    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;