#This example uses Python 2.7 and the python-request library.

from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json, os

def handler(event, context):
    try:
        CMC_API_KEY = os.environ['CMC_API_KEY']
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
        params = {
        'start':'1',
        'limit':'10',
        'convert':'JPY'
        }
        headers = {
            'Accepts': 'application/json',
            'X-CMC_PRO_API_KEY': CMC_API_KEY,
        }

        session = Session()
        session.headers.update(headers)
        response = session.get(url, params=params)
        data = json.loads(response.text)
        ceypto_list = []
        for crypt in data["data"]:
            ceypto_list.append({
                "name": crypt["symbol"],
                "price": round(float(crypt["quote"]["JPY"]["price"]), 2),
                "persent_change_24h": round(float(crypt["quote"]["JPY"]["percent_change_24h"]), 2),
            })
        return {
            'statusCode': 200,
            'body': json.dumps(ceypto_list, default=str)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Internal Server Error: {str(e)}')
        }