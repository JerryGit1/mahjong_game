var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
/**
 * 创建者 伟大的周鹏斌大王 on 2017/4/6.
 * <script src="http://www.xingtianji.com/h5/web/release/console/version/AH_tester.js"></script>
 */
var MyConsole = (function () {
    function MyConsole() {
        this.currentVersionType = "demo";
        this._isTrace = false;
        this.colorArr = ["#ff0000", "#000", "#00ff00", "#00ffff", "#ccc", "#00cccc", "#cccc00", "#ffff00", "#00aaaa"];
        /**4号机---新功能-控象系统
         * 控物  键盘1
         * 测物  键盘2
         **/
        this.control_system_tips = [
            "键盘-1:启动/关闭 (按鼠标左键,提示对象色块,松开左键选择当前色块对象",
            "键盘-2:用键盘上下左右控制移动",
            "键盘-3:用鼠标控制移动",
            "键盘-<:减速",
            "键盘-<:加速",
            "ps:此心法乃本门无上奥义,乱传死全家!",
        ];
    }
    MyConsole.getInstance = function () {
        if (!this.console) {
            this.console = new MyConsole();
        }
        return this.console;
    };
    MyConsole.prototype.start = function (v, scene) {
        if (scene === void 0) { scene = null; }
        if (this.ah_tester)
            return;
        this._isTrace = true;
        this.currentVersionType = v;
        if (this._isTrace) {
            if (window["ah_tester"]) {
                this.ah_tester = window["ah_tester"];
                /**
                 * 启动测试器
                 * proId 项目id  X1 C1 D1
                 * cVersion 当前版本号码 0.0      1.0         2.0         3.0
                 * point 号码显示位置[1-4]左上 左下 右上 右下
                 * direction  1竖屏 2横屏左边 3横屏右边
                 * _isAddContent 是否显示调试控制台 【日志输出，版本信息】
                 * versionType 版本类型【demo（日志不会上传） alpha release】
                 * serverInfo 服务器信息
                 * */
                var _isConsole = true;
                //1.奥幻控制台
                if (this.currentVersionType == "release")
                    _isConsole = false;
                //2.版本号
                this.ah_tester.start(Main.pro_name, Main.version, 3, 1, _isConsole, v);
                //3.控象系统
                if (this.currentVersionType != "release" && scene)
                    this.start_control_system(scene);
            }
        }
    };
    /**
     * 输出日志
     * obj 内容 字符串 和 object都行
     * type number[0-9]特殊分类类型 0表示报错类型 未来在 宙斯盾使用时候用
     * name obj=object时标记名字（就是为了好区分）
     **/
    MyConsole.prototype.trace = function (obj, type, name) {
        if (type === void 0) { type = 1; }
        if (name === void 0) { name = "对象"; }
        var self = this, num = 0, str;
        if (this._isTrace) {
            if (typeof obj == "string") {
                log(obj);
                console.log("%c" + obj, "color:" + self.colorArr[Number(type)]);
            }
            else if (typeof obj == "object" && !obj["hashCode"]) {
                str = JSON.stringify(obj, null, 2);
                log(str);
                console.log(name);
                console.log(JSON.parse(str));
            }
            else {
                console.log("无法输出复杂变量");
                console.log(obj);
            }
        }
        self = null;
        function log(str) {
            //console.log("%c" + str, "color:" + self.colorArr[Number(type)]);
            /**测试器
             * 填充日志内容
             * str 内容 必须是字符串
             * type 类型（0表示错误类型 分类用到了）
             * userId  用户标识id (总控制台查询用到)
             * */
            str = str.replace(' ', '&nbsp');
            if (this.ah_tester)
                this.ah_tester.addLog(str, type, self.colorArr[Number(type)]);
        }
    };
    MyConsole.prototype.start_control_system = function (scene) {
        var control_sp; //物体范围可视化
        var control_view;
        var speed = 1; //移动速度
        var control_view_w;
        var control_view_h;
        var control_view_txt;
        var current_control_type = 0; //控制类型 1键盘控制  2鼠标控制
        var mouse_point; //鼠标点击位置
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 49:
                    if (current_control_type == 0) {
                        add_sp();
                        this.trace(this.control_system_tips, 3, "启动--控象心法");
                        scene.addEventListener(egret.TouchEvent.TOUCH_MOVE, control_system_choose_view, null);
                        document.addEventListener("mousedown", control_system_mouse_down);
                        document.addEventListener("mousemove", control_system_mouse_move);
                        current_control_type = 1;
                        if (this.ah_tester.start_cs)
                            this.ah_tester.start_cs();
                    }
                    else {
                        remove_sp();
                        if (this.ah_tester.close_cs)
                            this.ah_tester.close_cs();
                        current_control_type = 0;
                    }
                    break;
                case 50:
                    if (current_control_type == 0)
                        return;
                    current_control_type = 1;
                    break;
                case 188:
                    speed += .5;
                    if (speed > 50)
                        speed = 50;
                    break;
                case 190:
                    speed -= .5;
                    if (speed < 0.2)
                        speed = 0.2;
                    break;
                case 51:
                    if (current_control_type == 0)
                        return;
                    current_control_type = 2;
                    break;
                case 52:
                    if (current_control_type == 0)
                        return;
                    current_control_type = 3;
                    mouse_point = null;
                    control_view = null;
                    control_sp.graphics.clear();
                    break;
                case 39:
                    if (control_view && current_control_type == 1)
                        control_view.x += speed;
                    break;
                case 37:
                    if (control_view && current_control_type == 1)
                        control_view.x -= speed;
                    break;
                case 38:
                    if (control_view && current_control_type == 1)
                        control_view.y -= speed;
                    break;
                case 40:
                    if (control_view && current_control_type == 1)
                        control_view.y += speed;
                    break;
            }
            change_sp();
        }.bind(this));
        //第一步选择对象
        var scale_x;
        var scale_y;
        var canvas_y = 0;
        var canvas_x = 0;
        function control_system_choose_view(e) {
            if (current_control_type == 3)
                return;
            var canvas = document.getElementsByTagName("canvas");
            if (canvas) {
                canvas_y = Number(String(canvas[0].style.top).split("px")[0]);
                canvas_x = Number(String(canvas[0].style.left).split("px")[0]);
            }
            scale_x = Main.stageWidth / (window.innerWidth - canvas_x * 2);
            control_view = e.target;
            control_view_w = Math.floor(control_view.width * control_view.scaleX * 100) / 100;
            control_view_h = Math.floor(control_view.height * control_view.scaleY * 100) / 100;
            change_sp();
        }
        //第三步 鼠标移动对象
        function control_system_mouse_move(e) {
            if (control_view && current_control_type == 2) {
                var x = (e.clientX - canvas_x) * scale_x;
                var y = (e.clientY - canvas_y) * scale_x;
                x = Math.floor(x * 100) / 100;
                y = Math.floor(y * 100) / 100;
                //全局坐标-》局部坐标
                var pos = control_view.parent.globalToLocal(x, y);
                control_view.x = pos.x;
                control_view.y = pos.y;
                change_sp();
            }
            else if (current_control_type == 3 && mouse_point) {
                var x = (e.clientX - canvas_x) * scale_x;
                var y = (e.clientY - canvas_y) * scale_x;
                x = Math.floor(x * 100) / 100;
                y = Math.floor(y * 100) / 100;
                rect_sp({ x: x, y: y });
            }
        }
        //第4步 测物
        function control_system_mouse_down(e) {
            if (current_control_type == 3) {
                var canvas = document.getElementsByTagName("canvas");
                if (canvas) {
                    canvas_y = Number(String(canvas[0].style.top).split("px")[0]);
                    canvas_x = Number(String(canvas[0].style.left).split("px")[0]);
                }
                scale_x = Main.stageWidth / (window.innerWidth - canvas_x * 2);
                var x = (e.clientX - canvas_x) * scale_x;
                var y = (e.clientY - canvas_y) * scale_x;
                mouse_point = {
                    x: Math.floor(x * 100) / 100,
                    y: Math.floor(y * 100) / 100
                };
                rect_sp({ x: x, y: y });
                document.addEventListener("mouseup", control_system_mouse_up);
            }
        }
        function control_system_mouse_up() {
            document.removeEventListener("mouseup", control_system_mouse_up);
            if (mouse_point) {
                mouse_point = null;
                return;
            }
        }
        //随着对象移动 改变可视化区域-------------前2种
        function change_sp() {
            if (control_view && control_sp) {
                //1.显示区域
                control_sp.graphics.clear();
                control_sp.graphics.beginFill(0x0066FF, .2);
                control_sp.graphics.lineStyle(1, 0x0066FF, 1);
                var ax = 0, ay = 0;
                if (judge_view_type("MyButton")) {
                    ax = -control_view_w / 2;
                    ay = -control_view_h / 2;
                }
                else if (judge_view_type("egret.Bitmap")) {
                    ax = -control_view.anchorOffsetX * control_view.scaleX;
                    ay = -control_view.anchorOffsetY * control_view.scaleY;
                }
                control_sp.graphics.drawRect(ax, ay, control_view_w, control_view_h);
                //2.中心点
                control_sp.graphics.beginFill(0x00ff00, .9);
                control_sp.graphics.drawCircle(0, 0, 3);
                //3.全局坐标
                control_view.x = Math.floor(control_view.x * 100) / 100;
                control_view.y = Math.floor(control_view.y * 100) / 100;
                var pos = control_view.parent.localToGlobal(control_view.x, control_view.y);
                control_sp.x = Math.floor(pos.x * 100) / 100;
                control_sp.y = Math.floor(pos.y * 100) / 100;
                //3.坐标显示
                var str = "<font color='#B36BB4'>" + get_view_type() + "</font> | ";
                str += "<font color='#0099CC'>宽高</font>" + control_view_w + " x " + control_view_h + " | ";
                str += "<font color='#0099CC'>坐标</font>" + control_view.x + " x " + control_view.y + " | ";
                str += "<font color='#0099CC'>速度</font>" + speed + " | ";
                control_view_txt.textFlow = (new egret.HtmlTextParser()).parser(str);
                control_view_txt.x = ax + 5;
                control_view_txt.y = ay - control_view_txt.height - 10;
                if (control_sp.x + control_view_txt.x + control_view_txt.width + 10 > Main.stageWidth) {
                    control_view_txt.x = Main.stageWidth - control_sp.x - control_view_txt.width - 10;
                }
                else if (control_sp.x + control_view_txt.x - 10 < 0) {
                    control_view_txt.x = 0 - control_sp.x + 10;
                }
                if (control_sp.y + control_view_txt.y + control_view_txt.height + 10 > Main.stageHeight) {
                    control_view_txt.x = Main.stageHeight - control_sp.y - control_view_txt.height - 10;
                }
                else if (control_sp.y + control_view_txt.y - 10 < 0) {
                    control_view_txt.y = 0 - control_sp.y + 10;
                }
                control_sp.graphics.beginFill(0x2F3239);
                control_sp.graphics.lineStyle(0, 0x0066FF, 1);
                control_sp.graphics.drawRoundRect(control_view_txt.x - 5, control_view_txt.y - 5, control_view_txt.width + 10, control_view_txt.height + 10, 10, 10);
            }
        }
        //随着对象移动 改变可视化区域-------------3种-测物
        var control_sp_c;
        function rect_sp(c_point) {
            if (current_control_type == 3 && mouse_point) {
                control_sp.x = control_sp.y = 0;
                control_sp_c.graphics.clear();
                //1.舞台一半
                control_sp_c.graphics.lineStyle(1, 0x00ff00, .2);
                control_sp_c.graphics.moveTo(Main.stageWidth / 2, 0);
                control_sp_c.graphics.lineTo(Main.stageWidth / 2, Main.stageHeight);
                control_sp_c.graphics.moveTo(0, Main.stageHeight / 2);
                control_sp_c.graphics.lineTo(Main.stageWidth, Main.stageHeight / 2);
                control_sp_c.graphics.endFill();
                //2.显示区域--矩形区域
                //内容显示
                control_sp.graphics.clear();
                var str = "<font color='#0099CC'>坐标 </font>" + mouse_point.x + " x " + mouse_point.y + " | ";
                if (Math.abs(c_point.x - mouse_point.x) > 1 && Math.abs(c_point.y - mouse_point.y) > 1) {
                    var w = Math.floor(((c_point.x - mouse_point.x) * 100) / 100);
                    var h = Math.floor(((c_point.y - mouse_point.y) * 100) / 100);
                    control_sp.graphics.beginFill(0x0066FF, .2);
                    control_sp.graphics.lineStyle(1, 0xffff00, 1);
                    control_sp.graphics.drawRect(mouse_point.x, mouse_point.y, w, h);
                    control_sp.graphics.endFill();
                    str += "<font color='#0099CC'>宽高 </font>" + w + " x " + h + " | ";
                }
                else {
                    //对称填充
                    control_sp.graphics.lineStyle(1.1, 0xffff00, 1);
                    control_sp.graphics.moveTo(c_point.x, 0);
                    control_sp.graphics.lineTo(c_point.x, Main.stageHeight);
                    control_sp.graphics.moveTo(Main.stageWidth - c_point.x, 0);
                    control_sp.graphics.lineTo(Main.stageWidth - c_point.x, Main.stageHeight);
                    control_sp.graphics.moveTo(0, c_point.y);
                    control_sp.graphics.lineTo(Main.stageWidth, c_point.y);
                    control_sp.graphics.moveTo(0, Main.stageHeight - c_point.y);
                    control_sp.graphics.lineTo(Main.stageWidth, Main.stageHeight - c_point.y);
                    var w = Math.abs(Math.floor((Main.stageWidth - c_point.x * 2) * 100) / 100);
                    var h = Math.abs(Math.floor((Main.stageHeight - c_point.y * 2) * 100) / 100);
                    str += "<font color='#0099CC'>中心宽高 </font>" + w + " x " + h + " | ";
                }
                control_view_txt.textFlow = (new egret.HtmlTextParser()).parser(str);
                control_view_txt.x = mouse_point.x + 5;
                control_view_txt.y = mouse_point.y - control_view_txt.height - 10;
                if (control_sp.x + control_view_txt.x + control_view_txt.width + 10 > Main.stageWidth) {
                    control_view_txt.x = Main.stageWidth - control_sp.x - control_view_txt.width - 10;
                }
                else if (control_sp.x + control_view_txt.x - 10 < 0) {
                    control_view_txt.x = 0 - control_sp.x + 10;
                }
                if (control_sp.y + control_view_txt.y + control_view_txt.height + 10 > Main.stageHeight) {
                    control_view_txt.x = Main.stageHeight - control_sp.y - control_view_txt.height - 10;
                }
                else if (control_sp.y + control_view_txt.y - 10 < 0) {
                    control_view_txt.y = 0 - control_sp.y + 10;
                }
                control_sp.graphics.beginFill(0x2F3239);
                control_sp.graphics.lineStyle(0, 0x0066FF, 1);
                control_sp.graphics.drawRoundRect(control_view_txt.x - 5, control_view_txt.y - 5, control_view_txt.width + 10, control_view_txt.height + 10, 10, 10);
                control_sp.graphics.endFill();
            }
        }
        function add_sp() {
            remove_sp();
            control_sp = new egret.Sprite();
            scene.addChild(control_sp);
            control_sp_c = new egret.Sprite();
            control_sp.addChild(control_sp_c);
            control_view_txt = new egret.TextField();
            control_sp.addChild(control_view_txt);
            control_view_txt.size = 12;
            control_view_txt.textColor = 0xffffff;
        }
        function remove_sp() {
            scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, control_system_choose_view, null);
            document.removeEventListener("mousedown", control_system_mouse_down);
            document.removeEventListener("mousemove", control_system_mouse_move);
            document.removeEventListener("mouseup", control_system_mouse_up);
            if (control_sp) {
                control_view = null;
                scene.removeChild(control_sp);
                control_sp = null;
            }
        }
        function judge_view_type(str) {
            if (control_view && control_view["__types__"]) {
                for (var s in control_view["__types__"]) {
                    if (control_view["__types__"][s] == str) {
                        return true;
                    }
                }
            }
            return false;
        }
        function get_view_type() {
            if (control_view && control_view["__types__"]) {
                return control_view["__types__"][0];
            }
            return "";
        }
    };
    return MyConsole;
}());
__reflect(MyConsole.prototype, "MyConsole");
//# sourceMappingURL=AH_console.js.map