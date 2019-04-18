/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 基础场景
 * 1.有一个自己的model
 *
 */
class Base_control extends egret.EventDispatcher{
    /*zpb:1-----常量*/
    protected CONST:Const_model=Const_model.getInstance();//zpb:常量配置
    protected EVENT:Base_event_model;//zpb:自定义事件

    /*zpb:2-----同层 control 共享*/
    private static ani;
    private static popup;
    /*zpb:3-----*/
    protected model:Scene_model;//场景 model
    protected view:Base_view;//基础 view

    public constructor(model,view){
        super();
        this.model=model;
        this.view=view;
    }
    //自定义事件，从父级添加视图
    public add_view(){
        if(this.view)this.c_to_c_dis_event(this.EVENT.base.parent_add_view,this.view);
    }
    //自定义事件，从父级移除视图
    public remove_view(){
        if(this.view){
            this.view.clear();
            this.c_to_c_dis_event(this.EVENT.base.parent_remove_view,this.view);
        }
        this.view=null;
    }
    /*zpb:添加子类 view*/
    protected add_child_view(c_view){
        if(this.view&&c_view){
            this.view.addChild(c_view);
        }
    }
    // 删除子类 view
    protected remove_child_view(c_view){
        if(this.view&&c_view){
            this.view.removeChild(c_view);
            c_view=null;
        }
    }
    /***
     * zpb:2-----派发事件 model和model之间
     * 事件广播
     * 场景之间的事件不用移除侦听 一般一直存在
     * */
    protected static model_dispatch_model:egret.EventDispatcher=new egret.EventDispatcher();
    protected c_to_c_event_radio(eventName,data=null){//普通的接口的派发
        Base_control.model_dispatch_model.dispatchEventWith(eventName,false,data);
    }
    private radio_event=[];
    protected c_to_c_add_radio_event(eventName,backFun,self){//普通的接受
        this.radio_event.push([eventName,fun,self]);
        Base_control.model_dispatch_model.addEventListener(eventName,fun,self);
        function fun(e) {
            /***
             * 第一参数 是数据
             * 第二个是  接口类型
             * */
            backFun=backFun.bind(self);
            backFun(e.data,eventName);
        }
    }
    /****
     * 事件派发 model和他对应的 父级 （model,scene,view)
     * */
    private eventList=[];
    protected c_to_c_dis_event(eventName,data=null){
        this.dispatchEventWith(eventName,false,data);
    }
    public c_to_c_add_event(eventName,backFun,self){
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
    public c_to_c_remove_event(eventName,self=null,backFun=null){
        if(!backFun){//单个移除
            var i=this.eventList.length-1;
            for(i;i>=0;i--){
                if(eventName==this.eventList[i][0]){
                    this.removeEventListener(this.eventList[i][0],this.eventList[i][1],this.eventList[i][2]);
                    this.eventList.splice(i,1);
                }
            }
        }else{//循环移除
            this.removeEventListener(eventName,backFun,self);
        }
    }
}