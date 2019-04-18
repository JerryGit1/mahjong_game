import Tween = egret.Tween;
/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
class Location_view extends Base_view{

    //东南西北指向背景
    protected bg:egret.Bitmap;
    //高亮方向
    protected hand:egret.Bitmap;
    //第一人称方位
    protected self_position;
    //剩余牌
    protected pai_num_txt:egret.TextField;
    //倒计时文本
    protected clock_num_txt:egret.BitmapText;
    public constructor(){
        super();
        this.bg=this.set_bit_center("g_clockBg1");
        this.addChild(this.bg);
        this.hand=new egret.Bitmap();
        this.hand.texture = RES.getRes("g_clock_east");
        this.hand.anchorOffsetX=this.hand.width/2;
        this.hand.anchorOffsetY=this.hand.height/2;
        this.addChild(this.hand);

        this.clock_num_txt=new egret.BitmapText();
        this.clock_num_txt.font = RES.getRes("g_clock_num");
        this.clock_num_txt.letterSpacing=-3;
        this.addChild(this.clock_num_txt);
        this.clock_num_txt.x=-17;
        this.clock_num_txt.y=-20;
    }
    /*更新风向旋转 不同玩家风向不同*/
    public set_rotation(position){
        this.self_position=position;
        this.bg.texture = RES.getRes("g_clockBg"+position);
    }
    /*系统剩余牌显示*/
    public update_residue_card_num(str){
        if(!this.pai_num_txt){
            this.pai_num_txt=new egret.TextField();
            this.addChild(this.pai_num_txt);
            this.pai_num_txt.x=-this.width/2;
            this.pai_num_txt.width=this.width;
            this.pai_num_txt.textAlign="center";
            this.pai_num_txt.size=16;
            this.pai_num_txt.y=65;
            this.pai_num_txt.size=17;
            this.pai_num_txt.textColor=0x063532;
            this.pai_num_txt.stroke=1;
            this.pai_num_txt.strokeColor=0x6ca7a1;
        }
        if(str)this.pai_num_txt.text="剩余牌数:"+str;
    }
    //更新出牌指针方向
    public update_hand(position){//当前出牌的用户相对方位
        switch (this.self_position){
            case 1:
                this.hand.texture = RES.getRes("g_clock_east"+position);
                break;
            case 2:
                this.hand.texture = RES.getRes("g_clock_south"+position);
                break;
            case 3:
                this.hand.texture = RES.getRes("g_clock_west"+position);
                break;
            case 4:
                this.hand.texture = RES.getRes("g_clock_north"+position);
                break;
            default:
                this.stop_count_down();
                MyConsole.getInstance().trace("重大失误 更新当前操作人风向时 玩家自己方位没确认呢",0);
                return;
        }
        if(this.hand){
            Tween.removeTweens(this.hand);
            this.hand.alpha=1;
            this.hand.anchorOffsetX=this.hand.width/2;
            this.hand.anchorOffsetY=this.hand.height/2;
        }
        this.start_count_down();
    }
    private timer;
    private start_count_down(){
        var num=10;
        this.stop_count_down(num+"");
        this.timer=setInterval(function () {
            if(num>0){
                this.clock_num_txt.text=num<10?("0"+num):num;
                if(num==3){
                    //倒计时提示
                    egret.Tween.get(this.hand,{loop:true}).to({alpha:0.5},300).wait(100).to({alpha:1},300);//,{"loop":true}
                }
                num--;
            }else{
                this.stop_count_down();
            }
        }.bind(this),1000);
    }
    private stop_count_down(str="00"){
        this.clock_num_txt.text=str;
        clearInterval(this.timer);
    }
}