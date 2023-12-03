type ViewerRequestCallback<TResult = any> = (error?: Error | string | null, result?: TResult) => void;
type ViewerRequestCloudFrontevent = {
    Records: [
        {
            cf: {
                request: {
                    headers: {
                        authorization: [
                            {
                                value: string
                            }
                        ]
                    }
                }
            }
        }
    ]
}

exports.handler = (event: ViewerRequestCloudFrontevent, context: {}, callback: ViewerRequestCallback) => {
    // Get request and request headers
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // Configure authentication
    const authUser = 'iZzd8ncE';
    const authPass = 'M4JWSLFA';

    const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');

    // Require Basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
        const body = 'Unauthorized';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }]
            }
        };
        callback(null, response);
    }
    callback(null, request);
}
