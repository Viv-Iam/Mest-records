import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Records = new Mongo.Collection('records');

Meteor.methods ({
    'records.insert' (lastName) {
        // check(firstName, String);

        //Ensure user is logged in
        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Records.insert ({
            // firstName,
            lastName,
            // gender: string,
            // dob: string,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'records.remove'(taskId) {
        check(taskId, String);
     
        Records.remove(taskId);
      },
      'records.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
     
        Records.update(taskId, { $set: { checked: setChecked } });
      },
})
