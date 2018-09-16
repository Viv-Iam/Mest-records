import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Records = new Mongo.Collection('records');

Meteor.methods ({
    'records.insert' (firstName, lastName, gender, dob) {
        // check(firstName, String);

        //Ensure user is logged in
        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Records.insert ({
            firstName,
            lastName,
            gender,
            dob,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'records.remove'(recordId) {
        check(recordId, String);
     
        Records.remove(recordId);
      },
      'records.setChecked'(recordId, setChecked) {
        check(recordId, String);
        check(setChecked, Boolean);
     
        Records.update(recordId, { $set: { checked: setChecked } });
      },
})
