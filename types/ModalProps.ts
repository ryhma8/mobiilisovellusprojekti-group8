import * as SQLite from 'expo-sqlite';

export type ProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null
}

export type LuoProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  setDb : React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>> 
  db: SQLite.SQLiteDatabase | null
  setInfogiven: (React.Dispatch<React.SetStateAction<boolean>>)
}
export type OhjelmaModalProps={
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type LiikeModalProps={
  modalVisible1: boolean
  setModalVisible1: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type PäiväModalProps={
  modalVisiblepv: boolean
  setModalVisiblepv: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}