import boto3
import magic
import sys
import os


def uploadDirectory(s3, path, bucket_name, s3_path, extra_args):
    s3.meta.client.upload_file(
        Filename=path, Bucket=bucket_name, Key=s3_path, ExtraArgs=extra_args,
    )


def setContentType(file, contentType):
    file_type = file.rsplit("./", 1)[1]

    if file_type == 'css':
        contentType = 'text/css'
    elif file_type == 'js':
        contentType == 'application/javascript'

    return contentType


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

                s3_path = os.path.join(root, file).rsplit("build", 1)[1]

                print(s3_path)
                print(f"root: {os.path.join(root, file)}")
                contentType = magic.from_file(os.path.join(root, file), mime=True)
                print(f"ContentType is {contentType} for file {s3_path}")
                extra_args = {"ContentType": f"{contentType}",
                              "ACL": "public-read"}

                print(f"s3: {s3}, file: {os.path.join(root, file)}, bucket: {bucket_name}, s3_path: {s3_path}, extra_args:{extra_args}")
                uploadDirectory(
                    s3,
                    os.path.join(root, file),
                    bucket_name,
                    s3_path,
                    extra_args
                )

    except Exception as e:
        print("Something went wrong when uploading to S3", e)

    print("Done uploading")


main()


# try:
#     s3 = session.resource("s3")
#     for root, dirs, files in os.walk(local_path):
#         for file in files:
#             file_origin = os.path.join(root, file)
#             print(f"Local file path: {file_origin}")

#             contentType = magic.from_file(file_origin, mime=True)
#             contentType = setContentType(file_origin, contentType)
#             extra_args = {"ContentType": f"{contentType}",
#                           "ACL": "public-read"}
#             print(f"ContentType is {contentType} for file {file_origin}")

#             s3_path = file_origin.rsplit("build/", 1)[1]
#             print(f"""s3: {s3}, file: {file_origin}, bucket: {bucket_name},
#                    s3_path: {s3_path}, extra_args:{extra_args}""")

#             uploadDirectory(
#                 s3,
#                 file_origin,
#                 bucket_name,
#                 s3_path,
#                 extra_args
#             )

# except Exception as e:
#     print("Something went wrong when uploading to S3", e)

# print("Done uploading")