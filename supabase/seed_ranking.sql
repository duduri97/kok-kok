-- Clean up existing mock data (optional, be careful in production)
-- delete from public.points;
-- delete from public.profiles where role = 'teens';

-- 1. Create Dummy Profiles (Teens)
insert into public.profiles (id, nickname, role, avatar_url)
values 
    ('00000000-0000-0000-0000-000000000001', 'David Kim', 'teens', ''),
    ('00000000-0000-0000-0000-000000000002', 'Grace Park', 'teens', ''),
    ('00000000-0000-0000-0000-000000000003', 'Joshua Lee', 'teens', ''),
    ('00000000-0000-0000-0000-000000000004', 'Daniel Choi', 'teens', ''),
    ('00000000-0000-0000-0000-000000000005', 'Rachel Han', 'teens', ''),
    ('00000000-0000-0000-0000-000000000006', 'Samuel Yoon', 'teens', ''),
    ('00000000-0000-0000-0000-000000000007', 'Esther Jung', 'teens', '')
on conflict (id) do nothing;

-- 2. Insert Initial Points to create Tier hierarchy
-- Diamond (1000+)
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000001', 1200, 'Season Start Bonus'); 

-- Platinum (501 ~ 1000)
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000002', 850, 'Bible Quiz Winner');
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000003', 600, 'Attendance Streak');

-- Gold (301 ~ 500)
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000004', 450, 'Sunday Service');

-- Silver (101 ~ 300)
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000005', 200, 'Welcome Bonus');
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000006', 150, 'Welcome Bonus');

-- Bronze (0 ~ 100)
insert into public.points (user_id, amount, reason) values ('00000000-0000-0000-0000-000000000007', 50, 'Registration');
