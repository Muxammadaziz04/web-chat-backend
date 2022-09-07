create database chat;

create extension "uuid-ossp";
create extension citext;

create type action_type as enum('online', 'offline')

drop table if exists users;
create table users(
    user_id uuid default uuid_generate_v4() primary key,
    first_name varchar(30) not null,
    last_name varchar(30),
    username varchar(100) unique,
    user_action action_type default 'offline',
    last_seem timestamp with time zone default current_timestamp,
    email citext unique not null,
    user_avatar text check (user_avatar ~ '^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?'),
    user_dialogs uuid[]
);

drop table if exists dialogs;
create table dialogs(
    dialog_id uuid default uuid_generate_v4() primary key,
    dialog_members uuid[] not null
);

drop table if exists messages;
create table messages(
    message_id uuid default uuid_generate_v4(),
    message_body text,
    message_from uuid references users(user_id) on delete cascade not null,
    dialog_id uuid references dialogs(dialog_id) on delete cascade not null,
    created_at timestamp with time zone default current_timestamp,
    viewed boolean default false
);

drop table if exists online_users;
create table online_users(
    user_id uuid references users(user_id) not null,
    socket_id text not null
);


insert into dialogs (dialog_id, dialog_members) values ('d4bf74f9-77e1-466b-819b-6ee22148ec23', array['0912eee5-1b21-4b4e-82c4-af4439be2d03'::uuid, 'ee14b3f7-4d14-4aef-8993-3e5312b1a0a7'::uuid]);
insert into dialogs (dialog_id, dialog_members) values ('a61052dd-c9fe-48d9-93e7-7ce3836b4d04', array['0912eee5-1b21-4b4e-82c4-af4439be2d03'::uuid, '47f48144-b399-429c-83ae-be8fa4029a55'::uuid]);

update users set user_dialogs = array_append(user_dialogs, 'd4bf74f9-77e1-466b-819b-6ee22148ec23') where user_id = 'ee14b3f7-4d14-4aef-8993-3e5312b1a0a7';

select * from dialogs where array['ee14b3f7-4d14-4aef-8993-3e5312b1a0a7', '0912eee5-1b21-4b4e-82c4-af4439be2d03'] <@ dialog_members;



insert into dialogs (dialog_members) select array['0912eee5-1b21-4b4e-82c4-af4439be2d03', '47f48144-b399-429c-83ae-be8fa4029a55']
where (select dialog_id from chats where array['47f48144-b399-429c-83ae-be8fa4029a55', '0912eee5-1b21-4b4e-82c4-af4439be2d03'] <@ dialog_members) is null;



insert into users (first_name, email, user_id) values ('Muhammadaziz', 'muxammadazizramziddinov@gmail.com', '0912eee5-1b21-4b4e-82c4-af4439be2d03');
insert into users (first_name, email, user_id) values ('Said', 'said@gmail.com', 'ee14b3f7-4d14-4aef-8993-3e5312b1a0a7');
insert into users (first_name, email, user_id) values ('Ali', 'ali@gmail.com', '47f48144-b399-429c-83ae-be8fa4029a55');



insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-02 13:07:17', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-02 16:07:58', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-02 16:15:41', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 04:35:53', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 08:03:21', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 08:05:48', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 10:40:44', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 11:39:26', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 12:45:24', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 13:11:54', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 13:37:38', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 14:37:07', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nunc rhoncus dui vel sem. Sed sagittis.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 14:43:15', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 17:06:42', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 17:53:49', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 18:19:47', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 18:58:33', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 19:11:06', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-04 22:05:20', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Phasellus in felis. Donec semper sapien a libero.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 00:14:32', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 01:30:51', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 03:06:37', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 11:08:13', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nam tristique tortor eu pede.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 11:37:27', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 11:57:05', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 12:28:58', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 13:11:24', true);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', '47f48144-b399-429c-83ae-be8fa4029a55', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 19:05:07', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 19:58:55', false);
insert into messages (message_body, message_from, dialog_id, created_at, viewed) values ('Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '0912eee5-1b21-4b4e-82c4-af4439be2d03', 'a61052dd-c9fe-48d9-93e7-7ce3836b4d04', '2022-08-05 20:07:23', false);