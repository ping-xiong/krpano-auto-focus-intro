
var krpano_object = null;

var spotname = null;
// 关闭按钮路径
var close_path = "./close-.png";

// 默认视角范围
var config = {
    // 默认视角范围：120
    default_fov: 120,
    // 放大的程度：30
    zoom_fov: 30,
    // 动画类型，填写smooth，linear，默认是smooth
    animation_type: 'smooth',
    // 如果为smooth的速度设置
    smooth:{
        // 以度/秒为单位的加速度
        accel: '720',
        // 负加速度（度/秒）
        break: '-720',
        // 最大移动速度，单位为度/秒
        maxspeed: '720'
    },
    // 如果为linear的速度设置
    linear:{
        // 以度/秒为单位的移动速度
        speed: '720'
    },
    // 每个自动动画的时间间隔，默认3000为3秒
    timer: 6000
};


function start_foucus(ath, atv, img, time = 0) {


    console.log("开始执行动画，ath:"+atv+"，atv:"+ath+"，img:"+img)

    if (spotname != null){
        // 关闭弹窗
        closePopup();
    }

    resetView();
    setTimeout(function (ath, atv) {
        moveView(ath, atv);
    }, 1100, ath, atv)

    setTimeout(function () {
        zoomView();
    }, 2100)


    setTimeout(function (img) {
        showImg(img);
    }, 3100, img)

}

// 重置视角
function resetView() {
    if (config.animation_type == "smooth") {
        krpano_object.call('zoomto('+config.default_fov+', smooth('+config.smooth.accel+', '+config.smooth.break+','+config.smooth.maxspeed+'))');
    }else{
        krpano_object.call('zoomto('+config.default_fov+', linear('+config.linear.speed+'))');
    }

}

// 移动视角
function moveView(ath, atv) {
    if (config.animation_type == "smooth") {
        krpano_object.call('moveto('+ath+', '+atv+', smooth('+config.smooth.accel+', '+config.smooth.break+','+config.smooth.maxspeed+'))');
    }else{
        krpano_object.call('moveto('+ath+', '+atv+', linear('+config.linear.speed+'))');
    }

}


// 缩放视角
function zoomView() {
    if (config.animation_type == "smooth") {
        krpano_object.call('zoomto('+config.zoom_fov+', smooth('+config.smooth.accel+', '+config.smooth.break+','+config.smooth.maxspeed+'))');
    }else{
        krpano_object.call('zoomto('+config.zoom_fov+', linear('+config.linear.speed+'))');
    }
}


// 显示图片
function showImg(img) {

    if (img == null || img == ""){
        console.log('图片路径无效');
        return;
    }

    if (spotname == null){
        spotname = "img_popup_"+Math.round(Math.random() * 100000000);
    }
    // 创建layer
    krpano_object.call("addlayer(" + spotname + ");");
    krpano_object.call("set(layer[" + spotname + "].type, image);");
    krpano_object.call("set(layer[" + spotname + "].alpha, 0);");
    krpano_object.call("set(layer[" + spotname + "].scale, 0);");
    krpano_object.call("set(layer[" + spotname + "].url, "+img+");");
    krpano_object.call("set(layer[" + spotname + "].align, center);");
    krpano_object.call("set(layer[" + spotname + "].edge, center);");
    krpano_object.call("set(layer[" + spotname + "].ondown, js(closePopup) );");

    // 创建关闭按钮
    var close = "close_popup_"+Math.round(Math.random() * 100000000);
    krpano_object.call("addlayer(" + close + ");");
    krpano_object.call("set(layer[" + close + "].type, image);");
    krpano_object.call("set(layer[" + close + "].x, -15);");
    krpano_object.call("set(layer[" + close + "].y, -15);");
    krpano_object.call("set(layer[" + close + "].width, 30);");
    krpano_object.call("set(layer[" + close + "].height, 30);");
    krpano_object.call("set(layer[" + close + "].parent, layer["+spotname+"]);");
    krpano_object.call("set(layer[" + close + "].url, "+close_path+");");
    krpano_object.call("set(layer[" + close + "].align, righttop);");
    krpano_object.call("set(layer[" + close + "].ondown, js(closePopup) );");


    // 动画
    krpano_object.call("tween(layer["+spotname+"].alpha, 1);");
    krpano_object.call("tween(layer["+spotname+"].scale, 1);");
}

// 关闭弹出层前的动画
function closePopup() {

    krpano_object.call("tween(layer["+spotname+"].alpha, 0);");
    krpano_object.call("tween(layer["+spotname+"].scale, 0, 0.5,default, js(colsoePopupWindow));");

}

// 关闭弹出层
function colsoePopupWindow() {
    krpano_object.call("removelayer("+spotname+", true)");
}


// 一个函数搞定
function lookSomeWhere(ath, atv, fov) {

    krpano_object.call('lookto('+ath+', '+atv+', '+fov+')');

}

// 获取坐标
function showPositon(){
    var mx = krpano_object.get("mouse.x");
    var my = krpano_object.get("mouse.y");
    var pnt = krpano_object.screentosphere(mx,my);
    var h = pnt.x;
    var v = pnt.y;

    console.log("鼠标X："+mx+"，鼠标y"+my+"，坐标h："+h+"，坐标v："+v)

}


// 开始动画脚本
function runScript() {

    krpano_object = document.getElementById('krpanoSWFObject');

    document.getElementById('btn').style.display = "none"

    // 每个动画的目标坐标和显示的图片
    var target = [
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/1.png'
        },
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/2.png'
        },
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/3.jpg'
        },
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/4.png'
        },
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/5.png'
        },
        {
            ath: getRandomViewH(),
            atv: getRandomViewV(),
            img: './image/6.png'
        }
    ];

    console.log(target)

    // 定时调用动画函数
    for (var i = 0; i < target.length; i++) {

        if (i == 0){
            start_foucus(target[i].ath, target[i].atv, target[i].img);
        }else{
            setTimeout(function (ath, atv, img, time) {
                start_foucus(ath, atv, img, time);
            }, i * config.timer, target[i].ath, target[i].atv, target[i].img, i * config.timer)
        }
    }
    // 返回小行星
    setTimeout(function () {
        if (spotname != null){
            // 关闭弹窗
            closePopup();
        }
        krpano_object.call("skin_view_littleplanet()")
        document.getElementById('btn').style.display = "flex"
    }, target.length * config.timer)

}

// 获取随机坐标
function getRandomViewH() {
    return  (Math.random() * 360.0 - 180.0) + "";
}
function getRandomViewV(){
    return (Math.random() * 180.0 - 90.0)  + "";
}


// 恢复小行星
function resetLP() {
    krpano_object.call("skin_view_normal()")
    document.getElementById('btn').style.display = "none"
}
