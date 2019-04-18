var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
var User1_card_view = (function (_super) {
    __extends(User1_card_view, _super);
    function User1_card_view(model) {
        var _this = _super.call(this, model) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        //出牌边界
        _this.send_card_max_Y = Math.floor(Main.stageHeight - _this.CONST.SELF_CARD_HEIGHT * 1.5);
        //是否经过发牌动画
        _this._is_send_card_ani = false;
        //拖动----第二种出牌方式
        _this.begin_point = new egret.Point();
        _this.stop_card_w = _this.CONST.CARD_INFO.base_stop_w_p1;
        _this.stop_cpg_card_w = Math.floor(_this.stop_card_w * .8);
        _this.stop_start_point = new egret.Point(10, Main.stageHeight);
        _this.stop_card_dis = Math.floor(_this.stop_card_w * .9);
        _this.play_card_w = Math.floor(_this.stop_card_w * .7);
        _this.model.max_play_card_point.x = Main.stageWidth / 2;
        _this.model.max_play_card_point.y = Main.stageHeight * .7;
        //回放出牌坐标  出牌动画信息
        _this.model.send_stop_card_info.w = _this.stop_card_w;
        _this.model.send_stop_card_info.x = Main.stageWidth / 2;
        _this.model.send_stop_card_info.y = Main.stageHeight - 150;
        return _this;
    }
    //----------------------第一大块 桌牌手牌显示-------------------------------------------------------------------------
    //发牌动画
    User1_card_view.prototype.send_card_ani = function (back_fun) {
        this.update_cpg_stop_card();
        var card_model, card_view, self = this;
        var num = 0; //0 1 2 3
        var card_num;
        var timer = setInterval(function () {
            if (num <= 3) {
                if (num == 0) {
                    Sound_model.playSoundEffect("g_send_card"); //发牌音效
                }
                //添加
                add_group_card(num);
            }
            else if (num >= 4) {
                clearInterval(timer);
                self._is_send_card_ani = true;
                if (back_fun)
                    back_fun();
            }
            num++;
        }, 600);
        function add_group_card(group_num) {
            for (var i = 0; i < 4; i++) {
                card_model = self.model.stop_card[i + group_num * 4];
                if (card_model) {
                    card_view = new Base_card_view(card_model, self.stop_card_w);
                    self.addChild(card_view);
                    self.set_base_stop_card_view_point(card_view, i + (group_num * 4));
                    self.base_stop_card_list.push(card_view);
                    card_view.touchEnabled = false;
                    card_view.update_bg_ani();
                }
            }
        }
    };
    //渲染全部桌牌
    User1_card_view.prototype.set_play_cards_point = function () {
        var arr = [6, 8, 10, 12];
        var play_card_dis_w = Math.floor(this.play_card_w * .78);
        var play_card_dis_h = Math.floor(this.play_card_w * .78);
        for (var i in arr) {
            var num = arr[i], vx = Main.stageWidth / 2 - (num * play_card_dis_w / 2), point;
            for (var s = 0; s < num; s++) {
                point = new egret.Point();
                point.x = vx + s * play_card_dis_w;
                point.y = Number(i) * play_card_dis_h + this.CONST.LOCATION_POINT.y + 90;
                this.play_cards_point.push(point);
            }
        }
    };
    //更新吃碰杠的手牌
    User1_card_view.prototype.update_cpg_stop_card = function () {
        this.cpg_card_max_w = this.stop_start_point.x;
        _super.prototype.update_cpg_stop_card.call(this);
        //吃碰杠牌和基础手牌 间距
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            if (this.model.cpg_stop_card.length == 1 && Number(this.model.cpg_stop_card[0].action_code) == 125) {
                //只有一组吃碰杠的时候 东南西北杠最长的牌型 特殊处理
                this.cpg_card_max_w += 5;
            }
            else {
                this.cpg_card_max_w += 30;
            }
        }
    };
    //设置单组吃碰杠坐标
    User1_card_view.prototype.set_cpg_stop_card_view_point = function (card_view, i) {
        card_view.x = this.cpg_card_max_w;
        card_view.y = this.stop_start_point.y - card_view.h;
        this.cpg_card_max_w += (card_view.w + 10); //x轴偏移量
    };
    //设置单张手牌坐标
    User1_card_view.prototype.set_base_stop_card_view_point = function (card_view, i) {
        card_view.x = this.cpg_card_max_w + i * this.stop_card_dis;
        card_view.y = this.stop_start_point.y - card_view.h;
        card_view.initY = card_view.y;
        //系统牌间距
        if (this.model.last_action && this.model.last_action.type == this.CONST.PLAYER_ACTION.system_deal_card && i == this.model.stop_card.length - 1) {
            var y = card_view.y;
            card_view.y -= 60;
            card_view.alpha = 0;
            card_view.touchEnabled = false;
            card_view.rotation = -10;
            card_view.scaleX = card_view.scaleY = .8;
            if (!this._is_send_card_ani) {
                egret.Tween.get(card_view).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 150).to({ y: y + 5 }, 200).to({ y: y }, 30).call(function () {
                    card_view.touchEnabled = true;
                }, this);
            }
            else {
                card_view.scaleX = card_view.scaleY = 1;
                card_view.rotation = 0;
                card_view.alpha = 1;
                card_view.y = y;
                card_view.touchEnabled = true;
                this._is_send_card_ani = false;
            }
            if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
                if (this.model.cpg_stop_card.length == 1 && Number(this.model.cpg_stop_card[0].action_code) == 125) {
                    //只有一组吃碰杠的时候 东南西北杠最长的牌型 特殊处理
                    card_view.x += 20;
                }
                else {
                    card_view.x += 30;
                }
            }
            else {
                card_view.x += 30;
            }
        }
        //拖动相关
        card_view.initX = card_view.x;
        card_view.touchEnabled = true;
        card_view.graphics.beginFill(0x00ff00, 0);
        card_view.graphics.drawRect(0, 0, card_view.w, card_view.h);
        card_view.graphics.endFill();
        //牌点击
        card_view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stop_card_touch, this);
        //牌拖动
        card_view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stop_card_begin, this);
        /*对牌数量合理性做校验*/
        if (i == 0)
            if (this.model.current_action && this.model.current_action.length > 0
                && (this.model.current_action[0].type == this.CONST.PLAYER_ACTION.play_card ||
                    this.model.current_action[0].type == this.CONST.PLAYER_ACTION.an_gang ||
                    // this.model.current_action[0].type==this.CONST.PLAYER_ACTION.zhang_mao||
                    this.model.current_action[0].ming_gang_type == this.CONST.MING_GANG_TYPE.peng_gang //碰杠
                )) {
                if (this.model.stop_card.length % 3 - 2 != 0) {
                    MyConsole.getInstance().trace("重大失误[" + this.model.userName + "],牌不符合3n+2定律-num=" + this.model.stop_card.length, 0);
                }
            }
            else {
                if (this.model.stop_card.length % 3 - 1 != 0) {
                    MyConsole.getInstance().trace("重大失误[" + this.model.userName + "],牌不符合3n+1定律-num=" + this.model.stop_card.length, 0);
                }
            }
    };
    //tyq: 设置单张花牌的坐标
    User1_card_view.prototype.set_hua_card_point = function (card, i) {
        var start_X = this.CONST.HUA_CARD_START_POINT[0].x;
        var start_Y = this.CONST.HUA_CARD_START_POINT[0].y;
        card.x = start_X + this.CONST.HUA_CARD_DIS * i;
        card.y = start_Y;
    };
    //设置最新打出去的那张牌箭头提示坐标
    User1_card_view.prototype.set_new_play_card_point = function (card_view) {
        this.new_play_card_point = {
            x: card_view.x + this.play_card_w / 2,
            y: card_view.y
        };
    };
    //----------------------第一大块 打牌整体操作-------------------------------------------------------------------------
    //单击----第一种出牌方式
    User1_card_view.prototype.stop_card_touch = function (e) {
        if (this.cur_move_card_view)
            return;
        this.stop_card_end("click");
        var card = e.currentTarget;
        if (card.cur_touch_state == 0) {
            //其他牌恢复初始
            this.init_stop_card_type();
            card.cur_touch_state = 1;
            //桌牌和其他玩家桌牌高亮提示这张牌
            this.tips_current_card(card.code);
        }
        else if (card.cur_touch_state == 1) {
            //打出这张牌
            this.send_card(card);
        }
    };
    User1_card_view.prototype.stop_card_move = function (e) {
        if (this.cur_move_card_view) {
            var x = e.stageX, y = e.stageY;
            //这个策略规避 点击和出牌太相似 出现牌晃动情况
            if (this.cur_move_card_view.cur_touch_state != 3 && egret.Point.distance(this.begin_point, new egret.Point(x, y)) < 10)
                return;
            if (y > Main.stageHeight / 4) {
                this.cur_move_card_view.x = x - this.cur_move_card_view.w / 2;
                this.cur_move_card_view.y = y - this.cur_move_card_view.h / 2;
                this.cur_move_card_view.cur_touch_state = 3; //拖动中
            }
            else {
                this.cur_move_card_view.cur_touch_state = 0; //超出拖动区域还原位置
            }
        }
    };
    //按下
    User1_card_view.prototype.stop_card_begin = function (e) {
        if (this.cur_move_card_view)
            return;
        this.stop_card_end("begin");
        this.cur_move_card_view = e.currentTarget;
        this.addChild(this.cur_move_card_view); //提高层级
        //记录位置
        this.begin_point.x = e.stageX;
        this.begin_point.y = e.stageY;
        if (this._is_send_card) {
            //添加拖动区域遮罩
            this.add_move_mask();
            //注册移动事件
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stop_card_move, this);
            //消除顶层事件--解决牌拖到按钮那不动问题
            this.v_to_v_dis_event(this.EVENT.room.set_up_layer_touch_event, false);
        }
        //弹起事件
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.stop_card_end, this);
    };
    //结束/弹起
    User1_card_view.prototype.stop_card_end = function (e) {
        if (e === void 0) { e = null; }
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.stop_card_end, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stop_card_move, this);
        if (e != "clearCard" && this.cur_move_card_view && this.cur_move_card_view.cur_touch_state == 3) {
            if (this.cur_move_card_view.y < this.send_card_max_Y) {
                this.send_card(this.cur_move_card_view);
            }
            else {
                this.cur_move_card_view.cur_touch_state = 0;
            }
            //消除顶层事件--解决牌拖到按钮那不动问题
            this.v_to_v_dis_event(this.EVENT.room.set_up_layer_touch_event, true);
        }
        this.cur_move_card_view = null;
    };
    //拖动区域遮罩
    User1_card_view.prototype.add_move_mask = function () {
        if (!this.touchEnabled) {
            this.touchEnabled = true;
            this.graphics.clear();
            this.graphics.beginFill(0x111111, 0);
            this.graphics.drawRect(0, 0, Main.stageWidth, Main.stageHeight);
            this.graphics.endFill();
        }
    };
    /*----------------确认打出一张牌------------*/
    //自动出牌
    User1_card_view.prototype.auto_send_card = function () {
        setTimeout(function () {
            this._is_send_card = true;
            var len = this.base_stop_card_list.length - 1;
            this.send_card(this.base_stop_card_list[len]);
        }.bind(this), 500);
    };
    User1_card_view.prototype.send_card = function (card) {
        if (this._is_send_card) {
            if (!card.hun) {
                if (this.model.check_is_hun(card.code)) {
                    card.cur_touch_state = 0;
                    return;
                }
                //发起出牌动作
                this.model.send_stop_card_info.x = card.x;
                this.model.send_stop_card_info.y = card.y;
                this.model.send_stop_card_info.w = card.w;
                this.v_to_v_dis_event(this.EVENT.room.self_send_card, {
                    act_code: card.code,
                    point: { x: card.x, y: card.y }
                });
                card.visible = false;
            }
            else {
                card.cur_touch_state = 0;
            }
        }
        else {
            card.cur_touch_state = 0;
        }
        //桌牌和其他玩家桌牌高亮提示这张牌--取消
        this.tips_current_card(null);
        //消除顶层事件--解决牌拖到按钮那不动问题
        this.v_to_v_dis_event(this.EVENT.room.set_up_layer_touch_event, true);
    };
    /*恢复所有牌 初始状态*/
    User1_card_view.prototype.init_stop_card_type = function () {
        //先恢复所有牌状态
        for (var i in this.base_stop_card_list) {
            this.base_stop_card_list[i].cur_touch_state = 0;
        }
    };
    //高亮提示点击的牌
    User1_card_view.prototype.tips_current_card = function (code) {
        this.v_to_v_dis_event(this.EVENT.room.tips_self_choose_base_stop_card_num, code);
    };
    //提示手牌中参与吃碰杠的牌
    User1_card_view.prototype.tip_current_action_cpg_card = function (_is) {
        if (_is === void 0) { _is = false; }
        _super.prototype.tip_current_action_cpg_card.call(this, _is);
        if (_is) {
            var tips_card_code_list = this.model.get_current_action_cpg_card_list(), card_view;
            if (tips_card_code_list) {
                //只提示符合的其中一张就行
                for (var i in tips_card_code_list) {
                    for (var s in this.base_stop_card_list) {
                        card_view = this.base_stop_card_list[s];
                        if (tips_card_code_list[i] == card_view.code) {
                            card_view.set_jian_tou_icon(true);
                            break;
                        }
                    }
                }
            }
        }
    };
    return User1_card_view;
}(Base_user_card_view));
__reflect(User1_card_view.prototype, "User1_card_view");
//# sourceMappingURL=User1_card_view.js.map