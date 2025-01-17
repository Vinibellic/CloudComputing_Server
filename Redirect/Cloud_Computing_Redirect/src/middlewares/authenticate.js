module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token === process.env.TOKEN) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
