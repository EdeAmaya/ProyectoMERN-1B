const logoutController =  {};

logoutController.logout = (req, res) => {
    res.clearCookie("authToken");
    
    return res.json({message:"User logged out"})
}

export default logoutController;