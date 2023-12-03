type CloudFrontEvent = {
    Records: [{
        cf: {
            request: {
                httpVersion: string,
                uri: string
            }
        }
    }]
}

export const handler = async (event: CloudFrontEvent) => {
    const { request } = event.Records[0].cf;

    // "/"へのリクエストはそのまま処理する
    if (request.uri === "/") {
        return request;
    }

    // ファイル名("/" で区切られたパスの最後)を取得
    const filename = request.uri.split("/").pop();

    if (!filename) {
        return {
            status: "302",
            statusDescription: "Found",
            headers: {
                location: [
                    {
                        key: "Location",
                        value: request.uri.replace(/\/+$/, "") || "/",
                    },
                ],
            },
        };
    } else if (!filename.includes(".")) {
        // ファイル名に拡張子がついていない場合、 ".html" をつける
        request.uri = request.uri.concat(".html");
    }

    return request;
};