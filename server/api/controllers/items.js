const itemsModel = require('../../models/Items');

module.exports = {
  async get(req, res) {
    res.json({
      status: 200,
      data: await itemsModel.find({})
    });
  },
  async set(req, res) {
    const itemName = req.body.itemName;
    const item = await itemsModel.findOne({ itemName });

    if (item) {
      return res.json({
        status: 200,
        message: 'Item is already added'
      });
    }

    await itemsModel.create({ itemName });
    res.json({
      status: 200,
      message: 'Item is added'
    });
  }
};
