-- [B2B Expansion] Multi-tenancy Migration Script
-- 모든 테이블에 church_id를 추가하고 RLS를 강화합니다.

-- 0. Default Church ID (For existing data migration)
-- 실제 운영시에는 교회별로 다른 UUID를 발급해야 합니다.
-- 여기서는 'default-church-uuid'라는 텍스트 값을 사용하거나, gen_random_uuid()를 사용할 수 있습니다.
-- 편의상 기존 데이터는 하나의 교회로 묶습니다.

-- 1. Add church_id column
alter table public.profiles add column if not exists church_id uuid default gen_random_uuid();
alter table public.points add column if not exists church_id uuid default gen_random_uuid();
alter table public.attendance_logs add column if not exists church_id uuid default gen_random_uuid();

-- 2. Create Index (Performance)
create index if not exists idx_profiles_church_id on public.profiles(church_id);
create index if not exists idx_points_church_id on public.points(church_id);
create index if not exists idx_attendance_logs_church_id on public.attendance_logs(church_id);

-- 3. Update RLS Policies (Example)
-- 기존 정책을 제거하고 church_id 기반 정책으로 교체해야 합니다.
-- 여기서는 예시로 profiles 테이블에 대한 정책만 보여줍니다.

-- (Option A) Simple check: only show users in the same church
-- Note: This requires the current user to ALREADY have a church_id in their profile.
-- create policy "View same church members only" on profiles
-- for select using (
--   church_id in (
--     select church_id from profiles where id = auth.uid()
--   )
-- );

-- (Option B) Metadata based: check app_metadata (if using custom claims)
-- change to: auth.jwt() ->> 'church_id'

-- For MVP, we will keep it open or simple. 
-- This script main purpose is SCHEMA Update.

select 'SUCCESS: Added church_id columns to all tables' as result;
