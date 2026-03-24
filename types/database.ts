import * as SQLite from 'expo-sqlite';

export type DbProps=
{
  db: SQLite.SQLiteDatabase | null
  setDb: (React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>>)
  setUserData: (React.Dispatch<React.SetStateAction<UserData[]>>) 
}

export type UserData = 
{
  FirstName: string
  LastName: string
  Weight_Kg: number
  Height_Cm: number
  Age: number
  Date: string
  UserID: number
}

