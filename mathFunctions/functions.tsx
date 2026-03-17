import { width, height } from '../App';

const GuidelineBaseWidth = 390;

export function laskeAvgNopeus(t0: number, t1:number, x0: number, x1:number):number // yksiköt ovat sekunteja ja metrejä
{
    return Number(((x1 - x0) / (t1 - t0)).toFixed(2))
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

            avgMatkaKilometrit = (kumulatiivinenMatka / iteraatiot)
            console.log(kumulatiivinenMatka)
        }
        return Number(avgMatkaKilometrit.toFixed(2)) //palautetaan matka kilometreinä
}


const horizontalScale = (size:number, floor = true, setMax = false) => 
{
    let result = width / GuidelineBaseWidth * size;
    let newSize = floor ? Math.floor(result) : result;
    return setMax && newSize > size ? size : newSize;
};

export { horizontalScale };