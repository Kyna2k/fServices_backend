var hbs = require("hbs");
const moment = require("moment");

module.exports = function () {
  hbs.registerHelper("pagination", function (n, current, block) {
    var accum = "";


    if(n < 5)
    {
      for (var i = 0; i < n; ++i) {
          accum += block.fn(i)
        };
        return accum;
    }

    if(current + 5 >= 10)
    {
      for (let i = current - 4; i < current + 3; i++) {
        if (i < n) {
          accum += block.fn(i);
        }
       
      }
      return accum;
    }
    else if(current + 5 <= 10)
    {
      for (let i = 0; i < 6; i++) {
        if (i < n) {
          accum += block.fn(i);
        }
      }
      return accum;
    }



    // console.log(n);
    // if(n > 5)
    // {
    //   for(let i = 0; i < n; ++i)
    //   {
    //     if(i < 2 || i >= n-2)
    //     {

    //       accum += block.fn(i);
    //     }
    //     if(current )
    //     if(i == 3)
    //     {
    //       accum +='<div style="width: 50px;display: flex; align-items: end; justify-content: center;">...</div>';
    //     }

    //   }
    //   return accum;
    // }
    // for (var i = 0; i < n; ++i) {
    //   accum += block.fn(i)
    // };
    // return accum;
    
    
  });

  hbs.registerHelper("sum", function (n, option) {
    return parseInt(n) + 1;
  });

  hbs.registerHelper("active", function (value, value2, result) {
    var valueIn = parseInt(value2) + 1;
    if (value == valueIn) {
      return result;
    } else {
      return "";
    }
  });
  hbs.registerHelper("selected", function (value, value2, result) {
    if (value == value2) {
      return result;
    } else {
      return "";
    }
  });
  hbs.registerHelper("statusReport", function (value) {
    if (value == 0) {
      return '<span class="badge bg-label-warning me-1">Chưa ai xử lý</span>';
    } else if (value == 1) {
      return '<span class="badge bg-label-primary me-1">Đang xử lý</span>';
    } else if (value == 2) {
      return '<span class="badge bg-label-success me-1">Đã xử lý</span>';
    } else {
      return '<span class="badge bg-label-danger me-1">Hủy xự cố</span>';
    }
  });
  hbs.registerHelper("check", function (value, comparator) {
    return value === comparator ? "" : value;
  });
  var DateFormats = {
    short: "DD MMMM - YYYY",
    long: "dddd DD.MM.YYYY HH:mm",
  };
  hbs.registerHelper("formatDate", function (datetime, format) {
    if (moment) {
      // can use other formats like 'lll' too
      format = DateFormats[format] || format;
      if (datetime) {
        return moment(datetime).format(format);
      } else {
        return "";
      }
    } else {
      return datetime;
    }
  });
};
