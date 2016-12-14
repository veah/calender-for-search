var y, m, d;
var wrongDateFlag = 0;
var calendar = document.getElementById("calendar");
var titleHTML = "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";

//判断是否是闰年
function isLeapYear(year) {
    return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
}

// 初始化日期
function initDate(ifToday) {
    var myDate;
    if(ifToday){
        myDate = new Date();
        y = myDate.getFullYear(); 
        m = myDate.getMonth()+1;
        d = myDate.getDate();
    } else {
        var inputs = document.getElementsByTagName('input');
        var _y = inputs[0].value,
            _m = inputs[1].value,
            _d = inputs[2].value; 
        // 尽管newDate方法可以处理超出正产范围的年数和月数，但还是做一下限制处理
        if( _y == '' || _y<1900 || _y>2999) {
            alert('请输入正确年份');    
            return wrongDateFlag = 1;
        }else if ( _m == '' || _m<1 || _m>12) {
            alert("请输入正确月份");     
            return wrongDateFlag = 1;
        }else if( _d == ''){
            // 日期不做限制，随意玩
            alert("请输入正确日期");
            return wrongDateFlag = 1;
        }else {
            myDate = new Date(_y,_m-1,_d);
            y = myDate.getFullYear(); 
            m = myDate.getMonth()+1;
            d = myDate.getDate();
        }
    }
}

// 根据初始化的日期数据渲染出日历
function renderCalendar() {
    if(wrongDateFlag) return;
    calendar.innerHTML = "";    //清空上一张日历
    
    var i, k,
        calBox = document.createElement("div");
    
    var firstDay = new Date(y,m-1,1),            //获取当月的第一天
        dayOfWeek = firstDay.getDay(),         //判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
        daysOfMonth = (m === 2) ? (28 + isLeapYear(y)) : 31 - (m-1) % 7 % 2,         //确定当月天数
        str_nums = Math.ceil((dayOfWeek + daysOfMonth) / 7);                //确定日期表格所需的行数

    var bodyHTML = "";

    for (i = 0; i < str_nums; i += 1) {         //创建日期表格
        bodyHTML += '<tr>';
        for (k = 1; k < 8; k++) {
            var idx = 7 * i + k;                //为每个日期表格创建索引,从0开始
            var date = idx - dayOfWeek;         //算出当前表格中对应的相对1号的日期
            (date <= 0 || date > daysOfMonth) ? date = ' ' : date = idx - dayOfWeek;  //索引小于等于0或者大于月份最大值就用空表格代替
            date == d ? bodyHTML += '<td class="myDate">' + date + '</td>' : bodyHTML += '<td>' + date + '</td>';  //高亮显示当天
        }
        bodyHTML += '</tr>';
    }
    calBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +"<p>"+ y + '年' + m + '月' + d + '日'+"</p>" +
        titleHTML + bodyHTML +
        "</table>";
    calendar.appendChild(calBox);
}

// 展示日历
function showCalendar(ifToday){
    wrongDateFlag = 0;

    initDate(ifToday);
    renderCalendar();
}



