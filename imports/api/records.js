import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Records = new Mongo.Collection('records');

Meteor.methods ({
    'records.insert' (eitrecord) {

        //Ensure user is logged in
        if(! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Records.insert ({
            firstName: eitrecord.firstName,
            lastName: eitrecord.lastName,
            gender: eitrecord.gender,
            dob: eitrecord.dob,
            createdAt: new Date(),
            // owner: Meteor.userId(),
            // username: Meteor.user().username
        });
    },
    'records.remove'(recordId) {
        check(recordId, String);
        const record = Records.findOne(recordId);
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
     
        Records.remove(recordId);
      },
      'records.update'(recordId, eitrecord) {
        check(recordId, String);
        // check(eitrecord, Array);

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
    
        Records.update(recordId, eitrecord);
      },
})
