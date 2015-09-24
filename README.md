![build status](https://travis-ci.org/Trustworthy-Hair/partyof4.svg)

# Party Of 4 

A social dining app where you can find open seats at nearby restaurants. Meet new people & eat great food!

## Team

  - Warren Wong ([@wrrnwng](https://github.com/wrrnwng)) 
  - Shelley Wang ([@shelleywang](https://github.com/shelleywang))
  - Nicolas Toscano ([@ntoscano](https://github.com/ntoscano))
  - Brandon J Lewis ([@bjlewis88](https://github.com/bjlewis88))

## Table of Contents

1. [Team](#team)
1. [General](#general)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running the server](#running-the-server)
    1. [Roadmap](#roadmap)
1. [Contributing](#contributing)


## General

PartyOf4 is a social dining app combining meeting new people with eating at great restaurants. We use the Foursquare API to supply a list of nearby venues to users so they can create and join events where they can grab a bite with others. 

This repo is for running the server, and you can see the source for our native iOS app (built in React Native) [here](https://github.com/Trustworthy-Hair/partyof4mobile).

## Usage

Please feel free to contribute to the project or submit a bug or feature request as an issue.

## Requirements

- Node 0.10.x
- PostgreSQL
- Foursquare API key (as environment variables or hardcoded into server/config.js)

## Development

Please checkout our internal API documentation [here](https://github.com/Trustworthy-Hair/partyof4/tree/master/server).

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Running the server

From within the root directory: 

```sh
grunt build
```

You can also run tests with 'grunt test'.

### Roadmap

View the project roadmap [here](https://waffle.io/Trustworthy-Hair/partyof4)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
