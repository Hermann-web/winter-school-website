git checkout main
git push

git checkout deploy
git reset --hard main


# Remove all existing files from the deploy
# rm -rf $(find -type d -maxdepth 1 ! -name ".git" ! -name "dist" ! -name "." ! -name "..")
rm -rf .github scripts src node_modules
rm -r $(find -type f -maxdepth 1)

# Copy the contents from the dist folder to the current directory
cp -r ./dist/* ./
rm -rf dist/

# Add all the files to git and commit the changes
git add .
git commit -m "Deploying updated build from main"

# Push the changes to deploy
git push origin deploy --force

git checkout main
