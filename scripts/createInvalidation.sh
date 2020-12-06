aws_access_key_id=$1
aws_access_key_secret=$2
aws_distribution_id=$3

pip3 install boto3
python3 scripts/create_invalidation.py $aws_access_key_id $aws_access_key_secret $aws_distribution_id