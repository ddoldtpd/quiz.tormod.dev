import boto3
import sys


def main():
    if len(sys.argv) != 6:
        print("Error: Required 5 arguments.")
        # Checks for 6 because the script path is in position 0. So len is 6
        # for 5 arguments.
        sys.exit(1)

    aws_access_key = sys.argv[1]
    aws_access_secret = sys.argv[2]
    bucket_name = sys.argv[3]
    aws_key = sys.argv[4]
    local_path = sys.argv[5]

    session = boto3.Session(
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_access_secret,
    )

    try:
        s3 = session.resource("s3")
        s3.meta.client.upload_file(
            Filename=local_path,
            Bucket=bucket_name,
            Key=aws_key,
            ExtraArgs={"ContentType": "Text/html", "ACL": "public-read"},
        )
    except Exception as e:
        print("Something went wrong when uploading to S3", e)

    print("Done uploading")


main()
