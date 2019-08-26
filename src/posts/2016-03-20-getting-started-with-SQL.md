---
title: Getting Started With SQL
description: Learning the basics of SQL programming and Database querying
slug: getting-started-with-sql
date: 2016-03-20
---

After working on the front end of apps for a few years, I've decided to take a deeper dive into the data that I'm displaying. What better way to learn then to learn the language widely used to insert and retrieve the information directly from the databases.

SQL revolves around databases, tables, columns and rows. These are our staple keywords.

## Queries
Queries are the bread and butter of SQL. Queries are essentially what the language was designed for: retrieving data from a database.

### Select
All queries begin with a SELECT clause. This tells the database engine what information (columns in this case) you want returned in your results.

``` sql
SELECT * FROM movies
```

The asterisk means to return all columns from the chosen table. Therefore the previous query can be translated to, **"Select all columns from the movies table."**

### Distinct
The `DISTINCT` clause is used return only unique values in the results set and filters out all duplicate values.

``` sql
SELECT DISTINCT genre FROM movies;
```

### Where
The `WHERE` clause allows you to filter the results to include only rows where a specified condition is true.

``` sql
SELECT * FROM movies
WHERE rating > 8;
```

This will only return rows from the movies table where the rating column is greater than 8.

### Like
The `LIKE` clause is useful when comparing similar values. It is typically used in conjunction with the `WHERE` caluse to search for a specific pattern within a column.

``` sql
SELECT * FROM movies
WHERE name LIKE 'Spiderman';
```

This query will return any rows that have exactly 'Spiderman' in the name column. Sometimes, however, we don't want to specify the exact matcher but would rather have an encompassing pattern. This is where we may use *special characters*:

`_` is used to allow substitution of any individual character. If we have LIKE ‘se_ven’ this will watch with ‘seven' and ‘se7en'.

`%` is a wildcard that matches zero or more missing letters. If we have LIKE ’S%’, this will match ‘Spiderman' and ‘Superman’ as they both begin with the letter ’s'.


### Between
The `BETWEEN` clause is used to filter the result to a certain range. Values can be numbers text or dates.

``` sql
SELECT * FROM movies
WHERE name BETWEEN 'A' AND 'J';

SELECT * FROM movies
WHERE year BETWEEN 1990 AND 2000;
```


### Order By
`ORDER BY` is used to sort the results of the query either alphabetically or numerically.

``` sql
SELECT * FROM movies
ORDER BY rating DESC;
```

DESC is a keyword used to sort the results in descending order (high to low or Z-A). Use ASC to do the inverse (low to high or A-Z).

### Limit
Some tables have thousands of rows but we may only want a small chunk of the records. For this, we use the `LIMIT` clause.

``` sql
SELECT * FROM movies
ORDER BY imdb_rating DESC
LIMIT 3;
```

## Aggregate Functions

Now that we have taken a brief look at the basics of forming a SQL query, let's take a look at some more advanced and useful queries. Aggregate functions will give us additional functionality in building our queries. They work by taking in a parameter (typically a column name) and acting upon it.

### Count
Sometimes, we only desire to know how many rows exist for a query. We can use `COUNT` to retrieve this for us.

``` sql
SELECT COUNT( * ) FROM fake_apps;
```

We can even run our filtering clauses on the count
``` sql
SELECT category, COUNT( * )
FROM fake_apps
WHERE downloads > 20000
```

### Group By
`GROUP BY` is a clause in SQL that is only used with aggregate functions. It is used in collaboration with the `SELECT` statement to arrange identical data into groups.

``` sql
SELECT category, COUNT( * )
FROM fake_apps
WHERE downloads > 20000
GROUP BY price
```

### Sum
We can easily add all the values for a particular column using the SUM clause
``` sql
SELECT category, SUM(downloads)
FROM fake_apps
GROUP BY category;
```

### Max
`MAX` returns the largest value in a column. It takes the name of the column as a parameter.

``` sql
SELECT name, category, MAX(downloads)
FROM fake_apps
GROUP BY category;
```

This query returns the names of the most downloaded apps in each category

