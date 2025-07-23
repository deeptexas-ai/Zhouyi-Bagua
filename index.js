let urlHead = '/api'
let clockInterval = null

let GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
let ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
let GAN_ZHIS = [
  ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
]
let wuXing = '木火土金水' // 五行顺序 '木', '火', '土', '金', '水'

let ganzhiWuXings = [
  [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
  [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4]
] // 天干地支五行对应

// 五行相生相克关系
let wuxingDiZi = [
  [
    [4, 0],
    [1, 2, 3]
  ], //木
  [
    [0, 1],
    [3, 4, 2]
  ], //火
  [
    [1, 2],
    [0, 3, 4]
  ], //土
  [
    [2, 3],
    [0, 1, 4]
  ], //金
  [
    [3, 4],
    [0, 1, 2]
  ] //水
]

let form,
  laydate,
  table,
  layer = null
let panData = {
  username: '张三',
  sex: '男',
  // birthTime: null,
  birthTime: new Date('2002-02-02 00:30:00'),
  liuTime: null,
  // liuTime: new Date('1925-04-05 10:00:00'),
  timeZoneIndex: 0,
  lng: 121.473701,
  lat: 31.230416,
  isRunYue: '0', //闰月
  isGong: '1', //公历农历
  timeComputeType: '0', //时间计算类型：北京时间/真太阳时
  panDetail: {}
}

let chooseTimeDate = null
let wuxingSectionDays = 7
let wuxingSectionDate = '2023-04-06 - 2023-04-13'

let intervalRealSunTime = null
let realTimeLatLng = {
  lng: 121.473701,
  lat: 31.230416
}
let dialogRealSumTimeConfig = null

$(document).ready(function () {
  // 获取用户名
  $('.loginname').html(window.localStorage.getItem('username'))
  // 请求时区数据
  timeZoneList.map(item => {
    item.title += ` GMT${item.offset >= 0 ? '+' : ''}${item.offset}`
  })
  init()
  initRealSunTime()

  //初始化地图
  if (null == googleMapInstance) {
    var js_file = document.createElement('script')
    js_file.type = 'text/javascript'
    js_file.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2k5kJeKpF6Gs4t9-a-wJg53EyQntj2Gk&callback=initGoogleMap&libraries=places&v=weekly&&region=CN'
    document.getElementsByTagName('head')[0].appendChild(js_file)
  }
})

function init() {
  layui.use(['laydate', 'form', 'layer', 'table'], function () {
    laydate = layui.laydate
    form = layui.form
    layer = layui.layer
    table = layui.table

    $('#ganZhiRateTips').on('click', function () {
      var that = this
      layer.tips('假如天干与地支的力量比例分别为20%和80%，那么天干总共分160分，地支总共为640分。', that, { time: 20000 })
    })
    $('#siZhuRateTips').on('click', function () {
      var that = this
      layer.tips(
        '四柱比例。由于月份对八字五行强弱的影响最大，时辰次之，年份与日期最弱，年份与月份的影响力基本相当。所以假设当月支为300分，时支为140分，年支及日支则各为100分',
        that,
        { time: 20000 }
      )
    })
    $('#dayunTips').on('click', function () {
      var that = this
      layer.tips('大运干支占得的分数', that, {
        time: 20000
      })
    })
    $('#qiRateTips').on('click', function () {
      var that = this
      layer.tips('藏气比例。辰戌丑未之月，除了当月主气之外，还有上一季节的中气余气。假设主气占60%，中气占40%，余气占0%', that, {
        time: 20000
      })
    })
    $('#yangRenRateTips').on('click', function () {
      var that = this
      layer.tips('命盘出现羊刃附加分数。身强之人遇羊刃无杀制则扣分，身弱之人遇羊刃则加分', that, { time: 20000 })
    })

    $('#shiShaTips').on('click', function () {
      var that = this
      layer.tips('命盘出现食神和七杀附加的分数。', that, { time: 20000 })
    })
    $('#heJuTips').on('click', function () {
      var that = this
      layer.tips('合局为：半三合，全三合，三会方这三种特殊关系，出现组合，则相应的五行能量增加', that, { time: 20000 })
    })

    laydate.render({
      elem: '#birthTimeStr',
      type: 'datetime',
      change: function (value, date, endDate) {
        chooseTimeDate = date
        renderPreviewNongGongli()
      },
      done: function (value, date, endDate) {
        console.log(value, date, endDate)
        chooseTimeDate = date
        renderPreviewNongGongli()
      }
    })

    //日期时间范围选择

    laydate.render({
      elem: '#wuxingTimeRange',
      range: true,
      value: [wuxingSectionDate],
      type: 'date',

      done: function (value, date, endDate) {
        console.log(value, date, endDate)
        wuxingSectionDate = value
        wuxingSectionDays = 0
        panData.panDetail = renderSinglePan(panData)
      }
    })

    form.on('radio(gongNongSwitch)', function (data) {
      panData.isGong = data.value
      renderPreviewNongGongli()
    })

    form.on('radio(runYueSwitch)', function (data) {
      panData.isRunYue = data.value
      renderPreviewNongGongli()
    })

    form.on('radio(latLngTypeSwitch)', function (data) {
      if (data.value === '0') {
        $('.google-map-wrap').css('display', 'none')
      }
      if (data.value === '1') {
        $('.google-map-wrap').css('display', 'block')
      }
    })

    form.on('select(timeZoneSelect)', function (data) {
      let currentZone = timeZoneList[parseInt(data.value)]
      panData.lat = timeZoneList[parseInt(data.value)].lat
      panData.lng = timeZoneList[parseInt(data.value)].lng
      reinitGoogeMap(panData.lat, panData.lng)
      $('.lat-input').val(panData.lat)
      $('.lng-input').val(panData.lng)
    })

    form.on('select(wuxingSectionSelect)', function (data) {
      console.log(data.value)
      wuxingSectionDays = parseInt(data.value)
      panData.panDetail = renderSinglePan(panData)
    })

    form.on('submit(formInfoManual)', function (data) {
      try {
        fields = data.field
        panData.username = fields.username
        panData.sex = fields.sex
        panData.lat = fields.lat
        panData.lng = fields.lng
        panData.timeComputeType = fields.timeComputeType

        gongli = renderPreviewNongGongli()
        if (null == gongli) {
          layer.msg('公/农历转换失败，请重新输入日期')
          return false
        }
        // console.log('gongli', gongli)

        panData.birthTime = new Date(gongli.replace(/-/g, '/'))

        // let liuDate = new Date()
        // liuDate.setFullYear(fields.yearLTime)
        // liuDate.setMonth(fields.monthLTime - 1)
        // liuDate.setDate(fields.dayLTime)
        // liuDate.setHours(fields.hourLTime)
        // liuDate.setMinutes(fields.minLTime)
        // liuDate.setSeconds(fields.secondLTime)

        // panData.liuTime = liuDate

        panData.timeZoneIndex = fields.timeZoneIndex
        layer.closeAll()
        // 手动
        panData.panDetail = renderSinglePan(panData)

        //
      } catch (e) {
        console.log(e)
      }
      layer.msg('排盘成功')
      return false
    })

    form.verify({
      birthdayDate: [/^\s*\d{4}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*[+-]?$/, '日期格式不正确，请检查']
    })

    form.on('submit(formWuxingConfig)', function (data) {
      try {
        fields = data.field
        console.log('fields', fields)
        sendRequest({
          method: 'POST',
          url: urlHead + '/wuXingConfig/addWuXingConfig',
          data: fields
        }).then(res => {
          if (res.code === 200) {
            layer.closeAll()
            layer.msg('保存配置成功')
            renderSinglePan(panData)
          }
        })
      } catch (e) {
        console.log(e)
      }
      return false
    })

    form.on('submit(formXingChong)', function (data) {
      try {
        console.log(data)
        // let fields = data.field
        // let liuDate = new Date()
        // liuDate.setFullYear(fields.yearLTime)
        // liuDate.setMonth(fields.monthLTime - 1)
        // liuDate.setDate(fields.dayLTime)
        // liuDate.setHours(fields.hourLTime)
        // liuDate.setMinutes(fields.minLTime)
        // liuDate.setSeconds(fields.secondLTime)

        // console.log('liuDate', liuDate)
        // panData.liuTime = liuDate
        renderSinglePan(panData)
      } catch (e) {
        console.log(e)
      }
      return false
    })

    form.on('submit(formShenSha)', function (data) {
      try {
        console.log(data)
        // let fields = data.field
        // let liuDate = new Date()
        // liuDate.setFullYear(fields.yearLTime)
        // liuDate.setMonth(fields.monthLTime - 1)
        // liuDate.setDate(fields.dayLTime)
        // liuDate.setHours(fields.hourLTime)
        // liuDate.setMinutes(fields.minLTime)
        // liuDate.setSeconds(fields.secondLTime)

        // console.log('liuDate', liuDate)
        // panData.liuTime = liuDate
        renderSinglePan(panData)
      } catch (e) {
        console.log(e)
      }
      return false
    })

    form.on('checkbox(isShowZhuLiu)', function (data) {
      let fileds = form.val('form-xing-chong')

      if (fileds.showMiaoZhu) {
        // 勾选了秒柱,分柱也要一并勾上
        fileds.showFenZhu = 'on'
        form.val('form-xing-chong', fileds)
        form.render()
      }

      if (fileds.showLiuFen) {
        // 勾选了流分,流时也要一并勾上
        fileds.showLiuShi = 'on'
        form.val('form-xing-chong', fileds)
        form.render()
      }

      if (fileds.showLiuMiao) {
        // 勾选了流秒,流分流时也要一并勾上
        fileds.showLiuShi = 'on'
        fileds.showLiuFen = 'on'
        form.val('form-xing-chong', fileds)
        form.render()
      }

      renderXingChong()
    })

    form.on('checkbox(shenShaShowZhuLiu)', function (data) {
      let fileds = form.val('form-shen-sha')

      if (fileds.showMiaoZhu) {
        // 勾选了秒柱,分柱也要一并勾上
        fileds.showFenZhu = 'on'
        form.val('form-shen-sha', fileds)
        form.render()
      }

      if (fileds.showLiuFen) {
        // 勾选了流分,流时也要一并勾上
        fileds.showLiuShi = 'on'
        form.val('form-shen-sha', fileds)
        form.render()
      }

      if (fileds.showLiuMiao) {
        // 勾选了流秒,流分流时也要一并勾上
        fileds.showLiuShi = 'on'
        fileds.showLiuFen = 'on'
        form.val('form-shen-sha', fileds)
        form.render()
      }

      renderShenSha()
    })

    // 渲染下拉框
    let timeZoneSelectHtml = ''
    timeZoneList.map((item, i) => {
      timeZoneSelectHtml += `<option value="${i}">${item.title}</option>`
    })
    $('.timeZoneSelect').html(timeZoneSelectHtml)

    form.on('submit(formUserInfoConfig)', function (data) {
      try {
        let field = data.field
        if (field) {
          sendRequest({ method: 'POST', url: `api/user/updateUserMapCoordinate`, data: field }).then(res => {
            if (res.code == 200) {
              realTimeLatLng = field
              layer.close(dialogRealSumTimeConfig)
              layer.msg('配置保存成功')
            } else {
              layer.msg(res.msg)
            }
          })

          return false
        }
        return false
      } catch (e) {
        console.log(e)
      }
      return false
    })

    renderHisTable()
    renderPans()

    // 调试自动打开弹窗
    // onInfoEditManual()
    // onOpenWuxingParamConfig()
    // onOpenXingChong()
    // onOpenShenSha()
  })
  renderVipButtons()
}

function initRealSunTime() {
  if (intervalRealSunTime) clearInterval(intervalRealSunTime)
  intervalRealSunTime = setInterval(() => {
    $('.real-sun-time-val').html(getTaiyang(new Date(), realTimeLatLng.lng, realTimeLatLng.lat).zhen.replace('真太阳时：', ''))
  }, 1000)
}

function onDateTimeStrInput(css_selector = '#birthTimeStr2') {
  let v = $(css_selector).val()
  // console.log(css_selector)
  if (!/^\s*\d{4}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*[+-]?$/.test(v)) {
    $(css_selector).addClass('error-input')
    return
  }
  $(css_selector).removeClass('error-input')
  v = trim(v)
  var year = parseInt(v.substr(0, 4))
  v = v.substr(4)
  var month = parseInt(v.substr(0, 2), 10)
  v = trim(v.substr(2))
  var day = parseInt(v.substr(0, 2), 10)
  v = trim(v.substr(2))
  var hour = parseInt(v.substr(0, 2), 10)
  v = trim(v.substr(2))
  var minute = parseInt(v.substr(0, 2), 10)
  v = trim(v.substr(2))
  var second = parseInt(v.substr(0, 2), 10)
  v = trim(v.substr(2))
  var gender = '男'
  if ('+' == v) {
    gender = '男'
  } else if ('-' == v) {
    gender = '女'
  }
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  if (hour < 10) hour = '0' + hour
  if (minute < 10) minute = '0' + minute
  if (second < 10) second = '0' + second
  // console.log(year, month, day, hour, minute, second, gender)
  let cTimeData = {
    year: year,
    month: month,
    date: day,
    hours: hour,
    minutes: minute,
    seconds: second
  }

  if (css_selector == '#birthTimeStr2') {
    chooseTimeDate = cTimeData
    renderPreviewNongGongli()
  }

  if (css_selector.indexOf('#liuTimeStr') != -1) {
    let chooseTimeValue = `${cTimeData.year}-${cTimeData.month}-${cTimeData.date} ${cTimeData.hours}:${cTimeData.minutes}:${cTimeData.seconds}`
    panData.liuTime = new Date(chooseTimeValue.replace(/-/g, '/'))

    $('.liu-preview').html(chooseTimeValue)
  }
}

function onBTimeStrInput() {
  let manualForm = form.val('form-info-manual')
  chooseTimeDate = {
    year: manualForm.yearBTime,
    month: manualForm.monthBTime,
    date: manualForm.dayBTime,
    hours: manualForm.hourBTime,
    minutes: manualForm.minBTime,
    seconds: manualForm.secondBTime
  }

  renderPreviewNongGongli()
}
var trim = function (s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

function renderPreviewNongGongli() {
  if (null == chooseTimeDate) {
    return null
  }
  let chooseTimeValue = `${chooseTimeDate.year}-${chooseTimeDate.month}-${chooseTimeDate.date} ${chooseTimeDate.hours}:${chooseTimeDate.minutes}:${chooseTimeDate.seconds}`

  let nongliPreview = '' //农历预览时间
  let gongliPreview = '' //公历预览时间
  let zhenTaiyangPreview = '' //真太阳预览时间

  try {
    if (panData.isGong == '1') {
      gongliPreview = chooseTimeValue
      //公历
      nongliPreview = Solar.fromDate(new Date(chooseTimeValue.replace(/-/g, '/')))
        .getLunar()
        .toString()
    }
    if (panData.isGong == '0') {
      //农历
      var lunar = Lunar.fromYmdHms(
        chooseTimeDate.year,
        panData.isRunYue == '1' ? -chooseTimeDate.month : chooseTimeDate.month,
        chooseTimeDate.date,
        chooseTimeDate.hours,
        chooseTimeDate.minutes,
        chooseTimeDate.seconds
      )
      gongliPreview = lunar.getSolar().toYmdHms()
      nongliPreview = lunar.toString()
    }
    // 真太阳时
    zhenTaiyangPreview = getTaiyang(new Date(gongliPreview.replace(/-/g, '/')), panData.lng, panData.lat).zhen
    if (panData.isGong == '2') {
    }

    $('.nong-preview').html(nongliPreview)
    $('.gong-preview').html(gongliPreview)
    $('.zhentaiyang-preview').html(zhenTaiyangPreview)
  } catch (e) {
    // layer.msg('转换出错:' + e)
    console.log('转换出错', e)
    $('#birthTimeStr').val('')
    $('#birthTimeStr2').addClass('error-input')
    $('.nong-preview').html('转换出错，请重新输入日期')
    $('.gong-preview').html('转换出错，请重新输入日期')
    return null
  }

  return gongliPreview //这个用来记录选择是农历时的公历时间 为了下次编辑的时候方便预览
}

function renderHisTable() {
  let pansHis = JSON.parse(window.localStorage.getItem('pansHis'))
  if (null == pansHis || '' == pansHis) {
    pansHis = []
  }
  // console.log('pansHis', pansHis)
  table.render({
    elem: '#panHis',
    // method: 'POST',
    url: urlHead + '/pan/getPanRecordList',
    headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') },
    request: {
      pageName: 'pageNum', //页码的参数名称，默认：page
      limitName: 'pageSize' //每页数据量的参数名，默认：limit
    },
    response: {
      statusName: 'code', //规定数据状态的字段名称，默认：code
      statusCode: 200, //规定成功的状态码，默认：0
      dataName: 'rows',
      countName: 'total' //规定数据总数的字段名称，默认：count
    },
    page: true,
    cols: [
      [
        { field: 'id', title: '序号', align: 'center', type: 'numbers' },
        { field: 'username', title: '姓名', align: 'center' },
        { field: 'sex', title: '性别', align: 'center' },
        { field: 'zhuzi', title: '六柱十二字', align: 'center', width: 250 },
        { field: 'dayun', title: '大运', width: 60 },
        {
          field: 'liunian',
          title: '流年',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(0, 2)
          }
        },
        {
          field: 'liuyue',
          title: '流月',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(2, 4)
          }
        },
        {
          field: 'liuri',
          title: '流日',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(4, 6)
          }
        },
        {
          field: 'liushi',
          title: '流时',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(6, 8)
          }
        },
        {
          field: 'liufen',
          title: '流分',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(8, 10)
          }
        },
        {
          field: 'liumiao',
          title: '流秒',
          width: 60,
          templet: function (d) {
            return d.zhuzi.slice(10, 12)
          }
        },
        {
          field: 'birthTime',
          title: '生日时间',
          sort: true,
          width: 160
        },
        {
          field: 'liuTime',
          title: '流时间',
          sort: true,
          width: 160
        },
        { field: 'timeZone', title: '时区', width: 180 },
        { field: 'lng', title: '经度' },
        { field: 'lat', title: '纬度' },
        { field: 'saveTime', title: '保存时间', sort: true, width: 160 },
        { fixed: 'right', title: '操作', align: 'center', toolbar: '#barDemo', width: 150 } //这里的toolbar值是模板元素的选择器
      ]
    ]
  })
  //工具条事件
  table.on('tool(panHis)', function (obj) {
    var data = obj.data
    var layEvent = obj.event
    var tr = obj.tr

    // let pansHis = JSON.parse(window.localStorage.getItem('pansHis'))
    // if (null == pansHis || '' == pansHis) {
    //   return
    // }
    // let localDataIndex = pansHis.findIndex(item => {
    //   return item.uid == data.uid
    // })

    if (layEvent === 'del') {
      //删除
      layer.confirm('确认删除此条排盘数据吗？', function (index) {
        obj.del()
        layer.close(index)
        if (data != null) {
          sendRequest({
            method: 'POST',
            url: urlHead + '/pan/deleteById?id=' + data.id
            // data: { id: data.id }
          }).then(res => {
            if (res.code === 200) {
              layer.msg('删除成功')
            }
          })
        }
      })
    } else if (layEvent == 'load') {
      layer.confirm('确认载入此条排盘数据吗？', function (index) {
        layer.close(index)
        if (data) {
          data.birthTime = new Date(data.birthTime.replace(/-/g, '/'))
          data.liuTime = data.liuTime ? new Date(data.liuTime.replace(/-/g, '/')) : new Date()
          panData = data
          // 处理一下时间
          renderSinglePan(panData)
        }
      })
    }
  })
}

