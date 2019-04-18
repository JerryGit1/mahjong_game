/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 基础view scene
 */
class Base_view extends egret.Sprite{
    protected CONST:Const_model;//zpb:常量配置
    protected EVENT:Base_event_model;//zpb:自定义事件
    public constructor(config=true){
        super();
        if(config){
            this.CONST=Const_model.getInstance();
        }
    }
    /*调整y坐标适配*/
    public set_point_y(sp){
        sp.y=sp.y/(Main.stageHeight/640);
    }
    /*创建一个居中的bit对象*/
    public set_bit_center(str,_isCenter=true){
        var bit=new egret.Bitmap(RES.getRes(str));
        if(_isCenter){
            bit.anchorOffsetX=bit.width/2;
            bit.anchorOffsetY=bit.height/2;
        }
        return bit;
    }

    /****
     * 事件派发 view和他对应的 父级 （scene,view)
     * */
    private eventList=[];
    protected v_to_v_dis_event(eventName,data?){
        this.dispatchEventWith(eventName,false,data);
    }
    public v_to_v_add_event(eventName,backFun,self){
        this.eventList.push([eventName,fun,self]);
        this.addEventListener(eventName,fun,self);
        function  fun(e){
            /***
             * 第一参数 是数据
             * 第二个是  接口类型
             * */
            backFun=backFun.bind(self);
            backFun(e.data,eventName);
        }
    }
    public v_to_v_remove_event(eventName,self=null,backFun=null){
        if(!backFun){
            //循环移除
            for(var i in this.eventList){
                if(eventName==this.eventList[i][0])
                    this.removeEventListener(this.eventList[i][0],this.eventList[i][1],this.eventList[i][2]);
            }
        }else{
            //单个移除
            this.removeEventListener(eventName,backFun,self);
        }
    }
    /*清理*/
    public clear(){
        /*清理事件*/
        for(var i in this.eventList){
            this.v_to_v_remove_event(this.eventList[i][0]);
        }
        this.eventList=null;
    }
    public test_point(sp,speed=2){
        document.addEventListener("keydown",function(e){
            switch (e.keyCode){
                case 39:
                    sp.x+=speed;
                    break;
                case 37:
                    sp.x-=speed;
                    break;
                case 38:
                    sp.y-=speed;
                    break;
                case 40:
                    sp.y+=speed;
                    break;
            }
            MyConsole.getInstance().trace(sp.x+"--------------()"+sp.y,5);
        });
    }
    //四号机----测试用
    public test_pos(view){
        view.touchEnabled=true;
    }
}
