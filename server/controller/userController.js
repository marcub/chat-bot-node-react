const { default: mongoose } = require("mongoose");
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

        const userObj = user.toObject();
        delete userObj.password;

        return response.json({
            user: userObj,
            status: true
        })
    } catch (ex) {
        next(ex);
    }
}

module.exports.login = async (request, response, next) => {

    try {
        const {username, password} = request.body;

        const user = await User.findOne({ username });
        if (!user) {
            return response.json({
                msg: "Username ou senha incorretos.",
                status: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.json({
                msg: "Username ou senha incorretos.",
                status: false
            })
        }

        const userObj = user.toObject();
        delete userObj.password;

        return response.json({
            user: userObj,
            status: true
        })
    } catch (ex) {
        next(ex);
    }
}

module.exports.setAvatar = async (request, response, next) => {

    try {
        const userId = request.params.id;
        const avatarImage = request.body.image;

        if (!mongoose.isValidObjectId(userId)) {
            return response.status(400).json({
                error: "Usuário não é válido"
            })
        }

        if (!avatarImage || typeof avatarImage !== 'string') {
            return response.status(400).json({ error: 'Imagem do avatar é obrigatória e deve ser uma string' });
        }

        const userData = await User.findByIdAndUpdate(
            userId, 
            {
                isAvatarImageSet: true,
                avatarImage
            },
            {
                new: true
            }
        )

        if (!userData) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        return response.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (ex) {

        if (ex.name === 'ValidationError') {
            return response.status(400).json({ error: ex.message });
        }

        next(ex);
    }
}