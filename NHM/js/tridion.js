var pageName = '';
var newURL='';
var languages = new Array(
		new Array('English', 'http://www.atlascopco.com/afus/'),
		new Array('English', 'http://www.atlascopco.com/alus/'),
		new Array('Français', 'http://www.atlascopco.com/dzfr/'),
		new Array('Português', 'http://www.atlascopco.com/aous/'),
		new Array('Español', 'http://www.atlascopco.com.ar/ares/'),
		new Array('English', 'http://www.atlascopco.am/amus/', 'Русский', 'http://www.atlascopco.am/amru/'),
		new Array('English', 'http://www.atlascopco.com.au/auus/'),
		new Array('Deutsch', 'http://www.atlascopco.at/atde/'),
		new Array('English', 'http://www.atlascopco.com.az/azus/'),
		new Array('English', 'http://www.atlascopco.com/bhus/'),
		new Array('Français', 'http://www.atlascopco.com/befr/', 'Nederlands', 'http://www.atlascopco.com/benl/'),
		new Array('Español', 'http://www.atlascopco.com/bzes/'),
		new Array('Français ', 'http://www.atlascopco.com/bjfr/'),
		new Array('Español', 'http://www.atlascopco.com/boes/'),
		new Array('English', 'http://www.atlascopco.com/baus/'),
		new Array('Português - Brasil', 'http://www.atlascopco.com.br/brus/'),
		new Array('English', 'http://www.atlascopco.com/bgus/'),
		new Array('Français ', 'http://www.atlascopco.com/bffr/'),
		new Array('Français ', 'http://www.atlascopco.bi/bifr/'),
		new Array('English', 'http://www.atlascopco.com/khus/'),
		new Array('Français ', 'http://www.atlascopco.com/cmfr/'),
		new Array('English', 'http://www.atlascopco.ca/caus/', 'Français ', 'http://www.atlascopco.ca/cafr/'),
		new Array('Français ', 'http://www.atlascopco.com/cffr/'),
		new Array('Français ', 'http://www.atlascopco.com/tdfr/'),
		new Array('Español', 'http://www.atlascopco.cl/cles/'),
		new Array('English', 'http://www.atlascopco.com.cn/cnus/', '中文', 'http://www.atlascopco.com.cn/cnzh/'),
		new Array('Español', 'http://www.atlascopco.com.co/coes/'),
		new Array('Français ', 'http://www.atlascopco.cd/cdfr/'),
		new Array('Français ', 'http://www.atlascopco.cg/cgfr/'),
		new Array('English', 'http://www.atlascopco.com//us/', 'Svenska', 'http://www.atlascopco.com//se/'),
		new Array('Español', 'http://www.atlascopco.co.cr/cres/'),
		new Array('English', 'http://www.atlascopco.com/hrus/'),
		new Array('Español', 'http://www.atlascopco.cu/cues/'),
		new Array('English', 'http://www.atlascopco.com/cyus/'),
		new Array('English', 'http://www.atlascopco.com/czus/'),
		new Array('Dansk', 'http://www.atlascopco.dk/dkus/'),
		new Array('English', 'http://www.atlascopco.com/djus/'),
		new Array('English', 'http://www.atlascopco.com.do/does/'),
		new Array('Español', 'http://www.atlascopco.ec/eces/'),
		new Array('English', 'http://www.atlascopco.com.eg/egus/'),
		new Array('Español', 'http://www.atlascopco.com/sves/'),
		new Array('English', 'http://www.atlascopco.com/erus/'),
		new Array('English', 'http://www.atlascopco.com/eeru/'),
		new Array('English', 'http://www.atlascopco.com/etus/'),
		new Array('English', 'http://www.atlascopco.fi/fius/'),
		new Array('Français', 'http://www.atlascopco.fr/frfr/'),
		new Array('Français ', 'http://www.atlascopco.com/gafr/'),
		new Array('Français ', 'http://www.atlascopco.com/gmfr/'),
		new Array('English', 'http://www.atlascopco.com/geus/', 'Русский', 'http://www.atlascopco.com/geru/'),
		new Array('Deutsch', 'http://www.atlascopco.de/dede/'),
		new Array('English', 'http://www.atlascopco.com/ghus/'),
		new Array('English', 'http://www.atlascopco.com.gr/grus/'),
		new Array('Español', 'http://www.atlascopco.com.gt/gtes/'),
		new Array('Français ', 'http://www.atlascopco.com/gnfr/'),
		new Array('Français ', 'http://www.atlascopco.com/gwfr/'),
		new Array('Español', 'http://www.atlascopco.hn/hnes/'),
		new Array('English', 'http://www.atlascopco.hk/hkus/', '中文', 'http://www.atlascopco.hk/hkzh/'),
		new Array('English', 'http://www.atlascopco.hu/huus/'),
		new Array('English', 'http://www.atlascopco.in/inus/'),
		new Array('English', 'http://www.atlascopco.com/idus/'),
		new Array('English', 'http://www.atlascopco.ir/irus/'),
		new Array('English', 'http://www.atlascopco.com/iqus/'),
		new Array('English', 'http://www.atlascopco.ie/ieus/'),
		new Array('Italiano', 'http://www.atlascopco.com/itus/'),
		new Array('Français ', 'http://www.atlascopco.com/cifr/'),
		new Array('English', 'http://www.atlascopco.com.jm/jmus/'),
		new Array('日本語', 'http://www.atlascopco.co.jp/jpus/'),
		new Array('English', 'http://www.atlascopco.com/jous/'),
		new Array('English', 'http://www.atlascopco.kz/kzus/', 'Русский', 'http://www.atlascopco.kz/kzru/'),
		new Array('English', 'http://www.atlascopco.com/keus/'),
		new Array('English', 'http://www.atlascopco.com/kwus/'),
		new Array('English', 'http://www.atlascopco.com/laus/'),
		new Array('Русский', 'http://www.atlascopco.lv/lvru/'),
		new Array('English', 'http://www.atlascopco.com/lbus/'),
		new Array('English', 'http://www.atlascopco.com/lrus/'),
		new Array('English', 'http://www.atlascopco.com/lyus/'),
		new Array('Русский', 'http://www.atlascopco.lt/ltru/'),
		new Array('Français', 'http://www.atlascopco.lu/lufr/'),
		new Array('English', 'http://www.atlascopco.com/mkus/'),
		new Array('English', 'http://www.atlascopco.com/mgus/'),
		new Array('English', 'http://www.atlascopco.mw/mwus/'),
		new Array('English', 'http://www.atlascopco.com.my/myus/'),
		new Array('Français ', 'http://www.atlascopco.com/mlfr/'),
		new Array('Français ', 'http://www.atlascopco.com/mrfr/'),
		new Array('English', 'http://www.atlascopco.com/muus/'),
		new Array('Español', 'http://www.atlascopco.com.mx/mxes/'),
		new Array('English', 'http://www.atlascopco.md/mdus/'),
		new Array('English', 'http://www.atlascopco.mn/mnus/'),
		new Array('Français ', 'http://www.atlascopco.com/mafr/'),
		new Array('English', 'http://www.atlascopco.com.na/naus/'),
		new Array('Nederlands', 'http://www.atlascopco.nl/nlus/'),
		new Array('English', 'http://www.atlascopco.co.nz/nzus/'),
		new Array('Español', 'http://www.atlascopco.com/nies/'),
		new Array('Français ', 'http://www.atlascopco.com/nefr/'),
		new Array('English', 'http://www.atlascopco.com/ngus/'),
		new Array('English', 'http://www.atlascopco.com/kpus/'),
		new Array('Norsk', 'http://www.atlascopco.no/nosv/'),
		new Array('English', 'http://www.atlascopco.com/omus/'),
		new Array('English', 'http://www.atlascopco.pk/pkus/'),
		new Array('Español', 'http://www.atlascopco.com/paes/'),
		new Array('Español', 'http://www.atlascopco.com.pe/pees/'),
		new Array('English', 'http://www.atlascopco.ph/phus/'),
		new Array('Polska', 'http://www.atlascopco.pl/plus/'),
		new Array('Português', 'http://www.atlascopco.pt/ptus/'),
		new Array('English', 'http://www.atlascopco.com/qaus/'),
		new Array('English', 'http://www.atlascopco.ro/rous/'),
		new Array('Русский', 'http://www.atlascopco.ru/ruru/'),
		new Array('Français ', 'http://www.atlascopco.rw/rwfr/'),
		new Array('English', 'http://www.atlascopco.com.sa/saus/'),
		new Array('Français ', 'http://www.atlascopco.com/snfr/'),
		new Array('English', 'http://www.atlascopco.com/csus/'),
		new Array('English', 'http://www.atlascopco.com.sc/scus/'),
		new Array('English', 'http://www.atlascopco.com/slfr/'),
		new Array('English', 'http://www.atlascopco.sg/sgus/'),
		new Array('English', 'http://www.atlascopco.sk/skus/'),
		new Array('English', 'http://www.atlascopco.com/sius/'),
		new Array('English', 'http://www.atlascopco.com/sous/'),
		new Array('English', 'http://www.atlascopco.co.za/zaus/'),
		new Array('한국어', 'http://www.atlascopco.co.kr/krus/'),
		new Array('Español', 'http://www.atlascopco.es/eses/'),
		new Array('Svenska', 'http://www.atlascopco.se/sesv/'),
		new Array('Deutsch', 'http://www.atlascopco.ch/chde/', 'Français ', 'http://www.atlascopco.ch/chfr/'),
		new Array('English', 'http://www.atlascopco.com/syus/'),
		new Array('English', 'http://www.atlascopco.com/twus/', '中文', 'http://www.atlascopco.com/twzh/'),
		new Array('Русский', 'http://www.atlascopco.com.tj/tjru/'),
		new Array('English', 'http://www.atlascopco.com/tzus/'),
		new Array('English', 'http://www.atlascopco.co.th/thus/'),
		new Array('Français ', 'http://www.atlascopco.com/tgfr/'),
		new Array('English', 'http://www.atlascopco.co.tt/ttus/'),
		new Array('Français ', 'http://www.atlascopco.com/tnfr/'),
		new Array('English', 'http://www.atlascopco.com.tr/trus/'),
		new Array('English', 'http://www.atlascopco.com/tmus/'),
		new Array('English', 'http://www.atlascopco.com/ugus/'),
		new Array('English', 'http://www.atlascopco.com/uaus/', 'Русский', 'http://www.atlascopco.com/uaru/'),
		new Array('English', 'http://www.atlascopco.com/aeus/'),
		new Array('English', 'http://www.atlascopco.co.uk/ukus/'),
		new Array('English', 'http://www.atlascopco.us/usus/'),
		new Array('English', 'http://www.atlascopco.com/uzus/', 'Русский', 'http://www.atlascopco.com/uzru/'),
		new Array('Español', 'http://www.atlascopco.com.ve/vees/'),
		new Array('English', 'http://www.atlascopco.vn/vnus/'),
		new Array('English', 'http://www.atlascopco.com/yeus/'),
		new Array('English', 'http://www.atlascopco.co.zm/zmus/'),
		new Array('English', 'http://www.atlascopco.co.zw/zwus/'));
