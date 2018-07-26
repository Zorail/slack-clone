import bcrypt from 'bcrypt';

import { tryLogin } from '../utils/auth';

import formatErrors from '../utils/formatErrors';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 25) {
          return {
            ok: false,
            errors: [{ path: 'password', message: 'The password needs to be between 5 and 25 characters long' }],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const User = await models.User.create({ ...otherArgs, password: hashedPassword });
        return {
          ok: true,
          user: User,
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatErrors(e, models),
        };
      }
    },
  },
};
