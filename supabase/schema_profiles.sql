-- Create profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  nickname text,
  role text check (role in ('kids', 'teens', 'mate', 'classic', 'teacher')) default 'teens',
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Trigger to create profile on signup (Optional, but good for UX)
-- For MVP, we might manually insert or handle in code, but trigger is cleaner.
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, nickname, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'teens'); -- Default to teens if not specified
  return new;
end;
$$ language plpgsql security definer;

-- Trigger setup (Commented out for MVP simplicity - can run manually if needed)
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();
