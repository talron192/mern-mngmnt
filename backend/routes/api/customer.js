const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');

// Item Model
const Customer = require('../../customer.model');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Customer.find()
    .sort({ date: -1 })
    .then((Customer) => {
      res.json(Customer);
    });
});

// // @route   POST api/items
// // @desc    Create An Item
// // @access  Private
// router.post('/', auth, (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   newItem.save().then(item => res.json(item));
// });

// // @route   DELETE api/items/:id
// // @desc    Delete A Item
// // @access  Private
// router.delete('/:id', auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;