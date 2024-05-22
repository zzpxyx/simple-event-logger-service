# Simple Event Logger Service

## Initialize Database

```sql
create table events(id integer primary key, timestamp integer not null, name text not null, memo text);
```
