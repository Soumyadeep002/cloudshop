const User = require("../models/userModel");

const bcryptjs = require("bcryptjs");

const securePassword = async(password)=>{
    try {
        
        const hashPass = await bcryptjs.hash(password, 10);
        return hashPass;
    } catch (error) {
        res.status(400).send(error.message);
    }

    
}


const registerUser = async (req, res) => {
    try {
        const spass = await securePassword(req.body.password);

        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(200).send({ success: false, msg: "This email already exists" });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: spass,
                type: req.body.type
            });

            const user_data = await user.save();
            res.status(200).send({ success: true, data: user_data });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
};


module.exports = {
    registerUser
}