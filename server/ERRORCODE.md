## Error Code


REST API operations for kov-blog server return standard HTTP status codes, as defined in the [HTTP/1.1 Status Code Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

### JSON FORMAT
When error happens, the response body will contain 2 fileds: `error` and `message`.
In some occasions, there will be another fields like `parameter-name`, `parameter-value` and `reason`.


HTTP-STATUS: 400

RESPONSE-BODY:
```javascript
{
    error: 'ValidationError',
    message: 'Value for one of the parameters in request is invalid.',
    parameter-name: 'excerpt',
    parameter-value: '',
    reason: 'The excerpt should not be an empty string.'
}
```

### router: article

| Error code | HTTP status code | User message |
| ---------- | ---------------- | ------------ |
| 
