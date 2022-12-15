<!--
Check out our GitHub how-to here:
https://docs.google.com/document/d/1HnAHpLu3CbsRqFpOZZYR3tL1mvaLMGY_ys_CxUCjxrU/edit#

Delete any sections below that aren't relevant to your PR!
-->
Description
-----------


Questions for Reviewers
-----------------------


Related Jira Issues
-------------------


Related Pull Requests
---------------------


Feature Flags
-------------


Extra Deployment Steps
----------------------


Testing Steps
-------------


Screenshots
-----------


Checklist
---------
<!--
Either check or delete any of the items below that aren't pertinent to your PR!
Don't leave them unchecked, as it will show in GitHub that you have remaining
uncompleted tasks. Don't forget to fill out the risk assessment on your JIRA
ticket!
-->
- [ ] Have you linked a JIRA issue?
- [ ] Have you requested a review from an analytics team member ([trialspark/analytics](https://github.com/orgs/trialspark/teams/analytics)) if you're:
  - Modifying or deleting an existing column?
  - Changing how an existing column gets used in the product?
- [ ] Are you writing a migration?
  - [ ] If you are deleting columns/tables, have you split it out over 2 PRs?
  - [ ] Is there a plan to test this migration in all of our environments (staging, production, validation)?
  - [ ] If it involves locking multiple tables or high-volume tables, have you added trialspark/platform as a reviewer?
- [ ] Are you adding an NPM dependency?
  - [ ] If you are, have you checked it at [npms](https://npms.io/) to make sure it's high quality?
  - [ ] Have you checked if it has any known vulnerability issues at [synk.io](https://snyk.io/advisor/)?
