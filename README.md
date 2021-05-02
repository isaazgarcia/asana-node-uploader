# asana-node-uploader

Script to upload files to an Asana Task.

You can use an .env to put your credentials or send it as an argument to the script.

Example
```
yarn start -f=file.txt -tid=123456 -at=12345
```

Help

```
  -f, --file               File to upload.                              [string]
      --taskId, --tid      Asana Task Id to upload files to.            [string]
      --accessToken, --at  Asana Personal Access Token.                 [string]

```