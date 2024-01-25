echo "Building App..."
npm run build

echo "Deploying files ..."
scp -r build/* root@185.107.237.254:/var/www/185.107.237.254/

echo "Done"