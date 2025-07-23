'use strict'

var tianGan = '甲乙丙丁戊己庚辛壬癸'
var diZhi = '子丑寅卯辰巳午未申酉戌亥'
var SHI_SHEN = ['卩', '印', '比', '劫', '食', '伤', '才', '财', '杀', '官']
// 月支藏干表
const CANG_GAN = {
  子: ['癸'],
  丑: ['己', '癸', '辛'],
  寅: ['甲', '戊', '丙'],
  卯: ['乙'],
  辰: ['戊', '乙', '癸'],
  巳: ['丙', '庚', '戊'],
  午: ['丁', '己'],
  未: ['己', '丁', '乙'],
  申: ['庚', '戊', '壬'],
  酉: ['辛'],
  戌: ['戊', '辛', '丁'],
  亥: ['壬', '甲']
}

var GX = Array(
  //刑冲合害关系: [0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]
  [0, 0, [0, 6], -1, '甲庚冲'],
  [0, 0, [1, 7], -1, '乙辛冲'],
  [0, 0, [2, 8], -1, '丙壬冲'],
  [0, 0, [3, 9], -1, '丁癸冲'],
  [0, 1, [0, 5], 4, '甲己合化土'],
  [0, 1, [1, 6], 0, '乙庚合化金'],
  [0, 1, [2, 7], 1, '丙辛合化水'],
  [0, 1, [3, 8], 2, '丁壬合化木'],
  [0, 1, [4, 9], 3, '戊癸合化火'],
  [1, 2, [0, 6], -1, '子午冲'],
  [1, 2, [1, 7], -1, '丑未冲'],
  [1, 2, [2, 8], -1, '寅申冲'],
  [1, 2, [3, 9], -1, '卯酉冲'],
  [1, 2, [4, 10], -1, '辰戌冲'],
  [1, 2, [5, 11], -1, '巳亥冲'],
  [1, 3, [2, 5, 8], -1, '寅巳申三刑'],
  [1, 3, [1, 10, 7], -1, '丑戌未三刑'],
  [1, 4, [2, 5], -1, '寅巳相刑'],
  [1, 4, [5, 8], -1, '巳申相刑'],
  [1, 4, [1, 10], -1, '丑戌相刑'],
  [1, 4, [10, 7], -1, '戌未相刑'],
  [1, 4, [0, 3], -1, '子卯相刑'],
  [1, 5, [9, 9], -1, '酉酉自刑'],
  [1, 5, [11, 11], -1, '亥亥自刑'],
  [1, 5, [6, 6], -1, '午午自刑'],
  [1, 5, [4, 4], -1, '辰辰自刑'],
  [1, 6, [0, 1], 4, '子丑合化土'],
  [1, 6, [2, 11], 2, '寅亥合化木'],
  [1, 6, [3, 10], 3, '卯戌合化火'],
  [1, 6, [4, 9], 0, '辰酉合化金'],
  [1, 6, [5, 8], 1, '巳申合化水'],
  [1, 6, [6, 7], 3, '午未合化火'],
  [1, 7, [2, 6, 10], 3, '寅午戌三合火'],
  [1, 7, [8, 0, 4], 1, '申子辰三合水'],
  [1, 7, [5, 9, 1], 0, '巳酉丑三合金'],
  [1, 7, [11, 3, 7], 2, '亥卯未三合木'],
  [1, 8, [8, 0], 1, '申子半合水'],
  [1, 8, [0, 4], 1, '子辰半合水'],
  [1, 8, [11, 3], 2, '亥卯半合木'],
  [1, 8, [3, 7], 2, '卯未半合木'],
  [1, 8, [2, 6], 3, '寅午半合火'],
  [1, 8, [6, 10], 3, '午戌半合火'],
  [1, 8, [5, 9], 0, '巳酉半合金'],
  [1, 8, [9, 1], 0, '酉丑半合金'],
  [1, 9, [8, 4], 0, '申辰拱合子'],
  [1, 9, [11, 7], 3, '亥未拱合卯'],
  [1, 9, [2, 10], 6, '寅戌拱合午'],
  [1, 9, [5, 1], 9, '巳丑拱合酉'],
  [1, 10, [2, 3, 4], 2, '寅卯辰会木'],
  [1, 10, [5, 6, 7], 3, '巳午未会火'],
  [1, 10, [8, 9, 10], 0, '申酉戌会金'],
  [1, 10, [11, 0, 1], 1, '亥子丑会水'],
  [1, 11, [2, 4], 3, '寅辰拱会卯'],
  [1, 11, [5, 7], 6, '巳未拱会午'],
  [1, 11, [8, 10], 9, '申戌拱会酉'],
  [1, 11, [11, 1], 0, '亥丑拱会子'],
  [1, 12, [3, 8], -1, '卯申暗合'],
  [1, 12, [6, 11], -1, '午亥暗合'],
  [1, 12, [1, 2], -1, '丑寅暗合'],
  [1, 12, [2, 7], -1, '寅未暗合'],
  [1, 12, [0, 10], -1, '子戌暗合'],
  [1, 12, [0, 4], -1, '子辰暗合'],
  [1, 12, [5, 9], -1, '巳酉暗合'],
  [1, 13, [0, 7], -1, '子未害'],
  [1, 13, [1, 6], -1, '丑午害'],
  [1, 13, [2, 5], -1, '寅巳害'],
  [1, 13, [3, 4], -1, '卯辰害'],
  [1, 13, [8, 11], -1, '申亥害'],
  [1, 13, [9, 10], -1, '酉戌害']
)

