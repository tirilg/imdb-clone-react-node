const { Model } = require("objection");
const User = require("./User.js");
class MovieLike extends Model {
  static get tableName() {
    return "movieLike";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "movieLike.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = MovieLike;
