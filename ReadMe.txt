// to clone the project
git clone https://github.com/PallaviPawar483/ZippyTrips.git

cd ZippyTrips 

//install dependencies from package.json
npm install

//Run migrations to create the trips table if databse and table do not exist
npx sequelize-cli db:migrate 

//start project
npm start