function onSaveManualPanHis() {
  layer.confirm('确认保存本次排盘信息?', function (index) {
    // 保存手动
    try {
      let pansHis = JSON.parse(window.localStorage.getItem('pansHis'))
      if (null == pansHis || '' == pansHis) {
        pansHis = []
      }
      console.log(panData)
      let zhuzi = ''
      if (!panData.panDetail) {
        panData.panDetail = panData
      }

      if (panData.panDetail.zhu) {
        zhuzi =
          panData.panDetail.zhu.nianzhu +
          panData.panDetail.zhu.yuezhu +
          panData.panDetail.zhu.rizhu +
          panData.panDetail.zhu.shizhu +
          panData.panDetail.zhu.fenzhu +
          panData.panDetail.zhu.miaozhu
      }
      let currentTimeZone = timeZoneList[panData.timeZoneIndex]
      let timeZone = `${currentTimeZone.title}`
      let data = {
        // uid: guid(),
        username: panData.username,
        sex: panData.sex,
        timeZone: timeZone,
        saveTime: getTimeStr(new Date()),
        zhuzi: zhuzi,
        birthTime: getTimeStr(panData.birthTime),
        liuTime: panData.liuTime ? getTimeStr(panData.liuTime) : getTimeStr(new Date()),
        dayun: panData.panDetail.yun.dayun,
        // liunian: panData.panDetail.yun.liunian,
        // liuyue: panData.panDetail.yun.liuyue,
        // liuri: panData.panDetail.yun.liuri,
        // liushi: panData.panDetail.yun.liushi,
        // liufen: panData.panDetail.yun.liufen,
        // liumiao: panData.panDetail.yun.liumiao,
        lat: panData.lat,
        lng: panData.lng,
        isGong: panData.isGong,
        isRunYue: panData.isRunYue,
        timeZoneIndex: panData.timeZoneIndex
      }
      // console.log('data', data)
      sendRequest({
        method: 'POST',
        url: urlHead + '/pan/addPanRecord',
        data: data
      }).then(res => {
        if (res.code === 200) {
          layer.msg('保存成功')
          renderHisTable()
        }
      })
    } catch (e) {
      console.log('存盘出错', e)
    }

    layer.close(index)
  })
}

