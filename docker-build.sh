aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com
docker build --platform=linux/amd64 -t b1n .
echo "Commit Hash: $(git rev-parse --short HEAD)" && docker tag b1n:latest 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/b1n:$(git rev-parse --short HEAD) && docker push 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/b1n:$(git rev-parse --short HEAD)
docker tag 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/b1n:$(git rev-parse --short HEAD) 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/b1n:production
docker push 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/b1n:production
aws ecs update-service --cluster aws-davao-ecs-cluster --service b1n --force-new-deployment