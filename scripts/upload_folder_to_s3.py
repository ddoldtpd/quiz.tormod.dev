import boto3
import magic
import sys
import os


def uploadDirectory(s3, path, bucket_name, s3_path, extra_args):
    s3.meta.client.upload_file(
        Filename=path, Bucket=bucket_name, Key=s3_path, ExtraArgs=extra_args,
    )


def main():
    if len(sys.argv) != 5:
        print("Error: Required 5 arguments.")
        sys.exit(1)

    aws_access_key = sys.argv[1]
    aws_access_secret = sys.argv[2]
    bucket_name = sys.argv[3]
    local_path = sys.argv[4]

    session = boto3.Session(
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_access_secret,
    )

    try:
        s3 = session.resource("s3")
        for root, dirs, files in os.walk(local_path):
            for file in files:
                s3_path = "." + os.path.join(root, file).split("build", 1)[1]

                print(s3_path)
                contentType = magic.from_file(s3_path, mime=True)
                print(f"ContentType is {contentType} for file {s3_path}")
                extra_args = {"ContentType": f"{contentType}",
                              "ACL": "public-read"}
                uploadDirectory(
                    s3,
                    os.path.join(root, file),
                    bucket_name, s3_path,
                    extra_args
                )

    except Exception as e:
        print("Something went wrong when uploading to S3", e)

    print("Done uploading")


main()
