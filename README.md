# todo
Small app to study PostgREST and Angular.

# TodoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Installing postgrest
You need to install postgrest in order to have a backend. Postgrest enables you to turn your database into a REST API endpoint. 
Since we dont have a lot of logic happening behind the scenes we can just call directly for our data. 
You can either install postgrest via a package Manager like Homebrew or as binary [here](https://github.com/PostgREST/postgrest/releases/tag/v12.2.3).


## Running postgres
I provided a postgres DB Dump file. After installing postgres (either via Docker or your trusted Package Manger etc.) you should first create a database that fits the DataBase name in the todo_rest.conf file. In our case thats 'tododb' - but you can change it as you like. 

To create the db run this command in your terminal:

```
createdb tododb
```

After that you can use the dump to recreate the schema and tables as well as users:
``` 
psql -U postgres -d tododb -f postgres_todo_db_dump.sql
```

**Note**: Usually postgres is the default user with admin rights but maybe it is different in your DBS. If so try using a different user after the -U.

Now your database is all set and you can run the api server. 


## Running postgREST
You need to run postgrest in addition to your postgres db. You can use the provided Script todo_rest.conf - it will set up the api server correctly (including authorization). Run it like this in the terminal where your todo_rest.conf file lies:

```
postgrest todo_rest.conf
```

## Running Angular
Finally you can install all dependencies (necessary just once in a while) and then run Angular with:
```
npm install
ng serve
```
