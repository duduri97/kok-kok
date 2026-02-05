-- [MVP FIX] Foreign Key Constraint Removal Script
-- 이 스크립트는 'dummy data'를 넣기 위해 강제적인 유저 ID 확인 제약을 임시로 해제합니다.

-- 1. Drop Foreign Key Constraints (FK 제약조건 제거)
-- profiles 테이블이 auth.users를 참조하지 않도록 수정
alter table public.profiles drop constraint if exists profiles_id_fkey;

-- points 테이블이 auth.users를 참조하지 않도록 수정
alter table public.points drop constraint if exists points_user_id_fkey;

-- attendance_logs 테이블이 auth.users를 참조하지 않도록 수정
alter table public.attendance_logs drop constraint if exists attendance_logs_user_id_fkey;


-- 2. Clear Existing Data (기존 데이터 초기화 - 중복 방지)
truncate table public.points;
truncate table public.profiles;


-- 3. Insert Dummy Profiles (가상 유저 생성)
-- 이제 auth.users에 없는 ID도 자유롭게 넣을 수 있습니다.
insert into public.profiles (id, nickname, role) values 
    ('00000000-0000-0000-0000-000000000001', 'David Kim', 'teens'),
    ('00000000-0000-0000-0000-000000000002', 'Grace Park', 'teens'),
    ('00000000-0000-0000-0000-000000000003', 'Joshua Lee', 'teens'),
    ('00000000-0000-0000-0000-000000000004', 'Daniel Choi', 'teens'),
    ('00000000-0000-0000-0000-000000000005', 'Rachel Han', 'teens'),
    ('00000000-0000-0000-0000-000000000006', 'Samuel Yoon', 'teens'),
    ('00000000-0000-0000-0000-000000000007', 'Esther Jung', 'teens');


-- 4. Insert Dummy Points (랭킹 테스트용 점수)
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

select 'SUCCESS: Dummy data inserted!' as result;