function pc_array_power_set(arr) {
  var results = [[]]
  for (var i in arr) {
    for (var j in results) {
      array_push(results, array_merge([arr[i]], results[j]))
    }
  }
  return results
}

function array_merge() {
  var args = Array.prototype.slice.call(arguments)
  var argl = args.length
  var arg
  var retObj = {}
  var k = ''
  var argil = 0
  var j = 0
  var i = 0
  var ct = 0
  var toStr = Object.prototype.toString
  var retArr = true
  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false
      break
    }
  }
  if (retArr) {
    retArr = []
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i])
    }
    return retArr
  }
  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i]
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j]
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k]
          } else {
            retObj[k] = arg[k]
          }
        }
      }
    }
  }
  return retObj
}

function array_keys(input, searchValue, argStrict) {
  var search = typeof searchValue !== 'undefined'
  var tmpArr = []
  var strict = !!argStrict
  var include = true
  var key = ''

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true
      if (search) {
        if (strict && input[key] !== searchValue) {
          include = false
        } else if (input[key] !== searchValue) {
          include = false
        }
      }

      if (include) {
        tmpArr[tmpArr.length] = key
      }
    }
  }
  return tmpArr
}

function array_push(inputArr) {
  var i = 0
  var pr = ''
  var argv = arguments
  var argc = argv.length
  var allDigits = /^\d$/
  var size = 0
  var highestIdx = 0
  var len = 0

  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i]
    }
    return inputArr.length
  }
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10)
        highestIdx = size > highestIdx ? size : highestIdx
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i]
  }

  return len + i - 1
}

function array_diff(arr1) {
  var retArr = {}
  var argl = arguments.length
  var k1 = ''
  var i = 1
  var k = ''
  var arr = {}

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i]
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }
  return retArr
}

function array_intersect(arr1) {
  var retArr = {}
  var argl = arguments.length
  var arglm1 = argl - 1
  var k1 = ''
  var arr = {}
  var i = 0
  var k = ''

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i]
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1]
          }
          continue arrs
        }
      }
      continue arr1keys
    }
  }
  return retArr
}

function empty(mixedVar) {
  var undef
  var key
  var i
  var len
  var emptyValues = [undef, null, false, 0, '', '0']
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
  return false
}

