# Jami
Jonkinlainen Autorisaation Mankeli Iam:eille

## Usage
e.g. `POST /`
```json
{
  "userId": "hy-hlo-12345678",
  "iamGroups": [
    "hy-employees",
    "grp-toska"
  ]
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
