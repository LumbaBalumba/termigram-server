# termigram-server
Server side for termigram

This Express.js app lets you run your own server for Termigram. The server will be used to host ONE chat. To run the application use this guide:

## Installation

```bash
git clone https://github.com/LumbaBalumba/termigram-server
cd termigram-server
npm install
touch .env
```

The you need to add these environment variables to your .env file:
```
PORT="<your_port>"
DATABASE_URL="<your_database_url>"
```

This app uses SQLite, so you can create your own database by typing this in your terminal:
```bash
cd db
sqlite3 mydb.db
 .databases
 .exit
```

In thst case, your DATABASE_URL will be "file:<path_to_termigram-server_folder/db/mydb.db"


## Running
You can run this application by executuing _build_ and _start_ scripts:
```bash
npm run build
npm run dev
```

**ATTENTION** : only use _main_ branch for running as other branches might be unstable!

## Contributing
If you want to contribute to this project, you can start your own branch and create a pull request.
