-- Run once against the Neon database referenced by DATABASE_URL.

create table if not exists quiz_leads (
  id         bigserial primary key,
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  phone      text,
  business   text,
  answers    jsonb not null,
  score      int not null,
  tier       text not null,
  source     text
);

create index if not exists quiz_leads_created_at_idx on quiz_leads (created_at desc);
create index if not exists quiz_leads_tier_idx on quiz_leads (tier);
