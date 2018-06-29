DROP TABLE IF EXISTS resource_completion;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS content;
DROP TABLE IF EXISTS nodes;
DROP TABLE IF EXISTS paths_skills;
DROP TABLE IF EXISTS apprentices_paths;
DROP TABLE IF EXISTS masters_paths;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS paths;
DROP TABLE IF EXISTS apprentices;
DROP TABLE IF EXISTS masters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid serial PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    username VARCHAR(40) UNIQUE,
    email VARCHAR(40) UNIQUE,
    hash VARCHAR(60),
    admin BOOLEAN
);

CREATE TABLE masters (
    mid SERIAL PRIMARY KEY,
    uid INTEGER UNIQUE REFERENCES users (uid)
);

CREATE TABLE apprentices (
    aid SERIAL PRIMARY KEY,
    uid INTEGER UNIQUE REFERENCES users (uid)
);

CREATE TABLE paths (
    pid SERIAL PRIMARY KEY,
    path_name VARCHAR(100),
    pub BOOLEAN,
    img VARCHAR(200),
    rating NUMERIC(2, 1),
    hrs INTEGER,
    abstract TEXT
);

CREATE TABLE skills (
    skid SERIAL PRIMARY KEY,
    skill_name VARCHAR(40) UNIQUE
);


CREATE TABLE masters_paths (
  mid INTEGER REFERENCES masters (mid) ON UPDATE CASCADE ON DELETE CASCADE,
  pid INTEGER REFERENCES paths (pid) ON UPDATE CASCADE,
  CONSTRAINT masters_paths_pkey PRIMARY KEY (mid, pid)
);

CREATE TABLE apprentices_paths (
  aid INTEGER REFERENCES apprentices (aid) ON UPDATE CASCADE ON DELETE CASCADE,
  pid INTEGER REFERENCES paths (pid) ON UPDATE CASCADE,
  path_rating INTEGER,
  CONSTRAINT aprentices_paths_pkey PRIMARY KEY (aid, pid)
);

CREATE TABLE paths_skills (
  pid INTEGER REFERENCES paths (pid) ON UPDATE CASCADE ON DELETE CASCADE,
  skid INTEGER REFERENCES skills (skid) ON UPDATE CASCADE,
  is_tld BOOLEAN,
  CONSTRAINT paths_skills_pkey PRIMARY KEY (pid, skid)
);

CREATE TABLE nodes (
    nid SERIAL PRIMARY KEY,
    pid INTEGER REFERENCES paths(pid),
    node_name VARCHAR(40),
    ord INTEGER,
    depth INTEGER
);

CREATE TABLE content (
    cid SERIAL PRIMARY KEY,
    nid INTEGER REFERENCES nodes(nid),
    content_type VARCHAR(40),
    content VARCHAR(100000),
    ord INTEGER
);

CREATE TABLE resources (
    rid SERIAL PRIMARY KEY,
    nid INTEGER REFERENCES nodes(nid),
    url VARCHAR(1000)
);

CREATE TABLE resource_completion (
    rcid SERIAL PRIMARY KEY,
    aid INTEGER REFERENCES apprentices(aid),
    rid INTEGER REFERENCES resources(rid),
    timestamp TIMESTAMP 
);

INSERT INTO users
    (first_name, last_name, username, email, admin)
VALUES
    ('Ray', 'Rack', 'a', 'rayrack@gmail.com', true), 
    ('Sam', 'Spade', 'maltesefalcon2020', 'masteroftheopera@gmail.com', false),
    ('Nathan', 'Bundy', 'greenpowerranger', 'huxster1911@gmail.com', false),
    ('Portia', 'Venice', '0fleshpounder0', 'portiaofvenice@gmail.com', false),
    ('Sebastian', 'Riddle', 'pistachiolover', 'deezgreennuts@gmail.com', false);

INSERT INTO masters
    (uid)
VALUES
    (1),
    (2),
    (4);

INSERT INTO apprentices
    (uid)
VALUES
    (3),
    (5);

INSERT INTO paths
    (path_name, pub, abstract, img, rating, hrs)
