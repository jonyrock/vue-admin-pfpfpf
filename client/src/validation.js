import * as Auth from 'services/auth';
import validator from 'validator';

var RULES = {
  'user.username': {
    getMessage: field => 'Username exists',
    validate: (value, args) => {
      if(value.length === 0) {
        return false;
      }
      if(!validator.isAlphanumeric(value)) {
        return false;
      }
      var id = undefined;
      if(args.length > 0) {
        id = +args[0];
      }
      return Auth
        .validateUsername(value, id)
        .then(() => true)
        .catch(() => false)
    }
  },
  'user.email': {
    getMessage: field => 'Email exists',
    validate: (value, args) => {
      if(value.length === 0) {
        return false;
      }
      if(!validator.isEmail(value)) {
        return false;
      }
      var id = undefined;
      if(args.length > 0) {
        id = +args[0];
      }
      return Auth
        .validateEmail(value, id)
        .then(() => true)
        .catch(() => false)
    }
  }
}

export function installRules(validator) {
  for(var ruleKey in RULES) {
    validator.extend(ruleKey, RULES[ruleKey]);
  }
}



