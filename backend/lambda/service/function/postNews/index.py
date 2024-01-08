import json, sys, os, re
import time
import requests
import tweepy
# from datetime import datetime
# from dateutil import tz

def handler(event, context):
    try:
        body = json.loads(event.get('body'))
        service = body["service"]
        api = body["api"]
        type = body["type"]
        id = body["id"]
        X_API_KEY = os.environ['X_API_KEY']
        X_API_KEY_SECRET = os.environ['X_API_SECRET']
        X_BEARER_TOKEN = os.environ['X_BEARER_TOKEN']
        X_TOKEN = os.environ['X_ACCESS_TOKEN']
        X_TOKEN_SECRET = os.environ['X_ACCESS_TOKEN_SECRET']
        MTT_DOMAIN = os.environ['MTT_DOMAIN']
        CMS_SERVICE_ID = os.environ['CMS_SERVICE_ID']
        
        if service == CMS_SERVICE_ID and api == "news" and type == "new":
            title = body["contents"]["new"]["publishValue"]["title"]
            contents = body["contents"]["new"]["publishValue"]["body"]
            thumbnail_url = body["contents"]["new"]["publishValue"]["thumbnail"]["url"]
            # Download the image locally to /tmp directory
            thumbnail_path = "/tmp/thumbnail.png"
            response = requests.get(thumbnail_url)
            with open(thumbnail_path, "wb") as f:
                f.write(response.content)
        else:
            return {
                'statusCode': 400,
                'body': json.dumps('invalid parameter')
            }
            sys.exit()
        # 概要を取得する
        endMark = "。"
        end_index = contents.find(endMark, 0)
        if end_index != -1:
            content = contents[:end_index + 1]
            regex_p = re.compile(r'^<p>', re.IGNORECASE)
            if regex_p.match(content):
                regex_br = re.compile(r'<br\s*\/?>', re.IGNORECASE)
                content = regex_br.sub('', content)  # <br>タグを削除する
                content = regex_p.sub('', content)  # <p>タグを削除する
            else:
                contents = ""
        else:
            contents = ""
        # 画像をアップロードしてmedia_idを取得
        site_url = f"https://{MTT_DOMAIN}/article/{id}"
        message = title + "\n\n" + site_url + "\n\n" + content
        # Authenticate Twitter API
        auth = tweepy.OAuthHandler(X_API_KEY, X_API_KEY_SECRET)
        auth.set_access_token(X_TOKEN, X_TOKEN_SECRET)
        # Create API object
        api = tweepy.API(auth)
        client = tweepy.Client(consumer_key=X_API_KEY,consumer_secret=X_API_KEY_SECRET,access_token=X_TOKEN,access_token_secret=X_TOKEN_SECRET)
        media = api.media_upload(filename=thumbnail_path)
        time.sleep(300)
        client.create_tweet(text=message, media_ids=[media.media_id])
        return {
            'statusCode': 200,
            'body': json.dumps('success post tweet')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Internal Server Error: {str(e)}')
        }