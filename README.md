# PV247 projekt

Dalibor Pantlík, Kamil Fňukal, Patrícia Andicsová

Představme si, že se nacházíme v roce 2012 a chci jezdit po Brně na kole, šalinou nebo autem. Naše appka bude na základě dopravních nehod doporučovat, který dopravní prostředek je vhodný pro zítřejší cestování.

Jelikož si hrajeme na to, že je rok 2012, máme informaci o tom, jaké nehody se “zítra” stanou (zítra v roce 2012). Proto dokážeme říct, aby uživatel jel zítra autem, protože se třeba stanou 3 nehody cyklistů. Informace o nehodách poskytuje brněnské API.

Přihlášený uživatel si může uložit předdefinované “oblíbené” lokace v Brně, ve kterých často jezdí a customizovat si tak, které nehody se mu budou zobrazovat. (To API poskytuje info o tom, kde se ta nehoda stala, tak dokážeme vyfiltrovat jen ty nehody, které se staly v lokacích, které má uživatel vytvořené). Na stránce bude taky vyhledávací pole na fulltext search v nehodách, které se staly za např. poslední týden. Dále filter podle typu nehody - auto, kolo, šalina.

Abychom nevyuživali firebase jen pro ukládání preferovaných lokací uživatelů, bude na stránce i formulář na “Report nehody”. Řekněme, že Brno nesbírá info o úplně všech nehodách a uživatelé mohou přidávat nehody, které se jim staly, manuálně skrz tento formulář. Tyto nehody budeme ukládat ve Firebase a budeme i zobrazovat na naši stránce v sekci “Moje nehody”


API: https://data.brno.cz/search

Firebase kolekce:
- Uživatel - id, name, accidents
- Lokace - id, name
- UživatelovaLokace - userId, locationId
- Accident - id, title, description, where, userId

Screens:
- Landing page
- Home - by default info o vhodném dopravním prostředku na zítřejší den
- Login page
- User detail - úpravy preferencí uživatelových lokací.
- Report accident page
- Accidents history
- Reported by user - Got from Brno API
