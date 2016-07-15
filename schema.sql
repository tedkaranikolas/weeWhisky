-- SCHEMA WHISKY
CREATE TABLE whisky (
	id	serial PRIMARY KEY,
	region_id	int references region(id),
	whisky_type_id int references whisky_type(id),
	cask_finish_id int references cask_finish(id),
	producer_id int references producer(id),
	expression TEXT,
	palate TEXT,
	ABV INT
	);
	SELECT * FROM whisky
	JOIN cask_finish AS cf ON whisky.cask_finish_id = cf.id;

-- SCHEMA USER
CREATE TABLE scotch_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(120) NOT NULL );

-- JOIN
SELECT whisky.id, expression, palate, abv, finish, producer, whisky_type, region FROM whisky
JOIN cask_finish AS cf ON whisky.cask_finish_id = cf.id
JOIN producer ON whisky.producer_id = producer.id
JOIN region on whisky.region_id = region.id
JOIN whisky_type ON whisky.whisky_type_id = whisky_type.id;

SELECT * FROM cask_finish;
