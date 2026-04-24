import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body; // userId comes from our 'userAuth' middleware

        // Fetch user but don't send the password!
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            userData: {
                firstName: user.firstName,
                lastName: user.lastName,
                isAccountVerified: user.isAccountVerified,
                diabetesType: user.diabetesType
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};