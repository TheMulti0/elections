import { ElectionsPageParser } from './elections-page-parser.service';
import { Party } from '../../models/iparty.model';

describe('Test parsing with sample HTML', () => {
  const html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
    '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
    '<head id="Head1"><title>\n' +
    '\tועדת הבחירות המרכזית לכנסת ה-23 | תוצאות ארציות\n' +
    '</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="language" content="Hebrew" /><meta name="Description" content="Heb-Description" /><meta name="Keywords" content="Heb-Keywords" /><link href="includes/styles.min.css" type="text/css" rel="stylesheet" media="screen" /><link href="includes/print.min.css" type="text/css" rel="stylesheet" media="print" /><link rel="alternate stylesheet" type="text/css" href="includes/x-large.min.css" title="A++" /><link rel="alternate stylesheet" type="text/css" href="includes/large.min.css" title="A+" /><link rel="alternate stylesheet" type="text/css" href="includes/medium.min.css" title="A" /><link rel="alternate stylesheet" type="text/css" href="includes/small.min.css" title="A-" /><link rel="alternate stylesheet" type="text/css" href="includes/x-small.min.css" title="A--" /><link rel="shortcut icon" href="images/favicon.ico" />\n' +
    '\t<script language="JavaScript1.2" src="functions/main.min.js" type="text/javascript"></script>\n' +
    '\t<script async src="https://www.googletagmanager.com/gtag/js?id=UA-96327585-1"></script>\n' +
    '\t<script>\n' +
    '\t\twindow.dataLayer = window.dataLayer || [];\n' +
    '\t\tfunction gtag() { dataLayer.push(arguments); }\n' +
    '\t\tgtag(\'js\', new Date());\n' +
    '\t\tgtag(\'config\', \'UA-96327585-1\');\n' +
    '\t</script>\n' +
    '\t</head>\n' +
    '<body>\n' +
    '\t<div class="Container">\n' +
    '\t\t<div class="SkipLinks">\n' +
    '\t\t\tדלג אל: <a href="#GlobalNavSkip" title="תפריט ראשי">תפריט ראשי</a> | <a href="#ContentSkip" title="תוכן העמוד">תוכן העמוד</a> | <a href="#SiteInfoSkip" title="תוכן תחתון">תוכן תחתון</a>\n' +
    '\t\t</div>\n' +
    '\t\t<div class="TopContent">\n' +
    '\t\t\t<div class="Header">\n' +
    '\t\t\t\t<div class="Utility">\n' +
    '\t\t\t\t\t<p class="FloatDir">ועדת הבחירות המרכזית לכנסת ה-23</p>\n' +
    '\t\t\t\t\t<div class="FloatOppDir">\n' +
    '\t\t\t\t\t\t<form name="FontSize" id="FontSize" action="#" method="get">\n' +
    '\t\t\t\t\t\t\t<input type="button" onclick="javascript: fontsizedown();" id="InsertImageButtonSmall" title="הקטן פונט" />\n' +
    '\t\t\t\t\t\t\t<input type="button" onclick="javascript: fontsizeup()" id="InsertImageButtonLarge" title="הגדל פונט" />\n' +
    '\t\t\t\t\t\t</form>\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t<div class="ClearBoth"></div>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t\t<div class="ClearBoth"></div>\n' +
    '\t\t\t\t<div class="Logo">\n' +
    '\t\t\t\t\t<img class="logoImg" src="images/isgLogo.png" alt="בחירות לכנסת ה - 23" title="בחירות לכנסת ה - 23" />\n' +
    '\t\t\t\t\t<h1>בחירות לכנסת ה-23</h1>\n' +
    '\t\t\t\t\t<h2 class="dateTime">ו\' באדר התש"ף, 2 במרץ 2020</h2>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t\t<div class="ClearBoth"></div>\n' +
    '\t\t\t</div>\n' +
    '\t\t\t<div class="NavBar" id="GlobalNavSkip">\n' +
    '\t\t\t\t<ul>\n' +
    '\t\t\t\t\t<li id="NavBarNational" class="current"><a href="nationalresults" title="תוצאות ארציות">תוצאות ארציות</a></li>\n' +
    '\t\t\t\t\t<li id="NavBarTowns" class="NavBarTowns"><a href="cityresults" title="תוצאות לפי ישובים">תוצאות לפי ישובים</a></li>\n' +
    '\t\t\t\t\t<li id="NavBarPollingStation" class="NavBarPollingStation"><a href="ballotresults" title="תוצאות לפי קלפיות">תוצאות לפי קלפיות</a></li>\n' +
    '\t\t\t\t</ul>\n' +
    '\t\t\t\t<div class="ClearBoth"></div>\n' +
    '\t\t\t</div>\n' +
    '\t\t\t\n' +
    '<div class="Content" id="ContentSkip">\n' +
    '\n' +
    '<div class="ContentTop">\n' +
    '   <p class="RealResults">תוצאות האמת של הבחירות לכנסת ה-23</p>\t\n' +
    '    <h1>\n' +
    '        תוצאות ארציות</h1>\n' +
    '    <p class="LastUpdate">\n' +
    '        תוצאות נכונות ל‏- 04/03/2020 11:58 לחתך הארצי\n' +
    '        \n' +
    '    </p>\n' +
    '</div>\n' +
    '<div>\n' +
    '    <p>\n' +
    'בהתאם להוראות סעיף 11 לחוק-יסוד: הכנסת וסעיף 84 לחוק הבחירות לכנסת [נוסח משולב], התשכ"ט-1969, התוצאות הסופיות של הבחירות לכנסת ה-23 יפורסמו ברשומות עד ליום ג\' י"ד באדר התש"ף, 10 במרץ 2020. עד ליום זה צפויות התוצאות להשתנות.\n' +
    '    </p>\n' +
    '</div>\n' +
    '<div class="ResultsSummary">\n' +
    '    <table cellpadding="0" cellspacing="0" class="ResultsSummaryTable">\n' +
    '        <tr>\n' +
    '            <th scope="col">סה&quot;כ בעלי זכות בחירה</th>\n' +
    '            <th scope="col">סה&quot;כ מצביעים</th>\n' +
    '            <th scope="col">\n' +
    '                שיעור הצבעה של הקולות שנספרו</th>\n' +
    '            <th scope="col">סה&quot;כ הקולות הכשרים</th>\n' +
    '            <th scope="col" class="Last">סה&quot;כ הקולות הפסולים</th>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td>\n' +
    '                6,453,255</td>\n' +
    '            <td>\n' +
    '                4,577,498</td>\n' +
    '            <td>\n' +
    '                70.93%</td>\n' +
    '            <td>\n' +
    '                4,552,743</td>\n' +
    '            <td class="Last">\n' +
    '                24,755\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '    </table>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div class="ResultsSummaryBottom"></div>\n' +
    '<div class="TableCategoryBox">\n' +
    '<table cellpadding="0" cellspacing="0" class="TableCategory">\n' +
    '<tr><th width="25%">שם הרשימה</th><th width="9%">אותיות הרשימה</th><th width="15%">אחוז קולות הרשימה<br/>\n' +
    '<span class="Comment"> מסה&quot;כ הקולות הכשרים</span></th><th class="Last" width="50%">מספר הקולות הכשרים לרשימה</th>\n' +
    '</tr></table></div>\n' +
    '<div style="width:948px; overflow:auto;">\n' +
    '<div class="TableDataBox" style=" overflow: auto;-ms-overflow-y: auto;-ms-overflow-x: hidden;overflow-x: hidden;">\n' +
    '<table cellpadding="0" cellspacing="0" class="TableData" style="width: 948px;">\n' +
    '\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'הליכוד בהנהגת בנימין נתניהו לראשות הממשלה\'>הליכוד בהנהגת בנימין נתניהו לראשות הממשלה</th>\n' +
    '<td scope="row" width="9%">מחל</td>\n' +
    '<td scope="row" width="15%">29.46%</td>                          \n' +
    '<td width="50%" class="Last" title="הליכוד בהנהגת בנימין נתניהו לראשות הממשלה" scope="row"><div class="FloatDir"> 1,341,096</div>\n' +
    '<div style="width: 75%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'כחול לבן בראשות בני גנץ\'>כחול לבן בראשות בני גנץ</th>\n' +
    '<td scope="row" width="9%">פה</td>\n' +
    '<td scope="row" width="15%">26.56%</td>                          \n' +
    '<td width="50%" class="Last" title="כחול לבן בראשות בני גנץ" scope="row"><div class="FloatDir"> 1,209,115</div>\n' +
    '<div style="width: 67.6190406950733%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'הרשימה המשותפת חד"ש, רע"מ, תע"ל, בל"ד\'>הרשימה המשותפת חד"ש, רע"מ, תע"ל, בל"ד</th>\n' +
    '<td scope="row" width="9%">ודעם</td>\n' +
    '<td scope="row" width="15%">12.64%</td>                          \n' +
    '<td width="50%" class="Last" title="הרשימה המשותפת חד"ש, רע"מ, תע"ל, בל"ד" scope="row"><div class="FloatDir"> 575,505</div>\n' +
    '<div style="width: 32.1847764813257%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל\'>התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל</th>\n' +
    '<td scope="row" width="9%">שס</td>\n' +
    '<td scope="row" width="15%">7.71%</td>                          \n' +
    '<td width="50%" class="Last" title="התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל" scope="row"><div class="FloatDir"> 351,134</div>\n' +
    '<div style="width: 19.6369611124036%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'יהדות התורה והשבת אגודת ישראל - דגל התורה\'>יהדות התורה והשבת אגודת ישראל - דגל התורה</th>\n' +
    '<td scope="row" width="9%">ג</td>\n' +
    '<td scope="row" width="15%">6.01%</td>                          \n' +
    '<td width="50%" class="Last" title="יהדות התורה והשבת אגודת ישראל - דגל התורה" scope="row"><div class="FloatDir"> 273,696</div>\n' +
    '<div style="width: 15.3062867982605%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'העבודה - גשר - מרצ\'>העבודה - גשר - מרצ</th>\n' +
    '<td scope="row" width="9%">אמת</td>\n' +
    '<td scope="row" width="15%">5.83%</td>                          \n' +
    '<td width="50%" class="Last" title="העבודה - גשר - מרצ" scope="row"><div class="FloatDir"> 265,372</div>\n' +
    '<div style="width: 14.8407720252689%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'ישראל ביתנו בראשות אביגדור ליברמן\'>ישראל ביתנו בראשות אביגדור ליברמן</th>\n' +
    '<td scope="row" width="9%">ל</td>\n' +
    '<td scope="row" width="15%">5.75%</td>                          \n' +
    '<td width="50%" class="Last" title="ישראל ביתנו בראשות אביגדור ליברמן" scope="row"><div class="FloatDir"> 261,856</div>\n' +
    '<div style="width: 14.6441418064031%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'ימינה הימין החדש – הבית היהודי – האיחוד הלאומי\'>ימינה הימין החדש – הבית היהודי – האיחוד הלאומי</th>\n' +
    '<td scope="row" width="9%">טב</td>\n' +
    '<td scope="row" width="15%">5.23%</td>                          \n' +
    '<td width="50%" class="Last" title="ימינה הימין החדש – הבית היהודי – האיחוד הלאומי" scope="row"><div class="FloatDir"> 238,246</div>\n' +
    '<div style="width: 13.323766531255%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'עוצמה יהודית בראשות איתמר בן גביר\'>עוצמה יהודית בראשות איתמר בן גביר</th>\n' +
    '<td scope="row" width="9%">נץ</td>\n' +
    '<td scope="row" width="15%">0.42%</td>                          \n' +
    '<td width="50%" class="Last" title="עוצמה יהודית בראשות איתמר בן גביר" scope="row"><div class="FloatDir"> 19,232</div>\n' +
    '<div style="width: 1.07553821650352%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'עוצמה ליברלית – כלכלית בראשות גלעד אלפר\'>עוצמה ליברלית – כלכלית בראשות גלעד אלפר</th>\n' +
    '<td scope="row" width="9%">ז</td>\n' +
    '<td scope="row" width="15%">0.08%</td>                          \n' +
    '<td width="50%" class="Last" title="עוצמה ליברלית – כלכלית בראשות גלעד אלפר" scope="row"><div class="FloatDir"> 3,739</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'קול הנשים\'>קול הנשים</th>\n' +
    '<td scope="row" width="9%">נ</td>\n' +
    '<td scope="row" width="15%">0.06%</td>                          \n' +
    '<td width="50%" class="Last" title="קול הנשים" scope="row"><div class="FloatDir"> 2,759</div>\n' +
    '<div style="width: 1%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'הפיראטים לדמוקרטיה לחצו כאן\'>הפיראטים לדמוקרטיה לחצו כאן</th>\n' +
    '<td scope="row" width="9%">ףז</td>\n' +
    '<td scope="row" width="15%">0.03%</td>                          \n' +
    '<td width="50%" class="Last" title="הפיראטים לדמוקרטיה לחצו כאן" scope="row"><div class="FloatDir"> 1,426</div>\n' +
    '<div style="width: 1%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'משפט צדק, בראשות ד"ר לריסה עמיר\n' +
    '\'>משפט צדק, בראשות ד"ר לריסה עמיר\n' +
    '</th>\n' +
    '<td scope="row" width="9%">קץ</td>\n' +
    '<td scope="row" width="15%">0.03%</td>                          \n' +
    '<td width="50%" class="Last" title="משפט צדק, בראשות ד"ר לריסה עמיר\n' +
    '" scope="row"><div class="FloatDir"> 1,365</div>\n' +
    '<div style="width: 1%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'ישראליסט זכויותינו בקולנו לחיות טוב יותר\'>ישראליסט זכויותינו בקולנו לחיות טוב יותר</th>\n' +
    '<td scope="row" width="9%">ק</td>\n' +
    '<td scope="row" width="15%">0.02%</td>                          \n' +
    '<td width="50%" class="Last" title="ישראליסט זכויותינו בקולנו לחיות טוב יותר" scope="row"><div class="FloatDir"> 970</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'אני ואתה – מפלגת העם הישראלית\'>אני ואתה – מפלגת העם הישראלית</th>\n' +
    '<td scope="row" width="9%">כן</td>\n' +
    '<td scope="row" width="15%">0.02%</td>                          \n' +
    '<td width="50%" class="Last" title="אני ואתה – מפלגת העם הישראלית" scope="row"><div class="FloatDir"> 809</div>\n' +
    '<div style="width: 1%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'הכח להשפיע למען הציבור לחיות בכבוד\'>הכח להשפיע למען הציבור לחיות בכבוד</th>\n' +
    '<td scope="row" width="9%">נז</td>\n' +
    '<td scope="row" width="15%">0.02%</td>                          \n' +
    '<td width="50%" class="Last" title="הכח להשפיע למען הציבור לחיות בכבוד" scope="row"><div class="FloatDir"> 691</div>\n' +
    '<div style="width: 1%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'סדר חדש לשינוי שיטת הבחירות בראשות עו"ד אביטל אופק\'>סדר חדש לשינוי שיטת הבחירות בראשות עו"ד אביטל אופק</th>\n' +
    '<td scope="row" width="9%">קך</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="סדר חדש לשינוי שיטת הבחירות בראשות עו"ד אביטל אופק" scope="row"><div class="FloatDir"> 673</div>\n' +
    '<div style="width: 1%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'איחוד הברית והשותפות\'>איחוד הברית והשותפות</th>\n' +
    '<td scope="row" width="9%">ינ</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="איחוד הברית והשותפות" scope="row"><div class="FloatDir"> 669</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'מתקדמת (בשיתוף עם תנועת הדרור העברי)\'>מתקדמת (בשיתוף עם תנועת הדרור העברי)</th>\n' +
    '<td scope="row" width="9%">נק</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="מתקדמת (בשיתוף עם תנועת הדרור העברי)" scope="row"><div class="FloatDir"> 623</div>\n' +
    '<div style="width: 1%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'דעם כלכלה ירוקה מדינה אחת\'>דעם כלכלה ירוקה מדינה אחת</th>\n' +
    '<td scope="row" width="9%">ץ</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="דעם כלכלה ירוקה מדינה אחת" scope="row"><div class="FloatDir"> 609</div>\n' +
    '<div style="width: 1%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'הלב היהודי בראשות אלי יוסף\'>הלב היהודי בראשות אלי יוסף</th>\n' +
    '<td scope="row" width="9%">כ</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="הלב היהודי בראשות אלי יוסף" scope="row"><div class="FloatDir"> 504</div>\n' +
    '<div style="width: 1%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'שמע בראשות נפתלי גולדמן\'>שמע בראשות נפתלי גולדמן</th>\n' +
    '<td scope="row" width="9%">קי</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="שמע בראשות נפתלי גולדמן" scope="row"><div class="FloatDir"> 441</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'מפלגת הגוש התנ"כי\'>מפלגת הגוש התנ"כי</th>\n' +
    '<td scope="row" width="9%">יק</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="מפלגת הגוש התנ"כי" scope="row"><div class="FloatDir"> 385</div>\n' +
    '<div style="width: 1%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'קמ"ה – קידום מעמד הפרט\'>קמ"ה – קידום מעמד הפרט</th>\n' +
    '<td scope="row" width="9%">ני</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="קמ"ה – קידום מעמד הפרט" scope="row"><div class="FloatDir"> 354</div>\n' +
    '<div style="width: 1%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'אדום לבן – ח\'ירבת דוראן בראשות עמי פינשטיין מחכים למשיח? משיח כבר כאן...\'>אדום לבן – ח\'ירבת דוראן בראשות עמי פינשטיין מחכים למשיח? משיח כבר כאן...</th>\n' +
    '<td scope="row" width="9%">יז</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="אדום לבן – ח\'ירבת דוראן בראשות עמי פינשטיין מחכים למשיח? משיח כבר כאן..." scope="row"><div class="FloatDir"> 335</div>\n' +
    '<div style="width: 1%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'החזון בראשות ציון אלון\'>החזון בראשות ציון אלון</th>\n' +
    '<td scope="row" width="9%">י</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="החזון בראשות ציון אלון" scope="row"><div class="FloatDir"> 330</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'פעולה לישראל\'>פעולה לישראל</th>\n' +
    '<td scope="row" width="9%">זך</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="פעולה לישראל" scope="row"><div class="FloatDir"> 270</div>\n' +
    '<div style="width: 1%;" class="DataBar Green"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'מנהיגות חברתית\'>מנהיגות חברתית</th>\n' +
    '<td scope="row" width="9%">יר</td>\n' +
    '<td scope="row" width="15%">0.01%</td>                          \n' +
    '<td width="50%" class="Last" title="מנהיגות חברתית" scope="row"><div class="FloatDir"> 269</div>\n' +
    '<div style="width: 1%;" class="DataBar Yellow"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'כבוד האדם, בראשות עו"ד ארקדי פוגץ\'\'>כבוד האדם, בראשות עו"ד ארקדי פוגץ\'</th>\n' +
    '<td scope="row" width="9%">יף</td>\n' +
    '<td scope="row" width="15%">0.00%</td>                          \n' +
    '<td width="50%" class="Last" title="כבוד האדם, בראשות עו"ד ארקדי פוגץ\'" scope="row"><div class="FloatDir"> 218</div>\n' +
    '<div style="width: 1%;" class="DataBar Purple"></div></td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<th scope="row" width="25%" title=\'צומת התנועה לציונות מתחדשת\'>צומת התנועה לציונות מתחדשת</th>\n' +
    '<td scope="row" width="9%">זץ</td>\n' +
    '<td scope="row" width="15%">0.00%</td>                          \n' +
    '<td width="50%" class="Last" title="צומת התנועה לציונות מתחדשת" scope="row"><div class="FloatDir"> 52</div>\n' +
    '<div style="width: 1%;" class="DataBar Blue"></div></td>\n' +
    '</tr></table></div></div>\n' +
    '\n' +
    '<div class="Footer" id="SiteInfoSkip"><div class="FloatOppDir">' +
    '<p><a id="ContentPlaceHolder1_DownloadCSV1_DownloadCSVBallots" class="ExcelLink" title="יצוא תוצאות לפי קלפיות לקובץ אקסל" OnClick="javascript: window.open(&#39;https://media23.bechirot.gov.il/files/expb.csv?&#39;,&#39;name&#39;,&#39;height=100, width=100,toolbar=no,location=center,directories=no,status=no, menubar=no,scrollbars=yes,location=no,resizable=no,top=&#39;+(window.screen.height/2 - 100 / 2)+&#39;, left=&#39; + ((window.screen.width - 100) / 2));return false;Target=&#39;_blank&#39;" href="javascript: window.open(&#39;https://media23.bechirot.gov.il/files/expb.csv?&#39;,&#39;name&#39;,&#39;height=100, width=100,toolbar=no,directories=no,status=no, menubar=no,location=no,scrollbars=yes,resizable=no,top=&#39;+(window.screen.height/2 - 100/ 2)+&#39;, left=&#39; + ((window.screen.width - 100) / 2));return false;Target=&#39;_blank&#39;">יצא לאקסל - תוצאות לפי קלפיות</a></p>\n' +
    '<p><a id="ContentPlaceHolder1_DownloadCSV1_DownloadCSVCities" class="ExcelLink" title="יצוא תוצאות לפי יישובים לקובץ אקסל" OnClick="javascript: window.open(&#39;https://media23.bechirot.gov.il/files/expc.csv?&#39;,&#39;name&#39;,&#39;height=100, width=100,toolbar=no,location=center,directories=no,status=no, menubar=no,scrollbars=yes,location=no,resizable=no,top=&#39;+(window.screen.height/2 - 100 / 2)+&#39;, left=&#39; + ((window.screen.width - 100) / 2));return false;Target=&#39;_blank&#39;" href="javascript: window.open(&#39;https://media23.bechirot.gov.il/files/expc.csv?&#39;,&#39;name&#39;,&#39;height=100, width=100,toolbar=no,directories=no,status=no, menubar=no,location=no,scrollbars=yes,resizable=no,top=&#39;+(window.screen.height/2 - 100/ 2)+&#39;, left=&#39; + ((window.screen.width - 100) / 2));return false;Target=&#39;_blank&#39;">יצא לאקסל - תוצאות לפי יישובים</a></p>\n' +
    '</div><div class="ClearBoth"></div></div>' +
    '</div>\n' +
    '\n' +
    '\t\t</div>' +
    '\t</div>' +
    '</body>' +
    '</html>';

  const parties: Party[] = ElectionsPageParser.parse(html);
  expect(parties.length).not.toBe(0);
});
