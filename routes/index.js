module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'hello index!'});
  });
  app.use('/api/consumers',require('./user/consumers'));
  app.use('/api/product', require('./product/products'));
};
