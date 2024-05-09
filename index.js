#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
console.log(chalk.blueBright.bold("\n\t\t        Welcome to codewithYusra - Student_Management_Project\n"));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
class student {
    id;
    name;
    courseEnrolled;
    fessAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.fessAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt([
        {
            type: "list",
            name: "ans",
            message: "Please Select an Option\n",
            choices: ["Enroll a student", "Show student status"]
        }
    ]);
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt([
            {
                type: "input",
                name: "ans",
                message: "Please Enter your name:"
            }
        ]);
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log(chalk.bold.green("\n\tYour account has been created"));
                console.log(chalk.bold.green `\nWelcome,${trimmedStudentName}!`);
                let cource = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["IT", "English", "cooking"]
                });
                let courceFees = 0;
                switch (cource.ans) {
                    case "IT":
                        courceFees = 5000;
                        break;
                    case "English":
                        courceFees = 500;
                        break;
                    case "cooking":
                        courceFees = 200;
                        break;
                }
                let courceConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this cource"
                });
                if (courceConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [cource.ans], courceFees);
                    students.push(Student);
                    console.log(chalk.bold.green("\nYou have enrolled in this course\n"));
                }
            }
            else {
                console.log(chalk.bold.red("invalid Name"));
            }
        }
        else {
            console.log(chalk.bold.red("This name is already exists"));
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please Select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            console.log("\nStudend Information");
            console.log(foundStudent);
            console.log(`\n`);
        }
        else {
            console.log(chalk.bold.red("Recoord is empty"));
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