function onClearAllHis() {
  layer.confirm('确认清除所有排盘数据吗？', function (index) {
    window.localStorage.removeItem('pansHis')
    renderHisTable()
    layer.close(index)
  })
}

function onInfoEditManual(index = 1) {
  if (null == googleMapInstance) {
    var js_file = document.createElement('script')
    js_file.type = 'text/javascript'
    js_file.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2k5kJeKpF6Gs4t9-a-wJg53EyQntj2Gk&callback=initGoogleMap&libraries=places&v=weekly&&region=CN'
    document.getElementsByTagName('head')[0].appendChild(js_file)
  }

  // $.getScript(
  //   'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2k5kJeKpF6Gs4t9-a-wJg53EyQntj2Gk&callback=initGoogleMap&libraries=places&v=weekly&&region=CN',
  //   function () {
  //     initGoogleMap(panData.lat, panData.lng)
  //   }
  // )

  if (panData.isGong == '0') {
    // 如果之前选择的是农历 则需要转化为公历选项
    panData.isGong = '1'
    panData.isRunYue = '0'
  }

  // let birthTimeStr2 = ''
  // if (panData.birthTime) {
  //   let time = getTime(panData.birthTime)
  //   birthTimeStr2 = `${time.year}${time.month}${time.day}${time.hours}${time.minutes}${time.seconds}`
  // }
  // // console.log('birthTimeStr2', birthTimeStr2)
  let liuTimeStr = ''
  // if (null == panData.liuTime) {
  //   panData.liuTime = new Date()
  // }
  let liuTime = getTime(panData.liuTime)
  liuTimeStr = `${liuTime.year}${liuTime.month}${liuTime.day}${liuTime.hours}${liuTime.minutes}${liuTime.seconds}`

  // console.log('panData.birthTime', panData.birthTime)

  // 编辑窗口打开

  form.val('form-info-manual', {
    username: panData.username,
    sex: panData.sex,
    // birthTimeStr: getTimeStr(panData.birthTime),
    liuTimeStr: liuTimeStr,
    timeZoneIndex: panData.timeZoneIndex,
    lat: panData.lat,
    lng: panData.lng,
    isGong: panData.isGong,
    isRunYue: panData.isRunYue

    // yearBTime: panData.birthTime.getFullYear(),
    // monthBTime: panData.birthTime.getMonth(),
    // dayBTime: panData.birthTime.getDate(),
    // hourBTime: panData.birthTime.getHours(),
    // minBTime: panData.birthTime.getMinutes(),
    // secondBTime: panData.birthTime.getSeconds(),

    // yearLTime: panData.liuTime.getFullYear(),
    // monthLTime: panData.liuTime.getMonth() + 1,
    // dayLTime: panData.liuTime.getDate(),
    // hourLTime: panData.liuTime.getHours(),
    // minLTime: panData.liuTime.getMinutes(),
    // secondLTime: panData.liuTime.getSeconds()
  })

  form.render() //更新全部

  // chooseTimeDate = {
  //   year: panData.birthTime.getFullYear(),
  //   month: panData.birthTime.getMonth() + 1,
  //   date: panData.birthTime.getDate(),
  //   hours: panData.birthTime.getHours(),
  //   minutes: panData.birthTime.getMinutes(),
  //   seconds: panData.birthTime.getSeconds()
  // }

  // renderPreviewNongGongli()

  // return
  layer.open({
    type: 1,
    title: '手动盘排盘编辑',
    offset: 'lt',
    area: 'auto',
    content: $('.modal-info-edit.manual'),
    cancel: function (index, layero) {
      $('.modal-info-edit.manual').css({ display: 'none' })
    }
  })
}

function onInfoEditClose() {
  layer.closeAll()
}

function onOpenZiwei() {
  layer.open({
    type: 1,
    title: '紫薇运势',
    content: $('.ziwei-charts'),
    cancel: function (index, layero) {
      $('.ziwei-charts').css({ display: 'none' })
    }
  })
}

function onOpenZiweiReverse() {
  layer.open({
    type: 1,
    title: '紫薇运势反推出生时辰',
    content: $('.ziwei-reverse-charts'),
    cancel: function (index, layero) {
      $('.ziwei-reverse-charts').css({ display: 'none' })
    }
  })
}

function renderPans() {
  panData.panDetail = renderSinglePan(panData)
}

