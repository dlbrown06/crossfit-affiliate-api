"use strict";

module.exports = (sequelize, DataTypes) => {
  const { UUID, UUIDV4, TEXT, JSONB, DATE, NOW } = DataTypes;

  const Affiliate = sequelize.define(
    "affiliate",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      name: {
        type: TEXT,
        unique: true,
        allowNull: false
      },
      meta: {
        type: JSONB,
        unique: true,
        allowNull: false
      },
      created_on: {
        type: DATE,
        defaultValue: NOW
      },
      created_by: {
        type: TEXT,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    },
    sequelize
  );

  return Affiliate;
};
