
export function laskeAvgNopeus(t0: number, t1:number, x0: number, x1:number):number
{
    return (x1 - x0) / (t1 - t0)
}

export function laskeLenkinKalorit(paino:number, aika:number, keskinopeus:number,):number
{
    let MET:number = 0 //metabolic equivalent of a task, tää on kerroin mikä vastaa suorituksen kuormittavuutta.
    const hidasNopeus:number = 7 //kilometriä per tunti
    const suuriNopeus:number = 12 //kilometriä per tunti

    if(keskinopeus < hidasNopeus)
        {
            MET = 7 //kevyt lenkki
        }
    else if(keskinopeus >= hidasNopeus && keskinopeus <= suuriNopeus)
        {
            MET = 10 //kohtainen lenkki
        }
    else
        {
            MET = 12 //nopealenkki
        }

        return (paino * (MET/60) * aika) 
}
export function laskeJuoksujenAvgMatka(juoksut:number[]):number // ottaa parametriksi taulukon juoksuista, voi olla esim 3 päivän juoksut tai 7 päivän juoksut joista sit lasketaan avg.
{
    let avgMatka:number = 0
    let kumulatiivinenMatka:number = 0
    for(let iteraatiot = 0; iteraatiot <= juoksut.length; iteraatiot++)
        {
            kumulatiivinenMatka =+ juoksut[iteraatiot]

            avgMatka = (kumulatiivinenMatka / iteraatiot)
        }
        return avgMatka
}