function renderSinglePan() {
  if (null == panData.birthTime) {
    panData.birthTime = new Date()
  }

  if (null == panData.liuTime) {
    panData.liuTime = new Date()
  }

  // form.val('form-xing-chong', {
  //   yearLTime: panData.liuTime.getFullYear(),
  //   monthLTime: panData.liuTime.getMonth() + 1, //设置的时候-1，这里要+1
  //   dayLTime: panData.liuTime.getDate(),
  //   hourLTime: panData.liuTime.getHours(),
  //   minLTime: panData.liuTime.getMinutes(),
  //   secondLTime: panData.liuTime.getSeconds()
  // })
  // form.val('form-shen-sha', {
  //   yearLTime: panData.liuTime.getFullYear(),
  //   monthLTime: panData.liuTime.getMonth() + 1, //设置的时候-1，这里要+1
  //   dayLTime: panData.liuTime.getDate(),
  //   hourLTime: panData.liuTime.getHours(),
  //   minLTime: panData.liuTime.getMinutes(),
  //   secondLTime: panData.liuTime.getSeconds()
  // })

  let liuTime = getTime(panData.liuTime)
  form.val('form-xing-chong', {
    liuTimeStr: `${liuTime.year}${liuTime.month}${liuTime.day}${liuTime.hours}${liuTime.minutes}${liuTime.seconds}`
  })

  form.val('form-shen-sha', {
    liuTimeStr: `${liuTime.year}${liuTime.month}${liuTime.day}${liuTime.hours}${liuTime.minutes}${liuTime.seconds}`
  })

  form.render()

  panData.panClass = '.manual'
  let currentTimeZone = timeZoneList[panData.timeZoneIndex]
  let birthdayDate = null
  let chineseDate = null

  if (panData.panClass.indexOf('auto') != -1) {
    birthdayDate = new Date(panData.birthTime.getTime() + (8 - currentTimeZone.offset) * 3600 * 1000) //换算成时区时间
    chineseDate = panData.birthTime
  } else {
    birthdayDate = panData.birthTime
    // console.log('panData', panData)
    if (panData.timeComputeType == '1') {
      // 如果是用真太阳时计算的话 先转为真太阳时
      let taiyang = getTaiyang(birthdayDate, panData.lng, panData.lat)
      let zty = taiyang.data['zty']
      birthdayDate = new Date(`${zty[0]}-${zty[1]}-${zty[2]} ${zty[3]}:${zty[4]}:${zty[5]}`.replace(/-/g, '/'))
      console.log('taiyangDate', birthdayDate)
    }
    chineseDate = new Date(birthdayDate.getTime() + (currentTimeZone.offset - 8) * 3600 * 1000) //根据时区换算成北京时间
    // 紫薇
    try {
      let ziwei_sex = panData.sex == '男' ? 1 : 0
      renderZiWeiCharts(ziwei_sex, chineseDate.getFullYear(), chineseDate.getMonth() + 1, chineseDate.getDate(), chineseDate.getHours())
      renderZiWeiReverseChart(ziwei_sex, chineseDate.getFullYear(), chineseDate.getMonth() + 1, chineseDate.getDate())
    } catch (e) {
      console.log('紫薇排盘加载失败', e)
    }
    renderWuXingCharts(chineseDate.getFullYear(), chineseDate.getMonth() + 1, chineseDate.getDate(), chineseDate.getHours(), panData.sex)
  }

  let styleClass = panData.panClass

  let timeData = getTime(birthdayDate) //显示用生日时间
  $(styleClass + ' .date').html(
    `${timeData.year}年${timeData.month}月${timeData.day}日 ${timeData.hours}:${timeData.minutes}:${timeData.seconds}`
  )
  $(styleClass + ' .timeZone').html(` ${currentTimeZone.title}`)
  $(styleClass + ' .time-clock').html(`${timeData.hours}:${timeData.minutes}:${timeData.seconds}`)
  $(styleClass + ' .username').html(panData.username)
  $(styleClass + ' .sexVal').html(panData.sex)

  let zhu = getLunar(chineseDate) //计算阴历需要用中国时间
  $(styleClass + ' .nianzhu').html(zhu.nianzhu)
  $(styleClass + ' .yuezhu').html(zhu.yuezhu)
  $(styleClass + ' .rizhu').html(zhu.rizhu)
  $(styleClass + ' .shizhu').html(zhu.shizhu)
  $(styleClass + ' .fenzhu').html(zhu.fenzhu)
  $(styleClass + ' .miaozhu').html(zhu.miaozhu)
  $(styleClass + ' .nongli').html(`农历：${zhu.nongli}`)
  $(styleClass + ' .jwdu').html(`经度：${panData.lng} 纬度：${panData.lat}`)

  // console.log('panData.liuTime', panData.liuTime)

  let yun = getYun(chineseDate, panData.sex, panData.liuTime) //计算运需要用中国时间
  $(styleClass + ' .dayun').html(yun.dayun)
  $(styleClass + ' .liunian').html(yun.liunian)
  $(styleClass + ' .liuyue').html(yun.liuyue)
  $(styleClass + ' .liuri').html(yun.liuri)
  $(styleClass + ' .liushi').html(yun.liushi)
  $(styleClass + ' .liufen').html(yun.liufen)
  $(styleClass + ' .liumiao').html(yun.liumiao)

  $(styleClass + ' .zhousui').html(yun.zhousuiHtml)
  $(styleClass + ' .huanyun').html(yun.huanyunHtml)
  $(styleClass + ' .yunchen').html(yun.yunchenHtml)
  $(styleClass + ' .shishen').html(yun.shishenHtml)

  let taiyang = getTaiyang(chineseDate, panData.lng, panData.lat)
  $(styleClass + ' .ping').html(taiyang.ping)
  $(styleClass + ' .zhen').html(taiyang.zhen)

  panData.zhu = zhu
  panData.yun = yun

  renderXingChong()
  renderShenSha()
  return {
    zhu: zhu,
    yun: yun
  }
}

function getTime(data) {
  var year = data.getFullYear() //获取年
  var month = data.getMonth() + 1 //获取月
  if (month < 10) month = '0' + month
  var day = data.getDate() //获取日
  if (day < 10) day = '0' + day
  var hours = data.getHours()
  if (hours < 10) hours = '0' + hours
  var minutes = data.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  var seconds = data.getSeconds()
  if (seconds < 10) seconds = '0' + seconds
  return { year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds }
}

