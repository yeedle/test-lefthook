##!/bin/bash

if type 'op' > /dev/null; then # make sure 1pass cli is installed
    if ! (op account get > /dev/null 2>&1); then # signin if not signed in
    eval $(op signin);
    fi;
    op item get 'NestJS Service local .env file' --fields notesPlain --format json | jq -r .value > .env2;
    sort --unique --field-separator '=' --key 1,1 --output .env .env2 .env; # merge the two, giving precedence for newer values
    rm .env2;
fi;
