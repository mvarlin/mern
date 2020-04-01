import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

export const signUp = (req, res) => {
  let person = new Person(req.body);
  person.save((err, savedPerson) => {
    if (err) {
      res.send(err);
    }
    res.json(savedPerson);
  });
};

export const login = async (req, res) => {
  const person = await Person.findOne({ email: req.body.email });
  if (!person) {
    return res.send('this user does not exist');
  }

  const pwd = req.body.password;
  bcrypt.compare(pwd, person.password, function (error, success) {
    if (success) {
      const payload = {
        exp: moment().add(1, 'hour').unix(),
        iat: moment().unix(),
        iss: person.id
      };
      let token = jwt.encode(payload, process.env.TOKEN_SECRET);
      return res.json({
        firstName: person.firstName,
        lastName: person.lastName,
        token: `Bearer ${token}`,
        expiration: moment().add(1, 'hour').format('YYY-MM-DD HH:mm')
      });
    }
    return res.send('this email and password combination is incorrect');
  });
};

export const all = async (req, res) => {
  const people = await Person.find();
  res.json(people);
};
