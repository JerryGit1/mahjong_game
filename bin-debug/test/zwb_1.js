var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zwb on 2018/4/18.
 */
var Zwb_test_model_1 = (function () {
    function Zwb_test_model_1() {
    }
    return Zwb_test_model_1;
}());
Zwb_test_model_1.fields_analysis = {
    a: "user",
    b: "users"
};
Zwb_test_model_1.mainInfo = {
    currentUser: {
        "userId": "",
        "position": "风向",
        "score": "总分数",
        "state": "在线/离线状态 1/0",
        "playStatus": 1,
        "hasPuFen": "",
        "userName": "微信昵称",
        "userImg": "微信头像",
        "gender": "性别",
        "ip": "",
        "userAgree": "用户是否同意",
        "money": "用户当前余额",
        "notice": "系统公告(跑马灯)",
        "lastAction": [],
        "currAction": [],
        "pais": "[]",
        "chuList": "[]",
        "actionList": [] // 吃碰杠
    }
};
//获取我的俱乐部(主页)
Zwb_test_model_1.get_my_club_list = [
    {
        "clubId": "俱乐部1",
        "clubName": "俱乐部1",
        "clubUserName": "创建人",
        "allNums": "41",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    },
    {
        "clubId": "俱乐部2",
        "clubName": "俱乐部2",
        "clubUserName": "创建人",
        "allNums": "42",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    },
    {
        "clubId": "俱乐部3",
        "clubName": "俱乐部3",
        "clubUserName": "创建人",
        "allNums": "43",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    },
    {
        "clubId": "俱乐部4",
        "clubName": "俱乐部4",
        "clubUserName": "创建人",
        "allNums": "44",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    },
    {
        "clubId": "俱乐部5",
        "clubName": "俱乐部5",
        "clubUserName": "创建人",
        "allNums": "45",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    },
    {
        "clubId": "俱乐部6",
        "clubName": "俱乐部6",
        "clubUserName": "创建人",
        "allNums": "46",
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间"
    }
];
//获取某个俱乐部详情(广场)
Zwb_test_model_1.get_club_info = [
    {
        "clubId": "1000111",
        "clubUserName": "周鹏斌大王",
        "clubMoney": "1000",
        "cardQuota": "100",
        "used": "100",
        "juNum": "100",
        "actNum": "1000",
        clubName: "阿瓦隆俱乐部",
        createTimer: "2016-09-09",
        peopernum: 10,
        "freeStart": "限免开始时间",
        "freeEnd": "限免结束时间",
        "rooms": [{
                "rId": "10001",
                "userName": "创建人昵称",
                "userImg": "创建人头像",
                "num": "当前人数",
                "circleNum": "10",
                "mingPaiType": "当前人数",
                "diZhuType": "当前人数",
                "can4Take2": "当前人数",
                "mulType": "当前人数",
                "dingFen": "当前人数",
                "daPaiJiaoMan": "当前人数",
                "roomType": 1,
                "laiZi": "当前人数",
                "rule": "规则，详见说明",
                user_list: [
                    {
                        headImg: "http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg",
                        userName: "周鹏斌大王"
                    }
                ]
            }, {
                "rId": "10001",
                "userName": "创建人昵称",
                "userImg": "创建人头像",
                "num": "当前人数",
                "circleNum": "10",
                "mingPaiType": "当前人数",
                "diZhuType": "当前人数",
                "can4Take2": "当前人数",
                "mulType": "当前人数",
                "dingFen": "当前人数",
                "daPaiJiaoMan": "当前人数",
                "roomType": 1,
                "laiZi": "当前人数",
                "rule": "规则，详见说明",
                user_list: [
                    {
                        headImg: "http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg",
                        userName: "周鹏斌大王"
                    }
                ]
            }, {
                "rId": "10001",
                "userName": "创建人昵称",
                "userImg": "创建人头像",
                "num": "当前人数",
                "circleNum": "10",
                "mingPaiType": "当前人数",
                "diZhuType": "当前人数",
                "can4Take2": "当前人数",
                "mulType": "当前人数",
                "dingFen": "当前人数",
                "daPaiJiaoMan": "当前人数",
                "roomType": 1,
                "laiZi": "当前人数",
                "rule": "规则，详见说明",
                user_list: [
                    {
                        headImg: "http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg",
                        userName: "周鹏斌大王"
                    }
                ]
            }, {
                "rId": "10001",
                "userName": "创建人昵称",
                "userImg": "创建人头像",
                "num": "当前人数",
                "circleNum": "10",
                "mingPaiType": "当前人数",
                "diZhuType": "当前人数",
                "can4Take2": "当前人数",
                "mulType": "当前人数",
                "dingFen": "当前人数",
                "daPaiJiaoMan": "当前人数",
                "roomType": 1,
                "laiZi": "当前人数",
                "rule": "规则，详见说明",
                user_list: [
                    {
                        headImg: "http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg",
                        userName: "周鹏斌大王"
                    }
                ]
            }, {
                "rId": "10001",
                "userName": "创建人昵称",
                "userImg": "创建人头像",
                "num": "当前人数",
                "circleNum": "10",
                "mingPaiType": "当前人数",
                "diZhuType": "当前人数",
                "can4Take2": "当前人数",
                "mulType": "当前人数",
                "dingFen": "当前人数",
                "daPaiJiaoMan": "当前人数",
                "roomType": 1,
                "laiZi": "当前人数",
                "rule": "规则，详见说明",
                user_list: [
                    {
                        headImg: "http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg",
                        userName: "周鹏斌大王"
                    }
                ]
            }]
    }
];
//俱乐部-我的成绩
Zwb_test_model_1.get_club_get_my_info = {
    "juNum": 100, "score": 1000, "pages": 2, "page": 1,
    "infos": [
        {
            "rId": "123456",
            "ct": "创建时间long类型的",
            "users": [
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": -123,
                    "time": 1334556666
                }
            ]
        },
        {
            "rId": "123456",
            "ct": "创建时间long类型的",
            "users": [
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": -123,
                    "time": 1334556666
                }
            ]
        },
        {
            "rId": "123456",
            "ct": "创建时间long类型的",
            "users": [
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": -123,
                    "time": 1334556666
                }
            ]
        },
        {
            "rId": "123456",
            "ct": "创建时间long类型的",
            "users": [
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": -123,
                    "time": 1334556666
                }
            ]
        },
        {
            "rId": "123456",
            "ct": "创建时间long类型的",
            "users": [
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": 123,
                    "time": 1334556666
                },
                {
                    "userId": 1111,
                    "userName": "擦擦啊啊啊啊",
                    "finalScore": -123,
                    "time": 1334556666
                }
            ]
        }
    ]
};
__reflect(Zwb_test_model_1.prototype, "Zwb_test_model_1");
//# sourceMappingURL=zwb_1.js.map