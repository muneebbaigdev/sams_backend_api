const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port = process.env.PORT || 8000;
const ip = require('./ipaddress')


//analysis
app.use('/view-attendance', require('./routes/analysis/viewAttendance'))
app.use('/today-ict-strength', require('./routes/analysis/todayICTStrength'))
app.use('/today-ict-present', require('./routes/analysis/todayIctPresent'))
app.use('/today-ict-absent', require('./routes/analysis/todayIctAbsent'))
app.use('/today-ict-leave', require('./routes/analysis/todayIctLeave'))
app.use('/today-ict-lates', require('./routes/analysis/todayIctLate'))
app.use('/dashboard-charts', require('./routes/analysis/dashboardCharts'))
app.use('/dashboard-chart-expanded', require('./routes/analysis/dashboardChartExpanded'))
app.use('/student-is-listing', require('./routes/analysis/studentIslisting'))
app.use('/get-permissions', require('./routes/analysis/getPermissions'))
app.use('/get-special-sections', require('./routes/analysis/getSpecialSections'))
//classes
app.use('/get-classes', require('./routes/classes/getClasses'))
app.use('/assign-classes', require('./routes/classes/assignClasses'))
app.use('/get-assigned-classes', require('./routes/classes/getAssignedClasses'))
app.use('/delete-class-permission', require('./routes/classes/deleteClassPermissions'))
app.use('/get-special-classes', require('./routes/classes/getSpecialClasses'))
app.use('/add-new-class', require('./routes/classes/addNewClass'))
app.use('/delete-that-class', require('./routes/classes/deleteThatClass'))
//departments
app.use('/add-new-department', require('./routes/departments/addNewDepartment'))
app.use('/delete-that-department', require('./routes/departments/deleteThatDepartment'))
app.use('/get-departments', require('./routes/departments/getDepartments'))
//fines
app.use('/fines', require('./routes/fines/fines'))
app.use('/allfines', require('./routes/fines/allfines'))
app.use('/classfines', require('./routes/fines/classfines'))
app.use('/detailedfines', require('./routes/fines/detailedfines'))
//logics
app.use('/get-total-days', require('./routes/logics/getTotalDays'))
//logs
app.use('/write-logs', require('./routes/logs/writelogs'))
app.use('/read-logs', require('./routes/logs/readlogs'))
//prefrences
app.use('/add-blocked-date', require('./routes/prefrences/addBlockedDate'))
app.use('/delete-blocked-date', require('./routes/prefrences/deleteBlockedDate'))
app.use('/get-blocked-dates', require('./routes/prefrences/getBlockedDate'))
app.use('/add-session', require('./routes/prefrences/addSession'))
app.use('/delete-session', require('./routes/prefrences/deleteSession'))
app.use('/get-sessions', require('./routes/prefrences/getSession'))
//reports
app.use('/department-report', require('./routes/reports/departmentReport'))
app.use('/class-report', require('./routes/reports/classReport'))
app.use('/student-report', require('./routes/reports/studentReport'))
//sections
app.use('/get-sections', require('./routes/sections/getSections'))
app.use('/add-new-section', require('./routes/sections/addNewSections'))
app.use('/delete-that-section', require('./routes/sections/deleteThatSection'))
//shifts
app.use('/add-new-shift', require('./routes/shifts/addNewShift'))
app.use('/delete-that-shift', require('./routes/shifts/deleteThatShift'))
app.use('/get-shifts', require('./routes/shifts/getShifts'))
//students
app.use('/add-student', require('./routes/students/addStudent'))
app.use('/get-students-list', require('./routes/students/getStudentsList'))
app.use('/delete-student', require('./routes/students/deleteStudent'))
app.use('/get-student-info', require('./routes/students/getStudentInfo'))
app.use('/update-student', require('./routes/students/updateStudent'))
app.use('/mark-attendance', require('./routes/students/markAttendance'))
app.use('/get-student-attendance', require('./routes/students/getStudentAttendance'))
app.use('/promote-students', require('./routes/students/promoteStudents'))
//users
app.use('/get-users-list', require('./routes/users/getUsersList'))
app.use('/delete-user', require('./routes/users/deleteUser'))
app.use('/get-users', require('./routes/users/getUsers'))
app.use('/add-user', require('./routes/users/addUser'))
app.use('/modify-user', require('./routes/users/modifyUser'))
app.use('/match-user', require('./routes/users/matchUser'))
//warnings
app.use('/get-warning-letters', require('./routes/warnings/getWarningLetters'))

// setup server

app.get('/', async (req, res) => {
  res.send('Hello This is SAMS.')
})

app.listen(port, ip, function () {
  console.log(`Server is listening on ${ip}:${port}`);
});