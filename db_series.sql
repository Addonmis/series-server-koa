create table roles (
    id_role integer not null primary key,
    name_role varchar(20) not null
);

create table genre (
    id_genre integer not null primary key auto_increment,
    name_of_genre varchar(100) not null
);

create table series (
    id_series integer not null primary key,
    status integer(1) not null,
    year integer null,
    age_rating integer null,
    studio varchar(200) null,
    producer varchar(200) null,
    type integer(1) not null,
    count_of_series integer not null,
    type_of_translation varchar(200) null,
    voiceOver varchar(200) null,
    description text null,
    length_of_series integer not null
);

create table series_genre(
    id_series_genre integer not null primary key auto_increment,
    id_series integer not null,
    id_genre integer not null,
    foreign key (id_series) references series(id_series)
    on update cascade on delete no action,
    foreign key (id_genre) references genre(id_genre)
    on update cascade on delete no action
);

create table series_name (
    id_series_name integer not null primary key auto_increment,
    id_series integer not null,
    name_of_series varchar(200) not null,
    foreign key (id_series) references series(id_series)
    on update cascade on delete no action
);

create table series_img (
    id_series_img integer not null primary key auto_increment,
    id_series integer not null,
    path_to_img text not null,
    foreign key (id_series) references series(id_series)
    on update cascade on delete no action
);

create table users (
    id_user integer not null primary key auto_increment,
    id_role integer not null,
    username varchar(20) not null,
    password varchar(200) not null,
    access_token varchar(200) not null,
    refresh_token varchar(200) not null,
    date_of_registration varchar(40) not null,
    gender varchar(1) null,
    date_of_borth varchar(40) null,
    foreign key (id_role) references roles(id_role)
    on update cascade on delete no action
);

create table user_series (
    id_user_series integer not null primary key auto_increment,
    id_user integer not null,
    id_series integer not null,
    foreign key (id_user) references users(id_user)
    on update cascade on delete no action,
    foreign key (id_series) references series(id_series)
    on update cascade on delete no action
);