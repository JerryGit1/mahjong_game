
/**
 * Created by JackerCao on 2018-04-17.
 */
class JackerCao_test_model_1{

    public static fields_analysis={
        a:"user",
        b:"users"
    };

    public  static mainInfo={
        "currentUser": {
            "userId": "123456",
            "position": "1",
            "score": "10000",
            "state": "1",  //1/0
            "playStatus": "1",//玩家游戏状态",1大厅 2未准备 3准备 4游戏中
            "hasPuFen": "",  //0（否）或者1（是）  ，没选铺分的话不会给这个字段
            "userName": "天王盖地虎",
            "userImg": "resource/img/userHeat.png",
            "gender": "1",          //1男---2女";;
            "ip": "192.168.1.108",
            "userAgree": true,
            "money": "10000",
            "notice": "天王盖地虎，小鸡炖蘑菇，宝塔镇河妖，段友吊缠腰",
            "lastAction": [],//上个动作列表
            "currAction": [],//当前动作列表
            "pais": "[]",//不排序
            "chuList": "[]",//出过的牌
            "actionList": [] //吃碰杠
            //可能是 int 可能是map
            //如果是吃 那么就是map {action:"",extra:""}
            //如果是暗杠 map{action:-2,extra:"杠的牌"}
            //如果是长毛 -3 至 -9
        }
    }

    public static achievement={
        "pages":"1",
        "infos":[
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[]",//小结算信息 从第一局按序排列
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            },
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[]",//小结算信息 从第一局按序排列
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            },
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[显示啥子呢]",
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            }
        ]
    }

    public static achievement2={
        "pages":"2",
        "infos":[
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[]",//小结算信息 从第一局按序排列
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            },
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[]",//小结算信息 从第一局按序排列
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            },
            {
                "roomId":"556677",
                "createTime":"1515137693",
                "circleNum":"2",
                "lastNum":"3",
                "state":"1",
                "type":"",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "xiaoJuNum":"5",
                "backUrl":"回放路径",
                "xiaoJuInfo":"[显示啥子呢]",
                "userInfo":[
                    {
                        "userId":"123456",
                        "userName":"刘伯温",
                        "finalScore":"123"
                    },
                    {
                        "userId":"147258",
                        "userName":"朱元璋",
                        "finalScore":"234"
                    },
                    {
                        "userId":"789456",
                        "userName":"刘邦",
                        "finalScore":"147"
                    }
                ]
            }
        ]
    }

    public static issue={
        "info":[
            {
                "roomId":"778899",
                "userName":"",
                "createTime":"",
                "circleNum":"6",
                "lastNum":"9",
                "state":"",
                "scoreType":"7",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "playerInfo":[
                    {
                        "userId":"123456",
                        "position":"1",
                        "userName":"花木兰",
                        "userImg":"resource/img/hml.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"2",
                        "userName":"刘伯温",
                        "userImg":"resource/img/lbw.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"3",
                        "userName":"项羽",
                        "userImg":"resource/img/xy.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"4",
                        "userName":"朱元璋",
                        "userImg":"resource/img/zyz.png",
                        "state":"1"
                    }
                ]
            },
            {
                "roomId":"778899",
                "userName":"",
                "createTime":"",
                "circleNum":"6",
                "lastNum":"9",
                "state":"",
                "scoreType":"7",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "playerInfo":[
                    {
                        "userId":"123456",
                        "position":"1",
                        "userName":"花木兰",
                        "userImg":"resource/img/hml.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"2",
                        "userName":"刘伯温",
                        "userImg":"resource/img/lbw.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"3",
                        "userName":"项羽",
                        "userImg":"resource/img/xy.png",
                        "state":"1"
                    }
                ]
            },
            {
                "roomId":"778899",
                "userName":"",
                "createTime":"",
                "circleNum":"6",
                "lastNum":"9",
                "state":"",
                "scoreType":"7",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "playerInfo":[
                    {
                        "userId":"123456",
                        "position":"1",
                        "userName":"花木兰",
                        "userImg":"resource/img/hml.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"2",
                        "userName":"刘伯温",
                        "userImg":"resource/img/lbw.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"3",
                        "userName":"项羽",
                        "userImg":"resource/img/xy.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"4",
                        "userName":"朱元璋",
                        "userImg":"resource/img/zyz.png",
                        "state":"1"
                    }
                ]
            },
            {
                "roomId":"778899",
                "userName":"",
                "createTime":"",
                "circleNum":"6",
                "lastNum":"9",
                "state":"",
                "scoreType":"7",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "playerInfo":[
                    {
                        "userId":"123456",
                        "position":"1",
                        "userName":"花木兰",
                        "userImg":"resource/img/hml.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"2",
                        "userName":"刘伯温",
                        "userImg":"resource/img/lbw.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"3",
                        "userName":"项羽",
                        "userImg":"resource/img/xy.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"4",
                        "userName":"朱元璋",
                        "userImg":"resource/img/zyz.png",
                        "state":"1"
                    }
                ]
            },
            {
                "roomId":"778899",
                "userName":"",
                "createTime":"",
                "circleNum":"6",
                "lastNum":"9",
                "state":"",
                "scoreType":"7",
                "ruleJueGang":"",
                "ruleXuanFeng":"",
                "ruleChangMao":"",
                "ruleTuiDaoHu":"",
                "ruleDaiHun":"",
                "ruleQiongHu":"",
                "ruleQingYiSe":"",
                "ruleQiDui":"",
                "rulePuFen":"",
                "playType":"",
                "playerInfo":[
                    {
                        "userId":"123456",
                        "position":"1",
                        "userName":"花木兰",
                        "userImg":"resource/img/hml.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"2",
                        "userName":"刘伯温",
                        "userImg":"resource/img/lbw.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"3",
                        "userName":"项羽",
                        "userImg":"resource/img/xy.png",
                        "state":"1"
                    },
                    {
                        "userId":"123456",
                        "position":"4",
                        "userName":"朱元璋",
                        "userImg":"resource/img/zyz.png",
                        "state":"1"
                    }
                ]
            },
        ]
    };
}