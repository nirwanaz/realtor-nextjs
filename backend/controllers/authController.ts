import UserModel from "../models/user.model";

export const registerUser = async (req: any, res: any) => {
    const { fullname, email, password } = req.body;

    const user = await UserModel.create({
        fullname,
        email,
        password
    });

    res.status(201).json({
        user,
    })
};