import * as SQLite from 'expo-sqlite';
import { WeightAndJogdata } from './JogData';
import { Karttamoodi } from './karttamoodiEnum';

export type ProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null
}

export type KarttaModalProps=
{
  ChartsVisible: boolean
  setChartsVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  DataArr: WeightAndJogdata[]
  Karttamoodi: Karttamoodi
}

export type LuoProfiiliModalProps=
{
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  setInfogiven: (React.Dispatch<React.SetStateAction<boolean>>)
}
export type LiikeListaModalProps={
  modalVisibleLiikeLista: boolean
  setModalVisibleLiikeLista: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type OhjelmaModalProps={
  modalVisible: boolean
  setModalVisible: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type LiikeModalProps={
  modalVisibleLiike: boolean
  setModalVisibleLiike: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type PäiväModalProps={
  modalVisiblepv: boolean
  setModalVisiblepv: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type TreeniListaModalProps={
  modalVisibleTreeniLista: boolean
  setModalVisibleTreeniLista: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}
export type TreeniModalProps={
  modalVisibleTreeni: boolean
  setModalVisibleTreeni: (React.Dispatch<React.SetStateAction<boolean>>)
  db: SQLite.SQLiteDatabase | null

}