function getTimeStr(data) {
  var year = data.getFullYear() //获取年
  var month = data.getMonth() + 1 //获取月
  if (month < 10) month = '0' + month
  var day = data.getDate() //获取日
  if (day < 10) day = '0' + day
  var hours = data.getHours()
  if (hours < 10) hours = '0' + hours
  var minutes = data.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  var seconds = data.getSeconds()
  if (seconds < 10) seconds = '0' + seconds
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function getLunar(targetDate) {
  // 柱计算
  let lunar = Lunar.fromDate(targetDate)
  let EightChar = lunar.getEightChar()
  let minGanZhi = computeFenZhu(targetDate, EightChar.getTime())
  let miaoGanZhi = computeMiaoZhu(targetDate, minGanZhi)
  let nongli = `${lunar.toString()} ${EightChar.getYear()}年（${lunar.getYearShengXiao()}年） ${lunar
    .getEightChar()
    .getMonth()}月${EightChar.getDay()}日`
  return {
    nianzhu: EightChar.getYear(),
    yuezhu: EightChar.getMonth(),
    rizhu: EightChar.getDay(),
    shizhu: EightChar.getTime(),
    fenzhu: minGanZhi,
    miaozhu: miaoGanZhi,
    nongli: nongli
  }
}

function getYun(targetDate, sex, currentDate = new Date()) {
  let currentYear = currentDate.getFullYear()
  let eightChar = Lunar.fromDate(targetDate).getEightChar() //八字
  let currentLunar = Lunar.fromDate(currentDate) //当前时间

  var daYunArr = eightChar.getYun(sex == '男' ? 1 : 0, 2).getDaYun()

  // 大运
  let mineDaYun = '-'
  daYunArr.map(d => {
    if (d.getGanZhi() && d.getStartYear() <= currentYear && currentYear <= d.getEndYear()) {
      mineDaYun = d.getGanZhi()
    }
  })

  // 流分
  let liufen = computeFenZhu(currentDate, currentLunar.getTimeInGanZhi())

  // 流秒
  let liumiao = computeMiaoZhu(currentDate, liufen)

  let zhousuiHtml = '<div  class="zs-i title">周岁</div>'
  let huanyunHtml = '<div  class="zs-i title">换运</div>'
  let yunchenHtml = '<div  class="zs-i title">运程</div>'
  let shishenHtml = '<div  class="zs-i title">十神</div>'
  daYunArr.map(d => {
    zhousuiHtml += `<div class="zs-i">${d.getStartAge()}</div>`
    huanyunHtml += `<div class="zs-i">${d.getStartYear()}</div>`
    let shishen = LunarUtil.SHI_SHEN_GAN[eightChar.getDayGan() + d.getGanZhi().substr(0, 1)]
    shishenHtml += `<div class="zs-i">${shishen == null ? '' : shishen}</div>`
    var ganZhi = d.getGanZhi()
    if (!ganZhi) {
      yunchenHtml += `<div class="zs-i">童限</div>`
    } else {
      yunchenHtml += `<div class="zs-i ${d.getStartYear() <= currentYear && currentYear <= d.getEndYear() ? ' red' : ''}">${ganZhi}</div>`
    }
  })

  return {
    dayun: mineDaYun,
    liunian: currentLunar.getYearInGanZhiByLiChun(),
    liuyue: currentLunar.getMonthInGanZhi(),
    liuri: currentLunar.getDayInGanZhi(),
    liushi: currentLunar.getTimeInGanZhi(),
    liufen: liufen,
    liumiao: liumiao,
    zhousuiHtml: zhousuiHtml,
    huanyunHtml: huanyunHtml,
    yunchenHtml: yunchenHtml,
    shishenHtml: shishenHtml
  }
}

function computeFenZhu(targetDate, hourGanZhi) {
  /** 计算分柱
   * hourGanIndex：时柱天干地支
   * */

  let hourGanIndex = GAN.findIndex(item => {
    return item == hourGanZhi[0]
  })
  // console.log('hourGanIndex', hourGanIndex, GAN[hourGanIndex])

  // 计算地支
  let minZhiIndex = 0 //分柱地支索引
  var hours = targetDate.getHours()
  var minutes = targetDate.getMinutes()

  if (hours % 2 == 0) {
    //双数时 午起
    minZhiIndex = Math.floor(minutes / 10) + 6
  } else {
    //单数时 子起
    minZhiIndex = Math.floor(minutes / 10)
  }
  // console.log('minZhiIndex', minZhiIndex)

  // 计算天干

  let minStartGanIndex = getStartGanIndex(hourGanIndex) //分柱起算天干索引

  // console.log('minStartGanIndex', minStartGanIndex, GAN[minStartGanIndex])

  let minGanIndex = minStartGanIndex + minZhiIndex //分柱天干索引

  // console.log('minGanIndex', minGanIndex)
  if (minGanIndex >= 10) {
    // 超过10就减去10
    minGanIndex = minGanIndex - 10
  }

  return GAN[minGanIndex] + ZHI[minZhiIndex]
}

function computeMiaoZhu(targetDate, minGanZhi) {
  /*计算秒柱*/
  var seconds = targetDate.getSeconds()
  let minGanIndex = GAN.findIndex(item => {
    return item == minGanZhi[0]
  })
  let secZhiIndex = Math.floor(seconds / 5) //秒柱地支索引
  let secStartGanIndex = getStartGanIndex(minGanIndex)
  let secGanIndex = secStartGanIndex + secZhiIndex
  if (secGanIndex >= 10) {
    // 超过10就减去10
    secGanIndex = secGanIndex - 10
  }

  return GAN[secGanIndex] + ZHI[secZhiIndex]
}

function getStartGanIndex(lastGanIndex) {
  // 获取起算天干索引
  if (lastGanIndex == 0 || lastGanIndex == 5) {
    return 0
  }
  if (lastGanIndex == 1 || lastGanIndex == 6) {
    return 2
  }
  if (lastGanIndex == 2 || lastGanIndex == 7) {
    return 4
  }
  if (lastGanIndex == 3 || lastGanIndex == 8) {
    return 6
  }
  if (lastGanIndex == 4 || lastGanIndex == 9) {
    return 8
  }
}

function getTaiyang(targetDate, j, w) {
  var fm = p.fatemaps(
    0,
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    targetDate.getDate(),
    targetDate.getHours(),
    targetDate.getMinutes(),
    targetDate.getSeconds(),
    j,
    w
  ) //此处演示真太阳时排盘

  let ping = `平太阳时：${fm['pty'][0]}年${fm['pty'][1]}月${fm['pty'][2]}日${fm['pty'][3]}时${fm['pty'][4]}分${fm['pty'][5]}秒`
  let zhen = `真太阳时：${fm['zty'][0]}年${fm['zty'][1]}月${fm['zty'][2]}日${fm['zty'][3]}时${fm['zty'][4]}分${fm['zty'][5]}秒`
  return { ping: ping, zhen: zhen, data: fm }
}

function renderZiWeiCharts(sex, year, month, day, hour) {
  renderZiWeiChart(1, sex, year, month, day, hour)
  renderZiWeiChart(2, sex, year, month, day, hour)
  renderZiWeiChart(3, sex, year, month, day, hour)
  renderZiWeiChart(4, sex, year, month, day, hour)
}

async function renderZiWeiChart(item = 1, sex = 1, year = 1998, month = 1, day = 1, hour = 0) {
  // Item  1 一生 2 十年 3 一年 4 一周
  // Sex 男=1， 女=0
  // Solar 农历0 公历1
  // console.log('item, sex, year, month, day, hour', item, sex, year, month, day, hour)

  $('.ziweiChartTips' + item).html(`运势图加载中...`)
  $('.ziweiChartTips' + item).css('display', 'block')
  $('.ziweiChart' + item).html('')

  const data = await sendRequest({
    url: `/api/windada/getWindada?FUNC=Basic&Target=0&SubTarget=-1&Sex=${sex}&Solar=1&Year=${year}&Month=${month}&Leap=0&Day=${day}&Hour=${hour}&Item=${item}`
  })

  if (null == data) {
    console.log('加载失败')
    $('.ziweiChartTips' + item).html(
      `运势图加载失败！<button type="button" class="layui-btn" onclick="renderZiWeiChart(${item},${sex},${year},${month},${day},${hour})">点击重试</button>`
    )
    return null
  }

  let yunshiData = []
  let xData = []
  let yData = []
  try {
    let datas = data.match(/checkFunc(.+?)<\/a>/g)
    for (let i = 0; i < datas.length; i++) {
      let v = datas[i].match(/>(.+?)</g)
      if (v.length > 2 && item == 1) {
        // 一生运势 网页解析
        let yearSection = v[0].replace('<', '').replace('>', '')
        yunshiData.push([
          yearSection.split('-')[0],
          v[2].replace('<', '').replace('>', ''),
          v[1].replace('<', '').replace('>', ''),
          yearSection
        ])
        //这里插入两年之间同样的数值让曲线图看起来更直观
        xData.push(yearSection.split('-')[0])
        yData.push(v[2].replace('<', '').replace('>', ''))
        xData.push(yearSection.split('-')[1])
        yData.push(v[2].replace('<', '').replace('>', ''))
      } else {
        // 十年，一年，一周 运势 网页解析
        yunshiData.push([v[0].replace('<', '').replace('>', ''), v[1].replace('<', '').replace('>', '')])
        xData.push(v[0].replace('<', '').replace('>', ''))
        yData.push(v[1].replace('<', '').replace('>', ''))
      }
    }
  } catch (e) {
    console.log('运势网页解析失败', e)
  }

  $('.ziweiChartTips' + item).css('display', 'none')

  // 1.曲线图
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('ziweiChart' + item))
  // 指定图表的配置项和数据
  option = {
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        data: yData,
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      enterable: true //鼠标是否可进入提示框浮层中
    }
  }
  // 使用刚指定的配置项和数据显示图表。
  document.getElementById('ziweiChart' + item).removeAttribute('_echarts_instance_')
  myChart.setOption(option)

  // 2.表格
  // console.log('yunshiData', yunshiData)
  let tableHtml = ''
  if (item == 1) {
    for (let i = 3; i >= 1; i--) {
      let rowHtml = ''
      if (i == 3) rowHtml = '<div class="zw-t-col">日期</div>'
      if (i == 2) rowHtml = '<div class="zw-t-col">虚岁</div>'
      if (i == 1) rowHtml = '<div class="zw-t-col">运势</div>'
      yunshiData.map(item => {
        rowHtml += `<div class="zw-t-col">${item[i]}</div>`
      })
      tableHtml += `<div class="zw-t-row">${rowHtml}</div>`
    }
  } else {
    for (let i = 0; i <= 1; i++) {
      let rowHtml = ''
      if (i == 0) rowHtml = '<div class="zw-t-col">日期</div>'
      if (i == 1) rowHtml = '<div class="zw-t-col">运势</div>'
      yunshiData.map(item => {
        rowHtml += `<div class="zw-t-col">${item[i]}</div>`
      })
      tableHtml += `<div class="zw-t-row">${rowHtml}</div>`
    }
  }
  $('.ziweiTable' + item).html(tableHtml)

  return yunshiData
}

