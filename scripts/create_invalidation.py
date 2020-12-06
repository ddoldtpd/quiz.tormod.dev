from time import time
import boto3
import sys


def main():

    if len(sys.argv) != 4:
        print("Error: Required 4 arguments.")
        sys.exit(1)

    aws_access_key = sys.argv[1]
    aws_access_secret = sys.argv[2]
    aws_distribution_id = sys.argv[3]

    session = boto3.Session(
        aws_access_key_id=aws_access_key, aws_secret_access_key=aws_access_secret,
    )

    try:
        cloudfront = session.client("cloudfront")
        response = cloudfront.create_invalidation(
            DistributionId=aws_distribution_id,
            InvalidationBatch={
                "Paths": {"Quantity": 1, "Items": ["/*"]},
                "CallerReference": str(time()).replace(".", ""),
            },
        )
        print(response)

    except Exception as e:
        print("Something went wrong when uploading to S3", e)

    print("Done uploading")


main()
