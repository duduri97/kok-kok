-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create attendance_logs table
create table public.attendance_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  check_in_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null, -- 'SUNDAY_SERVICE', 'BIBLE_STUDY'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create points table
create table public.points (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  amount integer not null,
  reason text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS (Row Level Security)
alter table public.attendance_logs enable row level security;
alter table public.points enable row level security;

-- 4. Create Policies
-- Allow users to view their own data
create policy "Users can view their own attendance" 
on public.attendance_logs for select 
using (auth.uid() = user_id);

create policy "Users can view their own points" 
on public.points for select 
using (auth.uid() = user_id);

-- Allow teachers (or anyone for MVP) to insert attendance
-- Note: In a real app, you'd check for a 'teacher' role here.
-- For MVP, we allow authenticated users to insert.
create policy "Enable insert for authenticated users" 
on public.attendance_logs for insert 
with check (auth.role() = 'authenticated');

create policy "Enable insert for authenticated users" 
on public.points for insert 
with check (auth.role() = 'authenticated');
