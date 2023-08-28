DROP TABLE IF EXISTS Watchlist_stocks CASCADE;
DROP TABLE IF EXISTS Watchlist;

CREATE TABLE watchlist (
    id serial PRIMARY KEY, 
    name varchar(30) -- Removed comma from here
);

CREATE TABLE watchlist_stocks (
    id serial PRIMARY KEY, 
    name varchar(30),
    symbol varchar(39),
    watchlist_id integer REFERENCES watchlist(id),
    CONSTRAINT fk_watchlist FOREIGN KEY(watchlist_id) REFERENCES watchlist(id) ON DELETE CASCADE
);

INSERT INTO watchlist (name) VALUES ('IT');
INSERT INTO watchlist (name) VALUES ('Finance');
INSERT INTO watchlist_stocks (name, symbol, watchlist_id) VALUES ('Internation Business Machines', 'IBM', 1);
INSERT INTO watchlist_stocks (name, symbol, watchlist_id) VALUES ('JPMorgan Chase & Co', 'JPM', 2);
