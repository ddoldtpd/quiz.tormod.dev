aws_access_key_id=$1
aws_access_key_secret=$2
bucket_name=$3

pip3 install boto3
python3 scripts/clear_s3.py $aws_access_key_id $aws_access_key_secret $bucket_name