### Min
Like you’d expect, the MIN clause performs the inverse of the MAX clause. It will return the smallest value of the column passed as an argument.

``` sql
SELECT name, category, MIN(downloads)
FROM fake_apps
GROUP BY category;
```

### Avg

Use the AVG clause to calculate the average of a particular column. This will return a number and for obvious reasons will not work properly on TEXT fields

``` sql
SELECT price, AVG(downloads)
FROM fake_apps
GROUP BY price;
```

### Round

ROUND() is a function that takes a column name and an integer as an argument. It rounds the values in the column to the number of decimal places specified by the integer. Here, we pass the column AVG(downloads) and 2 as arguments. SQL first calculates the average for each price and then rounds the result to two decimal places in the result set.

``` sql
SELECT price, ROUND(AVG(downloads))
FROM fake_apps
GROUP BY price;
```

## Working With Multiple Tables

### Primary Keys
A primary key serves as a unique identifier for each row or record in a given table. The primary key is literally an id value for a record. We're going to use this value to connect artists to the albums they have produced.

By specifying that the id column is the PRIMARY KEY, SQL makes sure that:

- None of the values in this column are NULL
- Each value in this column is unique

A table can not have more than one PRIMARY KEY column.

### Foreign Keys
A foreign key is a column that contains the primary key of another table in the database. We use foreign keys and primary keys to connect rows in two different tables. One table's foreign key holds the value of another table's primary key. Unlike primary keys, foreign keys do not need to be unique and can be NULL.

### Cross Join
One way to query multiple tables is to write a SELECT statement with multiple table names separated by a comma. This is also known as a cross join. Here, albums and artists are the different tables we are querying.

``` sql
SELECT albums.name, albums.year, artists.name
FROM albums, artists;
```

Unfortunately the result of this cross join is not very useful. It combines every row of the artists table with every row of the albums table. It would be more useful to only combine the rows where the album was created by the artist.

### Inner Join
In SQL, joins are used to combine rows from two or more tables. The most common type of join in SQL is an inner join.

An inner join will combine rows from different tables if the join condition is true. Let's look at the syntax to see how it works.

1. SELECT * specifies the columns our result set will have. Here, we want to include every column in both tables.
2. FROM albums specifies the first table we are querying.
3. JOIN artists ON specifies the type of join we are going to use as well as the name of the second table. Here, we want to do an inner join and the second table we want to query is artists.
4. albums.artist_id = artists.id is the join condition that describes how the two tables are related to each other. Here, SQL uses the foreign key column artist_id in the albums table to match it with exactly one row in the artists table with the same value in the id column. We know it will only match one row in the artists table because id is the PRIMARY KEY of artists

### Left Join
Outer joins also combine rows from two or more tables, but unlike inner joins, they do not require the join condition to be met. Instead, every row in the left table is returned in the result set, and if the join condition is not met, then NULL values are used to fill in the columns from the right table.

``` sql
SELECT *
FROM albums
LEFT JOIN artists ON
  albums.artist_id = artists.id;
```


The left table is simply the first table that appears in the statement. Here, the left table is albums. Likewise, the right table is the second table that appears. Here, artists is the right table.

### Aliases
AS is a keyword in SQL that allows you to rename a column or table using an alias. The new name can be anything you want as long as you put it inside of single quotes. Here we want to rename the albums.name column as 'Album', and the artists.name column as 'Artist'.

``` sql
SELECT
  albums.name AS 'Album',
  albums.year,
  artists.name AS 'Artist'
FROM albums
JOIN artists ON
  albums.artist_id = artists.id
WHERE albums.year > 1980;
```

It is important to note that the columns have not been renamed in either table. The aliases only appear in the result set. This does not mutate the original record stored in the database. It merely alters the appearance of the record in the data set returned by the query.

## Conclusion
This was merely a general overview of the most basic functions SQL has to offer. While it will get the ball rolling, much more work is needed to become professionally savvy in SQL. I will write further posts about using SQL to analyze business metrics and uncover opportunities. I'll try to link those in this post if I can remember. Cheers.
