import json
import boto3
import decimal
from urllib import parse
from chalice import Chalice
from datetime import date, timedelta, datetime
from boto3.dynamodb.conditions import Key

app = Chalice(app_name='morejobs-get-articles')
app.api.cors = True
_DB = None
WORKTYPE = {
  'freelance': '도급',
  'contract': '상주'
}

def get_articles_db():
    global _DB
    if _DB is None:
        _DB = boto3.resource('dynamodb').Table('morejobs-articles')
    return _DB

def get_date(cur_date):
    d = cur_date - timedelta(days=1)
    return d, d.strftime('%Y-%m-%d')


def json_default(value):
    if isinstance(value, decimal.Decimal):
        return int(value)
    raise TypeError("not JSON serializable")


@app.route('/articles')
def get_articles():
    result = []
    date_in_format = app.current_request.query_params.get('start')
    work_type = app.current_request.query_params.get('work_type')
    cur_date = datetime.strptime(date_in_format, '%Y-%m-%d')
    while(len(result) < 15):
        response = get_articles_db().query(
          KeyConditionExpression=Key('created_time').eq(date_in_format)
        )
        if work_type:
          result.extend([x for x in response['Items'] if WORKTYPE[work_type] in x['work_type']])
        else:
          result.extend(response['Items'])
        cur_date, date_in_format = get_date(cur_date)
        # For Debug
        print(date_in_format, len(response['Items']))
    return json.dumps({'articles': result}, default=json_default)


@app.route('/article/{date}/{title}')
def get_article(date, title):
    title = parse.unquote(title)
    response = get_articles_db().query(
        KeyConditionExpression=Key('created_time').eq(date) & Key('title').begins_with(title)
    )
    return json.dumps({'article': response['Items'][0]}, default=json_default)