var selectedCountry = 'Pakistan ';
var initialSplashCountryList = '<select id="country-select" name="countryselect" onChange="processSplashCountry(this)">' + 
	'<option value="">Select country</option>' +
	'<option value="0">Afghanistan</option>' +
	'<option value="1">Albania</option>' +
	'<option value="2">Algeria</option>' +
	'<option value="3">Angola</option>' +
	'<option value="4">Argentina</option>' +
	'<option value="5">Armenia</option>' +
	'<option value="6">Australia</option>' +
	'<option value="7">Austria</option>' +
	'<option value="8">Azerbaijan</option>' +
	'<option value="9">Bahrain</option>' +
	'<option value="10">Belgium</option>' +
	'<option value="11">Belize</option>' +
	'<option value="12">Benin</option>' +
	'<option value="13">Bolivia</option>' +
	'<option value="14">Bosnia-Herzegovina</option>' +
	'<option value="15">Brazil</option>' +
	'<option value="16">Bulgaria</option>' +
	'<option value="17">Burkina Faso</option>' +
	'<option value="18">Burundi</option>' +
	'<option value="19">Cambodia, Kingdom of</option>' +
	'<option value="20">Cameroon</option>' +
	'<option value="21">Canada</option>' +
	'<option value="22">Central African Republic</option>' +
	'<option value="23">Chad</option>' +
	'<option value="24">Chile</option>' +
	'<option value="25">China</option>' +
	'<option value="26">Colombia</option>' +
	'<option value="27">Congo, Democratic rep</option>' +
	'<option value="28">Congo, Republic</option>' +
	'<option value="30">Costa Rica</option>' +
	'<option value="31">Croatia</option>' +
	'<option value="32">Cuba</option>' +
	'<option value="33">Cyprus</option>' +
	'<option value="34">Czech republic</option>' +
	'<option value="35">Denmark</option>' +
	'<option value="36">Djibouti</option>' +
	'<option value="37">Dominican Republic</option>' +
	'<option value="38">Ecuador</option>' +
	'<option value="39">Egypt</option>' +
	'<option value="40">El Salvador</option>' +
	'<option value="41">Eritrea</option>' +
	'<option value="42">Estonia</option>' +
	'<option value="43">Ethiopia</option>' +
	'<option value="44">Finland</option>' +
	'<option value="45">France</option>' +
	'<option value="46">Gabon</option>' +
	'<option value="47">Gambia</option>' +
	'<option value="48">Georgia</option>' +
	'<option value="49">Germany</option>' +
	'<option value="50">Ghana</option>' +
	'<option value="51">Greece</option>' +
	'<option value="52">Guatemala</option>' +
	'<option value="53">Guinea</option>' +
	'<option value="54">Guinea Bissau</option>' +
	'<option value="55">Honduras</option>' +
	'<option value="56">Hong Kong</option>' +
	'<option value="57">Hungary</option>' +
	'<option value="58">India</option>' +
	'<option value="59">Indonesia</option>' +
	'<option value="60">Iran</option>' +
	'<option value="61">Iraq</option>' +
	'<option value="62">Ireland</option>' +
	'<option value="63">Italy</option>' +
	'<option value="64">Ivory Coast</option>' +
	'<option value="65">Jamaica</option>' +
	'<option value="66">Japan</option>' +
	'<option value="67">Jordan</option>' +
	'<option value="68">Kazakhstan</option>' +
	'<option value="69">Kenya</option>' +
	'<option value="70">Kuwait</option>' +
	'<option value="71">Laos</option>' +
	'<option value="72">Latvia</option>' +
	'<option value="73">Lebanon</option>' +
	'<option value="74">Liberia</option>' +
	'<option value="75">Libya</option>' +
	'<option value="76">Lithuania</option>' +
	'<option value="77">Luxemburg</option>' +
	'<option value="78">Macedonia</option>' +
	'<option value="79">Madagascar</option>' +
	'<option value="80">Malawi</option>' +
	'<option value="81">Malaysia</option>' +
	'<option value="82">Mali</option>' +
	'<option value="83">Mauritania</option>' +
	'<option value="84">Mauritius</option>' +
	'<option value="85">Mexico</option>' +
	'<option value="86">Moldova</option>' +
	'<option value="87">Mongolia</option>' +
	'<option value="88">Morocco</option>' +
	'<option value="89">Namibia</option>' +
	'<option value="90">Netherlands</option>' +
	'<option value="91">New Zealand</option>' +
	'<option value="92">Nicaragua</option>' +
	'<option value="93">Niger</option>' +
	'<option value="94">Nigeria</option>' +
	'<option value="95">North Korea</option>' +
	'<option value="96">Norway</option>' +
	'<option value="97">Oman</option>' +
	'<option value="98" selected="true">Pakistan </option>' +
	'<option value="99">Panama</option>' +
	'<option value="100">Peru</option>' +
	'<option value="101">Philippines</option>' +
	'<option value="102">Poland</option>' +
	'<option value="103">Portugal</option>' +
	'<option value="104">Qatar</option>' +
	'<option value="105">Romania</option>' +
	'<option value="106">Russia</option>' +
	'<option value="107">Rwanda</option>' +
	'<option value="108">Saudi Arabia</option>' +
	'<option value="109">Senegal</option>' +
	'<option value="110">Serbia and Montenegro</option>' +
	'<option value="111">Seychelles</option>' +
	'<option value="112">Sierra Leone</option>' +
	'<option value="113">Singapore</option>' +
	'<option value="114">Slovakia</option>' +
	'<option value="115">Slovenia</option>' +
	'<option value="116">Somalia</option>' +
	'<option value="117">South Africa</option>' +
	'<option value="118">South Korea</option>' +
	'<option value="119">Spain</option>' +
	'<option value="120">Sweden</option>' +
	'<option value="121">Switzerland</option>' +
	'<option value="122">Syria</option>' +
	'<option value="123">Taiwan</option>' +
	'<option value="124">Tajikistan</option>' +
	'<option value="125">Tanzania</option>' +
	'<option value="126">Thailand</option>' +
	'<option value="127">Togo</option>' +
	'<option value="128">Trinidad and Tobago</option>' +
	'<option value="129">Tunisia</option>' +
	'<option value="130">Turkey</option>' +
	'<option value="131">Turkmenistan</option>' +
	'<option value="132">Uganda</option>' +
	'<option value="133">Ukraine</option>' +
	'<option value="134">United Arab Emirates</option>' +
	'<option value="135">United Kingdom</option>' +
	'<option value="136">USA</option>' +
	'<option value="137">Uzbekistan</option>' +
	'<option value="138">Venezuela</option>' +
	'<option value="139">Vietnam</option>' +
	'<option value="140">Yemen</option>' +
	'<option value="141">Zambia</option>' +
	'<option value="142">Zimbabwe</option>' +
	'</select>';
