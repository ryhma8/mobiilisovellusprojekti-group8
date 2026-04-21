import { coordType } from "../types/coordType"



export function laskeAvgNopeus(t0: number, t1:number, x0: number, x1:number):number // yksiköt ovat sekunteja ja metrejä
{
    return parseFloat(((x1 - x0) / (t1 - t0)).toFixed(2))
}

export function laskeLenkinKalorit(painoKilogrammoina:number, Minuutit:number, keskinopeusMPS:number,):number
{
    let MET:number = 0 //metabolic equivalent of a task, tää on kerroin mikä vastaa suorituksen kuormittavuutta.
    const keskinopeusKMH:number = (keskinopeusMPS/0.27778)
    const hidasNopeus:number = 7 //kilometriä per tunti
    const suuriNopeus:number = 12 //kilometriä per tunti

    if(keskinopeusKMH < hidasNopeus)
        {
            MET = 7 //kevyt lenkki
            console.log("kevyt, " +keskinopeusKMH)
        }
    else if(keskinopeusKMH >= hidasNopeus && keskinopeusKMH <= suuriNopeus)
        {
            MET = 10 //kohtainen lenkki
            console.log("kohtalainen, " +keskinopeusKMH)
        }
    else
        {
            MET = 12 //nopealenkki
            console.log("rankka, " +keskinopeusKMH)
        }

        return Number((painoKilogrammoina * (MET/60) * Minuutit).toFixed(2))
}
export function laskeJuoksujenAvgMatka(juoksut:number[]):number // ottaa parametriksi taulukon juoksuista, voi olla esim 3 päivän juoksut tai 7 päivän juoksut joista sit lasketaan avg.
{
    let avgMatkaKilometrit:number = 0
    let kumulatiivinenMatka:number = 0
    for(let iteraatiot = 0; iteraatiot < juoksut.length; iteraatiot++)
        {
            kumulatiivinenMatka += juoksut[iteraatiot]

            avgMatkaKilometrit = (kumulatiivinenMatka / (iteraatiot+1))
                
            console.log("kumulatiivinen matka " + kumulatiivinenMatka + " " + "iteraatiot " + (iteraatiot+1))
            console.log("juoksu iteraatio "+juoksut[iteraatiot])
        }
        console.log("avgmatkat" + avgMatkaKilometrit)
        return Number(avgMatkaKilometrit) //palautetaan matka kilometreinä
}

export function LaskeMatkaKoordinaateista(coordArr: coordType[]):number
{
    const R = 6371.0 //maan radius
    let kokonaisMatka:number = 0

    for(let iteraatiot = 0; iteraatiot < coordArr.length-1; iteraatiot++){

    //koordinaatti 1
    let lat1 = coordArr[iteraatiot].lat * Math.PI / 180 //muutetaan radiaaneiksi heti
    let lng1 = coordArr[iteraatiot].lng * Math.PI / 180
    //koordinaatti 2 
    let lat2 = coordArr[iteraatiot+1].lat * Math.PI / 180
    let lng2 = coordArr[iteraatiot+1].lng * Math.PI / 180

    //console.log("lat1 " + lat1 + " " + "lat2 " + lat2 + " " + "lng1 " + lng1 + " " + "lng2 " + lng2 + " " + iteraatiot)

    let deltalat = (lat2 - lat1) // deltalatitude, eli leveyspiirin muutos
    let deltalng = (lng2 - lng1) // deltaaltitude, eli korkeuspiirin muutos    
    
    let a = Math.sin(deltalat / 2)**2 + 
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltalng / 2)**2

    let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a))
    let kumulatiivinenMatka = R * c //lasketaan kahden koordinaatin (lat/lng1 ja lat2/lng2) välinen matka (kumulatiivinenMatka) ja lisätään se lopuksi kokonaisMatkaan

    kokonaisMatka += kumulatiivinenMatka

    //console.log(kokonaisMatka)
    }
    return kokonaisMatka
}


