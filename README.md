# urlcollector
[![Build Status](https://travis-ci.org/JhymerMartinez/urlcollector.svg?branch=master)](https://travis-ci.org/JhymerMartinez/urlcollector)
[![Dependency Status](https://david-dm.org/jhymermartinez/urlcollector.svg)](https://david-dm.org/jhymermartinez/urlcollector)
[![Code Climate](https://codeclimate.com/github/JhymerMartinez/urlcollector/badges/gpa.svg)](https://codeclimate.com/github/JhymerMartinez/urlcollector)

## Start app
```
> grunt start
```

## Show logs
```
> grunt logs
```

## Start mongo-db
```
> mongod
```

## Debug mode

Root folder:

```
> grunt start
> node-inspector
```

Tested with:

```
> node-version: v0.12.9
> node-inspector version: 0.12.8
```
Fix Node-inspector bug:
```
/usr/local/lib/node_modules/node-inspector/lib/InjectorClient.js:111
      cb(error, NM[0].ref);
                     ^
TypeError: Cannot read property 'ref' of undefined
```
PR: [https://github.com/node-inspector/node-inspector/pull/914/files](https://github.com/node-inspector/node-inspector/pull/914/files)

## All node versions:

https://nodejs.org/en/download/releases/
