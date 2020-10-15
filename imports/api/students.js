import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export const Students = new Mongo.Collection('students')

Meteor.methods({
    // create students
    createStudent(student) {
        return Students.insert(student);
    }
})