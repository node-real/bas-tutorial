# bas tutorial

a demo how to change free gas address admin.

you need to fill the parameters in the below files:

1. config.js
2. setFreeGasAddressAdmin.js

```shell
# install packages
npm install

# first make a proposal use validator owner
node demos/setFreeGasAddressAdmin.js propose

# vote by validator owner, get proposeId from first step
node demos/setFreeGasAddressAdmin.js vote proposeId

# check state, get proposeId from first step
node demos/setFreeGasAddressAdmin.js state proposeId

# after the vote period, if the status is successed, anyone can execute it.
node demos/setFreeGasAddressAdmin.js execute
```
