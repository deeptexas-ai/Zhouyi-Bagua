function list(str) {
  var ret = []
  for (var i = 0; i < str.length; i++) {
    ret.push(str[i])
  }
  return ret
}

function len(arr) {
  return arr.length
}

function count(arr, elem) {
  var c = 0
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    if (element == elem) {
      c++
    }
  }
  return c
}

function get(arr, key) {
  if (!arr[key]) {
    return null
  }
  return arr[key]
}
function keys(arr) {
  var values = []
  for (const key in arr) {
    values.push(key)
  }
  return values
}
function values(arr) {
  var values = []
  for (const key in arr) {
    values.push(arr[key])
  }
  return values
}

function tuple(str) {
  var ret = []
  for (var i = 0; i < str.length; i++) {
    ret.push(str[i])
  }
  return ret
}
function enumerate(arr) {
  var ret = []
  for (var i = 0; i < arr.length; i++) {
    ret.push([i, arr[i]])
  }
  return ret
}

function arr_merge(a, b) {
  var ret = []
  for (var i = 0; i < a.length; i++) {
    ret.push(a[i])
  }
  for (var i = 0; i < b.length; i++) {
    ret.push(b[i])
  }
  return ret
}
function map_merge(a, b) {
  var ret = {}
  for (const key in a) {
    if (Object.hasOwnProperty.call(a, key)) {
      const element = a[key]
      ret[key] = a[key]
    }
  }
  for (const key in b) {
    if (Object.hasOwnProperty.call(b, key)) {
      const element = b[key]
      ret[key] = b[key]
    }
  }
  return ret
}

function zip(a, b) {
  var ret = []
  var len = a.length
  if (len > b.length) {
    len = b.length
  }
  for (var i = 0; i < len; i++) {
    ret.push([a[i], b[i]])
  }
  return ret
}
function max(arr) {
  var maxVal = arr[0]
  for (var i = 1; i < arr.length; i++) {
    if (maxVal < arr[i]) {
      maxVal = arr[i]
    }
  }
  return maxVal
}
function dict(arr) {
  var ret = {}
  for (var i = 0; i < arr.length; i++) {
    ret[arr[i][0]] = arr[i][1]
  }
  return ret
}
function map(f, arr) {
  var ret = []
  for (var i = 0; i < arr.length; i++) {
    ret.push(f(arr[i]))
  }
  return ret
}
function reversed(arr) {
  var ret = []
  for (var i = 0; i < arr.length; i++) {
    ret.unshift(arr[i])
  }
  return ret
}
function arr_select(arr, start, end, step) {
  var ret = []
  for (var i = start; i < end; i += step) {
    ret.push(arr[i])
  }
  return ret
}

function Counter(arr) {
  var ret = {}
  for (const key in arr) {
    if (Object.hasOwnProperty.call(arr, key)) {
      const element = arr[key]
      if (!ret[element]) {
        ret[element] = 1
      } else {
        ret[element] += 1
      }
    }
  }
  return ret
}
function set(str) {
  var ret = []
  var tmp = {}
  for (var i = 0; i < str.length; i++) {
    if (tmp[str[i]]) {
      continue
    }
    tmp[str[i]] = 1
    ret.push(str[i])
  }
  return ret
}