var initialSplashLanguageList = '<select style="display: none; margin-left: 10px" id="splash-lang-select" name="langselect" onChange="processSplashLanguage(this)">' +
	'<option value="">Select language</option>' +
	'<option value="http://www.atlascopco.pk/pkus/" selected="true">English</option>' +
	'</select>';

var initialCountryList = '<select id="country-select" name="countryselect" onChange="processCountry(this)">' + 
	'<option value="">Select country</option>' +
	'<option value="0">Afghanistan</option>' +
	'<option value="1">Albania</option>' +
	'<option value="2">Algeria</option>' +
	'<option value="3">Angola</option>' +
	'<option value="4">Argentina</option>' +
	'<option value="5">Armenia</option>' +
	'<option value="6">Australia</option>' +
	'<option value="7">Austria</option>' +
	'<option value="8">Azerbaijan</option>' +
	'<option value="9">Bahrain</option>' +
	'<option value="10">Belgium</option>' +
	'<option value="11">Belize</option>' +
	'<option value="12">Benin</option>' +
	'<option value="13">Bolivia</option>' +
	'<option value="14">Bosnia-Herzegovina</option>' +
	'<option value="15">Brazil</option>' +
	'<option value="16">Bulgaria</option>' +
	'<option value="17">Burkina Faso</option>' +
	'<option value="18">Burundi</option>' +
	'<option value="19">Cambodia, Kingdom of</option>' +
	'<option value="20">Cameroon</option>' +
	'<option value="21">Canada</option>' +
	'<option value="22">Central African Republic</option>' +
	'<option value="23">Chad</option>' +
	'<option value="24">Chile</option>' +
	'<option value="25">China</option>' +
	'<option value="26">Colombia</option>' +
	'<option value="27">Congo, Democratic rep</option>' +
	'<option value="28">Congo, Republic</option>' +
	'<option value="30">Costa Rica</option>' +
	'<option value="31">Croatia</option>' +
	'<option value="32">Cuba</option>' +
	'<option value="33">Cyprus</option>' +
	'<option value="34">Czech republic</option>' +
	'<option value="35">Denmark</option>' +
	'<option value="36">Djibouti</option>' +
	'<option value="37">Dominican Republic</option>' +
	'<option value="38">Ecuador</option>' +
	'<option value="39">Egypt</option>' +
	'<option value="40">El Salvador</option>' +
	'<option value="41">Eritrea</option>' +
	'<option value="42">Estonia</option>' +
	'<option value="43">Ethiopia</option>' +
	'<option value="44">Finland</option>' +
	'<option value="45">France</option>' +
	'<option value="46">Gabon</option>' +
	'<option value="47">Gambia</option>' +
	'<option value="48">Georgia</option>' +
	'<option value="49">Germany</option>' +
	'<option value="50">Ghana</option>' +
	'<option value="51">Greece</option>' +
	'<option value="52">Guatemala</option>' +
	'<option value="53">Guinea</option>' +
	'<option value="54">Guinea Bissau</option>' +
	'<option value="55">Honduras</option>' +
	'<option value="56">Hong Kong</option>' +
	'<option value="57">Hungary</option>' +
	'<option value="58">India</option>' +
	'<option value="59">Indonesia</option>' +
	'<option value="60">Iran</option>' +
	'<option value="61">Iraq</option>' +
	'<option value="62">Ireland</option>' +
	'<option value="63">Italy</option>' +
	'<option value="64">Ivory Coast</option>' +
	'<option value="65">Jamaica</option>' +
	'<option value="66">Japan</option>' +
	'<option value="67">Jordan</option>' +
	'<option value="68">Kazakhstan</option>' +
	'<option value="69">Kenya</option>' +
	'<option value="70">Kuwait</option>' +
	'<option value="71">Laos</option>' +
	'<option value="72">Latvia</option>' +
	'<option value="73">Lebanon</option>' +
	'<option value="74">Liberia</option>' +
	'<option value="75">Libya</option>' +
	'<option value="76">Lithuania</option>' +
	'<option value="77">Luxemburg</option>' +
	'<option value="78">Macedonia</option>' +
	'<option value="79">Madagascar</option>' +
	'<option value="80">Malawi</option>' +
	'<option value="81">Malaysia</option>' +
	'<option value="82">Mali</option>' +
	'<option value="83">Mauritania</option>' +
	'<option value="84">Mauritius</option>' +
	'<option value="85">Mexico</option>' +
	'<option value="86">Moldova</option>' +
	'<option value="87">Mongolia</option>' +
	'<option value="88">Morocco</option>' +
	'<option value="89">Namibia</option>' +
	'<option value="90">Netherlands</option>' +
	'<option value="91">New Zealand</option>' +
	'<option value="92">Nicaragua</option>' +
	'<option value="93">Niger</option>' +
	'<option value="94">Nigeria</option>' +
	'<option value="95">North Korea</option>' +
	'<option value="96">Norway</option>' +
	'<option value="97">Oman</option>' +
	'<option value="98" selected="true">Pakistan </option>' +
	'<option value="99">Panama</option>' +
	'<option value="100">Peru</option>' +
	'<option value="101">Philippines</option>' +
	'<option value="102">Poland</option>' +
	'<option value="103">Portugal</option>' +
	'<option value="104">Qatar</option>' +
	'<option value="105">Romania</option>' +
	'<option value="106">Russia</option>' +
	'<option value="107">Rwanda</option>' +
	'<option value="108">Saudi Arabia</option>' +
	'<option value="109">Senegal</option>' +
	'<option value="110">Serbia and Montenegro</option>' +
	'<option value="111">Seychelles</option>' +
	'<option value="112">Sierra Leone</option>' +
	'<option value="113">Singapore</option>' +
	'<option value="114">Slovakia</option>' +
	'<option value="115">Slovenia</option>' +
	'<option value="116">Somalia</option>' +
	'<option value="117">South Africa</option>' +
	'<option value="118">South Korea</option>' +
	'<option value="119">Spain</option>' +
	'<option value="120">Sweden</option>' +
	'<option value="121">Switzerland</option>' +
	'<option value="122">Syria</option>' +
	'<option value="123">Taiwan</option>' +
	'<option value="124">Tajikistan</option>' +
	'<option value="125">Tanzania</option>' +
	'<option value="126">Thailand</option>' +
	'<option value="127">Togo</option>' +
	'<option value="128">Trinidad and Tobago</option>' +
	'<option value="129">Tunisia</option>' +
	'<option value="130">Turkey</option>' +
	'<option value="131">Turkmenistan</option>' +
	'<option value="132">Uganda</option>' +
	'<option value="133">Ukraine</option>' +
	'<option value="134">United Arab Emirates</option>' +
	'<option value="135">United Kingdom</option>' +
	'<option value="136">USA</option>' +
	'<option value="137">Uzbekistan</option>' +
	'<option value="138">Venezuela</option>' +
	'<option value="139">Vietnam</option>' +
	'<option value="140">Yemen</option>' +
	'<option value="141">Zambia</option>' +
	'<option value="142">Zimbabwe</option>' +
	'</select>';
