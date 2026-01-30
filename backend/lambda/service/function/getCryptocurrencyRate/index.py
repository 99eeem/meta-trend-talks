import json, os
from requests import Session

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Api-Key,X-Amz-Date,X-Amz-Security-Token,X-Amz-User-Agent",
}

def handler(event, context):
    try:
        CMC_API_KEY = os.environ['CMC_API_KEY']
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
        params = {'start':'1','limit':'10','convert':'JPY'}
        headers = {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': CMC_API_KEY}

        session = Session()
        session.headers.update(headers)
        response = session.get(url, params=params)
        data = json.loads(response.text)

        crypto_list = []
        for crypt in data["data"]:
            crypto_list.append({
                "name": crypt["symbol"],
                "price": round(float(crypt["quote"]["JPY"]["price"]), 2),
                "persent_change_24h": round(float(crypt["quote"]["JPY"]["percent_change_24h"]), 2),
            })

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(crypto_list, default=str),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"message": f"Internal Server Error: {str(e)}"}),
        }
