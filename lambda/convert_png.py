import base64
import boto3
import json

converted_bucket = ""


def lambda_handler(event, context):
    s3 = boto3.client("s3")

    event_bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]

    obj = s3.get_object(Bucket=event_bucket, Key=key)
    body = obj["Body"].read().decode("utf-8")

    converted_image = base64.b64decode(body)

    s3.put_object(
        Bucket=converted_bucket,
        Key="{}.png".format(key),
        Body=converted_image,
        ContentType="image/png",
    )

    return {"statusCode": 200, "body": json.dumps("conversion complete")}
