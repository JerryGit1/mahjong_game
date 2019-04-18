/**
 * Created by 周鹏斌大王 on 2018-03-29.
 */
class Club_base_model extends Base_model{

    public exState;//1 是俱乐部成员 2不是俱乐部成员  5俱乐部创建人

    public clubId;

    public clubName;//俱乐部名称

    public clubUserName;//创建人

    public allNums;//当前人数

    public freeStart;

    public freeEnd;

    public createTimer;//创建时间 还没有

    public clubMoney;//剩余房卡库存

    public cardQuota;//房卡限额

    public used;//经消耗的房卡数

    public juNum;//今日开局数

    public actNum;//活跃人数
}