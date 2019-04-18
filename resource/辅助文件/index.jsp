<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8"%>
		<!DOCTYPE HTML>
		<html>
		<head>
		<meta charset="utf-8">
		<title>营口麻将</title>
		<meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		<meta name="full-screen" content="true"/>
		<meta name="screen-orientation" content="portrait"/>
		<meta name="x5-fullscreen" content="true"/>
		<meta name="360-fullscreen" content="true"/>
		<style>
		html, body {
		-ms-touch-action: none;
		background: #000;
		padding: 0;
		border: 0;
		margin: 0;
		height: 100%;
		}
		</style>
	<!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
	<!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.min.js"></script>
	<script egret="lib" src="libs/modules/socket/socket.min.js"></script>
	<script egret="lib" src="libs/modules/particle/particle.min.js"></script>
	<!--modules_files_end-->

	<!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
	<!--other_libs_files_start-->
	<script egret="lib" src="polyfill/promise.min.js"></script>
	<!--other_libs_files_end-->

	<!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
	<!--game_files_start-->
	<script src="main.min.js"></script>
	<!--game_files_end-->
		</head>
		<body>

		<div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
		data-entry-class="Main"
		data-orientation="auto"
		data-scale-mode="showAll"
		data-frame-rate="30"
		data-content-width="1136"
		data-content-height="720"
		data-show-paint-rect="false"
		data-multi-fingered="2"
		data-show-fps="false" data-show-log="false"
		data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
		</div>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
		<script src="http://www.aoh5.com:8086/h5/web/release/version/AH_tester.js"></script>
		<script>
		/**
		* {
		* "renderMode":, //引擎渲染模式，"canvas" 或者 "webgl"
		* "audioType": 0 //使用的音频类型，0:默认，1:qq audio，2:web audio，3:audio
		* "antialias": //WebGL模式下是否开启抗锯齿，true:开启，false:关闭，默认为false
		* "retina": //是否基于devicePixelRatio缩放画布
		* }
		**/
		/*
		* vId 1本地测试模式  2线上测试模式 3线上发布模式
		* */
		var AH_param='<%=request.getParameter("AH_param") %>';
		egret.runEgret({renderMode:"canvas", audioType:0});
		</script>
		</body>
</html>
