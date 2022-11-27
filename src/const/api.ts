export const API_BRNO_BIKE_ACCIDENTS =
  'https://gis.brno.cz/ags1/rest/services/Hosted/Cyklo_nehody/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'

export const API_BRNO_BIKE_ACCIDENTS_DEV = 'http://localhost:3000/api/accidents/brno-dev'

export const EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE = {
  attributes: {
    datum: 1307145600000,
    nasledky: 'nehoda s následky na životě nebo zdraví',
    druh_vozidla: 'jízdní kolo',
    globalid: '{054C156B-AB87-4F3F-AD07-81E145FCE56A}',
    alkohol: 'Ano, obsah alkoholu v krvi od 1,0‰ do 1,5‰',
    druh_komun: 'komunikace místní',
    den: 6,
    usmrceno_os: 0,
    mesic_t: 'červen',
    nasledek: 'lehké zranění',
    rok: 2011,
    vek_skupina: '19-24',
    cas: 55,
    point_y: 49.20937458,
    target_fid: 90,
    den_v_tydnu: 'sobota',
    point_x: 16.63597382,
    rozhled: 'dobré',
    misto_nehody: 'žádné nebo žádné z uvedených',
    osoba: 'řidič',
    mesic: 6,
    join_count: 1,
    id: 60206110974.00001,
    stav_vozovky: 'povrch suchý, neznečistěný',
    srazka: 'jiný druh nehody',
    d: -595966.388,
    nazev: 'Brno-sever',
    e: -1159397.444,
    povetrnostni_podm: 'neztížené',
    zavineni: 'řidičem nemotorového vozidla',
    hmotna_skoda: 0,
    lehce_zran_os: 1,
    viditelnost: 'v noci - bez veřejného osvětlení, viditelnost nezhoršená vlivem povětrnostních podmínek',
    pricina: 'nehoda při provádění služebního zákroku (pronásledování pachatele atd.)',
    ozn_osoba: 'bez přilby (pouze u motocyklistů, příp. cyklistů)',
    tezce_zran_os: 0,
    ovlivneni_ridice: 1,
    stav_ridic: 'pod vlivem alkoholu obsah alkoholu v krvi 1 ‰ a víc',
    hodina: 0,
    objectid: 89,
    pohlavi: 'muž'
  },
  geometry: { x: 16.635973826073265, y: 49.209374582087854 }
}