function count(mixedVar, mode) {
  var key
  var cnt = 0

  if (mixedVar === null || typeof mixedVar === 'undefined') {
    return 0
  } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
    return 1
  }
  if (mode === 'COUNT_RECURSIVE') {
    mode = 1
  }
  if (mode !== 1) {
    mode = 0
  }
  for (key in mixedVar) {
    if (mixedVar.hasOwnProperty(key)) {
      cnt++
      if (mode === 1 && mixedVar[key] && (mixedVar[key].constructor === Array || mixedVar[key].constructor === Object)) {
        cnt += count(mixedVar[key], 1)
      }
    }
  }
  return cnt
}

function implode(glue, pieces) {
  var i = ''
  var retVal = ''
  var tGlue = ''

  if (arguments.length === 1) {
    pieces = glue
    glue = ''
  }
  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue)
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i]
      tGlue = glue
    }
    return retVal
  }

  return pieces
}
/**
 * 从天干地支数组查出所有刑冲合害关系
 * @param array tg 天干数组
 * @param array dz 地支数组
 * @return array [[], []]
 */
function GetGX(tgZi, dzZi) {
  let tg = []
  tgZi.map(zi => {
    tg.push(tianGan.indexOf(zi))
  })
  let dz = []
  dzZi.map(zi => {
    dz.push(diZhi.indexOf(zi))
  })

  var list = new Array([], []) //两个列表:0位是天干关系列表,1位是地支关系列表
  var excludes = {
    4: 3, //相刑要把三刑(3)排除
    8: 7, //半合要把三合(7)排除
    9: 7, //拱合要把三合(7)排除
    11: 10 //拱会要把三会(10)排除
  }
  for (var i in GX) {
    //[0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]
    var gx = GX[i]

    var to = gx[0] == 0 ? tg : dz //要匹配的类型

    var fd = array_intersect(to, gx[2]) //求交集,返回的键名与to是一致的
    if (empty(array_diff(gx[2], fd))) {
      //说明存在此关系

      var c1 = count(fd)
      var c2 = count(gx[2])

      var fds = new Array() //最终关联的
      if (c1 < c2) {
        //比如亥亥自刑,在只有一个亥的时候也会来这里
      }
      if (c1 == c2) {
        //有且只有一个此类关系
        array_push(fds, fd)
      }
      if (c1 > c2) {
        //存在多个此类关系,先算出所有可能的组合,再匹配判断以精确指定是哪一个位置
        var set = pc_array_power_set(array_keys(fd))
        for (var ii in set) {
          var keys = set[ii]
          if (count(keys) != c2) {
            continue
          }
          var fd = new Array()
          for (var iii in keys) {
            fd[keys[iii]] = to[keys[iii]]
          }
          if (empty(array_diff(gx[2], fd))) {
            array_push(fds, fd)
          }
        }
      }
      b1: for (var j in fds) {
        //组合成期望的返回
        b2: for (var expect in excludes) {
          if (gx[1] == expect) {
            b3: for (var jj in list[gx[0]]) {
              //其实仅针对地支有这种情况
              var [fd2, gx2] = list[gx[0]][jj]
              if (gx2[1] == excludes[expect]) {
                if (array_intersect(gx[2], gx2[2])) {
                  break b1
                }
              }
            }
            break
          }
        }
        array_push(list[gx[0]], [fds[j], gx])
      }
    }
  }
  return list
}

var StemConflict = 0 //冲
var StemSubdue = 1 //克
var StemCollaborate = 2 //合
var BranchConflict = 3 //冲
var BranchCollaborate = 4 //合
var BranchContradiction3 = 5 //刑
var BranchContradiction2 = 6 //刑
var BranchSquare4 = 7 //会
var BranchSquare3 = 8 //会
var BranchSquareHidden = 9 //暗会
var BranchSquareMissKey = 10 //拱会
var BranchMeetFull = 11 //三合
var BranchMeetHalf = 12 //半合
var BranchMeetHidden = 13 //暗合
var BranchMeetMissKey = 14 //拱合
var BranchHiddenCollaborate = 15 //暗合
var BranchHarm = 16 //害
var BranchDamage = 17 //破

