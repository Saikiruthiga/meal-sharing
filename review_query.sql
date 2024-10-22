CREATE TABLE review (
    id INT PRIMARY KEY NOT NULL auto_increment,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    meal_id INT,
    constraint meal_id_fk_1 Foreign Key (meal_id) REFERENCES meal (id),
    stars INT NOT NULL,
    created_date DATE NOT NULL
);
insert into
    review
values (
        1,
        'Delicious Paella!',
        'The Paella was absolutely delicious, with perfect flavors and texture.',
        1,
        5,
        '2024-07-10'
    ),
    (
        2,
        'Great Sushi Experience',
        'The Sushi was fresh and delightful. Highly recommended!',
        2,
        4,
        '2024-07-11'
    ),
    (
        3,
        'Tasty Hamburger',
        'The Hamburger was juicy and flavorful. A satisfying meal!',
        3,
        4,
        '2024-07-12'
    );
   