function renderWuXingCharts(year, month, day, hour, sex) {
  loadWuxingParamConfig().then(() => {
    console.log('year, month, day, hour', year, month, day, hour)
    let birthday = new Date(`${year}-${month}-${day} ${hour}:${00}:${0}`)
    var baziLunar = Solar.fromDate(birthday).getLunar()
    let bazi = [baziLunar.getYearInGanZhiByLiChun(), baziLunar.getMonthInGanZhi(), baziLunar.getDayInGanZhi(), baziLunar.getTimeInGanZhi()]
    // console.log(bazi)
    // LunarUtil.SHI_SHEN_GAN[this.getDayGan() + this.getYearGan()]
    // 一周的
    let xData = []
    let yData = []
    let wangshuaiData = []
    var remarks = []

    let days = []
    if (wuxingSectionDays > 0) {
      for (let i = 0; i <= wuxingSectionDays; i++) {
        let today = new Date() //获取今天的日期
        today.setDate(today.getDate() + i)
        days.push(today)
      }
    } else if (wuxingSectionDate != '') {
      let daySection = wuxingSectionDate.split(' - ')
      days = getSectionDate(daySection)
    }

    for (let i = 0; i < days.length; i++) {
      let today = days[i] //获取今天的日期

      var liuriLunar = Solar.fromDate(today).getLunar()
      let liuri = [
        getYun(birthday, sex, today).dayun,
        liuriLunar.getYearInGanZhiByLiChun(),
        liuriLunar.getMonthInGanZhi(),
        liuriLunar.getDayInGanZhi()
      ]

      var dayGan = baziLunar.getDayGan()
      let allZi = bazi.concat(liuri)
      let tianGanShiShen = []
      var dizhiShiShen = []

      allZi.map(zi => {
        if (zi == '-') return
        var zhi = zi[1]
        var hideGan = LunarUtil.ZHI_HIDE_GAN[zhi]
        for (var i = 0, j = hideGan.length; i < j; i++) {
          dizhiShiShen.push(LunarUtil.SHI_SHEN_ZHI[dayGan + zhi + hideGan[i]])
        }
        tianGanShiShen.push(LunarUtil.SHI_SHEN_GAN[baziLunar.getDayGan() + zi[0]])
      })

      let shiShen = tianGanShiShen.concat(dizhiShiShen)

      let yunShi = wuxing.computeYunshi(form.val('form-wuxing-config'), bazi, liuri, shiShen)
      // console.log('Yunshi', yunShi)
      xData.push(`${today.getMonth() + 1}-${today.getDate()}`)
      yData.push(yunShi.ratio)
      wangshuaiData.push(yunShi.wangshuai)
      remarks.push(yunShi.remark)
    }

    var myChart = echarts.init(document.getElementById('wuxingChart1'))
    // 指定图表的配置项和数据
    option = {
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true
        }
      ],
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        enterable: true //鼠标是否可进入提示框浮层中
      },
      formatter: function (params) {
        str = `<div>日期：${params.name}</div><div>比重：${params.value}</div><div>运势：${
          wangshuaiData[params.dataIndex]
        }</div><div>批注：${remarks[params.dataIndex]}</div>`

        return str
      }
    }
    // 使用刚指定的配置项和数据显示图表。
    document.getElementById('wuxingChart1').removeAttribute('_echarts_instance_')
    myChart.setOption(option)
  })
}

const DEFAULT_WUXING_CONFIG = {
  tianGanRate: 20,
  tianGanScore: 160,
  diZhiRate: 80,
  diZhiScore: 640,

  nianGanScore: 25,
  nianGanRate: 15.625,
  yueGanScore: 75,
  yueGanRate: 46.875,
  riGanScore: 25,
  riGanRate: 15.625,
  shiGanScore: 35,
  shiGanRate: 21.875,
  daYunGanScore: 25,
  daYunGanRate: 15.625,

  nianZhiScore: 100,
  nianZhiRate: 15.625,
  yueZhiScore: 300,
  yueZhiRate: 46.875,
  riZhiScore: 100,
  riZhiRate: 15.625,
  shiZhiScore: 140,
  shiZhiRate: 21.875,
  daYunZhiScore: 100,
  daYunZhiRate: 15.625,

  zhuQiRate: 60,
  yuQiRate: 40,
  zhongQiRate: 0,

  yangRenScore: 50,
  shiShaScore: 50,
  addHe: 1
}

function loadWuxingParamConfig() {
  let wuxingConfig = DEFAULT_WUXING_CONFIG
  return new Promise((resolve, reject) => {
    sendRequest({
      method: 'GET',
      url: urlHead + '/wuXingConfig/getWuXingConfig'
    })
      .then(res => {
        console.log('getWuxingConfig res', res)
        if (res.code === 200 && res.data) {
          wuxingConfig = res.data
        } else {
          wuxingConfig = DEFAULT_WUXING_CONFIG
        }
        form.val('form-wuxing-config', wuxingConfig)
        form.render() //更新全部
        onWuxingScoreInput()
        form.val('form-wuxing-config', wuxingConfig)
        form.render() //更新全部
        resolve(form.val('form-wuxing-config').field)
      })
      .catch(e => {
        reject(e)
      })
  }).catch(e => {
    console.log(e)
  })
}

function onOpenWuxingParamConfig() {
  loadWuxingParamConfig().then(() => {
    // 编辑窗口打开
    layer.open({
      type: 1,
      title: '五行运势参数配置',
      content: $('.wuxing-config'),
      cancel: function (index, layero) {
        $('.wuxing-config').css({ display: 'none' })
      }
    })
  })
}

function onWuxingScoreInput(ganzhi) {
  let configData = form.val('form-wuxing-config')
  console.log(configData)
  if (ganzhi) {
    if (ganzhi == 'gan') {
      if (configData.tianGanScore > 800) {
        configData.tianGanScore = 800
        layer.msg('天干总分不能超过800分')
      }
      configData.tianGanRate = ((configData.tianGanScore / 800) * 100).toFixed(3)
      configData.diZhiScore = 800 - configData.tianGanScore
      configData.diZhiRate = ((configData.diZhiScore / 800) * 100).toFixed(3)
    } else {
      if (configData.diZhiScore > 800) {
        configData.diZhiScore = 800
        layer.msg('地支总分不能超过800分')
      }
      configData.diZhiRate = ((configData.diZhiScore / 800) * 100).toFixed(3)
      configData.tianGanScore = 800 - configData.diZhiScore
      configData.tianGanRate = ((configData.tianGanScore / 800) * 100).toFixed(3)
    }
  } else {
    configData.tianGanRate = ((configData.tianGanScore / 800) * 100).toFixed(3)
    configData.diZhiRate = ((configData.diZhiScore / 800) * 100).toFixed(3)
  }

  $('.tian-gan-rate').html(configData.tianGanRate + '%')
  $('.di-zhi-rate').html(configData.diZhiRate + '%')

  $('.tian-gan-score').html(configData.tianGanScore)
  $('.di-zhi-score').html(configData.diZhiScore)

  configData.nianGanRate = ((configData.nianGanScore / configData.tianGanScore) * 100).toFixed(3)
  configData.yueGanRate = ((configData.yueGanScore / configData.tianGanScore) * 100).toFixed(3)
  configData.riGanRate = ((configData.riGanScore / configData.tianGanScore) * 100).toFixed(3)
  configData.shiGanRate = ((configData.shiGanScore / configData.tianGanScore) * 100).toFixed(3)
  configData.daYunGanRate = ((configData.daYunGanScore / configData.tianGanScore) * 100).toFixed(3)
  configData.totalGanRate =
    parseFloat(configData.nianGanRate) +
    parseFloat(configData.yueGanRate) +
    parseFloat(configData.riGanRate) +
    parseFloat(configData.shiGanRate)

  $('.nian-gan-rate').html(configData.nianGanRate + '%')
  $('.yue-gan-rate').html(configData.yueGanRate + '%')
  $('.ri-gan-rate').html(configData.riGanRate + '%')
  $('.shi-gan-rate').html(configData.shiGanRate + '%')
  $('.da-yun-gan-rate').html(configData.daYunGanRate + '%')

  $('.gan-total-rate').html(configData.totalGanRate.toFixed(1))
  $('.gan-total-rate').removeClass('red')
  if (configData.totalGanRate != 100) {
    $('.gan-total-rate').addClass('red')
  }

  configData.nianZhiRate = ((configData.nianZhiScore / configData.diZhiScore) * 100).toFixed(3)
  configData.yueZhiRate = ((configData.yueZhiScore / configData.diZhiScore) * 100).toFixed(3)
  configData.riZhiRate = ((configData.riZhiScore / configData.diZhiScore) * 100).toFixed(3)
  configData.shiZhiRate = ((configData.shiZhiScore / configData.diZhiScore) * 100).toFixed(3)

  configData.daYunZhiRate = ((configData.daYunZhiScore / configData.diZhiScore) * 100).toFixed(3)
  configData.totalZhiRate =
    parseFloat(configData.nianZhiRate) +
    parseFloat(configData.yueZhiRate) +
    parseFloat(configData.riZhiRate) +
    parseFloat(configData.shiZhiRate)

  $('.nian-zhi-rate').html(configData.nianZhiRate + '%')
  $('.yue-zhi-rate').html(configData.yueZhiRate + '%')
  $('.ri-zhi-rate').html(configData.riZhiRate + '%')
  $('.shi-zhi-rate').html(configData.shiZhiRate + '%')
  $('.da-yun-zhi-rate').html(configData.daYunZhiRate + '%')
  $('.zhi-total-rate').html(configData.totalZhiRate.toFixed(1))
  $('.zhi-total-rate').removeClass('red')
  if (configData.totalZhiRate != 100) {
    $('.zhi-total-rate').addClass('red')
  }

  form.val('form-wuxing-config', configData)

  form.render() //更新全部
}

function onOpenXingChong() {
  renderXingChong()
  // 编辑窗口打开
  layer.open({
    type: 1,
    title: '刑冲关系',
    content: $('.modal-xing-chong'),
    cancel: function (index, layero) {
      $('.modal-xing-chong').css({ display: 'none' })
    }
  })
}

