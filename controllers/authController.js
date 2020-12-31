signup_get = (req, res) => {
    res.render('signup', { title: 'Signup' });
};

signup_post = (req, res) => {
    console.log('User signed up');
};

login_get = (req, res) => {
    res.render('login', { title: 'Login' });
};

login_post = (req, res) => {
    console.log('User logged in');
};

logout_get = (req, res) => {
    console.log('User logged out');
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
};