var timeZoneList = [
  {
    title: 'CN 亚洲/北京 Asia/Shanghai',
    value: 'Asia/Shanghai',
    offset: 8,
    lat: 39.9,
    lng: 116.4
  },

  {
    title: 'HK 亚洲/香港 Asia/Hong_Kong',
    value: 'Asia/Hong_Kong',
    offset: 8,
    lat: 22.3193039,
    lng: 114.1693611
  },
  {
    title: 'MN 亚洲/乌兰巴托市 Asia/Ulaanbaatar',
    value: 'Asia/Ulaanbaatar',
    offset: 8,
    lat: 47.88639879999999,
    lng: 106.9057439
  },
  {
    title: 'MY 亚洲/吉隆坡 Asia/Kuala_Lumpur',
    value: 'Asia/Kuala_Lumpur',
    offset: 8,
    lat: 3.1569486,
    lng: 101.712303
  },
  {
    title: 'SG 亚洲/新加坡 Asia/Singapore',
    value: 'Asia/Singapore',
    offset: 8,
    lat: 1.352083,
    lng: 103.819836
  },
  {
    title: 'KR 亚洲/首尔 Asia/Seoul',
    value: 'Asia/Seoul',
    offset: 9,
    lat: 37.566535,
    lng: 126.9779692
  },
  {
    title: 'KP 亚洲/平壤 Asia/Pyongyang',
    value: 'Asia/Pyongyang',
    offset: 9,
    lat: 39.0392193,
    lng: 125.7625241
  },
  {
    title: 'JP 亚洲/东京 Asia/Tokyo',
    value: 'Asia/Tokyo',
    offset: 9,
    lat: 35.6761919,
    lng: 139.6503106
  },
  {
    title: 'AU 澳大利亚/达尔文 Australia/Darwin',
    value: 'australia/darwin',
    offset: 9.5,
    lat: -12.4637333,
    lng: 130.8444446
  },
  {
    title: 'PG 太平洋/莫尔兹比港',
    value: 'pacific/port_moresby',
    offset: 10,
    lat: -9.443800399999999,
    lng: 147.1802671
  },
  {
    title: 'AU 澳大利亚/墨尔本 Australia/Melbourne',
    value: 'australia/melbourne',
    offset: 10,
    lat: -37.8136276,
    lng: 144.9630576
  },
  {
    title: 'AU 澳大利亚/悉尼 Australia/Sydney',
    value: 'australia/sydney',
    offset: 10,
    lat: -33.8688197,
    lng: 151.2092955
  },
  {
    title: 'SB 太平洋/瓜达尔卡纳尔岛 Pacific/Guadalcanal',
    value: 'pacific/guadalcanal',
    offset: 11,
    lat: -9.577328399999999,
    lng: 160.1455805
  },
  {
    title: 'NF 太平洋/诺福克 Pacific/Norfolk',
    value: 'pacific/norfolk',
    offset: 11.5,
    lat: 36.8507689,
    lng: -76.28587259999999
  },
  {
    title: 'FJ 太平洋/斐济 Pacific/Fiji',
    value: 'pacific/fiji',
    offset: 12,
    lat: -17.713371,
    lng: 178.065032
  },
  {
    title: 'NZ 太平洋/查塔姆 Pacific/Chatham',
    value: 'pacific/chatham',
    offset: 12.75,
    lat: 42.4048028,
    lng: -82.19103779999999
  },
  {
    title: 'UM 太平洋/中途岛 Pacific/Midway',
    value: 'pacific/midway',
    offset: -11,
    lat: 28.2072168,
    lng: -177.3734926
  },
  {
    title: 'US 美国/夏威夷 US/Hawaii',
    value: 'us/hawaii',
    offset: -10,
    lat: 19.8967662,
    lng: -155.5827818
  },
  {
    title: 'US 美国阿拉斯加/中途岛 US/Alaska',
    value: 'us/alaska',
    offset: -8,
    lat: 64.20084129999999,
    lng: -149.4936733
  },
  {
    title: 'CA 美洲/温哥华 America/Vancouver',
    value: 'america/vancouver',
    offset: -7,
    lat: 49.2827291,
    lng: -123.1207375
  },
  {
    title: 'US 美国/洛杉矶 America/Los_Angeles',
    value: 'america/los_angeles',
    offset: -7,
    lat: 34.0522342,
    lng: -118.2436849
  },
  {
    title: 'US 美国/凤凰城 America/Phoenix',
    value: 'america/phoenix',
    offset: -7,
    lat: 33.4483771,
    lng: -112.0740373
  },
  {
    title: 'US 美国/芝加哥 America/Chicago',
    value: 'america/chicago',
    offset: -5,
    lat: 41.8781136,
    lng: -87.6297982
  },
  {
    title: 'MX 美洲/墨西哥城 America/Mexico_City',
    value: 'america/mexico_city',
    offset: -5,
    lat: 19.4326077,
    lng: -99.133208
  },
  {
    title: 'US 美国/纽约 America/New_York',
    value: 'america/new_york',
    offset: -4,
    lat: 40.7127753,
    lng: -74.0059728
  },
  {
    title: 'CU 美洲/哈瓦那 America/Havana',
    value: 'america/havana',
    offset: -4,
    lat: 23.1135925,
    lng: -82.3665956
  },
  {
    title: 'PE 美洲/利马 America/Lima',
    value: 'america/lima',
    offset: -5,
    lat: -12.0463731,
    lng: -77.042754
  },
  {
    title: 'VE 美洲/加拉加斯 America/Caracas',
    value: 'america/caracas',
    offset: -4,
    lat: 10.4805937,
    lng: -66.90360629999999
  },
  {
    title: 'AR 美洲/阿根廷 America/Argentina',
    value: 'america/argentina',
    offset: -3,
    lat: -38.416097,
    lng: -63.61667199999999
  },
  {
    title: 'GL 努克 America/Nuuk',
    value: 'america/nuuk',
    offset: -2,
    lat: 64.17432339999999,
    lng: -51.7372787
  },
  {
    title: 'CV 佛得角 Atlantic/Cape_Verde',
    value: 'atlantic/cape_verde',
    offset: -1,
    lat: 16.5388,
    lng: -23.0418
  },
  {
    title: 'CI 非洲/阿比让 Africa/Abidjan',
    value: 'africa/bissau',
    offset: 0,
    lat: 5.3599517,
    lng: -4.0082563
  },
  {
    title: 'GW 非洲/比绍 Africa/Bissau',
    value: 'africa/bissau',
    offset: 0,
    lat: 11.8632196,
    lng: -15.5843227
  },
  {
    title: 'GB 欧洲/伦敦 Europe/London',
    value: 'europe/london',
    offset: 1,
    lat: 51.5072178,
    lng: -0.1275862
  },
  {
    title: 'IE 欧洲/都柏林 Europe/Dublin',
    value: 'europe/dublin',
    offset: 1,
    lat: 53.3498053,
    lng: -6.2603097
  },
  {
    title: 'FR 欧洲/巴黎 Europe/Paris',
    value: 'europe/paris',
    offset: 2,
    lat: 48.856614,
    lng: 2.3522219
  },
  {
    title: 'GI 欧洲/直布罗陀 Europe/Gibraltar',
    value: 'europe/gibraltar',
    offset: 2,
    lat: 36.140751,
    lng: -5.353585
  },
  {
    title: 'HU 欧洲/布达佩斯',
    value: 'europe/budapest',
    offset: 2,
    lat: 47.497912,
    lng: 19.040235
  },
  {
    title: 'EG 非洲/开罗 Africa/Cairo',
    value: 'africa/cairo',
    offset: 2,
    lat: 30.0444196,
    lng: 31.2357116
  },
  {
    title: 'RU 欧洲/莫斯科 Europe/Moscow',
    value: 'europe/moscow',
    offset: 3,
    lat: 55.755826,
    lng: 37.6173
  },
  {
    title: 'IQ 亚洲/巴格达 Asia/Baghdad',
    value: 'asia/baghdad',
    offset: 3,
    lat: 33.315241,
    lng: 44.3660671
  },
  {
    title: 'KE 非洲/内罗毕 Africa/Nairobi',
    value: 'africa/nairobi',
    offset: 3,
    lat: -1.2920659,
    lng: 36.8219462
  },
  {
    title: 'RU 欧洲/萨马拉 Europe/Samara',
    value: 'europe/samara',
    offset: 4,
    lat: 53.203772,
    lng: 50.1606382
  },
  {
    title: 'RU 欧洲/伏尔加格勒 Europe/Volgograd',
    value: 'europe/volgograd',
    offset: 4,
    lat: 48.708048,
    lng: 44.5133034
  },
  {
    title: 'IR 亚洲/德黑兰 Asia/Tehran',
    value: 'asia/tehran',
    offset: 4.5,
    lat: 35.7218583,
    lng: 51.3346954
  },
  {
    title: 'AF 亚洲/喀布尔 Asia/Kabul',
    value: 'asia/kabul',
    offset: 4.5,
    lat: 34.5553494,
    lng: 69.207486
  },
  {
    title: 'KZ 亚洲/阿克套 Asia/Aqtau',
    value: 'asia/aqtau',
    offset: 5,
    lat: 43.65880790000001,
    lng: 51.1974563
  },
  {
    title: 'UZ 亚洲/撒马尔罕 Asia/Samarkand',
    value: 'asia/samarkand',
    offset: 5,
    lat: 39.6507963,
    lng: 66.9653502
  },
  {
    title: 'IN 亚洲/加尔各答 Asia/Kolkata',
    value: 'asia/kolkata',
    offset: 5.5,
    lat: 22.572646,
    lng: 88.36389500000001
  },
  {
    title: 'LK 亚洲/科伦坡 Asia/Colombo',
    value: 'asia/colombo',
    offset: 5.5,
    lat: 6.9270786,
    lng: 79.861243
  },
  {
    title: 'NP 亚洲/加德满都 Asia/Kathmandu',
    value: 'asia/kathmandu',
    offset: 5.75,
    lat: 27.7172453,
    lng: 85.3239605
  },
  {
    title: 'BD 亚洲/达卡 Asia/Dhaka',
    value: 'asia/dhaka',
    offset: 6,
    lat: 23.810332,
    lng: 90.4125181
  },
  {
    title: 'IO 印度/查戈斯群岛 Indian/Chagos',
    value: 'indian/chagos',
    offset: 6,
    lat: -6.1217629,
    lng: 72.01135874999999
  },
  {
    title: 'TH 亚洲/曼谷 Asia/Bangkok',
    value: 'asia/bangkok',
    offset: 7,
    lat: 13.7563309,
    lng: 100.5017651
  },
  {
    title: 'ID 亚洲/雅加达 Asia/Jakarta',
    value: 'asia/jakarta',
    offset: 7,
    lat: -6.2087634,
    lng: 106.845599
  },
  {
    title: 'KC 亚洲/金边 Asia/Phnom_Penh',
    value: 'asia/phnom_penh',
    offset: 7,
    lat: 11.5563738,
    lng: 104.9282099
  }
]