/**
 * 文字转刑冲索引
 * @param {z} text
 * @returns
 */
function text2Index(text) {
  if (text.indexOf('自刑') != -1) {
    return BranchContradiction3
  }
  if (text.indexOf('相刑') != -1) {
    return BranchContradiction2
  }
  if (text.indexOf('冲') != -1) {
    return StemConflict
  }
  if (text.indexOf('克') != -1) {
    return StemSubdue
  }
  if (text.indexOf('害') != -1) {
    return BranchHarm
  }
  if (text.indexOf('破') != -1) {
    return BranchDamage
  }
  if (text.indexOf('暗合') != -1) {
    return BranchHiddenCollaborate
  }
  if (text.indexOf('半合') != -1) {
    return BranchMeetHalf
  }
  if (text.indexOf('拱合') != -1) {
    return BranchMeetMissKey
  }
  if (text.indexOf('三合') != -1) {
    return BranchMeetFull
  }
  if (text.indexOf('拱会') != -1) {
    return BranchSquareMissKey
  }
  if (text.indexOf('会') != -1) {
    return BranchSquare3
  }
  if (text.indexOf('合') != -1) {
    if (tianGan.indexOf(text.slice(1, 2)) != -1) {
      return StemCollaborate
    }
    return BranchCollaborate
  }
}

var BranchCollaSet = (1 << BranchCollaborate) | (1 << BranchSquare4) | (1 << BranchSquare3) | (1 << BranchMeetFull) | (1 << BranchMeetHalf)

var ConflictSet =
  (1 << StemConflict) |
  (1 << StemSubdue) |
  (1 << BranchConflict) |
  (1 << BranchContradiction3) |
  (1 << BranchContradiction2) |
  (1 << BranchSquareHidden) |
  (1 << BranchSquareMissKey) |
  (1 << BranchMeetHidden) |
  (1 << BranchMeetMissKey) |
  (1 << BranchHiddenCollaborate) |
  (1 << BranchHarm) |
  (1 << BranchDamage)

var Success = 0 //空
var SuccessAndTransformed = 1 //成化
var SuccessAndNotTransform = 2 //不化
var Unknow = 3

var LIU_QIN = ['父母', '子孙', '官鬼', '妻财', '兄弟']
var WU_XIN_INDEX = {
  金: 0,
  水: 1,
  木: 2,
  火: 3,
  土: 4
}

var WU_XIN_STEM2 = {
  金: 6,
  水: 8,
  木: 0,
  火: 2,
  土: 4
}

var WU_XING_GAN = {
  甲: '木',
  乙: '木',
  丙: '火',
  丁: '火',
  戊: '土',
  己: '土',
  庚: '金',
  辛: '金',
  壬: '水',
  癸: '水'
}

var WU_XING_GAN_INDEX = {
  甲: 0,
  乙: 1,
  丙: 2,
  丁: 3,
  戊: 4,
  己: 5,
  庚: 6,
  辛: 7,
  壬: 8,
  癸: 9
}
var WU_XING_ZHI = {
  寅: '木',
  卯: '木',
  巳: '火',
  午: '火',
  辰: '土',
  丑: '土',
  戌: '土',
  未: '土',
  申: '金',
  酉: '金',
  亥: '水',
  子: '水'
}

var SAN_CAI = {
  金土: '金',
  水金: '金',
  木水: '金',
  火木: '金',
  土火: '金',
  金水: '水',
  水木: '水',
  木火: '水',
  火土: '水',
  土金: '水',
  金火: '木',
  水土: '木',
  木金: '木',
  火水: '木',
  土木: '木',
  金木: '火',
  水火: '火',
  木土: '火',
  火金: '火',
  土水: '火',
  金金: '土',
  水水: '土',
  木木: '土',
  火火: '土',
  土土: '土'
}

