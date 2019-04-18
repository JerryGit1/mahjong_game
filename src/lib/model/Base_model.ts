/**
 * Created by 周鹏斌大王 on 2017-12-23.
 *
 * 基础model
 */
class Base_model extends egret.EventDispatcher{

    protected CONST:Const_model=Const_model.getInstance();//zpb:常量配置
    protected EVENT:Base_event_model;//zpb:自定义事件
    public constructor(){
        super();
    }
    /*批量设置属性*/
    public setParams(data){
        for(var i in data){
            this[i]=data[i];
        }
    }

    /****
     * 事件派发 model和他对应的 父级 （model,scene,view)
     * */
    private eventList=[];
    protected m_to_c_dis_event(eventName,data=null){
        this.dispatchEventWith(eventName,false,data);
    }
    public m_to_c_add_event(eventName,backFun,self){
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
    public m_to_c_remove_event(eventName,self=null,backFun=null){
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
    /*清理*/
    public clear(){
        /*清理事件*/
        for(var i in this.eventList){
            this.m_to_c_remove_event(this.eventList[i][0],this.eventList[i][2],this.eventList[i][1]);
        }
        this.eventList=null;
    }
}