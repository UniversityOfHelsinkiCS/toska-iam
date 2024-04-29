[![Release to staging](https://github.com/UniversityOfHelsinkiCS/jami/actions/workflows/staging.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/jami/actions/workflows/staging.yml)

# Jami

Jämpti autorisaatio mankeli IAM:eille

## Running locally

Requirements: docker, npm (recommended)

```sh
$ docker compose up
# If this does not work try:
$ npm i
$ npm start
```

Jami API should now be available at http://localhost:3000/. Configure the port for your needs in `docker-compose.yml`.


## API

`POST /`

- Body

```json
{
  "userId": "hy-hlo-12345678",
  "iamGroups": ["hy-employees", "grp-toska"]
}
```

- Response

```json
{
  "500-M009": {
    "read": true,
    "write": true,
    "admin": true
  },
  "T920101": {
    "read": true,
    "write": false,
    "admin": false
  },
  "specialGroup": {
    "superAdmin": true
  }
}
```

`GET /:userId`

- Response

```json
{
  "id": "hy-hlo-12345678",
  "iamGroups": ["hy-employees", "grp-toska"],
}
```

`GET /access-to-all`

- Response

```json
{
  "500-M009": {
    "read": true,
    "write": true,
    "admin": true
  },
  "T920101": {
    "read": true,
    "write": true,
    "admin": true
  },
  // ...
  "specialGroup": {
    "allProgrammes": true
  }
}
```

`GET /organisation-data`

- Response: the FACULTIES object from [./src/organisation/faculties.ts](./src/organisation/faculties.ts)

`GET /all-access`

- Response: all user's iam groups and their computed access rights:

```json
  [
    {
      "id": "hy-hlo-12345678",
      "iamGroups": ["hy-employees", "grp-toska"],
      "500-M009": {
        "read": true,
        "write": true,
        "admin": true
      },
      "T920101": {
        "read": true,
        "write": false,
        "admin": false
      },
      "specialGroup": {
        "superAdmin": true
      }
    },
    // ...
  ]
```

`GET /iam-groups`

- Response: all unique iam groups in Jami DB:

```json
["grp-toska", "hy-employees"]
```

### Other routes

`GET` `/ping`

`POST` `user-organisations`