function renderXingChong() {
  let gans = []
  let zhis = []

  let ganZhiTitles = ['年柱', '月柱', '日柱', '时柱']

  let ganZhiA = [panData.zhu.nianzhu, panData.zhu.yuezhu, panData.zhu.rizhu, panData.zhu.shizhu]

  let xingChongForm = form.val('form-xing-chong')

  if (xingChongForm.showFenZhu) {
    ganZhiA.push(panData.zhu.fenzhu)
    ganZhiTitles.push('分柱')
  }

  if (xingChongForm.showMiaoZhu) {
    ganZhiA.push(panData.zhu.miaozhu)
    ganZhiTitles.push('秒柱')
  }

  ganZhiA.push(panData.yun.dayun == '-' ? '--' : panData.yun.dayun)
  ganZhiA.push(panData.yun.liunian)
  ganZhiA.push(panData.yun.liuyue)
  ganZhiA.push(panData.yun.liuri)

  ganZhiTitles = ganZhiTitles.concat(['大运', '流年', '流月', '流日'])

  // if (xingChongForm.showLiuShi) {
  ganZhiA.push(panData.yun.liushi)
  ganZhiTitles.push('流时')
  // }

  if (xingChongForm.showLiuFen) {
    ganZhiA.push(panData.yun.liufen)
    ganZhiTitles.push('流分')
  }

  if (xingChongForm.showLiuMiao) {
    ganZhiA.push(panData.yun.liumiao)
    ganZhiTitles.push('流秒')
  }

  ganZhiA.map(gz => {
    gans.push(gz[0])
    zhis.push(gz[1])
  })

  let ganzhi = [gans, zhis]
  let xingChong = getXingChong(ganzhi[0], ganzhi[1])

  // 渲染Titles
  let ganZhiTitlesHtml = ''
  ganZhiTitles.map(item => {
    ganZhiTitlesHtml += `<div class="ganzhi-title">${item}</div>`
  })
  $('.ganzhi-titles').html(ganZhiTitlesHtml)

  ganzhi.map((ziList, gzI) => {
    let xcGansHtml = ''
    let ziHtml = ''
    let shenHtml = ''
    ziList.map(i => {
      ziHtml += `<div class="wuxing-${ganzhiWuXings[gzI][GAN_ZHIS[gzI].indexOf(i)]}">${i}</div>`
      // 十神
      let dayGan = panData.zhu.rizhu[0]

      var hideGan = LunarUtil.ZHI_HIDE_GAN[i]
      let shenListHtml = ''
      if (hideGan) {
        for (var j = 0; j < hideGan.length; j++) {
          // console.log(dayGan, i, hideGan[j])
          let shen = LunarUtil.SHI_SHEN_ZHI[dayGan + i + hideGan[j]]
          if (shen)
            shenListHtml += `<div  class="wuxing-${ganzhiWuXings[0][GAN_ZHIS[0].indexOf(hideGan[j])]}">${hideGan[j] + ' ' + shen}</div>`
        }
      } else {
        let shen = LunarUtil.SHI_SHEN_GAN[dayGan + i]
        if (shen) shenListHtml += `<div>${shen}</div>`
      }
      shenHtml += `<div>${shenListHtml}</div>`
    })
    $(`.xc-ganzhi-list .zi-${gzI}-s`).html(ziHtml)
    $(`.xc-ganzhi-list .shen-${gzI}-s`).html(shenHtml)

    xingChong[gzI].map(xc => {
      let xcGanHtml = ''
      // console.log(xc)
      for (let index = 0; index < ganZhiA.length; index++) {
        let xcGanDHtml = `<div class="xc-${gzI}-d"></div>`
        // 判断成不成化
        let chengHua = true
        let xcTips = xc.t
        // if (xc.t.indexOf('合化') != -1 || xc.t.indexOf('三合') != -1 || xc.t.indexOf('半合') != -1) {
        //   let huaWuxing = xc.t.charAt(xc.t.length - 1)
        //   let huaWuxingIdx = wuXing.indexOf(huaWuxing)
        //   // console.log('有荷花关系', xc.t, xc.i, huaWuxing, huaWuxingIdx)
        //   // 提取天干地支进行分析
        //   let huaRate = 0
        //   let rateWuxings = []
        //   xc.i.map(gzIdx => {
        //     rateWuxings.push(ganzhiWuXings[0][GAN.indexOf(gans[gzIdx])])
        //     rateWuxings.push(ganzhiWuXings[1][ZHI.indexOf(zhis[gzIdx])])
        //   })

        //   rateWuxings.map(rateWx => {
        //     if (wuxingDiZi[huaWuxingIdx][0].indexOf(rateWx) != -1) {
        //       huaRate += 1
        //     }
        //   })
        //   // console.log('rateWuxings', wuxingDiZi[huaWuxingIdx][0], rateWuxings, huaRate)
        //   xcTips = (xc.i.length >= 3 ? '三合' : xc.t.indexOf('半合') != -1 ? '半合' : '合') + huaWuxing
        //   if (huaRate >= xc.i.length) {
        //     xcTips += '成化'
        //   } else {
        //     xcTips += '不化'
        //     chengHua = false
        //   }
        // }

        let isHua = false
        if (
          (xcTips.indexOf('合') != -1 || xcTips.indexOf('会') != -1) &&
          xcTips.indexOf('拱合') == -1 &&
          xcTips.indexOf('暗合') == -1 &&
          xcTips.indexOf('暗会') == -1 &&
          xcTips.indexOf('拱会') == -1
        ) {
          isHua = true
          if (xc.ChengHua == 1) {
            xcTips += '成化'
          } else {
            xcTips += '不化'
            chengHua = false
          }
        }

        // if (xcTips.indexOf('不化') != -1) {
        //   chengHua = false
        // }

        if (index < xc.i[xc.i.length - 1] && index > xc.i[0]) {
          xcGanDHtml = `<div class="xc-${gzI}-d show  ${chengHua ? '' : 'dashed'} ${isHua ? 'hua' : ''}"></div>`
        }

        if (xc.i.indexOf(index) != -1) {
          // console.log('', ziList[index], index, xc.t, index == xc.i[0], index == xc.i[xc.i.length - 1])
          xcGanDHtml = `<div class="xc-${gzI}-d show  ${chengHua ? '' : 'dashed'} ${isHua ? 'hua' : ''}"><span class="xc-zi">${
            ziList[index]
          }</span></div>`

          if (index == xc.i[0]) {
            xcGanDHtml = `<div class="xc-${gzI}-d show ${chengHua ? '' : 'dashed'} ${
              isHua ? 'hua' : ''
            }"><div class="xc-tips" style="left:${(xc.i[xc.i.length - 1] - xc.i[0]) * 50}%">${xcTips}</div><span class="xc-zi">${
              ziList[index]
            }</span></div>`
          }
          if (index == xc.i[xc.i.length - 1]) {
            xcGanDHtml = `<div class="xc-${gzI}-d  ${isHua ? 'hua' : ''}"><span class="xc-zi">${ziList[index]}</span></div>`
          }
        }

        xcGanHtml += xcGanDHtml
      }
      xcGansHtml += `<div class="xc-${gzI}">${xcGanHtml}</div>`
    })

    $(`.xc-${gzI}-s`).html(xcGansHtml)
  })
}

function renderShenSha() {
  //
  let gans = []
  let zhis = []
  let ganZhiTitles = ['年柱', '月柱', '日柱', '时柱']

  let ganZhiA = [panData.zhu.nianzhu, panData.zhu.yuezhu, panData.zhu.rizhu, panData.zhu.shizhu]

  let shenShaForm = form.val('form-shen-sha')

  if (shenShaForm.showFenZhu) {
    ganZhiA.push(panData.zhu.fenzhu)
    ganZhiTitles.push('分柱')
  }

  if (shenShaForm.showMiaoZhu) {
    ganZhiA.push(panData.zhu.miaozhu)
    ganZhiTitles.push('秒柱')
  }

  ganZhiA.push(panData.yun.dayun == '-' ? '--' : panData.yun.dayun)
  ganZhiA.push(panData.yun.liunian)
  ganZhiA.push(panData.yun.liuyue)
  ganZhiA.push(panData.yun.liuri)

  ganZhiTitles = ganZhiTitles.concat(['大运', '流年', '流月', '流日'])

  // if (shenShaForm.showLiuShi) {
  ganZhiA.push(panData.yun.liushi)
  ganZhiTitles.push('流时')
  // }

  if (shenShaForm.showLiuFen) {
    ganZhiA.push(panData.yun.liufen)
    ganZhiTitles.push('流分')
  }

  if (shenShaForm.showLiuMiao) {
    ganZhiA.push(panData.yun.liumiao)
    ganZhiTitles.push('流秒')
  }

  ganZhiA.map(gz => {
    gans.push(gz[0])
    zhis.push(gz[1])
  })

  // 渲染Titles
  let ganZhiTitlesHtml = ''
  ganZhiTitles.map(item => {
    ganZhiTitlesHtml += `<div class="ganzhi-title">${item}</div>`
  })
  $('.ganzhi-titles').html(ganZhiTitlesHtml)
  let ganzhi = [gans, zhis]
  ganzhi.map((ziList, gzI) => {
    let ziHtml = ''
    ziList.map(i => {
      ziHtml += `<div class="wuxing-${ganzhiWuXings[gzI][GAN_ZHIS[gzI].indexOf(i)]}">${i}</div>`
    })
    $(`.ss-ganzhi-list .zi-${gzI}-s`).html(ziHtml)
  })
  let shenShas = shenShaUtil.getByGanZhi(gans, zhis)

  let shenShaListHtml = ''
  shenShas.map(shenSha => {
    let shenShaHtml = ''
    shenSha.map(s => {
      shenShaHtml += `<div class='shen-sha' onclick="openShenShaDesc('${s}')">${s}</div>`
    })
    shenShaListHtml += `<div class='shen-shas'>${shenShaHtml}</div>`
  })

  $('.shen-sha-list').html(shenShaListHtml)
}
function onOpenShenSha() {
  renderShenSha()
  // 编辑窗口打开
  layer.open({
    type: 1,
    title: '神煞',
    content: $('.modal-shen-sha'),
    cancel: function (index, layero) {
      $('.modal-shen-sha').css({ display: 'none' })
    }
  })
}

