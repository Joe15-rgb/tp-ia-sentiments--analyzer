const { Model, DataTypes } = require("sequelize");

class MessageAnalyzed extends Model {}

module.exports = (sequelize) => {
  MessageAnalyzed.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      input: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      output: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      score: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "dataMessage",
      paranoid: true,
      underscored: true,
    }
  );

  return MessageAnalyzed;
};
