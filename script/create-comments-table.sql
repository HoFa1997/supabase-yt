create table public.Comments (
  comment_id      uuid DEFAULT uuid_generate_v4() not null primary key,
  post_id uuid    references public.Posts not null,
  author_id       uuid references public.Users not null,
  comment         text not null,
  created_at   timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at   timestamp with time zone default null
);