var WUXIN_TO_LIUQIN = {
  金: '父母',
  水: '子孙',
  木: '官鬼',
  火: '妻财',
  土: '兄弟'
}

function MatchedCatalystStems(wuxin, stem) {
  // //console.log('MatchedCatalystStems', wuxin, stem)
  var r = []
  for (var i = 0; i < stem.length; i++) {
    let v = stem[i]
    if (wuxin == WU_XING_GAN[v]) {
      r.push(v)
    }
  }
  let size = r.length
  if (size == 0) {
    return 10
  } else if (size == 1) {
    return WU_XING_GAN_INDEX[r[0]]
  } else if (size >= 2) {
    // TODO 这里原本是 == 2
    return WU_XIN_STEM2[wuxin]
  } else {
    throw new Error('matchedCatalystStems.count can not more than 2')
  }
}

var HEHUA_DATA = function () {
  this.HeHua = 0 //合化
  this.WuXin = '' //五行
  this.Pillars = [] //合化的柱
  this.ChengHua = 0 //成化
  this.ShiShen = 0 //十神
}

// 所有已经成化的数据找出来
// 初始成化属性是Unknow
function GetChenHua(hehua_data) {
  var chenhua_data = []
  for (var i = 0; i < hehua_data.length; i++) {
    var v = hehua_data[i]
    if (v.ChengHua == SuccessAndTransformed) {
      var cur_chenhua = new HEHUA_DATA()
      cur_chenhua.ChengHua = v.ChengHua
      cur_chenhua.HeHua = v.HeHua
      cur_chenhua.Pillars = v.Pillars
      cur_chenhua.WuXin = v.WuXin
      cur_chenhua.ShiShen = v.ShiShen
      chenhua_data.push(cur_chenhua)
    }
  }
  return chenhua_data
}

function GetYMDT(chenghua_data) {
  var shishen_data = []
  for (var i = 0; i < chenghua_data.length; i++) {
    var v = chenghua_data[i]
    var YMDT = true
    for (var n = 0; n < v.Pillars.length; n++) {
      if (v.Pillars[n] > 4) {
        YMDT = false
        break
      }
    }
    if (YMDT) {
      shishen_data.push(v)
    }
  }
  return shishen_data
}

function GetBranchCollaSet(data) {
  var bcdata = []
  for (var i = 0; i < data.length; i++) {
    var v = data[i]
    if ((v.ChengHua & BranchCollaSet) != 0) {
      bcdata.push(v)
    }
  }

  return bcdata
}

function GetShiShen(chenghua_data, hideGan) {
  ///先从成化里找
  //柱必须全在年月日时柱
  let ymdt_data = GetYMDT(chenghua_data)
  let mz_data = GetMonthZhi(ymdt_data)
  let bcdata = GetBranchCollaSet(mz_data)
  if ((bcdata.length = 0 && bcdata[0].ShiShen != 10)) {
    return bcdata[0].ShiShen
  }
  ///找不到就返回月藏干
  return WU_XING_GAN_INDEX[hideGan[0]]
}

// 存在月支柱
function GetMonthZhi(data) {
  let mzdata = []
  data.map(v => {
    v.Pillars.map(p => {
      if (p == 1) {
        mzdata.push(v)
      }
    })
  })

  return mzdata
}

// 1.农历时间生成年,月,日,时的天干地支。
// 2.大运流年流月流日流时根据选择决定是否参与计算。
// 3.根据4-9柱两两生成合冲关系以及五行属性。
// 4.通过1生成的月柱干支中地支属性生成隐藏天干属性。
// 5.3中五行属性和4中天干属性生成催化天干属性。
// 6.获取5中的天干和4中天干对应的五行属性。
// 7.6中获取的2中五行属性查询获取三才配置五行属性。
// 8.7中三才五行属性查表对应的六亲属性("父母", "子孙", "官鬼", "妻财", "兄弟").
// 9.8中获取的六亲属性为 "妻财" 时为不化，其它成化。