var initialLanguageList = '<select id="lang-select" name="langselect" onChange="processLanguage(this)" disabled="true">' +
	'<option value="">Change language</option>' +
	'<option value="http://www.atlascopco.pk/pkus/" selected="true">English</option>' +
	'</select>';

// shows an optionlist if no country has been selected, the selected country otherwise - uses Prototype
// 0 - country button pressed; 1 - language button pressed
function showSelectedCountry(type) {
	if (type == 1) {
	// country selected, just display the selected one
		if (selectedCountry == "Select country")	{
			// corporate
			Element.update('lang-country', 'Corporate');
		} else {	//clicked on language
			Element.update('lang-country', selectedCountry);
		}
	} else {
		if (type == 0 || selectedCountry == "" || selectedCountry == "Select country") {
			// no country selected, show option list
			Element.update('lang-country', initialCountryList);
			processCountry($('country-select'));
			Element.update('langsel-outer', initialLanguageList);
		}
	}
}

function pc(objSelect) {
	var selectedValue = objSelect.options[objSelect.selectedIndex].value;
	var objForm = objSelect.form;
	var objLangSel = objForm.langselect;
	pageName = '';
	for (i = objLangSel.options.length - 1; i > 0; i--) {
		objLangSel.options[i] = null;
	}
	if (selectedValue == '') {
		objLangSel.disabled = true;
		return;
	}
	if (languages[selectedValue].length > 2) {
		objLangSel.disabled = false;
		for (i = 0; i < languages[selectedValue].length / 2; i++) {
			objLangSel.options[i + 1] = new Option(languages[selectedValue][2 * i], languages[selectedValue][2 * i + 1]);
		}
		objLangSel.style["display"] = "inline";
	} else if (languages[selectedValue].length == 2) {
		newURL = languages[selectedValue][1];
		rmbr(objForm);
		window.location = newURL;
	} else {
		objLangSel.style["display"] = "none";
	}
}

