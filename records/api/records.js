import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Records = new Mongo.Collection('records');

Meteor.methods ({
    'eit.insert' (eitdata) {
        check(eitdata, String);

        //Ensure user is logged in
        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Records.insert ({
            eitdata,
            createdAt: new Date(),
        })
    }
})
