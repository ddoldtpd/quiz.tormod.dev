aws_access_key_id=$1
aws_access_key_secret=$2
bucket_name=$3
local_path=$4

pip3 install boto3
python3 scripts/upload_folder_to_s3.py $aws_access_key_id $aws_access_key_secret $bucket_name $local_path
