# Description

Create an app which displays and allows to edit properties of a building list.

Usage of all npm packages is allowed.

# Provided resources

* 2 data files provided with this task (Must use one of the provided files):
  * [Geojson](buildings.geojson)
  * [Json](buildings.json) - version of geojson as a fallback if you have not used geojson before
* UI examples in ./example folder
* Structure of the monorepo - there are 3 folders for each process Web app, Api and Database - with initial setup. 
   * Instructions on database setup [here](./database/SETUP.md).
   * Npm packages are defined in package.json for every folder, but there are just suggestions, change them as you wish


# Tasks

## Mandatory

* Create database table to store the json data
  * Choose one of the options:
    * Export pg_dump to ./database/ with the (geo)json data already in the table
    * Write SQL files to create table and upload (geo)json data to database
    * Write a JavaScript/TypeScript script to execute SQL for table creation and upload the (geo)json data to database
* Create a angular 7+ application which should:
  * Have a list/table of provided geometries in json file. Each row should contain 1+ properties which best describe the row as unique
  * Have a page/form/popup which allows to view and edit details of the row (excluding the geometry)
  * App should use Reactive Forms and Angular Services
  * If Node.js API task is skipped - create a API mock by using service/singleton class to perform Create Read Update Delete operations on the data
  * (Optional) Render geometries on a map, you'll find that 'openlayers' is suggested but alternative can be used.

> Abstraction and component reusability is important, however to reduce time needed for the task you can just leave comments on what changes you would add
> on top of written code.

## Node.js API (Optional)

* Create a simple HTTP server
* CRUD operations server side using REST Api conventions 
