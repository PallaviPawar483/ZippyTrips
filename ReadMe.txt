.// to clone the project
1. git clone https://github.com/PallaviPawar483/ZippyTrips.git

2.cd ZippyTrips 

//install dependencies from package.json
3.npm install

//Run migrations to create the trips table if databse and table do not exist
npx sequelize-cli db:migrate 

//start project
4.npm start
