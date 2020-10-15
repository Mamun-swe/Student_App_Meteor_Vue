import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Subjects = new Mongo.Collection('subjects')

Meteor.methods({
    createSubject(subject) {
        return Subjects.insert(subject);
    }
})