function pl(objSelect) {
	var objForm = objSelect.form;
	newURL = objSelect.options[objSelect.selectedIndex].value;
	if (newURL != '') {
		rmbr(objForm);
		window.location = newURL;
	}
}

function processCountry(objSelect) {
	var selectedValue = objSelect.options[objSelect.selectedIndex].value;
	var objForm = objSelect.form;
	var objLangSel = objForm.langselect;
	selectedCountry = objSelect.options[objSelect.selectedIndex].text;
	pageName = '';
	objForm.popupsubmit.disabled = true;
	for (i = objLangSel.options.length - 1; i >= 0; i--) {
		objLangSel.options[i] = null;
	}
	if (selectedValue == '') {
		objLangSel.disabled = true;
		objLangSel.options[0] = new Option("Change language", "");
		return;
	}
	if (languages[selectedValue].length > 2) {
		objLangSel.disabled = false;
		objLangSel.options[0] = new Option("Change language", "");
		for (i = 0; i < languages[selectedValue].length / 2; i++) {
			objLangSel.options[i + 1] = new Option(languages[selectedValue][2 * i], languages[selectedValue][2 * i + 1]);
		}
		objLangSel.style["display"] = "block";
	} else if (languages[selectedValue].length == 2) {
		newURL = languages[selectedValue][1];
		rmbr(objForm);
		objLangSel.options[0] = new Option(languages[selectedValue][0], languages[selectedValue][1]);
		objLangSel.disabled = true;
		objLangSel.style["display"] = "block";
		objForm.popupsubmit.disabled = false;
	} else {
		objLangSel.style["display"] = "none";
	}
}

