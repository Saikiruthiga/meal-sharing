CREATE TABLE reservation (
    id INT PRIMARY KEY NOT NULL auto_increment,
    number_of_guests INT NOT NULL,
    meal_id INT,
    constraint meal_id_fk Foreign Key (meal_id) REFERENCES meal (id),
    created_date DATE NOT NULL,
    contact_phonenumber BIGINT NOT NULL,
    contact_name VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100)
);
insert into
    reservation
values (
        1,
        5,
        3,
        '2024-03-05',
        236587,
        'John',
        'john_01@gmail.com'
    ),
    (
        2,
        4,
        2,
        '2024-07-11',
        98765432,
        'Jane Smith',
        'jane.smith@example.com'
    ),
    (
        3,
        3,
        3,
        '2024-07-12',
        55512345,
        'Alice Brown',
        'alice.brown@example.com'
    );