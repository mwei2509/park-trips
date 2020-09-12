# parktrips

This is a template that sets up docker with node api backend and react web frontend

## Create a new project
1. `git clone git@github.com:mwei2509/node-project-template.git`
2. do a search and replace all `parktrips` with your app name
3. delete the `/.git` folder
4. `git init` to create a new project
5. `git add .`
6. `git commit -am 'first commit'`
7. `git remote add origin git@github.com:username/new_repo` (after creating the repository on github WITHOUT initializing with a readme)
8. `git push -u origin master`

## api
- the API is initialized with a basic users table.  Update the migration data in `/api/db/migrations` or delete the file before starting up if you would like to make changes.

## web

## start
- `docker-compose up`