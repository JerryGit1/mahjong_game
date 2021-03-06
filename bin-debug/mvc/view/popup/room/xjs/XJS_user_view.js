var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-05.
 * dj:小结算没改完--出冲包三家模式下被杠分不一样   =、=
 */
var XJS_user_view = (function (_super) {
    __extends(XJS_user_view, _super);
    function XJS_user_view(model, cover_gang) {
        var _this = _super.call(this, model) || this;
        _this.txt_x = 245;
        _this.gang = 0; //杠分
        _this.cover_gang = 0; //被杠分
        _this.model = model;
        _this.gang_list = cover_gang;
        //处理数据
        _this.gang_model();
        //头像
        _this.add_user_head();
        //牌
        _this.add_card_info();
        //分数
        _this.add_score_info();
        //胡类型
        _this.add_hu_type();
        //分割线
        _this.add_fg_line();
        //玩家自己输/赢角标提示
        if (_this.model.is_cur) {
            _this.add_bg();
        }
        //赢的玩家高亮提示
        _this.add_win_bg();
        return _this;
    }
    //杠，被杠数据处理
    XJS_user_view.prototype.gang_model = function () {
        //算杠分
        for (var i in this.model.cpg_stop_card) {
            for (var t = 91; t <= 126; t++) {
                if (t == Number(this.model.cpg_stop_card[i].action_code)) {
                    this.gang += (1 * 3);
                }
            }
            if (Number(this.model.cpg_stop_card[i].action_code) == -2) {
                this.gang += (2 * 3);
            }
        }
        //算被杠分
        // for(var o in this.gang_list){
        //     for(var g=91;g<=126;g++){
        //         if(g==Number(this.gang_list[o].action_code)){ //明杠时
        //             this.cover_gang+=1;
        //         }
        //     }
        //     if(Number(this.gang_list[o].action_code)==-2){ //暗杠时
        //         this.cover_gang+=2;
        //     }
        // }
        this.cover_gang = this.model.gangScore - this.gang;
        // this.cover_gang=Number(this.cover_gang)-Number(this.gang);
    };
    //玩家自己输/赢角标提示
    XJS_user_view.prototype.add_bg = function () {
        var sign_str = this.model.hu_type != 2 && this.model.hu_type != 0 ? "g_settle_self_sign_win" : "g_settle_self_sign_fail";
        var cur_user_sign = this.set_bit_center(sign_str);
        cur_user_sign.x = Main.stageWidth - cur_user_sign.width / 2;
        cur_user_sign.y = cur_user_sign.height / 2;
        this.addChild(cur_user_sign);
    };
    //赢的玩家高亮提示
    XJS_user_view.prototype.add_win_bg = function () {
        var bg_str;
        if (this.model.hu_type == 1) {
            if (this.model.is_cur) {
                bg_str = "g_settle_list_bg_win";
                //胡牌信息
                this.add_hu_info();
                //总花数
                var all_flower = new egret.TextField();
                all_flower.size = 20;
                all_flower.text = "总花数:" + this.model.hua_card.length;
                all_flower.x = 890;
                all_flower.y = 5;
                this.addChild(all_flower);
                //胡标识
                var hu_text = new egret.TextField();
                hu_text.size = 20;
                hu_text.text = "胡";
                hu_text.x = 530;
                hu_text.y = 5;
                this.addChild(hu_text);
            }
            else {
                bg_str = "g_settle_list_bg_fail";
                //胡牌信息
                this.add_hu_info();
                //总花数
                var all_flower = new egret.TextField();
                this.addChild(all_flower);
                all_flower.size = 20;
                all_flower.text = "总花数:" + this.model.hua_card.length;
                all_flower.x = 890;
                all_flower.y = 5;
                //胡标识
                var hu_text = new egret.TextField();
                this.addChild(hu_text);
                hu_text.size = 20;
                hu_text.text = "胡";
                hu_text.x = 530;
                hu_text.y = 5;
            }
        }
        else if (this.model.hu_type == 3) {
            bg_str = "g_settle_list_bg_win";
            //胡牌信息
            this.add_hu_info();
            //总花数
            var all_flower = new egret.TextField();
            all_flower.size = 20;
            all_flower.text = "总花数:" + this.model.hua_card.length;
            all_flower.x = 890;
            all_flower.y = 5;
            this.addChild(all_flower);
            //胡标识
            var hu_text = new egret.TextField();
            hu_text.size = 20;
            hu_text.text = "胡";
            hu_text.x = 530;
            hu_text.y = 5;
            this.addChild(hu_text);
        }
        else if (this.model.hu_type == 2) {
            //点炮-1
            var point = new egret.TextField();
            this.addChild(point);
            point.size = 20;
            point.text = "点炮";
            point.x = 530;
            point.y = 5;
        }
        else {
            bg_str = "";
        }
        var bg = this.set_bit_center(bg_str);
        bg.x = bg.width / 2;
        bg.y = bg.height / 2;
        this.addChildAt(bg, 0);
    };
    XJS_user_view.prototype.add_user_head = function () {
        //基础头像
        var base_head_view = new User_head_view();
        this.addChild(base_head_view);
        base_head_view.create_rect_head(70, 70, "head_bg");
        base_head_view.update_head_url(this.model.userImg);
        base_head_view.x = 73 - 10;
        base_head_view.y = 60;
        // //如果是自己，则弹出金色框;   zwb:alpha-1.1.0    alpha:1.1.4  删除
        // if(this.model.userId==this.CONST.USERID){
        //     var head_kuang=this.set_bit_center("g_cur_head");
        //     head_kuang.x=base_head_view.x;
        //     head_kuang.y=base_head_view.y;
        //     this.addChild(head_kuang);
        // }
        //庄
        if (this.model.zhuang) {
            var zhuang_icon = this.set_bit_center("g_zhuang");
            this.addChild(zhuang_icon);
            zhuang_icon.x = 36;
            zhuang_icon.y = 30;
        }
        //昵称
        var nick_name_txt = new egret.TextField();
        this.addChild(nick_name_txt);
        nick_name_txt.size = 23;
        nick_name_txt.text = this.model.userName;
        nick_name_txt.x = 120 - 10;
        nick_name_txt.y = 26 + 10;
        //ID
        var id_txt = new egret.TextField();
        this.addChild(id_txt);
        id_txt.size = 20;
        id_txt.text = "ID: " + this.model.userId;
        id_txt.x = 120 - 10;
        id_txt.y = 63 + 5;
        //杠分，被杠信息
        var bars_branch = new egret.TextField();
        this.addChild(bars_branch);
        bars_branch.size = 20;
        if (Number(this.cover_gang) == 0) {
            bars_branch.text = "杠+" + this.gang + "　被杠-" + this.cover_gang;
        }
        else {
            bars_branch.text = "杠+" + this.gang + "　被杠" + this.cover_gang;
        }
        bars_branch.x = 750;
        bars_branch.y = 5;
    };
    //添加胡牌信息
    XJS_user_view.prototype.add_hu_info = function () {
        var rule_txt = new egret.TextField();
        rule_txt.size = 20;
        rule_txt.text = this.model.hu_info_str;
        this.addChild(rule_txt);
        rule_txt.x = 560; //245;
        rule_txt.y = 5;
    };
    XJS_user_view.prototype.add_card_info = function () {
        this.stop_cpg_card_w = 45; //吃碰杠牌宽度
        this.stop_card_w = 55; //基础手牌宽度
        this.stop_card_dis = Math.floor(this.stop_card_w * .9); //基础手牌间距
        this.update_stop_card();
        this.update_hua_card();
    };
    //花牌更新
    XJS_user_view.prototype.update_hua_card = function () {
        //清理
        this.clear_hua_card();
        this.x_sk = 0;
        //更新花牌
        for (var i in this.model.hua_card) {
            var flower = this.set_bit_center("g_flower_" + this.model.hua_card[i].act_code);
            this.addChild(flower);
            this.set_hua_card_point(flower, i);
            this.hua_card_list.push(flower);
        }
        this.model.hua_card_is_change = false;
    };
    XJS_user_view.prototype.add_score_info = function () {
        //总分
        var hu_txt = new egret.TextField();
        this.addChild(hu_txt);
        hu_txt.size = 40;
        hu_txt.x = 1007 - 50;
        hu_txt.y = 46;
        if (Number(this.model.score) > 0) {
            hu_txt.text = "+" + this.model.score;
            hu_txt.textColor = 0x7CEC0C;
        }
        else if (Number(this.model.score) < 0) {
            hu_txt.text = this.model.score + "";
            hu_txt.textColor = 0xE81315;
        }
        else {
            hu_txt.text = "0";
        }
        hu_txt.bold = true;
    };
    XJS_user_view.prototype.add_hu_type = function () {
        if (this.model.hu_type) {
            var hu_icon = this.set_bit_center("g_xjs_h_" + this.model.hu_type);
            this.addChild(hu_icon);
            hu_icon.x = 1088;
            hu_icon.y = 63;
            hu_icon.rotation = -10;
        }
    };
    //分割线
    XJS_user_view.prototype.add_fg_line = function () {
        var dividingline = this.set_bit_center("g_dividingline");
        dividingline.x = Main.stageWidth / 2;
        dividingline.y = 113;
        this.addChild(dividingline);
    };
    //更新吃碰杠的手牌
    XJS_user_view.prototype.update_cpg_stop_card = function () {
        this.cpg_card_max_w = 244;
        _super.prototype.update_cpg_stop_card.call(this);
        //吃碰杠牌和基础手牌 间距
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            this.cpg_card_max_w += 10;
        }
    };
    //设置单组吃碰杠坐标
    XJS_user_view.prototype.set_cpg_stop_card_view_point = function (card_view, i) {
        card_view.x = this.cpg_card_max_w;
        card_view.y = 55;
        this.cpg_card_max_w += (card_view.w + 6); //x轴偏移量
    };
    //设置单张手牌坐标
    XJS_user_view.prototype.set_base_stop_card_view_point = function (card_view, i) {
        card_view.x = this.cpg_card_max_w + i * this.stop_card_dis;
        card_view.y = 33;
        //胡的那张牌
        if (this.model.hu_type == 1 || this.model.hu_type == 3) {
            if (i == this.model.stop_card.length - 1) {
                card_view.x += 10;
                card_view.add_hu_icon(); //显示混
            }
        }
    };
    //设置单张花牌
    XJS_user_view.prototype.set_hua_card_point = function (card, i) {
        card.x = 244 + i * this.CONST.HUA_CARD_DIS;
        card.y = 25;
        this.txt_x = card.x + this.CONST.HUA_CARD_DIS;
    };
    return XJS_user_view;
}(Base_user_card_view));
__reflect(XJS_user_view.prototype, "XJS_user_view");
//# sourceMappingURL=XJS_user_view.js.map