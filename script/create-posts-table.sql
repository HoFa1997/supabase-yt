create table public.Posts (
  post_id      uuid DEFAULT uuid_generate_v4() not null primary key,
  author_id    uuid references public.Users not null,
  title        text not null,
  content      text not null,
  created_at   timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at   timestamp with time zone default null
);