// to clone the project
git clone https://github.com/joseph-m-mcdonald/

//install dependencies from package.json
npm install

//Run migrations to create the trips table if databse and table do not exist
npx sequelize-cli db:migrate 

//start project
npm start