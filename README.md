![build status](https://travis-ci.org/Trustworthy-Hair/partyof4.svg)

# Party Of 4 (Working Title)

A social app where you can find open seats at nearby restaurants. Meet new people & eat great food!

## Team

  - Warren Wong ([@wrrnwng](https://github.com/wrrnwng)) 
  - Shelley Wang ([@shelleywang](https://github.com/shelleywang))
  - Nick Toscano ([@ntoscano](https://github.com/ntoscano))
  - Brandon J Lewis ([@bjlewis88](https://github.com/bjlewis88))

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Seeding Test Data](#seeding-test-data)
    1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

## Requirements

- Node 0.10.x

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Seeding Test Data


From within the root directory:

```sh
node TestData/makeData.js [drop existing tables (true/false)] [# of users] [# of events]
```

Optional arguments are for whether to drop all tables prior to seeding, the number of users and events to create.

### Roadmap

View the project roadmap [here](https://waffle.io/Trustworthy-Hair/partyof4)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.