sudo docker run --rm -p 3000:3000 -v $PWD:/app -w /app -u $(id -u):$(id -g) node:22 sh -c "npm install && npm run dev"
