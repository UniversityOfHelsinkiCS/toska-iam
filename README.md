[![Release to staging](https://github.com/UniversityOfHelsinkiCS/jami/actions/workflows/staging.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/jami/actions/workflows/staging.yml)

# Jami

Jämpti autorisaatio mankeli IAM:eille

## Running locally

```
npm start
```

## API

e.g. `POST /`

```json
{
  "userId": "hy-hlo-12345678",
  "iamGroups": ["hy-employees", "grp-toska"]
}
```

Response

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

### Other routes

`GET` `/ping`, `/access-to-all`, `/organisation-data`, `/all-access`, `/iam-groups`, `/:userId`

`POST` `user-organisations`
