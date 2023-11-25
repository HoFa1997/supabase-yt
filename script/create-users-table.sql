create type public.USER_ROLE as enum ('admin', 'editor', 'viewer');

create table public.Users (
  id           uuid references auth.users on delete cascade not null primary key,
  email        text unique,
  role         USER_ROLE default 'viewer'::public.USER_ROLE,
  created_at   timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at   timestamp with time zone default null
);