VALUES
    ('Mastering Javascript from First Principles', false, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tincidunt magna. Nulla vel ultrices dolor, ut volutpat arcu. In suscipit nisl quis sodales semper. Donec commodo ultrices sapien, quis ullamcorper sem vulputate sed.', 'https://blog.alexdevero.com/wp-content/uploads/2015/07/3260095534_170b48ca3b_o.jpg', 4.3, 270),
    
    ('Computer Science for the Real World', true, 'Duis vestibulum felis non pellentesque pharetra. Prasen sed aliquet ipsum. Vivamus eleifend sit amet diam et imperdiet. Vivamus faucibus eu nulla sed consequat. Praesent vel malesuada libero. Vestibulum placerat, lorem ut lobortis consequat, sapien orci commodo odio, eu faucibus nisi ante ut ipsum.', 'https://cdn.techgyd.com/2015/02/programmer.jpg', 4.7, 650),
    
    ('Computer Science Crash Course', true, 'Cras nibh ipsum, fermentum id ex sit amet, tempus rutrum augue. Quisque ullamcorper enim sapien, vitae cursus risus venenatis sit amet. Fusce volutpat, lacus sed feugiat vehicula, quam augue finibus justo, ac dapibus tortor eros sit amet lacus.', 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Frobohub.org%2Fwp-content%2Fuploads%2F2017%2F04%2Fcrash-course-computer-science.jpg&f=1', 4.2, 1019),
    
    ('Girls Rock Computer Science', true, 'Quisque quis suscipit lectus. Mauris a orci sapien. Fusce aliquet gravida libero et rhoncus. Sed posuere libero eget quam volutpat fermentum. Vestibulum condimentum magna at tortor tristique convallis. In vestibulum dictum rhoncus. ', 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F1378599%2Fimages%2Fo-COMPUTER-SCIENCE-facebook.jpg&f=1', 4.8, 720),
    
    ('Flexbox for Mere Mortals', true, 'Fusce vulputate bibendum eros, vitae tempor nunc sodales et. Aenean iaculis, est ac iaculis egestas, magna ex tincidunt mi, ac molestie mi orci vitae nibh. Ut egestas eget purus ac condimentum', 'https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.silocreativo.com%2Fen%2Fwp-content%2Fuploads%2F2017%2F04%2Fflexbox-cssgrid-practical-example.png&f=1', 4.1, 1131),
    
    ('CSS the Way Your Grandma Used to Make It', true, 'Aenean nec mi ipsum. Proin ac elit volutpat, finibus orci ut, condimentum magna. Quisque porta magna ut interdum pretium. Aliquam luctus, arcu at pellentesque tempor, arcu mauris cursus ante, id posuere quam erat vitae nunc.', 'https://www.intechnic.com/hubfs/Blog/Featured%20Images/30%20Creative%20Website%20Examples%20of%20CSS%20Animation.jpg?t=1513302636369', 4.8, 345),
    
    ('PostgreSql Unhinged', true, 'Aenean nec mi ipsum. Proin ac elit volutpat, finibus orci ut, condimentum magna. Quisque porta magna ut interdum pretium. Aliquam luctus, arcu at pellentesque tempor, arcu mauris cursus ante, id posuere quam erat vitae nunc.', 'https://cdn-images-1.medium.com/max/1600/1*RtfJRF1-YoMOTGZb3j1-sA.jpeg', 4.9, 125);

INSERT INTO skills
    (skill_name)
VALUES
    ('Computer Science'),
    ('Databases'),
    ('Web Development'),
    ('Web Design');

INSERT INTO masters_paths
    (mid, pid)
VALUES
    (1, 1),
    (3, 2),
    (2, 3),
    (1, 4),
    (1, 5),
    (3, 6),
    (2, 7);

INSERT INTO apprentices_paths
    (aid, pid)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 4),
    (2, 5),
    (1, 6),
    (2, 7);

INSERT INTO paths_skills
    (pid, skid, is_tld)
VALUES
    (1, 1, true),
    (2, 1, true),
    (3, 1, true),
    (4, 1, true),
    (5, 4, true),
    (6, 4, true),
    (7, 2, true),
    (1, 3, false),
    (2, 3, false),
    (3, 3, false),
    (4, 3, false);   

INSERT INTO nodes
    (pid, node_name, ord, depth)
VALUES
    (1, 'Introduction', 1, 0),
    (1, 'Resources', 2, 0),
    (1, 'Coding Environment', 3, 0),
    (1, 'Code', 4, 0),
    (1, 'Types', 5, 0),
    (1, 'Numbers', 6, 1),
    (1, 'Strings', 7, 1),
    (1, 'Booleans', 8, 1),
    (1, 'Objects', 9, 1),
    (1, 'Functions', 10, 1),
    (1, 'Undefined', 11, 1),
    (1, 'Type Coercion', 12, 1),
    (1, 'Program Structure', 13, 0),
    (1, 'Key Words', 14, 1),
    (1, 'Variables', 15, 1),
    (1, 'Naming', 16, 2),
    (1, 'Updating', 17, 2),
    (1, 'Assignment', 18, 2),
    (2, 'Introduction', 1, 0),
    (3, 'Introduction', 1, 0),
    (4, 'Introduction', 1, 0),
    (5, 'Introduction', 1, 0),
    (6, 'Introduction', 1, 0),
    (7, 'Introduction', 1, 0);

INSERT INTO content
    (nid, content_type, content, ord)
VALUES
    (1, 'h1', 'Intro To Javascript', 1),
    (1, 'p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat nunc vel blandit tempus. Morbi sollicitudin venenatis efficitur. Vivamus lobortis ornare justo at rhoncus. Sed a laoreet leo. Maecenas quis sodales arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin at sem a turpis vulputate fringilla et ac ex. Praesent semper diam neque, rutrum luctus dui consectetur at. Nulla imperdiet tortor id elementum volutpat. In accumsan interdum urna eu pretium.', 2),
    (2, 'h1', 'Resources', 1),
    (2, 'p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat nunc vel blandit tempus. Morbi sollicitudin venenatis efficitur. Vivamus lobortis ornare justo at rhoncus. Sed a laoreet leo. Maecenas quis sodales arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin at sem a turpis vulputate fringilla et ac ex. Praesent semper diam neque, rutrum luctus dui consectetur at. Nulla imperdiet tortor id elementum volutpat. In accumsan interdum urna eu pretium.', 2);

-- NOTE TO FUTURE SELF. DON'T FORGET TO DROP NEW TABLES YOU ADD! IN REVERSE ORDER!
-- Don't forget trailing ;
-- Check for missing commas;

SELECT * FROM users;
