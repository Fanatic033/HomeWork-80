create schema office collate utf8mb4_general_ci;

use office

create table categories
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table location
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    location_id int                                not null,
    title       varchar(255)                       not null,
    description text                               null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id),
    constraint items_location_id_fk
        foreign key (location_id) references location (id)
);

use office;

insert into office.categories (id, title, description)
values  (1, 'GPUs', 'video card'),
        (2, 'CPUs', 'processor');

insert into office.location (id, title, description)
values  (1, 'Enter.kg', 'online shop'),
        (2, 'Intermedia', 'magazine');

insert into office.items (id, category_id, location_id, title, description, image, created_at)
values  (1, 1, 2, 'RTX 4090', 'powerfull video card', 'rtx4090.jpg', '2024-08-23 00:55:57');
