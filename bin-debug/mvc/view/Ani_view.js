var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Ani_view = (function (_super) {
    __extends(Ani_view, _super);
    function Ani_view() {
        var _this = _super.call(this) || this;
        _this.chat_texts = [
            "大家好，很高兴见到各位",
            "快点吧，我等的花都谢了",
            "跟你合作真是太愉快了",
            "你的牌打的太好了",
            "哎呀，一不小心就胡了",
            "怎么又断线了，网络怎么这么差呀"
        ];
        return _this;
    }
    //开场动画
    Ani_view.prototype.start_ani = function (back_fun) {
        Sound_model.playSoundEffect("game_start");
        //票几个字？？
        //播个声音???
        if (back_fun)
            back_fun();
    };
    //开混动画
    Ani_view.prototype.kai_hun_ani = function (hunPai_model, back_fun) {
        Sound_model.playSoundEffect("g_kaihun");
        this.clear_max_tips_card();
        this.max_tips_card = new egret.Sprite();
        this.addChild(this.max_tips_card);
        var bg = this.set_bit_center("g_max_bg");
        this.max_tips_card.addChild(bg);
        hunPai_model.view_position = 1; //固定显示1号玩家牌形式
        var card = new Base_card_view(hunPai_model, 80);
        this.max_tips_card.addChild(card);
        this.max_tips_card.x = Main.stageWidth / 2;
        this.max_tips_card.y = this.CONST.LOCATION_POINT.y;
        card.x = -37;
        card.y = -55;
        this.max_tips_card.scaleX = this.max_tips_card.scaleY = .3;
        egret.Tween.get(this.max_tips_card).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).to({
            x: 36,
            y: 110,
            scaleX: .7,
            scaleY: .7
        }, 800).call(function () {
            this.clear_max_tips_card();
            if (back_fun)
                back_fun();
        }, this);
    };
    //开局-补花动画
    Ani_view.prototype.start_flower_ani = function (ani_info) {
        for (var i in ani_info.ani_list) {
            var info = ani_info.ani_list[i];
            var point;
            switch (Number(info.position)) {
                case 1:
                    point = new egret.Point(Main.stageWidth / 2, Main.stageHeight / 2 + 150);
                    break;
                case 2:
                    point = new egret.Point(Main.stageWidth - 200, Main.stageHeight / 2);
                    break;
                case 3:
                    point = new egret.Point(Main.stageWidth / 2, Main.stageHeight / 2 - 150);
                    break;
                case 4:
                    point = new egret.Point(200, Main.stageHeight / 2);
                    break;
            }
            if (info.is_ani) {
                var ani_detail = {
                    position: info.position,
                    gender: info.gender,
                    type: this.CONST.PLAYER_ACTION.hua
                };
                this.cpgh_ani(ani_detail);
            }
        }
        ani_info.back_func();
    };
    //提示出牌动画
    Ani_view.prototype.tips_send_card_ani = function () {
        var tips_txt = new egret.TextField();
        this.addChild(tips_txt);
        tips_txt.textFlow = (new egret.HtmlTextParser()).parse("<font color='#D3820D' size='35'> 双击</font><font size='26'> 或 </font><font color='#D3820D' size='35'>拖动 </font><font size='26'>一张牌可打出</font> ");
        tips_txt.x = Main.stageWidth * .56;
        tips_txt.y = Main.stageHeight - this.CONST.SELF_CARD_HEIGHT - 40;
        var tips_icon = this.set_bit_center("g_send_card_tips");
        this.addChild(tips_icon);
        tips_icon.x = tips_txt.x - tips_icon.width / 2;
        var vy = tips_icon.y = tips_txt.y + 80;
        tips_icon.alpha = 0;
        egret.Tween.get(tips_icon).
            to({ alpha: 1 }, 100).
            to({ scaleX: .8, scaleY: .8 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).to({ scaleX: .8, scaleY: .8 }, 200).
            to({ y: vy - 100, x: tips_icon.x - 20 }, 400).wait(500).to({ alpha: 0 }, 100).call(function () {
            this.removeChild(tips_icon);
            this.removeChild(tips_txt);
        }, this);
    };
    //玩家出牌动画
    Ani_view.prototype.game_user_send_card = function (info) {
        var card = new Base_card_view(info.card_model, info.card_w);
        this.addChild(card);
        card.x = info.play_point.x;
        card.y = info.play_point.y;
        egret.Tween.get(card).to({
            x: info.stop_point.x,
            y: info.stop_point.y,
            scaleX: .6, scaleY: .6
        }, 340).call(function () {
            setTimeout(function () {
                Sound_model.playSoundEffect("g_luopai"); //落牌音效
            }.bind(this), 200);
            this.removeChild(card);
            info.back_fun();
            card = null;
        }, this);
        //zwb:添加 出牌语音提示
        var card_url = this.CONST.SOUND_PATH_CARD;
        if (Number(info.gender) == 1) {
            card_url += "1/";
            Sound_model.playSoundEffect(card_url + "b_c_" + info.card_model.act_code);
        }
        else {
            card_url += "2/";
            Sound_model.playSoundEffect(card_url + "g_c_" + info.card_model.act_code);
        }
    };
    Ani_view.prototype.game_max_card_tips = function (info) {
        this.clear_max_tips_card();
        if (info) {
            this.max_tips_card = new egret.Sprite();
            this.addChild(this.max_tips_card);
            this.max_tips_timer = setTimeout(function () {
                if (!this.max_tips_card)
                    return;
                var bg = this.set_bit_center("g_max_bg");
                this.max_tips_card.addChild(bg);
                bg.y = 49;
                bg.x = -1;
                //var position=info.max_card_model.view_position;实际风向 以后用
                info.max_card_model.view_position = 1; //固定显示1号玩家牌形式
                var card = new Base_card_view(info.max_card_model, bg.width * .7);
                this.max_tips_card.addChild(card);
                this.max_tips_card.x = info.max_point.x;
                card.anchorOffsetX = card.w / 2;
                this.max_tips_card.y = info.max_point.y - card.height / 2;
                if (info.remove_time > 0) {
                    this.max_tips_timer = setTimeout(function () {
                        this.clear_max_tips_card();
                    }.bind(this), info.remove_time);
                }
            }.bind(this), 1000);
        }
    };
    Ani_view.prototype.clear_max_tips_card = function () {
        clearTimeout(this.max_tips_timer);
        if (this.max_tips_card) {
            egret.Tween.removeTweens(this.max_tips_card);
            this.removeChild(this.max_tips_card);
            this.max_tips_card = null;
        }
    };
    //吃碰杠胡过动画
    Ani_view.prototype.cpgh_ani = function (info) {
        /*---------------坐标---------------*/
        var point;
        switch (Number(info.position)) {
            case 1:
                point = new egret.Point(Main.stageWidth / 2, Main.stageHeight / 2 + 150);
                break;
            case 2:
                point = new egret.Point(Main.stageWidth - 200, Main.stageHeight / 2);
                break;
            case 3:
                point = new egret.Point(Main.stageWidth / 2, Main.stageHeight / 2 - 150);
                break;
            case 4:
                point = new egret.Point(200, Main.stageHeight / 2);
                break;
        }
        //zwb:添加cpgh 语音提示
        /*---------------动作---------------*/
        var action = Number(info.type);
        /*-----------------声音-------------------*/
        //根据性别-区分动作-提示音效
        var gender = "1/b_cpgh_";
        if (Number(info.gender) != 1) {
            gender = "2/g_cpgh_";
        }
        /*----------------动画图片-----------------*/
        if (info.type != this.CONST.PLAYER_ACTION.guo) {
            var target;
            var target_1;
            var scale = 1.6;
            var str = "g_cpgh_ani_" + info.type;
            var action_sound_url = this.CONST.SOUND_PATH_CARD + gender + action; //声音路径+性别+动作
            switch (info.type) {
                case this.CONST.PLAYER_ACTION.peng:
                    scale = 1.7;
                    break; //碰
                case this.CONST.PLAYER_ACTION.gang:
                case this.CONST.PLAYER_ACTION.an_gang:
                    // case this.CONST.PLAYER_ACTION.zhang_mao:
                    str = "g_cpgh_ani_" + this.CONST.PLAYER_ACTION.gang;
                    action_sound_url = this.CONST.SOUND_PATH_CARD + gender + "" + this.CONST.PLAYER_ACTION.gang; //声音路径+性别+动作
                    scale = 1.9;
                    break; //杠
                case this.CONST.PLAYER_ACTION.hu:
                    str += "_" + info.hu_base_type;
                    scale = 2.2;
                    var huType = Number(info.hu_base_type);
                    if (info.position == 1)
                        action_sound_url += "_" + huType + "_as"; //自摸-自己听到-胡的就是这张
                    else
                        action_sound_url += "_" + huType; //自摸-别人听到-不好意思自摸了
                    break; //胡
                case this.CONST.PLAYER_ACTION.guo:
                    if (info.position != 1)
                        action_sound_url = "";
                    if (info.back_fun)
                        info.back_fun();
                    return; //过
            }
            target = this.set_bit_center(str);
            target_1 = this.set_bit_center(str);
            target_1.x = target.x = point.x;
            target_1.y = target.y = point.y;
            target_1.alpha = 0;
            target.scaleX = target.scaleY = .8;
            target_1.scaleX = target_1.scaleY = .7;
            this.addChild(target);
            this.addChild(target_1);
            /*2.1.4新增*/
            egret.Tween.get(target).to({ scaleX: 1.2, scaleY: 1.2 }, 100).wait(300).to({ scaleX: .7, scaleY: .7 }, 200).wait(100).call(function () {
                target_1.alpha = 1;
                egret.Tween.get(target).wait(300).to({ alpha: 0 }, 100);
                egret.Tween.get(target_1).to({ scaleX: scale, scaleY: scale, alpha: 0 }, 400).call(function () {
                    this.removeChild(target_1);
                    this.removeChild(target);
                    if (info.back_fun)
                        info.back_fun();
                    info = null;
                }, this);
            }, this);
            if (action_sound_url)
                Sound_model.playSoundEffect(action_sound_url); //自己听到-过的声音
        }
    };
    //流局动画
    Ani_view.prototype.liu_ju_ani = function (info) {
        if (info.back_fun) {
            //播放动画
            var img_str = "g_liuju_ani";
            var start_game_img = this.set_bit_center(img_str);
            this.addChild(start_game_img);
            start_game_img.x = Main.stageWidth / 2;
            start_game_img.y = Main.stageHeight / 2 + start_game_img.height / 2;
            var mask_1 = new egret.Shape();
            mask_1.graphics.beginFill(0x00ff00);
            mask_1.graphics.drawRect(0, 0, start_game_img.width, start_game_img.height);
            this.addChild(mask_1);
            mask_1.x = Main.stageWidth / 2 - start_game_img.width / 2;
            mask_1.y = Main.stageHeight / 2 - start_game_img.height;
            start_game_img.mask = mask_1;
            var start_game_img_2 = this.set_bit_center(img_str);
            this.addChild(start_game_img_2);
            start_game_img_2.x = Main.stageWidth / 2;
            start_game_img_2.y = Main.stageHeight / 2 - start_game_img_2.height / 2;
            var mask_2 = new egret.Shape();
            mask_2.graphics.beginFill(0x00ff00);
            mask_2.graphics.drawRect(0, 0, start_game_img.width, start_game_img.height);
            this.addChild(mask_2);
            mask_2.x = Main.stageWidth / 2 - start_game_img.width / 2;
            mask_2.y = Main.stageHeight / 2;
            start_game_img_2.mask = mask_2;
            egret.Tween.get(start_game_img_2).to({ y: Main.stageHeight / 2 }, 600).wait(900).to({ alpha: 0 }, 300);
            egret.Tween.get(start_game_img).to({ y: Main.stageHeight / 2 }, 600).wait(900).to({ alpha: 0 }, 300).call(function () {
                this.removeChild(start_game_img);
                start_game_img = null;
                this.removeChild(start_game_img_2);
                start_game_img_2 = null;
                this.removeChild(mask_2);
                mask_2 = null;
                this.removeChild(mask_1);
                mask_1 = null;
                info.back_fun();
            }, this);
        }
    };
    //杠分数动画
    Ani_view.prototype.score_ani = function (info) {
        if (info) {
            var arr = [];
            for (var i in info.list) {
                var score = info.list[i].score;
                var pos = this.CONST.WAIT_TIP_POS[info.list[i].position - 1];
                var score_txt = new egret.TextField();
                score_txt.size = 35;
                score_txt.x = pos.x;
                score_txt.y = pos.y;
                score_txt.bold = true;
                if (score > 0) {
                    score_txt.text = "+" + score;
                    score_txt.textColor = 0x7CEC0C;
                }
                else if (score < 0) {
                    score_txt.text = score + "";
                    score_txt.textColor = 0xE81315;
                }
                else {
                    score_txt.text = "0";
                }
                this.addChild(score_txt);
                score_txt.anchorOffsetX = score_txt.width / 2;
                score_txt.anchorOffsetY = score_txt.height / 2;
                score_txt.alpha = 0;
                this.addChild(score_txt);
                arr.push(score_txt);
                var tween = egret.Tween.get(score_txt).to({ alpha: 1 }, 500).wait(1200).to({ alpha: 0, y: pos.y - 40 }, 500);
                if (Number(i) == 0) {
                    tween.call(function () {
                        for (var s in arr) {
                            this.removeChild(arr[s]);
                        }
                        if (info.back_fun)
                            info.back_fun();
                    }, this);
                }
            }
        }
    };
    //播放聊天动画;
    Ani_view.prototype.show_chat_ani = function (info) {
        var gender = info.gender; //性别;
        var type = info.type; //类型;
        var pos = info.point; //位置;
        var index = info.idx - 1;
        //文字;
        if (type == 2) {
            var chat_sp = new egret.Sprite();
            this.addChild(chat_sp);
            var text_bg = new egret.Bitmap(RES.getRes("g_chat_grayBg"));
            chat_sp.addChild(text_bg);
            var text = this.addTextAni(this.chat_texts[index]);
            chat_sp.addChild(text);
            text_bg.scale9Grid = new egret.Rectangle(40, 18, 186, 35);
            text_bg.width = text.width + 60;
            text_bg.anchorOffsetX = text_bg.width / 2;
            text.x = -text.width / 2;
            text.y = text_bg.height / 2 - 22;
            chat_sp.y = pos.y - 40;
            //当是右边的时候;
            if (pos.x > Main.stageWidth / 2) {
                text_bg.scaleX = -1;
                chat_sp.x = pos.x - chat_sp.width / 2 - 40;
            }
            else {
                chat_sp.x = pos.x + chat_sp.width / 2 + 40;
            }
            //秒以后删除;
            setTimeout(function () {
                this.removeChild(chat_sp);
                text_bg = null;
                text = null;
                chat_sp = null;
            }.bind(this), 2000);
        }
        else if (type == 3) {
            var face_pos;
            face_pos = { x: pos.x, y: pos.y };
            // if(pos.x>Main.stageWidth/2){
            //     face_pos={x:pos.x-110,y:pos.y-30};
            // }
            this.playFaceAni(index, face_pos);
        }
        //zwb:添加聊天文字音效
        if (type == 2) {
            Sound_model.stopAllBackEffect();
            var sound_url = "chat/";
            if (gender == 1) {
                sound_url += "1/";
                Sound_model.playSoundEffect(sound_url + "b_chat_sp" + info.idx);
            }
            else {
                sound_url += "2/";
                Sound_model.playSoundEffect(sound_url + "g_chat_sp" + info.idx);
            }
        }
    };
    //文字
    Ani_view.prototype.addTextAni = function (str) {
        var phoneTxt = new egret.TextField();
        phoneTxt.size = 24;
        phoneTxt.textColor = 0xffffff;
        phoneTxt.textAlign = "left";
        phoneTxt.verticalAlign = "middle";
        phoneTxt.multiline = true;
        phoneTxt.fontFamily = "微软雅黑";
        phoneTxt.text = str;
        return phoneTxt;
    };
    //表情;
    Ani_view.prototype.playFaceAni = function (num, point) {
        var texture = RES.getRes("face_" + num);
        var face = new egret.Bitmap(texture);
        face.anchorOffsetX = face.width / 2;
        face.anchorOffsetY = face.height / 2;
        egret.Tween.get(face).to({ alpha: 1 }, 300).to({ scaleY: .9, scaleX: 1.05 }, 300).to({ scaleY: .9 }, 70)
            .to({ scaleY: 1.1, scaleX: .95 }, 100).to({ scaleY: 1, scaleX: 1 }, 90)
            .to({ scaleY: .9 }, 50).to({ scaleY: 1.08, scaleX: .97 }, 100)
            .to({ scaleY: 1, scaleX: 1 }, 100).wait(1500).to({ alpha: 0 }, 300).call(function () {
            this.removeChild(face);
        }, this);
        face.x = point.x;
        face.y = point.y;
        this.addChild(face);
    };
    //清空
    Ani_view.prototype.clear_ani_scene = function () {
        this.clear_max_tips_card(); //清理大牌提示 要不回大厅还会出现
        var num = this.numChildren;
        egret.Tween.removeAllTweens();
        for (var i = 0; i < num - 1; i++) {
            if (this.getChildAt(0)) {
                this.removeChildAt(0);
            }
        }
        MyConsole.getInstance().trace("ani_control-----动画层清理完毕", 6);
    };
    return Ani_view;
}(Base_view));
__reflect(Ani_view.prototype, "Ani_view");
//# sourceMappingURL=Ani_view.js.map