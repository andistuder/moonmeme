# Data Info

To process the csv into JavaScript objects, run:

Find
```
^\d*,"([\w\s]*|)",(\d{1,2}),(\d{1,2}),(\d{4})
```
Replace
```
{ name: '$1', dob: '$4-$3-$2'},
```