function processSplashCountry(objSelect) {
	var selectedValue = objSelect.options[objSelect.selectedIndex].value;
	var objForm = objSelect.form;
	var objLangSel = objForm.langselect;
	selectedCountry = objSelect.options[objSelect.selectedIndex].text;
	pageName = '';
	newURL = "";
	for (i = objLangSel.options.length - 1; i >= 0; i--) {
		objLangSel.options[i] = null;
	}
	if (selectedValue == '') {
		objLangSel.style["display"] = "none";
		objLangSel.options[0] = new Option("Select language", "");
		return;
	}
	if (languages[selectedValue].length > 2) {
		objLangSel.options[0] = new Option("Select language", "");
		for (i = 0; i < languages[selectedValue].length / 2; i++) {
			objLangSel.options[i + 1] = new Option(languages[selectedValue][2 * i], languages[selectedValue][2 * i + 1]);
		}
		objLangSel.style["display"] = "inline";
	} else if (languages[selectedValue].length == 2) {
		newURL = languages[selectedValue][1];
		rmbr(objForm);
		objLangSel.options[0] = new Option(languages[selectedValue][0], languages[selectedValue][1]);
		objLangSel.style["display"] = "none";
	} else {
		objLangSel.style["display"] = "none";
	}
}

function processLanguage(objSelect) {
	var objForm = objSelect.form;
	newURL = objSelect.options[objSelect.selectedIndex].value;
	if (newURL == '') {
		objForm.popupsubmit.disabled = true;
	} else {
		objForm.popupsubmit.disabled = false;
		rmbr(objForm);
		newURL = newURL + pageName + "?from_lang_sel=yes";
	}
}