function openShenShaDesc(title) {
  let index = shenShaUtil.SHEN_SHA_DATA.findIndex(item => {
    return item.title == title
  })
  if (index != -1) {
    let currentShenSha = shenShaUtil.SHEN_SHA_DATA[index]
    layer.open({
      type: 1,
      maxWidth: 400,
      title: currentShenSha.title,
      content: `<div  style="padding:20px;"><h1>${currentShenSha.title}</h1><p style="font-size:16px;padding:10px 0">${currentShenSha.desc}</p></div>`
    })
  }
}

function resetFormWuxingConfig() {
  form.val('form-wuxing-config', DEFAULT_WUXING_CONFIG)
  form.render() //更新全部
  onWuxingScoreInput()
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 退出登录
function logout() {
  layer.confirm('确定要退出登录吗?', function (index) {
    sendRequest({
      method: 'GET',
      url: urlHead + '/user/userLogout'
    }).then(res => {
      if (res.code == 200) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        window.location.href = 'login.html'
      }
      layer.close(index)
    })
  })
}

function renderZiWeiReverseChart(sex = 1, year = 1998, month = 1, day = 1) {
  $('.ziwei-date').html(`${year}年${month}月${day}日`)

  let dialogHtml = ``
  ZHI.map((item, idx) => {
    dialogHtml += `<div class="ziwei-chart">
    <div class="ziwei-title">${item}时（${idx * 2 - 1 < 0 ? 23 : idx * 2 - 1}点-${idx * 2 + 1}点）</div>
    <div class="chart-tips ziweiChartReverseTips${idx}">运势图加载中</div>
    <div id="ziweiReverseChart${idx}" style="width: 95vw; height: 400px"></div>
  </div>`
  })
  //     <div class="ziwei-table ziweiReverseTable${idx}"></div>
  $('.ziwei-reverse-charts .charts-content').html(dialogHtml)

  ZHI.map(async (zi, idx) => {
    $('.ziweiChartReverseTips' + idx).html(`运势图加载中...`)
    $('.ziweiChartReverseTips' + idx).css('display', 'block')
    $('.ziweiReverseChart' + idx).html('')

    const data = await jqPromiseAjax({
      url: `/api/windada/getWindada?FUNC=Basic&Target=0&SubTarget=-1&Sex=${sex}&Solar=1&Year=${year}&Month=${month}&Leap=0&Day=${day}&Hour=${
        idx * 2
      }&Item=1`
    })

    if (null == data) {
      console.log('加载失败')
      $('.ziweiChartReverseTips' + idx).html(`运势图加载失败！`)
      return null
    }

    let yunshiData = []
    let xData = []
    let yData = []
    try {
      let datas = data.match(/checkFunc(.+?)<\/a>/g)
      for (let i = 0; i < datas.length; i++) {
        let v = datas[i].match(/>(.+?)</g)
        if (v.length > 2) {
          // 一生运势 网页解析
          let yearSection = v[0].replace('<', '').replace('>', '')
          yunshiData.push([
            yearSection.split('-')[0],
            v[2].replace('<', '').replace('>', ''),
            v[1].replace('<', '').replace('>', ''),
            yearSection
          ])
          //这里插入两年之间同样的数值让曲线图看起来更直观
          xData.push(yearSection.split('-')[0])
          yData.push(v[2].replace('<', '').replace('>', ''))
          xData.push(yearSection.split('-')[1])
          yData.push(v[2].replace('<', '').replace('>', ''))
        }
      }
    } catch (e) {
      console.log('运势网页解析失败', e)
    }

    $('.ziweiChartReverseTips' + idx).css('display', 'none')

    // 1.曲线图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ziweiReverseChart' + idx))
    // 指定图表的配置项和数据
    option = {
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true
        }
      ],
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        enterable: true //鼠标是否可进入提示框浮层中
      }
    }
    // 使用刚指定的配置项和数据显示图表。
    document.getElementById('ziweiReverseChart' + idx).removeAttribute('_echarts_instance_')
    myChart.setOption(option)

    // 2.表格
    // console.log('yunshiData', yunshiData)
    let tableHtml = ''

    for (let i = 3; i >= 1; i--) {
      let rowHtml = ''
      if (i == 3) rowHtml = '<div class="zw-t-col">日期</div>'
      if (i == 2) rowHtml = '<div class="zw-t-col">虚岁</div>'
      if (i == 1) rowHtml = '<div class="zw-t-col">运势</div>'
      yunshiData.map(item => {
        rowHtml += `<div class="zw-t-col">${item[i]}</div>`
      })
      tableHtml += `<div class="zw-t-row">${rowHtml}</div>`
    }

    $('.ziweiReverseTable' + idx).html(tableHtml)
  })
}

/**
 * 会员按钮控制
 */
async function renderVipButtons() {
  const userInfoResp = await sendRequest({
    url: `api/user/getUserInfo`
  })
  if (userInfoResp && userInfoResp.data.lng && userInfoResp.data.lat) {
    realTimeLatLng.lat = userInfoResp.data.lat
    realTimeLatLng.lng = userInfoResp.data.lng
  }
  let isVip = userInfoResp && userInfoResp.data && userInfoResp.data.isMember
  if (isVip) {
    $('.vip-buttons')
      .html(`<button type="button" class="layui-btn edit-btn vip" onclick="onOpenZiwei()">紫薇运势<img class="vip-img" src="./images/vip.png" /></button>
      <button type="button" class="layui-btn  edit-btn vip" onclick="onOpenXingChong()">刑冲关系<img class="vip-img" src="./images/vip.png" /></button>
      <button type="button" class="layui-btn layui-border-black edit-btn vip" onclick="onOpenShenSha()">神煞<img class="vip-img" src="./images/vip.png" /></button>
      <a href="./qimen.html" class="layui-btn   edit-btn vip">奇门遁甲<img class="vip-img" src="./images/vip.png" /></a>
      <a href="./liuren.html" class="layui-btn   edit-btn vip">大六壬<img class="vip-img" src="./images/vip.png" /></a>
      <a href="./qzsy.html" class="layui-btn   edit-btn vip">七政四余<img class="vip-img" src="./images/vip.png" /></a>`)
    $('.user-info-api-img').html('<img src="./images/vip.png" alt="" />')
  }
}

function onOpenTips(content) {
  layer.msg(content)
}

function onOpenVipTips() {
  layer.confirm(
    '仅需1680元VIP即可开启刑冲，奇门遁甲，神煞，紫薇，六爻，大六壬等权限',
    {
      btn: ['立即开启', '取消']
    },
    async function (index, layero) {
      //按钮【按钮一】的回调
      const orderPayResp = await sendRequest({
        url: `api/order/pay`
      })

      if (orderPayResp) {
        layer.confirm(
          '是否完成支付？',
          {
            btn: ['已经支付', '未完成']
          },
          async function (index, layero) {
            window.location.reload()
          },
          function (index) {
            layer.close(index)
          }
        )

        let form = orderPayResp
        const div = document.createElement('formdiv')
        div.innerHTML = form
        document.body.appendChild(div)
        for (let index = 0; index < document.forms.length; index++) {
          const element = document.forms[index]
          if (element.name == 'punchout_form') {
            element.setAttribute('target', '_blank')
            element.submit()
            div.remove()
          }
        }
      }
    },
    function (index) {
      layer.close(index)
    }
  )
}

async function openRealSunTimeConfigEdit() {
  const userInfoResp = await sendRequest({
    url: `api/user/getUserInfo`
  })
  if (userInfoResp && userInfoResp.data.lng && userInfoResp.data.lat) {
    form.val('form-user-info-form', {
      timeZoneIndex: 0,
      lng: userInfoResp.data.lng,
      lat: userInfoResp.data.lat
    })
    $('.lat-input').val(userInfoResp.data.lat)
    $('.lng-input').val(userInfoResp.data.lng)
  }

  dialogRealSumTimeConfig = layer.open({
    type: 1,
    title: '信息配置',
    offset: '5vh',
    content: $('.modal-real-sum-time-config'),
    cancel: function (index, layero) {
      $('.modal-real-sum-time-config').css({ display: 'none' })
    }
  })
}
