git checkout dev
git push

git checkout main
git reset --hard dev


# Remove all existing files from the deploy
# rm -rf $(find -type d -maxdepth 1 ! -name ".git" ! -name "dist" ! -name "." ! -name "..")
rm -rf .github scripts src
rm -r $(find -type f -maxdepth 1 ! -name ".gitignore")

# Copy the contents from the dist folder to the current directory
cp -r ./dist/* ./
rm -rf dist/

# Add all the files to git and commit the changes
git add .
git commit -m "Deploying updated build from dev"

# Push the changes to deploy
git push origin main --force

git checkout dev