function processSplashLanguage(objSelect) {
	var objForm = objSelect.form;
	newURL = objSelect.options[objSelect.selectedIndex].value;
	if (newURL != '') {
		rmbr(objForm);
		newURL = newURL + pageName + "?from_lang_sel=yes";
	}
}

function processSplashCorporate() {
	var objSelect = $('lang-select');
	newURL = objSelect.options[objSelect.selectedIndex].value;
	if (newURL != '') {
		rmbr(objSelect.form);
		window.location = newURL;
	}
	return false;
}

function processSplashCountryLanguage() {
	if (newURL != '') {
		var objSelect = $('splash-lang-select');
		rmbr(objSelect.form);
		window.location = newURL;
	}
	return false;
}


/********************
* Cookie Management *
********************/


function setCookie(name, value, expires, path, domain, secure) {
	curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "")
	document.cookie = curCookie
}


function getCookie(name) {
	prefix = name + '='
	c = document.cookie
	nullstring = ''
	cookieStartIndex = c.indexOf(prefix)
	if (cookieStartIndex == -1) {
		return nullstring
	}
	cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length)
	if (cookieEndIndex == -1) {
		cookieEndIndex = c.length
	}
	return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex))
}


function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
	}
}


function fixDate(date) {
	base = new Date(0)
	skew = base.getTime()
	if (skew > 0) {
		date.setTime(date.getTime() - skew)
	}
}


