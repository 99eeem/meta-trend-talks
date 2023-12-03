type OriginResponseCallback<TResult = any> = (error?: Error | string | null, result?: TResult) => void;
type OriginResponseCloudFrontEvent = {
    Records: [
        {
            cf: {
                response: {
                    headers: {
                        'x-robots-tag': [
                            {
                                key: string,
                                value: string
                            }
                        ]
                    };
                }
            }
        }
    ]
}


exports.handler = (event: OriginResponseCloudFrontEvent, context: {}, callback: OriginResponseCallback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    headers['x-robots-tag'] = [
        {
            key: 'X-Robots-Tag',
            value: 'noindex'
        }
    ];
    callback(null, response);
}
