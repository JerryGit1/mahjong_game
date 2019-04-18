var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zwb on 2018/4/17.
 * 俱乐部主页
 */
var Club_main_view = (function (_super) {
    __extends(Club_main_view, _super);
    function Club_main_view(list_info, pao_info_str) {
        if (pao_info_str === void 0) { pao_info_str = ""; }
        var _this = _super.call(this) || this;
        //按钮列表
        _this.btn_list_view = [];
        _this.content = new egret.Sprite(); //滚动容器
        _this.EVENT = new Game_club_event_model(); //事件常量   zwb:4-18 17:15
        //背景1
        var back = _this.set_bit_center("c_main_bg", false);
        _this.addChild(back);
        back.height = Main.stageHeight;
        //背景2
        back = _this.set_bit_center("c_m_bg");
        _this.addChild(back);
        back.scale9Grid = new egret.Rectangle(141, 76, 846, 462);
        back.width = Main.stageWidth * .98;
        back.height = 614;
        back.anchorOffsetX = 0;
        back.anchorOffsetY = back.height / 2;
        back.x = Main.stageWidth / 2 - back.width / 2;
        back.y = Main.stageHeight - back.height / 2 - 15;
        //按钮列表
        var b_w = 330; //按钮宽度
        var num = list_info.length; //按钮数量
        var b_d = num < 3 ? 100 : 20; //按钮间距
        var vx = Main.stageWidth / 2 - (b_w * num + (num - 1) * b_d) / 2 + b_w / 2;
        for (var i in list_info) {
            var btn = new Club_btn("c_b_" + ((Number(i) + 1) % 3 + 1), list_info[i]);
            _this.content.addChild(btn);
            _this.btn_list_view.push(btn);
            // btn.y=back.y+back.height/2-btn.height;
            btn.y = back.y + back.height / 2 - btn.height + 30;
            btn.x = vx - 55;
            if (num < 3) {
                vx += b_w + b_d;
            }
            else {
                btn.x = (btn.width / 2 + 20) * Number(i) + btn.width / 3 - 60;
            }
            btn["info"] = list_info[i];
            btn.addTouchEvent();
            btn.addEventListener("click", _this.add_clue_info, _this);
        }
        //滚动区域
        _this.myscrollView = new egret.ScrollView();
        _this.myscrollView.width = back.width - 60;
        _this.myscrollView.height = back.height - 120 + 30;
        _this.myscrollView.x = back.x + 30;
        _this.myscrollView.y = back.y - back.height / 2 + 80;
        _this.myscrollView.verticalScrollPolicy = "off";
        _this.myscrollView.bounces = false;
        if (num > 3) {
            _this.myscrollView.horizontalScrollPolicy = "on";
        }
        else {
            _this.myscrollView.horizontalScrollPolicy = "off";
        }
        _this.myscrollView.setContent(_this.content);
        _this.addChild(_this.myscrollView);
        // //背景图，用来展现ScrollView 的边界
        // var background:egret.Shape = new egret.Shape();
        // background.graphics.lineStyle(1,0x1102cc);
        // background.graphics.drawRect(back.x+30,back.y-back.height/2+80,back.width-80,back.height-120);
        // background.graphics.endFill();
        // this.addChild(background);
        //标题
        var title = _this.set_bit_center("c_m_title");
        _this.addChild(title);
        title.x = Main.stageWidth / 2;
        title.y = back.y - back.height / 2 + 62;
        if (title.y < title.height / 2) {
            title.y = title.height / 2;
        }
        else if (title.y > title.height / 2 + 50) {
            _this.add_notice_view(pao_info_str);
        }
        //返回按钮
        _this.back_btn = new MyButton("c_back_btn");
        _this.addChild(_this.back_btn);
        _this.back_btn.x = _this.back_btn.width * .7;
        _this.back_btn.y = _this.back_btn.height * .75;
        _this.back_btn.addTouchEvent();
        _this.back_btn.addEventListener("click", _this.back_hall, _this);
        return _this;
    }
    /*tyq: 跑马灯*/
    Club_main_view.prototype.add_notice_view = function (pao_info_str) {
        var notice_view = new Marquee_view();
        notice_view.x = Main.stageWidth * 0.5 - notice_view.width / 2;
        notice_view.set_text_pos(pao_info_str);
        notice_view.y = 10;
        this.addChild(notice_view);
    };
    //跳转俱乐部广场
    Club_main_view.prototype.add_clue_info = function (e) {
        var btn = e.target;
        if (btn.info.exState == 2) {
            this.v_to_v_dis_event(this.EVENT.club.float_alert, { "str": "您已申请离开该俱乐部，待审批中" });
        }
        else {
            this.v_to_v_dis_event(this.EVENT.club.cut_scene, e.target.info);
        }
    };
    //返回大厅
    Club_main_view.prototype.back_hall = function () {
        this.back_btn.clear();
        this.v_to_v_dis_event(this.EVENT.club.back_hall);
    };
    Club_main_view.prototype.clear = function () {
        this.back_btn.removeEventListener("click", this.back_hall, this);
        this.back_btn.clear();
        _super.prototype.clear.call(this);
    };
    return Club_main_view;
}(Base_view));
__reflect(Club_main_view.prototype, "Club_main_view");
//# sourceMappingURL=Club_main_view.js.map