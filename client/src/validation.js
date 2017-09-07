import * as Auth from 'services/auth';
import validator from 'validator';

var CUSTOM_RULES = {
  'username_unique': {
    getMessage: field => 'Username exists',
    validate: (value, args) => {
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
  'email_unique': {
    getMessage: field => 'Email exists',
    validate: (value, args) => {
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
};

const X_RULES = {
  'x-username-form': 'required|alpha_num',
  'x-username': 'x-username-form|username_unique',
  'x-email': 'required|email|email_unique'
};

export function installCustomRules(validator) {
  for(var ruleKey in CUSTOM_RULES) {
    validator.extend(ruleKey, CUSTOM_RULES[ruleKey]);
  }
}

export function resolveComplexRule(rule) {
  function findNext() {
    for(var r in X_RULES) {
      if(rule.indexOf(r) !== -1) {
        return r;
      }
    }
    return undefined;
  }
  while(true) {
    var r = findNext();
    if(r === undefined) {
      break;
    }
    rule = rule.replace(r, X_RULES[r]);
  }
  return rule;
}



