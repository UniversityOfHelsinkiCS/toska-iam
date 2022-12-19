# Jami
Jonkinlainen Autorisaation Mankeli Iam:eille

## Usage
e.g. POST
```json
{
  "userId": "hy-hlo-12345678",
  "iamGroups": [
    "hy-employees",
    "grp-toska"
  ],
  "noLogging": false
}
```
Response 
```json
{
  "500-M009": {
    "read": true,
    "write": true,
    "admin": true
  }
}
```
