CREATE TABLE meal (
    id INT PRIMARY KEY NOT NULL auto_increment,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(50) NOT NULL,
    `when` DATETIME NOT NULL,
    max_reservations INT NOT NULL,
    price DECIMAL NOT NULL,
    created_date DATE NOT NULL
);
alter table meal modify price decimal(10,2);
insert into
    meal (
        title,
        description,
        location,
        `when`,
        max_reservations,
        price,
        created_date
    )
values (
        'Smørrebrød',
        'This dish is typically made with a slice of dense, dark rye bread (rugbrød) as the base. The bread is generously buttered and then topped with a variety of ingredients',
        'Denmark',
        '2024-08-19 07:00:35',
        20,
        50,
        '2024-07-11'
    );

insert into
    meal (
        title,
        description,
        location,
        `when`,
        max_reservations,
        price,
        created_date
    )
values (
        
        'Paella',
        'Traditional Spanish rice dish made with saffron-infused rice, seafood, and/or meats.',
        'Spain',
        '2024-07-10 19:00:00',
        50,
        25.99,
        '2024-07-10'
    ),
    (
        
        'Sushi',
        'Japanese dish consisting of vinegared rice topped with raw fish or other ingredients.',
        'Japan',
        '2024-07-11 20:00:00',
        30,
        15.50,
        '2024-07-10'
    ),
    (
        
        'Hamburger',
        'Classic American sandwich consisting of a ground beef patty, often served with toppings in a bun.',
        'USA',
        '2024-07-12 18:00:00',
        40,
        12.75,
        '2024-07-10'
    ),
    (
        
        'Pad Thai',
        'Thai stir-fried rice noodle dish with eggs, tofu, shrimp, peanuts, and a tangy tamarind sauce.',
        'Thailand',
        '2024-07-13 19:30:00',
        35,
        10.99,
        '2024-07-10'
    ),
    (
        
        'Tagine',
        'Moroccan slow-cooked stew made with meat, poultry, or fish with vegetables and aromatic spices.',
        'Morocco',
        '2024-07-14 19:00:00',
        25,
        18.50,
        '2024-07-10'
    ),
    (
        
        'Biryani',
        'Spiced rice dish originating from the Indian subcontinent, usually mixed with meat, vegetables, or eggs.',
        'India',
        '2024-07-15 20:00:00',
        30,
        20.00,
        '2024-07-10'
    ),
    (
        
        'Ceviche',
        'Latin American dish of fresh raw fish or seafood marinated in citrus juices, often with onions, peppers, and cilantro.',
        'Peru',
        '2024-07-16 18:30:00',
        20,
        16.75,
        '2024-07-10'
    ),
    (
        
        'Pasta Carbonara',
        'Italian pasta dish made with eggs, cheese (usually Pecorino Romano), pancetta, and black pepper.',
        'Italy',
        '2024-07-17 19:00:00',
        40,
        14.99,
        '2024-07-10'
    );