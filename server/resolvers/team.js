import formatErrors from '../utils/formatErrors';

export default {
  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          erros: formatErrors(e, models),
        };
      }
    },
  },
};
