import * as SQLite from 'expo-sqlite';

export type DbProps=
{
  db: SQLite.SQLiteDatabase | null
  setDb: (React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>>)
  setUserId: (React.Dispatch<React.SetStateAction<number | undefined>>)
}

export type RefreshDbProps=
{
  setDb: (React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>>)
}