Liuren = function (jieqi, cmonth, daygangzhi, hourgangzhi) {
  this.new_list = function (olist, o) {
    var zhihead_code = olist.indexOf(o)
    var res1 = []
    for (let i = 0; i < olist.length; i++) {
      const element = olist[i]
      res1.push(olist[zhihead_code % olist.length])
      zhihead_code = zhihead_code + 1
    }
    return res1
  }
  this.jiazi = function () {
    var tiangan = this.Gan
    var dizhi = this.Zhi
    var jiazi = []
    for (var i = 0; i < 60; i++) {
      jiazi.push(tiangan[i % len(tiangan)] + dizhi[i % len(dizhi)])
    }
    return jiazi
  }
  this.jieqi = jieqi
  this.daygangzhi = daygangzhi
  this.hourgangzhi = hourgangzhi
  this.cmonth = cmonth
  this.Gan = list('甲乙丙丁戊己庚辛壬癸')
  this.Zhi = list('子丑寅卯辰巳午未申酉戌亥')
  this.Cmonth = arr_merge(list('正二三四五六七八九十'), ['十一', '十二'])
  //字典库
  this.yima_dict = { 丑: '亥', 未: '巳' }
  this.shigangjigong = dict(zip(arr_merge(this.Gan, this.Zhi), arr_merge(list('寅辰巳未巳未申戌亥丑'), this.Zhi)))
  //日马
  this.yimadict = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x)
        }, '戌寅午,酉丑巳,子辰申,亥卯未'.split(','))
      ),
      list('申亥寅巳')
    )
  )
  //生克六亲
  this.liuqing_dict = dict(zip('被生,生,克,比和,被克'.split(','), '父母,子孙,财妻,兄弟,官鬼'.split(',')))
  this.wuxing = '火水金火木金水土土木,水火火金金木土水木土,火火金金木木土土水水,火木水金木水土火金土,木火金水水木火土土金'
  this.wuxing_relation_2 = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x.match(/../g))
        }, this.wuxing.split(','))
      ),
      '被克,克,比和,被生,生'.split(',')
    )
  )
  //干支五行
  this.ganzhiwuxing = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x)
        }, '甲寅乙卯,丙巳丁午,壬亥癸子,庚申辛酉,未丑戊己未辰戌'.split(','))
      ),
      list('木火水金土')
    )
  )
  //日贵人 甲羊戊庚牛。乙猴已鼠求。丙鸡丁猪位。壬癸兔蛇游。六辛逢虎上。阳贵日中 。
  //夜贵人 甲牛戊庚羊乙鼠乡。丙猪丁难上。壬中蛇癸兔藏。六辛逢午马。阴贵夜时当。
  this.daynight_richppl_dict = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x)
        }, '卯辰巳午未申,酉戌亥子丑寅'.split(','))
      ),
      list('昼夜')
    )
  )
  //刑冲
  this.ying = dict(zip('寅巳申丑戌未子卯辰亥酉午', '巳申寅戌未丑卯子辰亥酉午'))
  this.ying_chong = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x)
        }, '寅巳申丑戌未子卯,午辰酉亥'.split(','))
      ),
      '刑,自刑'.split(',')
    )
  )
  this.chong2 = dict(zip('子午丑未寅申卯酉辰戌巳亥', '午子未丑申寅酉卯戌辰亥巳'))
  //天将
  this.sky_generals = '贵蛇雀合勾龙空虎常玄阴后'
  this.sky_generals_r = this.new_list(list(reversed(this.sky_generals)), '贵')
  //甲旬
  var tmp = this.jiazi()
  var tmp_l = []
  for (let i = 0; i < tmp.length; i += 10) {
    const element = tmp[i]
    tmp_l.push(arr_select(tmp, i, i + 10, 1))
  }
  this.liujiashun_dict = dict(
    zip(
      list(
        map(function (x) {
          return tuple(x)
        }, tmp_l)
      ),
      arr_select(tmp, 0, tmp.length, 10)
    )
  )
  //廿八宿
  this.hoursu = {
    甲己: {
      子: '角亢',
      丑: '翼轸',
      寅: '柳星张',
      卯: '井鬼',
      辰: '参觜',
      巳: '胃昴毕',
      午: '娄奎',
      未: '危室壁',
      申: '女虚',
      酉: '斗牛',
      戌: '尾箕',
      亥: '氐房心'
    },
    乙庚: {
      子: '参觜',
      丑: '昴毕',
      寅: '奎娄胃',
      卯: '危室壁',
      辰: '女虚',
      巳: '斗牛',
      午: '尾箕',
      未: '氐房心',
      申: '角亢',
      酉: '翼轸',
      戌: '柳星张',
      亥: '井鬼'
    },
    丙辛: {
      子: '奎娄',
      丑: '危室壁',
      寅: '女虚',
      卯: '斗牛',
      辰: '尾箕',
      巳: '氐房心',
      午: '角亢',
      未: '翼轸',
      申: '井鬼',
      酉: '柳星张',
      戌: '参觜',
      亥: '胃昴毕'
    },
    戊癸: {
      子: '尾箕',
      丑: '氐房心',
      寅: '角亢',
      卯: '翼轸',
      辰: '柳星张',
      巳: '井鬼',
      午: '毕参觜',
      未: '胃昴',
      申: '奎娄',
      酉: '危室壁',
      戌: '女虚',
      亥: '斗牛'
    },
    丁壬: {
      子: '女虚',
      丑: '斗牛',
      寅: '尾箕',
      卯: '氐房心',
      辰: '角亢',
      巳: '翼轸',
      午: '柳星张',
      未: '井鬼',
      申: '毕参觜',
      酉: '胃昴',
      戌: '奎娄',
      亥: '危室壁'
    }
  }

  this.generals_zhi = map_merge(
    dict(
      zip(
        map(function (x) {
          '贵' + x
        }, this.Zhi),
        '吉,吉,凶,吉,凶,凶,凶,吉,吉,凶,凶,吉'.split(',')
      )
    ),
    dict(
      zip(
        map(function (x) {
          '后' + x
        }, this.Zhi),
        '凶,凶,吉,凶,凶,凶,凶,凶,吉,凶,凶,吉'.split(',')
      )
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '阴' + x
      }, this.Zhi),
      '凶,凶,凶,凶,吉,凶,凶,吉,吉,吉,凶,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '玄' + x
      }, this.Zhi),
      '吉,吉,凶,凶,吉,凶,凶,凶,吉,吉,吉,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '常' + x
      }, this.Zhi),
      '凶,吉,凶,凶,吉,吉,吉,吉,吉,吉,凶,吉'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '虎' + x
      }, this.Zhi),
      '凶,凶,凶,凶,凶,凶,凶,凶,吉,凶,凶,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '空' + x
      }, this.Zhi),
      '凶,凶,凶,凶,凶,凶,凶,吉,凶,凶,凶,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '龙' + x
      }, this.Zhi),
      '吉,凶,吉,吉,吉,凶,凶,凶,凶,凶,吉,吉'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '勾' + x
      }, this.Zhi),
      '凶,凶,凶,凶,吉,吉,凶,吉,凶,凶,凶,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '合' + x
      }, this.Zhi),
      '凶,吉,吉,吉,凶,凶,吉,吉,吉,凶,凶,吉'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '雀' + x
      }, this.Zhi),
      '凶,凶,吉,吉,凶,吉,吉,凶,吉,凶,凶,凶'.split(',')
    )
  )
  this.generals_zhi = map_merge(
    this.generals_zhi,
    dict(
      zip(function (x) {
        '蛇' + x
      }, this.Zhi),
      '吉,吉,吉,凶,吉,吉,吉,吉,吉,凶,凶,吉'.split(',')
    )
  )
  this.gangzhi_yinyang = function (gangorzhi) {
    var gangzhi_yingyang = dict(
      zip(
        list(
          map(
            function (x) {
              return tuple(x)
            },
            [
              arr_merge(arr_select(this.Gan, 0, this.Gan.length, 2), arr_select(this.Zhi, 0, this.Zhi.length, 2)),
              arr_merge(arr_select(this.Gan, 1, this.Gan.length, 2), arr_select(this.Zhi, 1, this.Zhi.length, 2))
            ]
          )
        ),
        list('阳阴')
      )
    )
    var yinyang = this.multi_key_dict_get(gangzhi_yingyang, gangorzhi)
    return yinyang
  }
  this.duplicates = function (lst, item) {
    var result = []
    var tmp = enumerate(lst)
    var index = 0
    for (let i = 0; i < tmp.length; i++) {
      const element = tmp[i]
      if (element[1] == item) {
        result.push(element[0])
        index = element[0]
      }
    }

    if (result.length > 1) {
      result = result
    } else if (result.length == 1) {
      result = index
    }
    return result
  }

  this.multi_key_dict_get = function (d, k) {
    for (const key in d) {
      if (Object.hasOwnProperty.call(d, key)) {
        const element = d[key]
        var keys = key.split(',')
        if (keys.indexOf(k) != -1) {
          return element
        }
      }
    }
    return null
  }

  this.Max = function (list) {
    if (list.length == 1) {
      return list[0]
    } else {
      m = max(list)
      if (m > list[0]) {
        return m
      } else {
        list[0]
      }
    }
  }

  var obj = this
  this.shunkong = function (daygangzhi, zhi) {
    var liujiashun_dict = this.liujiashun_dict
    var dayshun = this.multi_key_dict_get(liujiashun_dict, daygangzhi)
    var jz = this.jiazi()
    var findshun = dict(
      zip(
        arr_select(jz, 0, jz.length, 10),
        list(
          map(
            function (x) {
              return dict(zip(obj.Zhi, x))
            },
            list(
              map(function (x) {
                return obj.new_list(arr_merge(obj.Gan, list('空空')), x)
              }, '甲丙戊庚壬空')
            )
          )
        )
      )
    )
    return get(this.multi_key_dict_get(findshun, dayshun), zhi)
  }

  this.Ganzhiwuxing = function (gangorzhi) {
    return this.multi_key_dict_get(this.ganzhiwuxing, gangorzhi)
  }

  this.find_ke_relation = function (ke) {
    var wuxing_relation = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x.match(/../g))
          }, this.wuxing.split(','))
        ),
        '下贼上,上克下,比和,下生上,上生下'.split(',')
      )
    )
    var top_botton = this.Ganzhiwuxing(ke[0]) + this.Ganzhiwuxing(ke[1])
    return this.multi_key_dict_get(wuxing_relation, top_botton)
  }

  this.sky_pan_list = function () {
    //找月将
    var jq = '小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至'.match(/../g)
    var dh = this.new_list(jq, '大寒')
    var moon_general_dict = dict(
      zip(list(zip(arr_select(dh, 0, dh.length, 2), arr_select(dh, 1, dh.length, 2))), this.new_list(list(reversed(this.Zhi)), '子'))
    )
    var get_moon_general = this.multi_key_dict_get(moon_general_dict, this.jieqi)
    return [this.new_zhi_list(get_moon_general), get_moon_general]
  }

  this.find_season = function (s) {
    var jq = '立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至小寒大寒'.match(/../g)
    var season = list('春春春春春春夏夏夏夏夏夏秋秋秋秋秋秋冬冬冬冬冬冬')
    return get(dict(zip(jq, season)), s)
  }

  this.moongeneral = function () {
    return this.sky_pan_list()[1]
  }

  this.new_zhi_list = function (zhi) {
    var zhihead_code = this.Zhi.indexOf(zhi)
    var res1 = []
    for (let i = 0; i < len(this.Zhi); i++) {
      res1.push(this.Zhi[zhihead_code % len(this.Zhi)])
      zhihead_code = zhihead_code + 1
    }
    return res1
  }
  this.sky_n_earth_list = function () {
    var earth = this.new_zhi_list(this.hourgangzhi[1])
    var sky = this.sky_pan_list()[0]
    return dict(zip(earth, sky))
  }

  this.earth_n_sky_list = function () {
    var earth = this.new_zhi_list(this.hourgangzhi[1])
    var sky = this.sky_pan_list()[0]
    return dict(zip(sky, earth))
  }

  this.all_sike = function () {
    var yike = this.sky_n_earth_list()[this.shigangjigong[this.daygangzhi[0]]] + this.daygangzhi[0]
    var sky_n_earth = this.sky_n_earth_list()
    var erke = get(sky_n_earth, yike[0]) + yike[0]
    var sanke = get(sky_n_earth, this.daygangzhi[1]) + this.daygangzhi[1]
    var sike = get(sky_n_earth, sanke[0]) + sanke[0]
    return [sike, sanke, erke, yike]
  }

  this.new_zhigangcangong_list = function (zhi) {
    var zhigangcangong = list('子丑癸寅甲卯辰乙巳丙戊午未己申庚酉戌辛亥壬')
    var zhihead_code = zhigangcangong.indexOf(zhi)
    var res1 = []
    for (let i = 0; i < len(zhigangcangong); i++) {
      res1.push(zhigangcangong[zhihead_code % len(zhigangcangong)])
      zhihead_code = zhihead_code + 1
    }
    return res1
  }

  this.fanyin = function () {
    var sky_earth = this.sky_n_earth_list()
    var sky = list(values(sky_earth))
    var earth = list(keys(sky_earth))
    var earth_sky_combine = []
    for (let i = 0; i < len(sky_earth); i++) {
      earth_sky_combine.push(this.Ganzhiwuxing(sky[i]) + this.Ganzhiwuxing(earth[i]))
    }
    var earth_sky_combine_wuxing = []
    for (let i = 0; i < len(sky_earth); i++) {
      earth_sky_combine.push(this.multi_key_dict_get(this.wuxing_relation_2, earth_sky_combine[i]))
    }
    var count_ke_and_being_ke = count(earth_sky_combine_wuxing, '被克') + count(earth_sky_combine_wuxing, '克')
    return [count_ke_and_being_ke, earth_sky_combine_wuxing]
  }

  this.find_sike_shangke = function () {
    var sike_list = []
    var sike = this.all_sike()
    for (const key in sike) {
      if (Object.hasOwnProperty.call(sike, key)) {
        const element = sike[key]
        b = this.find_ke_relation(element)
        sike_list.push(b)
      }
    }
    return sike_list
  }

  this.find_sike_relations = function () {
    var sike_list = []
    var sike = this.all_sike()
    for (const key in sike) {
      if (Object.hasOwnProperty.call(sike, key)) {
        const element = sike[key]
        b = this.find_ke_relation(element)
        sike_list.push(b)
      }
    }
    if (count(sike_list, '下贼上') == 2 && count(sike_list, '上克下') == 2) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') == 1 && count(sike_list, '下贼上') == 1) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') == 0 && count(sike_list, '下贼上') == 4) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') > 1 && count(sike_list, '下贼上') == 1) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') == 0 && count(sike_list, '下贼上') == 1) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') == 1 && count(sike_list, '下贼上') == 0) {
      classify = '上克下'
    } else if (count(sike_list, '上克下') == 1 && count(sike_list, '下贼上') == 3) {
      classify = '下贼上'
    } else if (count(sike_list, '下贼上') == 2 && count(sike_list, '上克下') == 1) {
      classify = '下贼上'
    } else if (count(sike_list, '下贼上') == 4 && count(sike_list, '上克下') == 0) {
      classify = '下贼上'
    } else if (count(sike_list, '下贼上') == 2 && count(sike_list, '上克下') == 0) {
      classify = '下贼上'
    } else if (count(sike_list, '下贼上') >= 2 && count(sike_list, '上克下') <= 1) {
      classify = '下贼上'
    } else if (count(sike_list, '上克下') == 0 && count(sike_list, '下贼上') == 0) {
      classify = '试其他'
    } else if (count(sike_list, '上克下') >= 2 && count(sike_list, '下贼上') == 0) {
      classify = '上克下'
    }

    var dayganzhi_wuxing = this.Ganzhiwuxing(this.daygangzhi[0])
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    var wuxing_ke = []
    for (let i = 0; i < sike.length; i++) {
      const element = sike[i]
      wuxing_ke.push(this.Ganzhiwuxing(element[0]))
    }
    var shangke_list = []
    for (let i = 0; i < wuxing_ke.length; i++) {
      const element = wuxing_ke[i]
      var shangke = this.multi_key_dict_get(this.wuxing_relation_2, element + dayganzhi_wuxing)
      shangke_list.push(shangke)
    }
    var dayganzhi_same_location = '甲寅丁未己未庚申癸丑'.match(/../g)
    var jz = this.jiazi()
    var res = []
    for (let i = 0; i < jz.length; i++) {
      const element = jz[i]
      if (dayganzhi_same_location.indexOf(element) == -1) {
        res.push(element)
      }
    }
    var checkdayganzhi_dict = {}
    checkdayganzhi_dict[dayganzhi_same_location.join(',')] = '日干支同位'
    checkdayganzhi_dict[res.join(',')] = '日干支不同位'
    var fanyin_days = '丁丑己丑辛丑辛未'.match(/../g)
    var bazhuan_fanyin_days = ['丁未', '己未']
    var jiazi_remove_fanyin = []
    for (let i = 0; i < jz.length; i++) {
      const element = jz[i]
      if (fanyin_days.indexOf(element) == -1) {
        jiazi_remove_fanyin.push(element)
      }
    }

    var fanyin_day_dict = {}
    fanyin_day_dict[fanyin_days.join(',')] = '反吟'
    fanyin_day_dict[bazhuan_fanyin_days.join(',')] = '反吟八专'
    fanyin_day_dict[arr_merge(jiazi_remove_fanyin, bazhuan_fanyin_days).join(',')] = '非反吟'
    var checkdayganzhi = this.multi_key_dict_get(checkdayganzhi_dict, this.daygangzhi)
    var checkfanyin = this.multi_key_dict_get(fanyin_day_dict, this.daygangzhi)
    //moon_general = this.moongeneral(this.jieqi)
    var moon_general = this.sky_pan_list()[1]
    var checkmoongeneralconflicttohour = this.multi_key_dict_get(
      this.wuxing_relation_2,
      this.Ganzhiwuxing(moon_general) + this.Ganzhiwuxing(this.hourgangzhi[1])
    )
    var sky_earth_fanyin = this.fanyin()[0]
    var blist = []
    var fan_yin = ''
    if ((sky_earth_fanyin >= 8 && count(this.fanyin()[1], '比和') == 4) || count(this.fanyin()[1], '比和') == 12) {
      fan_yin = '天地盘返吟'
    } else {
      fan_yin = '天地盘没有返吟'
    }
    if (this.hourgangzhi[1] == moon_general) {
      checkfuyin = '伏吟'
    } else {
      checkfuyin = '非伏吟'
    }
    if (count(sike_list, '上克下') == 0 && count(sike_list, '下贼上') == 0) {
      var findtrue = ['试贼克涉害以外方法', '没有', '没有', classify, '没有', '没有']
      return [
        sike_list,
        sike,
        shangke_list,
        checkdayganzhi,
        checkfuyin,
        checkmoongeneralconflicttohour,
        checkfanyin,
        findtrue,
        this.gangzhi_yinyang(this.daygangzhi[0]),
        fan_yin
      ]
    } else if (count(sike_list, '上克下') == 1 && count(sike_list, '下贼上') == 0) {
      var findtrue = ['试贼克', sike_list.indexOf('上克下'), '没有', classify, '没有', '没有']
      return [
        sike_list,
        sike,
        shangke_list,
        checkdayganzhi,
        checkfuyin,
        checkmoongeneralconflicttohour,
        checkfanyin,
        findtrue,
        this.gangzhi_yinyang(this.daygangzhi[0]),
        fan_yin
      ]
    } else if (count(sike_list, '下贼上') == 1) {
      findtrue = ['试贼克', sike_list.indexOf('下贼上'), '没有', classify, '没有', '没有']
      return [
        sike_list,
        sike,
        shangke_list,
        checkdayganzhi,
        checkfuyin,
        checkmoongeneralconflicttohour,
        checkfanyin,
        findtrue,
        this.gangzhi_yinyang(this.daygangzhi[0]),
        fan_yin
      ]
    } else if (count(sike_list, '下贼上') > 1) {
      var find_ke = this.duplicates(sike_list, '下贼上')
      var zeikeshang_list = []
      for (const i in find_ke) {
        if (Object.hasOwnProperty.call(find_ke, i)) {
          const element = find_ke[i]
          zeike = sike[element]
          zeikeshang_list.push(zeike)
        }
      }
      var yy_list = []
      for (const i in zeikeshang_list) {
        if (Object.hasOwnProperty.call(zeikeshang_list, i)) {
          const element = zeikeshang_list[i]
          var yy = this.gangzhi_yinyang(element[0])
          yy_list.push(yy)
        }
      }
      var nn_list = []
      for (const i in yy_list) {
        if (Object.hasOwnProperty.call(yy_list, i)) {
          const element = yy_list[i]
          var p = ''
          if (element == dayganzhi_yy) {
            p = 'True'
          } else {
            p = 'False'
          }
          nn_list.push(p)
        }
      }
      for (let i = 0; i < zeikeshang_list.length; i++) {
        const element = zeikeshang_list[i]
        blist.push(element[0])
      }
      var check_same = len(set(blist))
      if (check_same == 1 || len(set(sike_list)) == 1) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      } else if (len(set(zeikeshang_list)) >= 2 && count(nn_list, 'True') >= 0 && count(nn_list, 'False') >= 0) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      }
      return [
        sike_list,
        sike,
        shangke_list,
        checkdayganzhi,
        checkfuyin,
        checkmoongeneralconflicttohour,
        checkfanyin,
        findtrue,
        this.gangzhi_yinyang(this.daygangzhi[0]),
        fan_yin
      ]
    } else if (count(sike_list, '上克下') > 1) {
      var find_ke = this.duplicates(sike_list, '上克下')
      var zeikeshang_list = []
      for (const i in find_ke) {
        if (Object.hasOwnProperty.call(find_ke, i)) {
          const element = find_ke[i]
          zeike = sike[element]
          zeikeshang_list.push(zeike)
        }
      }
      var yy_list = []
      for (const i in zeikeshang_list) {
        if (Object.hasOwnProperty.call(zeikeshang_list, i)) {
          const element = zeikeshang_list[i]
          var yy = this.gangzhi_yinyang(element[0])
          yy_list.push(yy)
        }
      }
      var nn_list = []
      for (const i in yy_list) {
        if (Object.hasOwnProperty.call(yy_list, i)) {
          const element = yy_list[i]
          var p = ''
          if (element == dayganzhi_yy) {
            p = 'True'
          } else {
            p = 'False'
          }
          nn_list.push(p)
        }
      }
      for (let i = 0; i < zeikeshang_list.length; i++) {
        const element = zeikeshang_list[i]
        blist.push(element[0])
      }
      check_same = len(set(blist))
      if (check_same == 1) {
        findtrue = ['试贼克', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same] //结果, 克克位置, 课式
      } else if (len(set(zeikeshang_list)) >= 2 && count(nn_list, 'True') == 0) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      } else if (len(set(zeikeshang_list)) >= 2 && count(nn_list, 'True') == 1 && count(nn_list, 'False') == 1) {
        findtrue = ['试比用', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      } else if (len(set(zeikeshang_list)) >= 2 && count(nn_list, 'True') >= 1 && count(nn_list, 'False') >= 1) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      } else if (len(set(zeikeshang_list)) == 2 && count(nn_list, 'True') >= 2 && count(nn_list, 'False') == 0) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      } else if (len(set(zeikeshang_list)) >= 2 && count(nn_list, 'True') >= 2 && count(nn_list, 'False') == 0) {
        findtrue = ['试涉害', find_ke, zeikeshang_list, classify, nn_list, yy_list, check_same]
      }

      return [
        sike_list,
        sike,
        shangke_list,
        checkdayganzhi,
        checkfuyin,
        checkmoongeneralconflicttohour,
        checkfanyin,
        findtrue,
        this.gangzhi_yinyang(this.daygangzhi[0]),
        fan_yin
      ]
    }
  }
  this.sike_dict = function () {
    var sike = this.all_sike()
    var sike_list = this.find_sike_relations()[0]
    var dyingyang = this.gangzhi_yinyang(this.daygangzhi[0])
    var sike_yingyan = []
    for (let i = 0; i < sike.length; i++) {
      const element = sike[i]
      sike_yingyan.push(this.gangzhi_yinyang(element[0]))
    }
    return [sike, sike_list, dyingyang, sike_yingyan]
  }
  this.find_three_pass = function (firstpass) {
    var secondpass = get(this.sky_n_earth_list(), firstpass)
    var thirdpass = get(this.sky_n_earth_list(), secondpass)
    return [firstpass, secondpass, thirdpass]
  }

  this.zeike = function () {
    var sike = this.all_sike()
    var sike_list = this.find_sike_relations()
    var findtrue = ''
    if (count(sike_list[0], '上克下') == 0 && count(sike_list[0], '下贼上') == 0) {
      findtrue = '不适用，或试他法'
      //没有上克下或下贼上
      return findtrue
    } else if (sike_list[7][0] == '试涉害' || sike_list[7][0] == '试比用') {
      findtrue = '不适用，或试他法'
      //多于一个上克下或下贼上
      return findtrue
    } else if (count(sike_list[0], '下贼上') > 2 && sike_list[7][6] > 1 && count(sike_list[2], '克') > 1) {
      findtrue = '不适用，或试他法'
      return findtrue
    } else if (count(sike_list[0], '下贼上') > 2 && sike_list[7][6] > 1 && count(sike_list[2], '克') == 1) {
      findtrue = ['贼克', '重审']
      return ['贼克', '重审', this.find_three_pass(sike_list[7][2][sike_list[2].indexOf('克')][0])]
    } else if (count(sike_list[0], '下贼上') > 2 && sike_list[7][6] > 1 && count(sike_list[2], '克') == 0) {
      findtrue = ['贼克', '重审']
      return ['贼克', '重审', this.find_three_pass(sike_list[7][2][sike_list[2].indexOf('生')][0])]
    } else if (count('下贼上') > 2 && sike_list[7][6] == 1 && sike_list[9] == '天地盘没有返吟') {
      findtrue = ['贼克', '重审', this.find_three_pass(sike_list[7][2][0][0])]
      return findtrue
    } else if (
      count(sike_list[0], '下贼上') >= 2 &&
      sike_list[7][0] == '试贼克' &&
      sike_list[7][6] == 1 &&
      sike_list[9] == '天地盘没有返吟'
    ) {
      findtrue = ['贼克', '重审', this.find_three_pass(sike_list[7][2][0][0])]
      return findtrue
    } else if (
      count(sike_list[0], '上克下') == 2 &&
      count(sike_list[0], '下贼上') == 0 &&
      sike_list[7][2][0] != sike_list[7][2][1] &&
      sike_list[7][6] > 1
    ) {
      findtrue = '不适用，或试他法'
      //多于一个上克下或下贼上
      return findtrue
    } else if (
      count(sike_list[0], '上克下') == 2 &&
      count(sike_list[0], '下贼上') == 0 &&
      sike_list[7][2][0] != sike_list[7][2][1] &&
      sike_list[7][6] == 1
    ) {
      findtrue = ['贼克', '元首', this.find_three_pass(sike_list[7][2][0][0])]
      return findtrue
    } else if (count(sike_list[0], '上克下') == 2 && count(sike_list[0], '下贼上') == 0 && sike_list[7][2][0] == sike_list[7][2][1]) {
      findtrue = ['贼克', '元首', this.find_three_pass(sike_list[7][2][0][0])]
      return findtrue
    } else if (count(sike_list[0], '上克下') >= 2 && count(sike_list[0], '下贼上') == 0) {
      findtrue = '不适用，或试他法'
    } else if (count(sike_list[0], '上克下') >= 2 && count(sike_list[0], '下贼上') == 1) {
      findtrue = ['贼克', '重审', this.find_three_pass(sike[sike_list[0].indexOf('下贼上')][0])]
      return findtrue
    } else if (
      count(sike_list[0], '上克下') > 2 &&
      count(sike_list[0], '下贼上') == 0 &&
      sike_list[7][0] == '试贼克' &&
      set(sike_list[7][1]) == 1
    ) {
      findtrue = ['贼克', '元首', this.find_three_pass(sike_list[7][2][0][0])]
      //一个下贼上
      return findtrue
    } else if (count(sike_list[0], '下贼上') == 1 && sike_list[9] == '天地盘没有返吟') {
      findtrue = ['贼克', '重审', this.find_three_pass(sike[sike_list[0].indexOf('下贼上')][0])]
      return findtrue
    } else if (count(sike_list[0], '下贼上') >= 1 && count(sike_list[0], '上克下') == 0 && sike_list[9] == '天地盘返吟') {
      findtrue = ['返吟', '无依', this.find_three_pass(sike[sike_list[0].indexOf('下贼上')][0])]
      return findtrue
    } else if (count(sike_list[0], '下贼上') == 2 && count(sike_list[0], '上克下') == 0 && sike_list[9] == '天地盘没有返吟') {
      if (sike_list[7][2][0] == sike_list[7][2][1]) {
        findtrue = ['贼克', '重审', this.find_three_pass(sike_list[7][2][0][0])]
        return findtrue
      } else if (sike_list[7][2][0] != sike_list[7][2][1]) {
        findtrue = '不适用，或试他法'
        return findtrue
      }
    } else if (count(sike_list[0], '下贼上') == 2 && count(sike_list[0], '上克下') == 2 && sike_list[9] == '天地盘返吟') {
      //一个上克下
      findtrue = ['返吟', '无依', this.find_three_pass(sike[sike_list[0].indexOf('下贼上')][0])]
      return findtrue
    } else if (count(sike_list[0], '上克下') == 1 && count(sike_list[0], '下贼上') == 0 && sike_list[9] == '天地盘没有返吟') {
      findtrue = ['贼克', '元首', this.find_three_pass(sike[sike_list[0].indexOf('上克下')][0])]
      return findtrue
    } else if (count(sike_list[0], '上克下') >= 2 && count(sike_list[0], '下贼上') == 0 && sike_list[9] == '天地盘没有返吟') {
      if (sike_list[7][2][0] == sike_list[7][2][1]) {
        findtrue = ['贼克', '元首', this.find_three_pass(sike_list[7][2][0][0])]
      } else if (sike_list[7][2][0] != sike_list[7][2][1]) {
        findtrue = '不适用，或试他法'
      }
      return findtrue
    } else if (count(sike_list[0], '上克下') == 1 && sike_list[9] == '天地盘没有返吟') {
      findtrue = ['返吟', '无依', this.find_three_pass(sike[sike_list[0].indexOf('上克下')][0])]
      return findtrue
    } else if (count(sike_list[0], '上克下') == 1 && sike_list[9] == '天地盘返吟') {
      findtrue = [
        '返吟',
        '无依',
        [
          get(this.chong2, sike[sike_list[0].indexOf('上克下')][0]),
          get(this.ying, sike[sike_list[0].indexOf('上克下')][0]),
          get(this.chong2, sike[sike_list[0].indexOf('上克下')][0])
        ]
      ]
      return findtrue
    }
  }

  this.biyung = function () {
    var relation = this.find_sike_relations()
    var filter_list = this.find_sike_relations()[7]
    var filter_list_four_ke = this.find_sike_relations()[7][2]
    var filter_list_yy = this.find_sike_relations()[7][5]
    var dayganzhi_yy = this.find_sike_relations()[8]
    var findtrue = ''
    if (filter_list[0] == '试贼克') {
      findtrue = '不适用，或试他法'
      return findtrue
    } else if (filter_list[0] == '试涉害') {
      findtrue = '不适用，或试他法'
      return findtrue
    } else if (filter_list[0] == '试贼克涉害以外方法') {
      findtrue = '不适用，或试他法'
      return findtrue
    } else if (count(relation[0], sike_list[0], '下贼上') == 2 && relation[9] == '天地盘返吟') {
      findtrue = ['返吟', '无依', [this.all_sike()[1][0], this.all_sike()[1][1], this.all_sike()[0][1]]]
      return findtrue
    } else if (count(relation[0], sike_list[0], '下贼上') == 3 && relation[9] == '天地盘返吟') {
      //findtrue = ["返吟", "无依", [sike_list[filter_list[4].indexOf("True")][0], chong(sike_list[filter_list[4].indexOf("True")][0]), chong(chong(sike_list[filter_list[4].indexOf("True")][0]))]]
      findtrue = ['返吟', '返吟', [this.all_sike()[1][1], this.all_sike()[0][1], this.all_sike()[1][1]]]
      return findtrue
    } else if (count(relation[0], sike_list[0], '下贼上') >= 2 && relation[9] == '天地盘没有返吟') {
      if (filter_list_yy[0] == dayganzhi_yy) {
        findtrue = ['比用', '比用', this.find_three_pass(filter_list_four_ke[0][0])]
      } else if (filter_list_yy[1] == dayganzhi_yy) {
        findtrue = ['比用', '比用', this.find_three_pass(filter_list_four_ke[1][0])]
      } else {
        findtrue = ['比用', '比用', this.find_three_pass(filter_list[2][filter_list[4].indexOf('True')][0])]
      }
      return findtrue
    } else if (
      count(relation[0], sike_list[0], '上克下') >= 2 &&
      count(relation[0], sike_list[0], '下贼上') == 0 &&
      relation[9] == '天地盘没有返吟'
    ) {
      if (filter_list_yy[0] == dayganzhi_yy) {
        findtrue = ['比用', '知一', this.find_three_pass(filter_list_four_ke[0][0])]
      } else if (filter_list_yy[1] == dayganzhi_yy) {
        findtrue = ['比用', '知一', this.find_three_pass(filter_list_four_ke[1][0])]
      }
      return findtrue
    }
  }
  this.fiter_four_ke = function () {
    var a = this.find_sike_relations()[7][2]
    var b = this.find_sike_relations()[7][4]
    var d = this.duplicates(b, 'True')
    var e = this.duplicates(b, 'False')
    var ilist = []
    var jlist = []
    for (let i = 0; i < d.length; i++) {
      const element = a[d[i]]
      ilist.push(element)
    }
    for (let i = 0; i < e.length; i++) {
      const element = a[e[i]]
      jlist.push(element)
    }
    if (len(ilist) == 0 && len(jlist) != 0) {
      ilist = jlist
    } else if (len(ilist) == 0 && len(jlist) == 0) {
      ilist = '不适用，或试他法'
    } else if (len(ilist) == 3) {
      ilist = list(set(ilist))
    }
    return ilist
  }

  this.compare_shehai_number = function () {
    var a = this.fiter_four_ke()
    var shehai_number2 = []
    var khead = []
    var biyung_result_reorder_list3 = []
    var result = []
    if (this.find_sike_relations()[9] == '天地盘返吟') {
      result = ['不适用，或试他法']
      return result
    } else if (this.fiter_four_ke() == '不适用，或试他法') {
      result = ['不适用，或试他法']
      return result
    } else if (this.find_sike_relations()[7][0] == '试涉害') {
      var c = []
      var t = []
      for (let i = 0; i < a.length; i++) {
        c.push(a[i][0])
        t.push(a[i][1])
      }
      if (get(this.shigangjigong, t[-1]) == null) {
        t = t
      } else if (get(this.shigangjigong, t[-1]) != null) {
        t[-1] = get(this.shigangjigong, t[-1])
      }
      var sky = this.sky_n_earth_list()
      for (let i = 0; i < a.length; i++) {
        for (const key in sky) {
          if (Object.hasOwnProperty.call(sky, key)) {
            const element = sky[key]
            if (element == a[i][0]) {
              khead.push(key)
            }
          }
        }
        var newz = this.new_zhigangcangong_list(khead[i])
        var biyung_result_reorder = arr_select(newz, 0, newz.indexOf(a[i][0]) + 1, 1)
        var tmp = []
        for (const key in biyung_result_reorder) {
          if (Object.hasOwnProperty.call(biyung_result_reorder, key)) {
            const j = biyung_result_reorder[key]
            const k = this.Ganzhiwuxing(j)
            tmp.push(this.Ganzhiwuxing(c[i][0]) + k)
          }
        }
        biyung_result_reorder_list3.push(count(tmp, arr_merge(this.Ganzhiwuxing(a[i][0]), this.Ganzhiwuxing(a[i][1]))))
      }
      for (let i = 0; i < biyung_result_reorder_list3.length; i++) {
        const element = biyung_result_reorder_list3[i]
        var shehai_number = c[biyung_result_reorder_list3.indexOf(element)]
        shehai_number2.push(shehai_number)
      }
      var shehai_dict = dict(zip(biyung_result_reorder_list3, shehai_number2))
      if (biyung_result_reorder_list3[0] == biyung_result_reorder_list3[1]) {
        result = ['找孟仲季地', a, t, c]
        return result
      } else if (biyung_result_reorder_list3[0] > biyung_result_reorder_list3[1]) {
        result = [get(shehai_dict, biyung_result_reorder_list3[0]), shehai_dict]
        return result
      } else if (biyung_result_reorder_list3[1] > biyung_result_reorder_list3[0]) {
        result = [get(shehai_dict, biyung_result_reorder_list3[1]), shehai_dict]
        return result
      }
      return result
    } else {
      result = ['不适用，或试他法']
      return result
    }
  }

  this.convert_munchongji = function () {
    var munconji = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x)
          }, '寅申巳亥,子午卯酉,辰戌丑未'.split(','))
        ),
        list('孟仲季')
      )
    )
    var head = this.compare_shehai_number()[2]
    var tail = this.compare_shehai_number()[3]
    var head_convert = []
    var tail_convert = []
    var result = []
    for (const key in head) {
      if (Object.hasOwnProperty.call(head, key)) {
        const a = head[key]
        var g = this.multi_key_dict_get(munconji, a)
        head_convert.push(g)
        for (const kk in tail) {
          if (Object.hasOwnProperty.call(tail, kk)) {
            const k = tail[kk]
            var l = this.multi_key_dict_get(munconji, k)
            tail_convert.push(l)
          }
        }
      }
    }
    if (this.compare_shehai_number()[0] == '找孟仲季地') {
      result = [head, head_convert, tail, tail_convert]
    } else {
      result = ['不适用']
    }
    return result
  }
  this.convert_munchongji_shehai_number = function () {
    var munconji = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x)
          }, '寅申巳亥,子午卯酉,辰戌丑未'.split(','))
        ),
        list('孟仲季')
      )
    )
    var h1 = this.compare_shehai_number()[2]
    var t1 = this.compare_shehai_number()[3]
    var head = []
    var tail = []
    var result = []
    for (const key in h1) {
      if (Object.hasOwnProperty.call(h1, key)) {
        const element = h1[key]
        head.push(this.shigangjigong[element])
      }
    }
    for (const key in t1) {
      if (Object.hasOwnProperty.call(t1, key)) {
        const element = t1[key]
        tail.push(this.shigangjigong[element])
      }
    }
    var head_convert = []
    var tail_convert = []
    for (const key in head) {
      if (Object.hasOwnProperty.call(head, key)) {
        const a = head[key]
        var g = this.multi_key_dict_get(munconji, a)
        head_convert.push(g)
      }
    }
    for (const key in tail) {
      if (Object.hasOwnProperty.call(tail, key)) {
        const k = tail[key]
        var l = this.multi_key_dict_get(munconji, k)
        tail_convert.push(l)
      }
    }

    if (this.compare_shehai_number()[0] == '找孟仲季地') {
      result = [head, head_convert, tail, tail_convert]
    } else {
      result = '不适用'
    }
    return result
  }

  //Debug用
  this.shehai2 = function () {
    var blist = []
    var z = this.fiter_four_ke()
    for (let i = 0; i < z.length; i++) {
      var b = z[i][0]
      blist.push(b)
    }
    //if(d == 1){}
    //result = "不适用，或试他法"
    //return result
    return this.find_sike_relations()
  }

  this.shehai = function () {
    var shangke = this.find_sike_relations()[0]
    var blist = []
    var z = this.fiter_four_ke()
    for (let i = 0; i < z.length; i++) {
      var b = z[i][0]
      blist.push(b)
    }
    var result = []
    var d = len(set(blist))
    if (d == 1 && this.find_sike_relations()[7][0] != '试涉害') {
      result = '不适用，或试他法'
      return result
    } else if (len(this.compare_shehai_number()[0]) == 1) {
      var reducing = this.compare_shehai_number()
      result = ['涉害', '涉害', this.find_three_pass(reducing[0])]
      return result
    } else if (count(shangke, '比和') == 3) {
      result = '不适用，或试他法'
      return result
    } else if (count(shangke, '上克下') == 0 && count(shangke, '下贼上') == 0) {
      result = '不适用，或试他法'
      return result
    } else if (this.find_sike_relations()[7][0] == '试比用') {
      result = '不适用，或试他法'
      return result
    } else if (count(shangke, '上克下') == 1 && count(shangke, '下贼上') == 1) {
      result = '不适用，或试他法'
      return result
    } else if (count(shangke, '比和') == 2 && count(shangke, '下贼上') == 2 && this.find_sike_relations()[9] == '天地盘返吟') {
      chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]
      result = ['返吟', '无依', this.find_three_pass(chuchuan[0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘返吟' &&
      count(this.find_sike_relations()[2], '克') == 0 &&
      count(this.find_sike_relations()[2], '被克') == 0
    ) {
      ;(chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]),
        1
      result = ['返吟', '无依', this.find_three_pass(chuchuan[0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘返吟' &&
      count(this.find_sike_relations()[2], '克') == 0 &&
      count(this.find_sike_relations()[2], '被克') == 1
    ) {
      chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]
      result = ['返吟', '涉害', this.find_three_pass(chuchuan[0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') >= 2 &&
      count(this.find_sike_relations()[2], '被克') == 0
    ) {
      chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]
      result = ['返吟', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') >= 2 &&
      count(this.find_sike_relations()[2], '被克') >= 1
    ) {
      chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]
      result = ['返吟', '涉害', this.find_three_pass(chuchuan[0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') == 1
    ) {
      if (count(this.find_sike_relations()[2], '克') == 1 && count(this.find_sike_relations()[2], '被克') == 0) {
        if (this.find_sike_relations()[5] == '被克') {
          if (this.find_sike_relations()[8] == '阴') {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
            return result
          } else {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
            return result
          }
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        }
      } else if (count(this.find_sike_relations()[2], '克') > 1 && count(this.find_sike_relations()[2], '被克') == 0) {
        if (this.find_sike_relations()[5] == '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        }
      } else if (count(this.find_sike_relations()[2], '被克') >= 1 && count(this.find_sike_relations()[2], '克') == 0) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
        return result
      } else if (count(this.find_sike_relations()[2], '被克') >= 1 && count(this.find_sike_relations()[2], '克') >= 1) {
        if (this.find_sike_relations()[5] != '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else if (this.find_sike_relations()[5] == '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        }
      } else {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][1])]
        return result
      }
    } else if (
      count(shangke, '下贼上') == 3 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '被克') >= 1 &&
      count(shangke, '上克下') == 0
    ) {
      result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
      return result
    } else if (
      count(shangke, '下贼上') == 3 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') == 1 &&
      count(shangke, '上克下') == 0
    ) {
      if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 1) {
        if (this.find_sike_relations()[5] != '被克' && this.find_sike_relations()[5] != '克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        }
      } else if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 0) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
        return result
      } else if (count(this.find_sike_relations()[2], '被克') == 0 && count(this.find_sike_relations()[2], '克') == 1) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
        return result
      }
    } else if (count(shangke, '下贼上') == 3 && count(shangke, '上克下') == 1) {
      if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 1) {
        if (this.find_sike_relations()[5] == '克' || this.find_sike_relations()[5] == '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][2][0])]
          return result
        } else if (this.find_sike_relations()[5] != '克' || this.find_sike_relations()[5] != '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        }
      } else if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 0) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
        return result
      } else if (count(this.find_sike_relations()[2], '被克') == 0 && count(this.find_sike_relations()[2], '克') == 1) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
        return result
      } else {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][2][0])]
        return result
      }
    } else if (
      count(shangke, '下贼上') == 3 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '被克') == 1 &&
      count(this.find_sike_relations()[2], '克') == 1
    ) {
      result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
      return result
    } else if (
      count(shangke, '下贼上') == 3 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') >= 1
    ) {
      result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][2][0])]
      return result
    } else if (count(shangke, '下贼上') == 4) {
      if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 1) {
        if (this.find_sike_relations()[5] == '被克' || '克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][2][0])]
          return result
        }
      } else if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 0) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
        return result
      } else if (count(this.find_sike_relations()[2], '被克') == 0 && count(this.find_sike_relations()[2], '克') == 1) {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
        return result
      }
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') == 0 &&
      count(this.find_sike_relations()[2], '被克') == 0
    ) {
      result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
      return result
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') == 0 &&
      count(this.find_sike_relations()[2], '被克') >= 1
    ) {
      if (this.find_sike_relations()[5] != '克') {
        if (count(this.find_sike_relations()[2], '被克') > 1) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        } else if (this.find_sike_relations()[5] != '克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        }
      } else if (this.find_sike_relations()[5] == '克') {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
        return result
      } else {
        result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
        return result
      }
    } else if (
      count(shangke, '下贼上') == 2 &&
      this.find_sike_relations()[9] == '天地盘没有返吟' &&
      count(this.find_sike_relations()[2], '克') > 1
    ) {
      var reducing = this.compare_shehai_number()
      if (len(reducing[0]) == 1) {
        result = ['涉害', '涉害', this.find_three_pass(reducing[0])]
        return result
      } else if (reducing[0] == '找孟仲季地') {
        var converting = this.convert_munchongji_shehai_number()
        if (converting[2][0] == converting[2][1]) {
          result = ['返吟', '涉害', this.find_three_pass(converting[2][0])]
          return result
        } else if (converting[1][0] + converting[3][0] == '季季') {
          result = ['涉害', '涉害', this.find_three_pass(converting[2][0])]
          return result
        } else if (converting[1][1] + converting[3][1] == '季季') {
          result = ['涉害', '涉害', this.find_three_pass(converting[2][0])]
          return result
        } else if (converting[1][0] + converting[3][0] == '孟仲' || '仲孟') {
          result = ['涉害', '涉害', this.find_three_pass(converting[2][0])]
          return result
        }
      }
    } else if (this.compare_shehai_number() == ['不适用，或试他法'] && this.find_sike_relations()[9] == '天地盘返吟') {
      if (len([this.find_sike_relations()[7][1]]) == 1) {
        var chuchuan = this.find_sike_relations()[1][1][0]
        var result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
      } else if (len(this.find_sike_relations()[7][1]) == 2) {
        var chuchuan =
          this.find_sike_relations()[7][2][this.find_sike_relations()[7][1].indexOf(this.Max(this.find_sike_relations()[7][1]))]
        var result = ['返吟', '无依', this.find_three_pass(chuchuan[0])]
      } else if (len(this.find_sike_relations()[7][1]) >= 3) {
        var chuchuan = this.find_sike_relations()[7][2][this.find_sike_relations()[7][4].indexOf('True')]
        var result = ['返吟', '无依', this.find_three_pass(chuchuan[0])]
      }
      return result
    } else if (this.find_sike_relations()[7][0] == '试涉害') {
      var reducing = this.compare_shehai_number()
      if (this.find_sike_relations()[7][2][0] == this.find_sike_relations()[7][2][1]) {
        var chuchuan = this.find_sike_relations()[7][2][0][0]
        var result = ['涉害', '涉害', this.find_three_pass(chuchuan)]
        return result
      } else if (count(shangke, '上克下') == 0 && count(shangke, '下贼上') == 0) {
        result = '不适用，或试他法'
        return result
      } else if (count(shangke, '上克下') >= 0 && count(shangke, '下贼上') == 1) {
        result = '不适用，或试他法'
        return result
      } else if (count(shangke, '上克下') == 2 && count(shangke, '下贼上') == 0) {
        if (count(this.find_sike_relations()[2], '克') >= 1 && count(this.find_sike_relations()[2], '被克') == 0) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        } else if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 0) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
          return result
        } else if (count(this.find_sike_relations()[2], '被克') > 1 && count(this.find_sike_relations()[2], '克') == 0) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
          return result
        } else if (count(this.find_sike_relations()[2], '被克') > 1 && count(this.find_sike_relations()[2], '克') == 0) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else if (count(this.find_sike_relations()[2], '被克') == 1 && count(this.find_sike_relations()[2], '克') == 1) {
          if (this.find_sike_relations()[5] == '克') {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][0])]
            return result
          } else if (this.find_sike_relations()[5] == '被克') {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
            return result
          } else if (this.find_sike_relations()[5] == '生') {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
            return result
          } else if (this.find_sike_relations()[5] == '被生') {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
            return result
          } else {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
            return result
          }
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        }
      } else if (count(shangke, '上克下') == 4 && count(shangke, '下贼上') == 0) {
        if (this.find_sike_relations()[5] == '克' || this.find_sike_relations()[5] == '被克') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else if (this.find_sike_relations()[5] == '被生') {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][2][0])]
          return result
        } else {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][1][1])]
          return result
        }
      } else if (count(shangke, '上克下') > 2 && count(shangke, '下贼上') == 0) {
        if (len(reducing[0]) == 1) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
          return result
        } else if (len(reducing[0]) > 1 && count(this.find_sike_relations()[2], '克') == 1) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
          return result
        } else if (
          len(reducing[0]) > 1 &&
          count(this.find_sike_relations()[2], '克') == 0 &&
          count(this.find_sike_relations()[2], '被克') == 1
        ) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[1][this.find_sike_relations()[2].indexOf('被克')][0])]
          return result
        } else if (
          len(reducing[0]) > 1 &&
          count(this.find_sike_relations()[2], '克') == 0 &&
          count(this.find_sike_relations()[2], '被克') > 1
        ) {
          result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[1][this.find_sike_relations()[2].indexOf('被克')][0])]
          return result
        } else if (len(reducing[0]) > 1 && count(this.find_sike_relations()[2], '克') >= 2) {
          if (count(this.find_sike_relations()[7][4], 'True') == 1 && count(this.find_sike_relations()[7][4], 'False') > 1) {
            result = [
              '涉害',
              '涉害',
              this.find_three_pass(this.find_sike_relations()[1][this.find_sike_relations()[7][4].indexOf('True')][0])
            ]
            return result
          } else if (count(this.find_sike_relations()[7][4], 'True') > 1 && count(this.find_sike_relations()[7][4], 'False') == 1) {
            result = [
              '涉害',
              '涉害',
              this.find_three_pass(this.find_sike_relations()[1][this.find_sike_relations()[7][4].indexOf('False')][0])
            ]
            return result
          } else if (count(this.find_sike_relations()[7][4], 'True') == 0) {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][0])]
            return result
          } else if (count(this.find_sike_relations()[7][4], 'False') == 0) {
            result = ['涉害', '涉害', this.find_three_pass(this.find_sike_relations()[7][2][0][1])]
            return result
          }
        } else if (reducing[0] == '不适用，或试他法') {
          tail = []
          for (let i = 0; i < len(this.find_sike_relations()[7][2]); i++) {
            tail.push(this.find_sike_relations()[7][2][i][1])
          }
          if (tail[0] == this.daygangzhi[0]) {
            chuchuan = this.find_sike_relations()[7][2][0][0]
            result = ['涉害', '涉害', this.find_three_pass(chuchuan)]
            return result
          } else if (tail[1] == this.daygangzhi[0]) {
            chuchuan = this.find_sike_relations()[7][2][1][0]
            result = ['涉害', '涉害', this.find_three_pass(chuchuan)]
            return result
          } else if (reducing[0] == '找孟仲季地') {
            var convert = this.convert_munchongji_shehai_number()
            var convert_dict = {}
            convert_dict[convert[0][0] + convert[2][0]] = convert[1][0] + convert[3][0]
            convert_dict[convert[0][1] + convert[2][1]] = convert[1][1] + convert[3][1]
            var change_daygangzhi = get(this.shigangjigong, this.daygangzhi[0])
            var convert_result_k = list(keys(convert_dict))
            var convert_result_v = list(values(convert_dict))
            var convert_result_tail = convert_result_k.map(function (x) {
              return x[1]
            })
            var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
            if (len(convert[2]) == 3) {
              if (convert[2][0] == change_daygangzhi) {
                chuchuan = convert[2][0]
              } else if (convert[2][1] == change_daygangzhi) {
                chuchuan = convert[2][1]
              } else if (convert[2][2] == change_daygangzhi) {
                chuchuan = convert[2][2]
                name = '见机'
              }
            } else if (len(convert[2]) == 2) {
              if (convert_result_v[0] == '季孟' || '仲孟') {
                chuchuan = convert_result_k[1][1]
                name = '见机'
              } else if (convert_result_v[0] == '孟季' || '仲季' || '季季') {
                chuchuan = convert_result_k[1][0]
                name = '见机'
              }
            } else if (convert_result_v[0][0] == convert_result_v[0][1]) {
              if (dayganzhi_yy == convert_result_k[0][0]) {
                chuchuan = convert_result_k[0][0]
              } else if (dayganzhi_yy == convert_result_k[1][0]) {
                chuchuan = convert_result_k[1][0]
              }
              name = '缀瑕'
            }
            result = ['涉害', name, this.find_three_pass(chuchuan)]
            return result
          }
        }
      }
    } else if (count(shangke, '下贼上') >= 3) {
      var reducing = this.compare_shehai_number()
      if (len(reducing[0]) == 1) {
        var result = ['涉害', '涉害', this.find_three_pass(reducing[0])]
        return result
      } else {
        result = '不适用，或试他法'
      }
      return result
    } else if (count(shangke, '上克下') == 1 && count(shangke, '下贼上') == 3) {
      var reducing = this.compare_shehai_number()
      if (this.find_sike_relations()[7][0] == '试比用') {
        result = '不适用，或试他法'
        return result
      } else if (len(reducing[0]) == 1) {
        result = ['涉害', '涉害', this.find_three_pass(reducing[0])]
        return result
      } else if (reducing[0] == '找孟仲季地') {
        var convert = this.convert_munchongji_shehai_number()
        var convert_dict = {}
        convert_dict[convert[2][0] + convert[0][0]] = convert[3][0] + convert[1][0]
        convert_dict[convert[2][1] + convert[0][1]] = convert[3][1] + convert[1][1]
        convert_result_k = list(keys(convert_dict))
        convert_result_v = list(values(convert_dict))
        convert_result_tail = convert_result_k.map(function (x) {
          return x.split(',')[1]
        })
        change_daygangzhi = get(this.shigangjigong, this.daygangzhi[0])
        if (convert_result_v[0] == '孟季' || '仲季' || '季季') {
          if (convert_result_v[1][1] == '孟') {
            if (convert_result_tail[0] || convert_result_tail[1] == change_daygangzhi) {
              name = '缀瑕'
            } else {
              name = '见机'
            }
          } else if (convert_result_v[1][1] == '仲') {
            name = '察微'
          }
        }
        var chuchuan = convert_result_k[1][0]
        result = ['涉害', name, this.find_three_pass(chuchuan)]
        return result
      }
    }
  }

  this.yaoke = function () {
    if (this.find_sike_relations()[3] == '日干支同位') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (this.find_sike_relations()[4] == '伏吟') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
    var sike = this.all_sike()
    var sike_list = this.find_sike_relations()[0]
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    if (count(sike_list, '下贼上') == 1 && count(sike_list, '上克下') == 1) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (count(sike_list, '下贼上') > 0 || count(sike_list, '上克下') > 0) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }

    if (count(this.find_sike_relations()[2], '克') == 1) {
      if (this.find_sike_relations()[6] == '反吟') {
        chuchuan = [
          '返吟',
          '无亲',
          [
            get(this.yima_dict, this.hourgangzhi[1]),
            get(this.sky_n_earth_list(), this.daygangzhi[1]),
            get(this.sky_n_earth_list(), get(this.shigangjigong, get(this.shigangjigong, this.daygangzhi[0])))
          ]
        ]
        return chuchuan
      } else {
        chuchuan = ['遥克', '遥克', this.find_three_pass(sike[this.find_sike_relations()[2].indexOf('克')][0])]
        return chuchuan
      }
    } else if (count(this.find_sike_relations()[2], '克') > 1) {
      var filterlist = this.duplicates(this.find_sike_relations()[2], '克').map(function (i) {
        return sike[i][0]
      })
      var filterlist2 = filterlist.map(function (b) {
        return this.gangzhi_yinyang(b)
      })
      var nn_list = []
      for (const key in filterlist2) {
        if (Object.hasOwnProperty.call(filterlist2, key)) {
          const n = filterlist2[key]
          if (n == dayganzhi_yy) {
            p = 'True'
          } else {
            p = 'False'
          }
          nn_list.push(p)
          if (count(nn_list, 'True') > 0) {
            var chuchuan = ['遥克', '蒿矢', this.find_three_pass(sike[nn_list.indexOf('True')][0])] || [
              '遥克',
              '蒿矢',
              this.find_three_pass(sike[nn_list.indexOf('False')][0])
            ]
            return chuchuan
          } else if (count(nn_list, 'False') > 0) {
            chuchuan = ['遥克', '蒿矢', this.find_three_pass(this.daygangzhi[1])]
            return chuchuan
          }
        }
      }
    } else if (count(this.find_sike_relations()[2], '被克') == 1) {
      chuchuan = ['遥克', '弹射', this.find_three_pass(sike[this.find_sike_relations()[2].indexOf('被克')][0])]
      return chuchuan
    } else if (count(this.find_sike_relations()[2], '被克') == 2) {
      if (this.find_sike_relations()[6] == '反吟') {
        chuchuan = [
          '返吟',
          '无亲',
          [
            get(this.yima_dict, this.hourgangzhi[1]),
            get(this.sky_n_earth_list(), this.daygangzhi[1]),
            get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
          ]
        ]
        return chuchuan
      } else {
        chuchuan = ['遥克', '弹射', this.find_three_pass(sike[this.find_sike_relations()[2].indexOf('被克')][0])]
        return chuchuan
      }
    } else if (count(this.find_sike_relations()[2], '被克') == 0 && count(this.find_sike_relations()[2], '克') == 0) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
  }

  this.maosing = function () {
    var sike = this.all_sike()
    var sike_list = this.find_sike_relations()[0]
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    var sikehead = sike.map(function (b) {
      return b[0]
    })
    var d = Counter(sikehead)
    var res = []
    for (const key in d) {
      if (Object.hasOwnProperty.call(d, key)) {
        const element = d[key]
        if (element > 1) {
          res.push(key)
        }
      }
    }
    if (len(set(sike)) < 4) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (count(this.find_sike_relations()[2], '克') > 0) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (count(sike_list, '下贼上') == 0 && count(sike_list, '上克下') == 0) {
      if (dayganzhi_yy == '阳') {
        try {
          if (len(res[0]) >= 1) {
            chuchuan = '不适用，或试他法'
            return chuchuan
          }
        } catch (error) {
          if (this.find_sike_relations()[6] == '反吟') {
            chuchuan = [
              '返吟',
              '无亲',
              [
                get(this.yima_dict, this.daygangzhi[1]),
                get(this.sky_n_earth_list(), this.daygangzhi[1]),
                get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
              ]
            ]
            return chuchuan
          } else if (this.find_sike_relations()[6] == '反吟八专') {
            chuchuan = '不适用，或试他法'
            return chuchuan
          } else {
            chuchuan = [
              '昴星',
              '虎视',
              [get(this.sky_n_earth_list(), '酉'), get(this.sky_n_earth_list(), this.daygangzhi[1]), this.all_sike()[3][0]]
            ]
            return chuchuan
          }
        }
      }
      if (dayganzhi_yy == '阴') {
        try {
          if (len(res[0]) >= 1) {
            chuchuan = '不适用，或试他法'
            return chuchuan
          }
        } catch (error) {
          if (this.find_sike_relations()[6] == '反吟') {
            chuchuan = [
              '返吟',
              '无亲',
              [
                get(this.yima_dict, this.daygangzhi[1]),
                get(this.sky_n_earth_list(), this.daygangzhi[1]),
                get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
              ]
            ]
            return chuchuan
          } else if (this.find_sike_relations()[6] == '反吟八专') {
            chuchuan = '不适用，或试他法'
            return chuchuan
          } else {
            ganlivezhi = this.shigangjigong
            chuchuan = [
              '昴星',
              '冬蛇掩目',
              [get(this.earth_n_sky_list(), '酉'), get(this.sky_n_earth_list(), get(ganlivezhi, this.daygangzhi[0])), this.all_sike()[1][0]]
            ]
            return chuchuan
          }
        }
      }
    } else {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
  }

  this.bieze = function () {
    var sike = this.all_sike().map(function (i) {
      return i[0]
    })
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    var sike_list = this.find_sike_relations()[0]
    if (len(set(sike)) == 4) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (this.find_sike_relations()[3] == '日干支同位') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (this.find_sike_relations()[4] == '伏吟') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (count(sike_list, '下贼上') == 0 && count(sike_list, '上克下') == 0) {
      if (dayganzhi_yy == '阳') {
        //寄干藏支
        var sky_ganhe = dict(zip(arr_select(this.Gan, 0, this.Gan.length, 1), arr_select(this.Gan, 5, 10, 1)))
        var ganhe_result1 = get(this.shigangjigong, get(sky_ganhe, this.daygangzhi[0]))
        if (this.find_sike_relations()[6] == '反吟八专') {
          chuchuan = '不适用，或试他法'
          return chuchuan
        } else if (this.find_sike_relations()[4] == '伏吟') {
          chuchuan = '不适用，或试他法'
          return chuchuan
        } else {
          chuchuan = [
            '别责',
            '别责',
            [
              get(this.sky_n_earth_list(), ganhe_result1),
              get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0])),
              get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
            ]
          ]
          return chuchuan
        }
      }
      if (dayganzhi_yy == '阴') {
        var sep = '巳酉丑,寅午戌,亥卯未,申子辰'.split(',')
        var earth_zhihe = dict(
          zip(
            list(
              map(function (x) {
                return tuple(x)
              }, sep)
            ),
            sep
          )
        )
        var result = this.multi_key_dict_get(earth_zhihe, this.daygangzhi[1])
        var position = result.indexOf(this.daygangzhi[1])
        if (position == 0) {
          a = result[1]
        } else if (position == 1) {
          a = result[2]
        } else if (position == 2) {
          a = result[0]
        }
        if (this.find_sike_relations()[6] == '反吟八专') {
          chuchuan = '不适用，或试他法'
          return chuchuan
        } else if (this.find_sike_relations()[4] == '伏吟') {
          chuchuan = '不适用，或试他法'
          return chuchuan
        } else {
          chuchuan = [
            '别责',
            '别责',
            [
              a,
              get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0])),
              get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
            ]
          ]
          return chuchuan
        }
      }
    } else if (this.find_sike_relations()[4] == '伏吟') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
    if (count(sike_list, '下贼上') + count(sike_list, '上克下') >= 1) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
  }

  this.bazhuan = function () {
    var sike = this.all_sike()
    var sike_list = this.find_sike_relations()[0]
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    if (count(sike_list, '下贼上') == 1 && count(sike_list, '上克下') == 1) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (count(sike_list, '下贼上') > 0 || count(sike_list, '上克下') > 0) {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (this.find_sike_relations()[4] == '伏吟') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (this.find_sike_relations()[6] == '反吟八专' && this.find_sike_relations()[4] == '伏吟') {
      chuchuan = [
        '返吟',
        '无亲',
        [
          get(this.yima_dict, this.daygangzhi[1]),
          get(this.sky_n_earth_list(), this.daygangzhi[1]),
          get(this.sky_n_earth_list(), get(this.shigangjigong, this.daygangzhi[0]))
        ]
      ]
      return chuchuan
    } else if (this.find_sike_relations()[3] == '日干支同位') {
      if (count(sike_list, '下贼上') == 0 && count(sike_list, '上克下') == 0) {
        if (dayganzhi_yy == '阳') {
          var pos = this.Zhi.indexOf(sike[3][0]) + 2
          if (pos == 13) {
            pos = 1
          } else if (pos == 14) {
            pos = 0
          }
          pos = this.Zhi[pos]
          if (this.find_sike_relations()[4] == '伏吟') {
            chuchuan = '不适用，或试他法'
            return chuchuan
          } else {
            chuchuan = [
              '八专',
              '八专',
              [pos, get(this.sky_n_earth_list(), this.daygangzhi[1]), get(this.sky_n_earth_list(), this.daygangzhi[1])]
            ]
            return chuchuan
          }
        } else if (dayganzhi_yy == '阴') {
          var pos = this.Zhi.indexOf(sike[0][0]) - 2
          if (pos == -2) {
            pos = 10
          } else if (pos == -1) {
            pos = 11
          }
          pos = this.Zhi[pos]
          if (this.find_sike_relations()[4] == '伏吟' && this.find_sike_relations()[6] == '反吟八专') {
            chuchuan = '不适用，或试他法'
            return chuchuan
          } else {
            chuchuan = [
              '八专',
              '八专',
              [pos, get(this.sky_n_earth_list(), this.daygangzhi[1]), get(this.sky_n_earth_list(), this.daygangzhi[1])]
            ]
            return chuchuan
          }
        }
      }
    } else if (this.find_sike_relations()[3] == '日干支不同位') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    }
  }

  this.fuyin = function () {
    function unique(list1) {
      var unique_list = []
      for (const x in list1) {
        if (Object.hasOwnProperty.call(list1, x)) {
          const element = list1[x]
          if (unique_list.indexOf(element) == -1) {
            unique_list.push(element)
          }
          return element
        }
      }
    }
    var sike_list = this.find_sike_relations()
    var dayganzhi_yy = this.gangzhi_yinyang(this.daygangzhi[0])
    if (sike_list[4] == '非伏吟') {
      chuchuan = '不适用，或试他法'
      return chuchuan
    } else if (sike_list[4] == '伏吟') {
      if (count('上克下') == 1 || count('下贼上') == 1) {
        chuchuan = [
          '伏吟',
          '不虞',
          [unique(sike_list[1])[0], get(this.ying, unique(sike_list[1])[0]), get(this.ying, get(this.ying, unique(sike_list[1])[0]))]
        ]
        return chuchuan
      } else if (count('上克下') == 0 && count('下贼上') == 0) {
        if (dayganzhi_yy == '阳') {
          if (this.multi_key_dict_get(this.ying_chong, get(this.shigangjigong, this.daygangzhi[0])) == '刑') {
            chuchuan = [
              '伏吟',
              '自任',
              [
                get(this.shigangjigong, this.daygangzhi[0]),
                get(this.ying, get(this.shigangjigong, this.daygangzhi[0])),
                get(this.ying, get(this.ying, get(this.shigangjigong, this.daygangzhi[0])))
              ]
            ]
            return chuchuan
          } else if (this.multi_key_dict_get(this.ying_chong, get(this.shigangjigong, this.daygangzhi[0])) == '自刑') {
            chuchuan = [
              '伏吟',
              '杜传',
              [get(this.shigangjigong, this.daygangzhi[0]), this.daygangzhi[1], get(this.ying, this.daygangzhi[1])]
            ]
            return chuchuan
          }
        } else if (dayganzhi_yy == '阴') {
          if (this.multi_key_dict_get(this.ying_chong, get(this.shigangjigong, this.daygangzhi[1])) == '刑') {
            chuchuan = [
              '伏吟',
              '自任',
              [
                get(this.shigangjigong, this.daygangzhi[1]),
                get(this.ying, get(this.shigangjigong, this.daygangzhi[0])),
                get(this.ying, get(this.ying, get(this.shigangjigong, this.daygangzhi[0])))
              ]
            ]
            return chuchuan
          } else if (this.multi_key_dict_get(this.ying_chong, get(this.shigangjigong, this.daygangzhi[1])) == '自刑') {
            chuchuan = [
              '伏吟',
              '杜传',
              [
                get(this.shigangjigong, this.daygangzhi[1]),
                get(this.chong2, get(this.ying, get(this.shigangjigong, this.daygangzhi[0]))),
                get(this.ying, get(this.chong2, get(this.ying, get(this.shigangjigong, this.daygangzhi[0]))))
              ]
            ]
            return chuchuan
          }
          chuchuan = ['伏吟', '自信', [this.daygangzhi[1], get(this.ying, this.daygangzhi[1]), get(this.chong2, this.daygangzhi[1])]]
          return chuchuan
        }
      }
    }
  }

  //丁马
  this.dinhorse = function () {
    var jz = this.jiazi()
    var dinhorsedict = dict(zip(arr_select(jz, 0, jz.length, 10), list('卯丑亥酉未巳')))
    var liujiashun_dict = this.liujiashun_dict
    var shun = this.multi_key_dict_get(liujiashun_dict, this.daygangzhi)
    return this.multi_key_dict_get(dinhorsedict, shun)
  }

  //月马
  this.moonhorse = function () {
    moonhorsedict = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x)
          }, '寅申,卯酉,辰戌,巳亥,午子,丑未'.split(','))
        ),
        list('午申戌子寅辰')
      )
    )
    return this.multi_key_dict_get(moonhorsedict, this.daygangzhi[1])
  }

  //日马
  this.dayhorse = function () {
    return get(dict(zip(this.Zhi, '寅亥申巳寅亥申巳寅亥申巳')), this.daygangzhi[1])
  }

  //华盖
  this.wahgai = function () {
    return get(dict(zip(this.Zhi, '戌丑戌未戌丑戌未戌丑戌未')), this.daygangzhi[1])
  }
  //闪电
  this.lightning = function () {
    lightningd = dict(
      zip(
        this.Zhi,
        list(
          itertools.chain.from_iterable(
            map(function (x) {
              return x * 2
            }, list('辰未戌丑寅卯'))
          )
        )
      )
    )
    return get(lightningd, this.daygangzhi[1])
  }

  //排贵人起点
  this.guiren_starting_gangzhi = function (num) {
    var guiren_dict = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x)
          }, list('甲,戊庚,丙,丁,壬,癸,乙,己,辛'.split(',')))
        ),
        list(
          map(function (x) {
            return dict(zip(list('昼夜'), x))
          }, '未丑,丑未,酉亥,亥酉,卯巳,巳卯,申子,子申,寅午'.split(','))
        )
      )
    )
    var guiren_dict2 = dict(
      zip(
        list(
          map(function (x) {
            return tuple(x)
          }, list('甲戊庚,乙己,丙丁,壬癸,辛'.split(',')))
        ),
        list(
          map(function (x) {
            return dict(zip(list('昼夜'), x))
          }, '丑未,子申,亥酉,巳卯,午寅'.split(','))
        )
      )
    )
    var option = { 0: guiren_dict2, 1: guiren_dict }
    var get_day = this.multi_key_dict_get(get(option, num), this.daygangzhi[0])
    var find_day_or_night = this.multi_key_dict_get(this.daynight_richppl_dict, this.hourgangzhi[1])
    return get(get_day, find_day_or_night)
  }

  this.guiren_start_earth = function (num) {
    sky = this.earth_n_sky_list()
    return get(sky, this.guiren_starting_gangzhi(num))
  }

  this.guiren_order_list = function (num) {
    var starting_gangzhi = this.guiren_starting_gangzhi(num)
    var rotation = dict(
      zip(
        list(
          map(
            function (x) {
              return tuple(x)
            },
            '巳午未申酉戌,亥子丑寅卯辰'.split(',').map(function (x) {
              return list(x)
            })
          )
        ),
        '逆布,顺布'.split(',')
      )
    )
    var new_zhi_list_guiren = this.new_zhi_list(starting_gangzhi)
    var guiren = this.guiren_start_earth(num)
    var answer = [this.zeike(), this.biyung(), this.shehai(), this.yaoke(), this.maosing(), this.bieze(), this.bazhuan(), this.fuyin()]
    var nouse = ['不适用，或试他法']
    var ju_three_pass = []
    for (const key in answer) {
      if (Object.hasOwnProperty.call(answer, key)) {
        const i = answer[key]
        if (nouse.indexOf(i) == -1) {
          ju_three_pass.push(i)
        }
      }
    }
    var ju = ju_three_pass[0][0]
    if (ju == '返吟') {
      var pai_gui = this.new_list(list(reversed(this.sky_generals)), '贵')
    } else if (ju != '返吟') {
      pai_gui = this.new_list(this.sky_generals, '贵')
    }
    var rotation_results = this.multi_key_dict_get(rotation, guiren)
    if (rotation_results == '顺布') {
      return dict(zip(new_zhi_list_guiren, pai_gui))
    } else if (rotation_results == '逆布') {
      return dict(zip(new_zhi_list_guiren, this.new_list(list(reversed(this.sky_generals)), '贵')))
    }
  }

  this.result = function (num) {
    var answer = [this.zeike(), this.biyung(), this.shehai(), this.yaoke(), this.maosing(), this.bieze(), this.bazhuan(), this.fuyin()]
    var nouse = ['不适用，或试他法']
    var ju_three_pass = []
    for (const key in answer) {
      if (Object.hasOwnProperty.call(answer, key)) {
        const i = answer[key]
        if (nouse.indexOf(i) == -1) {
          ju_three_pass.push(i)
        }
      }
    }
    var sky_earth = this.sky_n_earth_list()

    var sky = list(values(sky_earth))
    var earth = list(keys(sky_earth))
    var guiren_order_list_2 = this.guiren_order_list(num)
    var guiren_order_list_3 = sky.map(function (i) {
      return get(guiren_order_list_2, i)
    })
    var earth_to_general = dict(zip(earth, guiren_order_list_3))
    var sky_earth_guiren_dict = { 天盘: sky, 地盘: earth, 天将: guiren_order_list_3 }
    var ju = [ju_three_pass[0][0], ju_three_pass[0][1]]
    var three_pass_zhi = ju_three_pass[0][2]
    var three_pass_generals = three_pass_zhi.map(function (i) {
      return get(guiren_order_list_2, i)
    })
    var day_gz_vs_three_pass = []
    for (let i = 0; i < three_pass_zhi.length; i++) {
      var item = get(
        this.liuqing_dict,
        this.multi_key_dict_get(this.wuxing_relation_2, this.Ganzhiwuxing(this.hourgangzhi[0]) + this.Ganzhiwuxing(three_pass_zhi[i]))
      )
      day_gz_vs_three_pass.push(item)
    }
    var three_pass = {
      初传: [three_pass_zhi[0], three_pass_generals[0], day_gz_vs_three_pass[0][0], this.shunkong(this.daygangzhi, three_pass_zhi[0])],
      中传: [three_pass_zhi[1], three_pass_generals[1], day_gz_vs_three_pass[1][0], this.shunkong(this.daygangzhi, three_pass_zhi[1])],
      末传: [three_pass_zhi[2], three_pass_generals[2], day_gz_vs_three_pass[2][0], this.shunkong(this.daygangzhi, three_pass_zhi[2])]
    }
    var sike_zhi = this.all_sike()
    var sike_generals = sike_zhi.map(function (i) {
      return get(guiren_order_list_2, i[0])
    })
    var sike = {
      四课: [sike_zhi[0], sike_generals[0]],
      三课: [sike_zhi[1], sike_generals[1]],
      二课: [sike_zhi[2], sike_generals[2]],
      一课: [sike_zhi[3], sike_generals[3]]
    }
    var dyima = this.multi_key_dict_get(this.yimadict, this.daygangzhi[1])
    //starpan = dict(zip(this.new_zhi_list("巳"), [this.multi_key_dict_get(this.hoursu, this.daygangzhi[0]).get(i) for i in this.new_zhi_list("巳")]))
    return {
      节气: this.jieqi,
      日期: this.daygangzhi + '日' + this.hourgangzhi + '时',
      格局: ju,
      日马: dyima,
      三传: three_pass,
      四课: sike,
      天地盘: sky_earth_guiren_dict,
      地转天盘: sky_earth,
      地转天将: earth_to_general
    }
  }

  this.result_m = function (num) {
    var answer = [this.zeike(), this.biyung(), this.shehai(), this.yaoke(), this.maosing(), this.bieze(), this.bazhuan(), this.fuyin()]
    var nouse = ['不适用，或试他法']
    var ju_three_pass = []
    for (const key in answer) {
      if (Object.hasOwnProperty.call(answer, key)) {
        const i = answer[key]
        if (nouse.indexOf(i) == -1) {
          ju_three_pass.push(i)
        }
      }
    }
    var sky_earth = this.sky_n_earth_list()
    var sky = list(values(sky_earth))
    var earth = list(sky_earth.keys())
    var guiren_order_list_2 = this.guiren_order_list(num)
    var guiren_order_list_3 = sky.map(function (i) {
      return get(guiren_order_list_2, i)
    })
    var earth_to_general = dict(zip(earth, guiren_order_list_3))
    var sky_earth_guiren_dict = { 天盘: sky, 地盘: earth, 天将: guiren_order_list_3 }
    var ju = [ju_three_pass[0][0], ju_three_pass[0][1]]
    var three_pass_zhi = ju_three_pass[0][2]
    var three_pass_generals = three_pass_zhi.map(function (i) {
      return get(guiren_order_list_2, i)
    })
    var day_gz_vs_three_pass = []
    for (let i = 0; i < three_pass_zhi.length; i++) {
      var item = get(
        this.liuqing_dict,
        this.multi_key_dict_get(this.wuxing_relation_2, this.Ganzhiwuxing(this.hourgangzhi[0]) + this.Ganzhiwuxing(three_pass_zhi[i]))
      )
      day_gz_vs_three_pass.push(item)
    }
    var three_pass = {
      初传: [three_pass_zhi[0], three_pass_generals[0], day_gz_vs_three_pass[0], this.shunkong(this.hourgangzhi, three_pass_zhi[0])],
      中传: [three_pass_zhi[1], three_pass_generals[1], day_gz_vs_three_pass[1], this.shunkong(this.hourgangzhi, three_pass_zhi[1])],
      末传: [three_pass_zhi[2], three_pass_generals[2], day_gz_vs_three_pass[2], this.shunkong(this.hourgangzhi, three_pass_zhi[2])]
    }
    var sike_zhi = this.all_sike()
    var sike_generals = sike_zhi.map(function (i) {
      return get(guiren_order_list_2, i[0])
    })

    var sike = {
      四课: [sike_zhi[0], sike_generals[0]],
      三课: [sike_zhi[1], sike_generals[1]],
      二课: [sike_zhi[2], sike_generals[2]],
      一课: [sike_zhi[3], sike_generals[3]]
    }
    var dyima = this.multi_key_dict_get(this.yimadict, this.hourgangzhi[1])
    //starpan = dict(zip(this.new_zhi_list("巳"), [this.multi_key_dict_get(this.hoursu, this.hourgangzhi[0]).get(i) for i in this.new_zhi_list("巳")]))
    return {
      节气: this.jieqi,
      日期: this.daygangzhi + '时' + this.hourgangzhi + '分',
      格局: ju,
      日马: dyima,
      三传: three_pass,
      四课: sike,
      天地盘: sky_earth_guiren_dict,
      地转天盘: sky_earth,
      地转天将: earth_to_general
    }
  }
}
