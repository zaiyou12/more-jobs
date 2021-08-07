# Morejobs get Articles

## Deploy

```bash
chalice deploy --profile morejobs
```

## Test

```bash
export API_URL=https://iczq7cp2rb.execute-api.ap-northeast-2.amazonaws.com/api
```

```bash
http GET ${API_URL}/articles start==2021-07-31
http GET ${API_URL}/articles work_type==freelance start==2021-07-31
```
