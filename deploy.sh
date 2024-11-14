src_branch="main"
deploy_branch="gh-pages"

git checkout $src_branch
git add .
git commit -m "updates pre build"
git push

git checkout $deploy_branch
git reset --hard $src_branch

# Remove all existing files from the deploy
# rm -rf $(find -type d -maxdepth 1 ! -name ".git" ! -name "dist" ! -name "." ! -name "..")
rm -rf .github scripts src
rm -r $(find -type f -maxdepth 1 ! -name ".gitignore" ! -name "CNAME")

# Copy the contents from the dist folder to the current directory
cp -r ./dist/* ./
rm -rf dist/

# Add all the files to git and commit the changes
git add .
git commit -m "Deploying updated build from $src_branch"

# Push the changes to deploy
git push origin $deploy_branch --force

git checkout $src_branch
