const Employees = require("./employee.model");
const Role = require("./role.model");
const Department = require("./department.model");
const Designation = require("./designation.model");
const EmployeeDocuments = require("./employeeDocuments.model");
const ExperienceDetails = require("./experienceDetails.model");
const EmergencyContacts = require("./emergencyContacts.model");
const Permission = require("./permission.model");
const Route = require("./routes.model");
const Attendance = require("./attendance.model");
const BankDetails = require("./bankDetails.model");
const Assets = require("./assets.model");
const EmployeeLogDetails = require("./EmployeeLogDetails.model");
const LeaveMaster = require("./leaveMaster.model");
const LeaveBalance = require("./leaveBalance.model");
const Projects = require('./projects.model')
const WorkLogs = require('./workLog.model')
const LeaveRequest = require("./leaveRequest.model");

module.exports = {
  Employees,
  Role,
  Department,
  Designation,
  EmployeeDocuments,
  ExperienceDetails,
  Permission,
  Route,
  Attendance,
  BankDetails,
  EmergencyContacts,
  Assets,
  EmployeeLogDetails,
  LeaveMaster,
  LeaveBalance,
  Projects,
  WorkLogs,
  LeaveRequest
};