function rmbr(form) {
	if (form) {
		deleteCookie("atlascopcoPakistan ", "/", "")
		if (form.remember.checked) {
			now = new Date()
			fixDate(now)
			now.setTime(now.getTime() + 31536000000) // 1 year
			setCookie("atlascopcoPakistan ", newURL, now, "/", "", "")
		} 
	}
}


window.onload = function () {
	var divs = document.getElementsByTagName('div');
	var blnFirst = false;
	for (var i = 0; i < divs.length; i++) {

	if (divs[i].id == 'modules') {
		blnFirst = true;
		continue;
	}
	if (divs[i].className == 'geheel') {
		if (blnFirst) {
			divs[i].className = '';
			blnFirst = false;
			}
		}
	}
}


var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
var unsafeString = "\"<>%\\^[]`\+\$\,";
// deleted these chars from the include list ";", "/", "?", ":", "@", "=", "&" and #
// so that we could analyze actual URLs

function isUnsafe(compareChar) {
// this function checks to see if a char is URL unsafe.
// Returns bool result. True = unsafe, False = safe

	if (unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32 && compareChar.charCodeAt(0) < 123) {
		return false; // found no unsafe chars, return false
	} else {
		return true;
	}
}


function decToHex(num, radix) { // part of the hex-ifying functionality
	var hexString = "";

	while (num >= radix) {
		temp = num % radix;
		num = Math.floor(num / radix);
		hexString += hexVals[temp];
	}
	hexString += hexVals[num];

	return reversal(hexString);
}


function reversal(s) { // part of the hex-ifying functionality
	var len = s.length;
	var trans = "";

	for (i = 0; i < len; i++) {
		trans = trans + s.substring(len - i - 1, len - i);
		s = trans;
	}

	return s;
}


function convert(val) { // this converts a given char to url hex form
	return "%" + decToHex(val.charCodeAt(0), 16);
}


function encodeIt(val) {
	var len = val.length;
	var backlen = len;
	var i = 0;

	var newStr	= "";
	var frag		= "";
	var encval	= "";
	var original = val;

	for (i=0; i < len; i++) {
		if (val.substring(i, i + 1).charCodeAt(0) < 255) { // hack to eliminate the rest of unicode from this
			if (isUnsafe(val.substring(i, i + 1)) == false) {
				newStr = newStr + val.substring(i, i + 1);
			} else {
				newStr = newStr + convert(val.substring(i, i + 1));
			}
		} else { // woops! restore.
			newStr = original;
			i = len; // short-circuit the loop and exit
		}
	}
	return newStr;
}