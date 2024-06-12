const db = require("../config/database");
const bcrypt = require("bcrypt");

const Employees = db.sequelize.define("employees", {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  pancardNo: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  aadharNo: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  uanNo: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  workLocation: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  pfNo: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: db.Sequelize.DataTypes.ENUM("male", "female"),
    allowNull: false,
  },
  departmentId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "departments",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  designationId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "designations",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  reportTo: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "employees",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  profilePicture: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  currentAddress: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  permanentAddress: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  dateOfJoining: {
    type: db.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  phoneNumber: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  permanentPasswordSet: {
    type: db.Sequelize.DataTypes.STRING,
    validate: {
      customValidator: (value) => {
        const enums = ["1", "0"];
        if (!enums.includes(value)) {
          throw new Error("not a valid option");
        }
      },
    },
  },
  password: {
    type: db.Sequelize.DataTypes.STRING,
    allowNull: true,
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  roleId: {
    type: db.Sequelize.DataTypes.UUID,
    references: {
      model: "roles",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  isActive: {
    type: db.Sequelize.DataTypes.STRING,
    validate: {
      customValidator: (value) => {
        const enums = ["1", "0"];
        if (!enums.includes(value)) {
          throw new Error("not a valid option");
        }
      },
    },
  },
  createdAt: {
    allowNull: false,
    type: db.Sequelize.DataTypes.DATE,
    defaultValue: db.Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: db.Sequelize.DataTypes.DATE,
    defaultValue: db.Sequelize.NOW,
  },
});

Employees.associate = (models) => {
  Employees.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
  Employees.belongsTo(models.Employees, {
    foreignKey: "reportTo",
    as: "manager",
  });
  Employees.belongsTo(models.Department, {
    foreignKey: "departmentId",
    as: "department",
  });
  Employees.belongsTo(models.Designation, {
    foreignKey: "designationId",
    as: "designation",
  });

  Employees.hasMany(models.Employees, {
    foreignKey: "reportTo",
    as: "subordinates",
  });
  Employees.hasOne(models.EmployeeDocuments);

  Employees.hasMany(models.ExperienceDetails, {
    foreignKey: "EmployeeId",
  });
};


module.exports = Employees;
