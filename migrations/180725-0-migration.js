"use strict";

module.exports = {
  up: function(queryInterface, DataTypes) {
    const { DATE, NOW, UUID, UUIDV4, JSON, ENUM } = DataTypes;

    return queryInterface
      .createTable(
        "affiliate",
        {
          id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true
          },
          report: {
            type: ENUM("item"),
            allowNull: false,
            default: "item"
          },
          data: {
            type: JSON,
            allowNull: false
          },
          published_on: {
            type: DATE,
            allowNull: false
          },
          created_on: {
            type: DATE,
            defaultValue: NOW
          }
        },
        {
          freezeTableName: true,
          timestamps: false,
          underscored: true
        }
      )
      .then(() => {
        // create indexes
        return Promise.all([
          queryInterface.addIndex("audit", ["published_on"], {
            indexName: "audit_published_on_idx"
          })
        ]);
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("audit");
  }
};
