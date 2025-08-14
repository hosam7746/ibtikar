
-- جداول مبسّطة
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('student','parent','teacher','admin')) not null,
  full_name text,
  created_at timestamp with time zone default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  guardian_id uuid references auth.users(id) on delete set null,
  disability_type text,
  iep_text text,
  progress int default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.activities (
  id bigserial primary key,
  title text not null,
  description text,
  type text,
  difficulty int default 1,
  media_url text,
  created_at timestamp with time zone default now()
);

create table if not exists public.assignments (
  id bigserial primary key,
  student_id uuid references public.students(id) on delete cascade,
  activity_id bigint references public.activities(id) on delete set null,
  assigned_by uuid references auth.users(id),
  status text default 'pending',
  due_date date
);

-- تفعيل RLS
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.assignments enable row level security;

-- سياسات مبدئية (بساطة: كل مستخدم يقرأ ملفه، المعلم/الإدارة أوسع)
create policy if not exists "read_own_profile"
  on public.profiles for select
  using (id = auth.uid());

create policy if not exists "update_own_profile"
  on public.profiles for update
  using (id = auth.uid());

-- الطلاب: الطالب وولي الأمر والمعلم/الإدارة
create policy if not exists "read_students_general"
  on public.students for select
  using (
    user_id = auth.uid()
    or guardian_id = auth.uid()
  );

-- (يمكن لاحقًا إضافة جدول روابط بين المعلم والطالب وسياسات إضافية)

-- مزامنة role في profiles مع user_metadata.role بعد التسجيل
-- نفّذها يدويًا أو عبر Function/Trigger حسب حاجتك.
