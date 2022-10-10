# bas tutorial

a demo how to change free gas address admin.
you need to fill the parameters in the code.

```shell
# first make a proposal use validator owner
npx hardhat run demos/proposal.js

# vote by validator owner
npx hardhat run demos/vote.js

# after the vote period, if the status is successed, anyone can execute it.
npx hardhat run demos/execute.js
```