/**
 *
 * @param {*} HEHUA 刑冲代号
 * @param {} WUXIN 需要判断的五行属性
 * @param {*} LOWESTPILLAR 参与计算柱的数量
 * @param {*} hideGan 月支藏干
 * @param {*} GANZHI 参与计算的天干
 * @param {*} liuniangan 流年天干
 * @returns
 */
function GetTransForm(hehua_data, hideGan, tianGan, dizhi) {
  var GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  // //console.log('hehua_data, hideGan, tianGan, dizhi', hehua_data, hideGan, tianGan, dizhi)
  var chenghua_Loop = 0
  for (chenghua_Loop = 0; chenghua_Loop < 20; chenghua_Loop++) {
    var has_chenhua = 0
    for (var i = 0; i < hehua_data.length; i++) {
      var v = hehua_data[i]
      var checkHehua = 1 << v.HeHua
      //console.log('checkHehua = 1 << v.HeHua', (checkHehua = 1 << v.HeHua), v)
      if ((checkHehua & ConflictSet) != 0) {
        continue
      } else if ((checkHehua & BranchCollaSet) != 0) {
        var chenhua_data = GetChenHua(hehua_data)
        var shishen = GetShiShen(chenhua_data, hideGan)
        if (v.Pillars[0] >= 4 && v.Pillars[0] < 9) {
          //合化右边的柱
          // let liunianzhi = dizhi.slice(4, v.Pillars[0]).concat(dizhi[v.Pillars[0]])
          // let liuniangan = []
          // liunianzhi.map(item => {
          //   liuniangan.push(CANG_GAN[item][0])
          // })
          let liuniangan = tianGan.slice(4, v.Pillars[0]).concat(tianGan[v.Pillars[0]])

          let m = MatchedCatalystStems(v.WuXin, liuniangan)
          if (m != 10) {
            v.ChengHua = SuccessAndTransformed
            has_chenhua = 1
            v.ShiShen = m
            //console.log('MatchedCatalystStems(v.WuXin, liuniangan),m, liuniangan,chenghua_Loop', m, liuniangan, chenghua_Loop)
            continue
          }
        }
        var HIDEGAN = MatchedCatalystStems(v.WuXin, tianGan.slice(0, 4))
        if (HIDEGAN == 10) {
          v.ShiShen = WU_XIN_STEM2[v.WuXin]
          v.ChengHua = SuccessAndNotTransform
          //console.log('MatchedCatalystStems(v.WuXin,GANZHI),HIDEGAN', HIDEGAN)

          continue
        }
        v.ShiShen = HIDEGAN
        if (v.Pillars[0] >= 4 && v.Pillars[0] < 9) {
          //合化右边的柱
          for (let n = 0; n < v.Pillars.length; n++) {
            const vv = v.Pillars[n]
            if (vv == 1) {
              v.ChengHua = SuccessAndTransformed
              has_chenhua = 1
              break
            }
          }
          if (has_chenhua == 1) {
            //console.log('如果其中有月柱直接成化,HIDEGAN', v.Pillars)
            v.ChengHua = SuccessAndTransformed
            has_chenhua = 1
            continue
          }
        }

        var liuqin = WUXIN_TO_LIUQIN[SAN_CAI[WU_XING_GAN[GAN[shishen]] + WU_XING_GAN[GAN[HIDEGAN]]]]
        //console.log('liuqin', liuqin)
        if (liuqin == '妻财') {
          v.ChengHua = SuccessAndNotTransform
        } else {
          v.ChengHua = SuccessAndTransformed
          has_chenhua = 1
        }
      } else {
        var chenhua_data = GetChenHua(hehua_data)
        var shishen = GetShiShen(chenhua_data, hideGan)
        if (v.Pillars[0] >= 4 && v.Pillars[0] < 9) {
          //合化右边的柱
          let liunianzhi = dizhi.slice(4, v.Pillars[0]).concat(dizhi[v.Pillars[0]])
          let liuniangan = []
          liunianzhi.map(item => {
            liuniangan.push(CANG_GAN[item][0])
          })
          let m = MatchedCatalystStems(v.WuXin, liuniangan)
          //console.log('m = MatchedCatalystStems(v.WuXin, liuniangan)', liuniangan, m)
          if (m != 10) {
            v.ChengHua = SuccessAndTransformed
            has_chenhua = 1
            v.ShiShen = m
            continue
          }
        }
        //隐藏干支
        var HIDEGAN = MatchedCatalystStems(v.WuXin, hideGan)
        //console.log('MatchedCatalystStems(v.WuXin, hideGan)', hideGan, HIDEGAN)

        if (HIDEGAN == 10) {
          v.ShiShen = WU_XIN_STEM2[v.WuXin]
          v.ChengHua = SuccessAndNotTransform
          continue
        }
        v.ShiShen = HIDEGAN
        var liuqin = WUXIN_TO_LIUQIN[SAN_CAI[WU_XING_GAN[GAN[shishen]] + WU_XING_GAN[GAN[HIDEGAN]]]]
        //console.log('liuqin2', liuqin)
        if (liuqin == '妻财') {
          v.ChengHua = SuccessAndNotTransform
        } else {
          v.ChengHua = SuccessAndTransformed
          has_chenhua = 1
        }
      }
    }
    if (has_chenhua == 0) {
      //console.log('has_chenhua == 0')
      break
    }
  }
  // //console.log('hehua_data,', hehua_data)
  return hehua_data
}

