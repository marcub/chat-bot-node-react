const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (request, response, next) => {

    try {
        const {username, email, password} = request.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return response.json({
                msg: "Username já está em uso.",
                status: false
            })
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return response.json({
                msg: "Email já está em uso.",
                status: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        delete user.passwword;

        return response.json({
            user,
            status: true
        })
    } catch (ex) {
        next(ex);
    }
}