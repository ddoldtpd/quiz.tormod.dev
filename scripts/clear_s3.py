import boto3
import sys


def main():
    if len(sys.argv) != 4:
        print("Error: Required 4 arguments.")
        sys.exit(1)

    aws_access_key = sys.argv[1]
    aws_access_secret = sys.argv[2]
    bucket_name = sys.argv[3]

    session = boto3.Session(
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_access_secret,
    )

    try:
        s3 = session.resource("s3")
        bucket = s3.Bucket(bucket_name)
        bucket.objects.all().delete()

    except Exception as e:
        print("Something went wrong when deleting S3", e)

    print("Done emptying bucket")


main()