function getXingChong(tgZi, dzZi) {
  var gxs = GetGX(tgZi, dzZi)

  let result = []
  for (var i in gxs) {
    let zi_arr = []
    for (var j in gxs[i]) {
      var gx = gxs[i][j]
      var a = {
        t: gx[1][4],
        i: []
      }
      for (var k in gx[0]) {
        a.i.push(parseInt(k))
      }
      // let wuxing = a.t.slice(a.t.length - 1)
      // //console.log(a, text2Index(a.t), wuxing, a.i, CANG_GAN[dzZi[1]], tgZi, dzZi)
      // let isTransForm = GetTransForm(text2Index(a.t), wuxing, a.i, CANG_GAN[dzZi[1]], tgZi, dzZi)
      // //console.log(isTransForm)
      // //console.log('========')
      // if (isTransForm == 1) {
      //   a.t = a.t + '成化'
      // }
      // if (isTransForm == 2) {
      //   a.t = a.t + '不化'
      // }
      zi_arr.push(a)
    }
    //console.log(zi_arr)

    result.push(zi_arr)
  }

  let hehuadata = []
  result.map(zi_arr => {
    for (let index = 0; index < zi_arr.length; index++) {
      let item = zi_arr[index]
      let wuxing = item.t.slice(item.t.length - 1)
      hehuadata.push({
        t: item.t,
        i: item.i,
        ChengHua: 3,
        HeHua: text2Index(item.t),
        Pillars: item.i.reverse(),
        WuXin: wuxing,
        ShiShen: 10
      })
    }
  })

  let data = GetTransForm(hehuadata, CANG_GAN[dzZi[1]], tgZi, dzZi)
  data.map(item => {
    item.i = item.i.reverse()
    item.s = SHI_SHEN[item.ShiShen]

    // 格式化文字
    if (item.ShiShen != null && item.ShiShen != 10) {
      item.t += `(${SHI_SHEN[item.ShiShen]})`

      item.t = item.t.indexOf('三') != -1 || item.t.indexOf('会') != -1 ? item.t.slice(3) : item.t.slice(2)
    }
  })
  //console.log('data,', data)

  result[0] = data.slice(0, result[0].length)
  result[1] = data.slice(result[0].length)

  return result
}
// 八字：2002.02.02.00  大运流年：2021.2023.6.30
'getXingChong', getXingChong('丁甲丙己辛庚丁戊'.split(''), '卯辰申丑丑子亥辰'.split(''))
