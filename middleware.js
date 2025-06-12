module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth/login') {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    const db = require('./db.json');
    const user = db.auth.login;
    console.log('Stored user:', user);

    if (email === user.email && password === user.password) {
      console.log('Login successful');
      res.json({
        token: user.token,
        user: user.user
      });
    } else {
      console.log('Login failed - Invalid credentials');
      res.status(401).json({
        message: 'Invalid email or password'
      });
    }
  } else if (req.method === 'GET' && req.path === '/auth/login') {
    res.status(405).json({
      message: 'Method not allowed. Use POST instead.'
    });
  } else {
    next();
  }
}; 