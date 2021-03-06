const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const newUserData = await User.findOne({ where: { username: req.body.username } });

    if (!newUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    const validPassword = await newUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: newUserData, message: 'You are logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;