var fs_css = '\
.fs-wrap {\n\
	position: relative;\n\
	display: inline-block;\n\
	vertical-align: bottom;\n\
	width: 200px;\n\
	margin: 3px;\n\
	font-size: 12px;\n\
	line-height: 1\n\
}\n\
\n\
.fs-label-wrap {\n\
	position: relative;\n\
	border: 1px solid #34DEFF;\n\
	cursor: default;\n\
	color: #66ccff;\n\
	border-radius: 4px;\n\
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)\n\
}\n\
\n\
.fs-label-wrap,\n\
.fs-dropdown {\n\
	-webkit-user-select: none;\n\
	-moz-user-select: none;\n\
	-ms-user-select: none;\n\
	user-select: none\n\
}\n\
\n\
.fs-label-wrap .fs-label {\n\
	padding: 4px 22px 4px 8px;\n\
	text-overflow: ellipsis;\n\
	white-space: nowrap;\n\
	overflow: hidden;\n\
	cursor: pointer\n\
}\n\
\n\
.fs-arrow {\n\
	width: 0;\n\
	height: 0;\n\
	border-left: 4px solid transparent;\n\
	border-right: 4px solid transparent;\n\
	border-top: 6px solid #fff;\n\
	position: absolute;\n\
	top: 0;\n\
	right: 4px;\n\
	bottom: 0;\n\
	margin: auto;\n\
	cursor: pointer\n\
}\n\
\n\
.fs-dropdown {\n\
	position: absolute;\n\
	background-color: #3E9AC6;\n\
	border: 1px solid #000;\n\
	width: 100%;\n\
	z-index: 1000;\n\
	border-radius: 4px\n\
}\n\
\n\
.fs-dropdown .fs-options {\n\
	max-height: 200px;\n\
	overflow: auto\n\
}\n\
\n\
.fs-search input {\n\
	width: 90%;\n\
	padding: 2px 4px;\n\
	border: 0\n\
	outline: 0;\n\
}\n\
\n\
.fs-selectAll {\n\
	float: right;\n\
	cursor: pointer;\n\
	margin-top: 4px;\n\
	height: auto\n\
}\n\
\n\
.fs-selectAll.selected {\n\
	float: right;\n\
	cursor: pointer;\n\
	margin-top: 4px;\n\
	height: auto;\n\
	color: green\n\
}\n\
\n\
.fs-selectAll:hover {\n\
	background-color: #35d5ff\n\
}\n\
\n\
.fs-option,\n\
.fs-search,\n\
.fs-optgroup-label {\n\
	padding: 6px 8px;\n\
	border-bottom: 1px solid #eee;\n\
	cursor: default\n\
}\n\
\n\
.fs-option {cursor: pointer}\n\
.fs-option.hl {\n\
	background-color: #f5f5f5\n\
}\n\
\n\
.fs-wrap.multiple .fs-option {\n\
	position: relative;\n\
	padding-left: 30px\n\
}\n\
\n\
.fs-wrap.multiple .fs-checkbox {\n\
	position: absolute;\n\
	display: block;\n\
	width: 30px;\n\
	top: 0;\n\
	left: 0;\n\
	bottom: 0\n\
}\n\
\n\
.fs-wrap.multiple .fs-option .fs-checkbox i {\n\
	position: absolute;\n\
	margin: auto;\n\
	left: 0;\n\
	right: 0;\n\
	top: 0;\n\
	bottom: 0;\n\
	width: 14px;\n\
	height: 14px;\n\
	border: 1px solid #aeaeae;\n\
	border-radius: 4px;\n\
	background-color: #fff\n\
}\n\
\n\
.fs-wrap.multiple .fs-option.selected .fs-checkbox i {\n\
	background-color: #11a911;\n\
	border-color: transparent;\n\
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABMSURBVAiZfc0xDkAAFIPhd2Kr1WRjcAExuIgzGUTIZ/AkImjSofnbNBAfHvzAHjOKNzhiQ42IDFXCDivaaxAJd0xYshT3QqBxqnxeHvhunpu23xnmAAAAAElFTkSuQmCC);\n\
	background-repeat: no-repeat;\n\
	background-position: center\n\
}\n\
\n\
.fs-wrap .fs-option:hover {\n\
	background: #48E3FF;\n\
	border-radius: 4px;\n\
	margin-left: 2px;\n\
	margin-right: 2px\n\
}\n\
\n\
.fs-optgroup-label {font-weight: 700}\n\
\n\
.hidden {display: none}\n\
\n\
.fs-options::-webkit-scrollbar {width: 6px}\n\
\n\
.fs-options::-webkit-scrollbar-track {\n\
	-webkit-border-radius: 2em;\n\
	-moz-border-radius: 2em;\n\
	border-radius: 2em;\n\
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\n\
	background: rgba(0, 0, 0, .1)\n\
}\n\
\n\
.fs-options::-webkit-scrollbar-thumb {\n\
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\n\
	background: rgba(0, 0, 0, .2);\n\
	-webkit-border-radius: 2em;\n\
	-moz-border-radius: 2em;\n\
	border-radius: 2em\n\
}\n\
';

var loadUI_css = '\
position: absolute;\n\
left: 0; right: 0; top: 0;\n\
z-index: 10;\n\
background: url(https://steamcommunity-a.akamaihd.net/public/images/friends/colored_body_top2.png?v=2) center top no-repeat #1b2838;\n\
';

var load_cssCode = '\
@charset "utf-8";\n\
@import url("https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans:300");\n\
*,\n\
*::before,\n\
*::after {\n\
	box-sizing: border-box;\n\
}\n\
\n\
body {\n\
	font-family: "Fredoka One", cursive;\n\
	font-size: 16px;\n\
	margin: 0px;\n\
}\n\
\n\
#loadingUI {\n\
	display: -webkit-box;\n\
	display: -ms-flexbox;\n\
	display: flex;\n\
	-webkit-box-pack: center;\n\
	-ms-flex-pack: center;\n\
	justify-content: center;\n\
	-webkit-box-align: center;\n\
	-ms-flex-align: center;\n\
	align-items: center;\n\
	min-height: 100vh;\n\
	/* background: rgba(249, 249, 249, 0.9); */\n\
	overflow: hidden;\n\
}\n\
\n\
.text-wrapper {\n\
	padding: 0 1rem;\n\
	max-width: 50rem;\n\
	width: 100%;\n\
	text-align: center;\n\
}\n\
\n\
.text {\n\
	font-size: 8em;\n\
	text-transform: uppercase;\n\
	letter-spacing: -14px;\n\
}\n\
\n\
.text .letter {\n\
	position: relative;\n\
	display: inline-block;\n\
	-webkit-transition: all .4s;\n\
	transition: all .4s;\n\
}\n\
\n\
.text .letter .character {\n\
	opacity: 0.65;\n\
	-webkit-transition: color .4s;\n\
	transition: color .4s;\n\
	cursor: pointer;\n\
}\n\
\n\
.text .letter span {\n\
	position: absolute;\n\
	bottom: .8rem;\n\
	left: .4rem;\n\
	display: block;\n\
	width: 100%;\n\
	height: 15px;\n\
}\n\
\n\
.text .letter span::before {\n\
	content: "";\n\
	position: absolute;\n\
	top: 50%;\n\
	left: 50%;\n\
	width: 0;\n\
	height: 0;\n\
	-webkit-transform: translate(-50%, -50%);\n\
	transform: translate(-50%, -50%);\n\
	border-radius: 50%;\n\
	background: rgba(0, 0, 0, 0.25);\n\
}\n\
\n\
.text .letter:hover .character {\n\
	color: #fff !important;\n\
}\n\
\n\
.text.part1 .letter:nth-child(1).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing1 1.4s ease-i\n-out infinite alternate;\n\
	animation: poofing1 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing1 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing1 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(1) .character {\n\
	color: #f44336;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 0.33333s;\n\
	animation-delay: 0.33333s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(1) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 0.33333s;\n\
	animation-delay: 0.33333s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(2).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing2 1.4s ease-in-out infinite alternate;\n\
	animation: poofing2 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing2 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing2 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(2) .character {\n\
	color: #9C27B0;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 0.66667s;\n\
	animation-delay: 0.66667s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(2) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 0.66667s;\n\
	animation-delay: 0.66667s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(3).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing3 1.4s ease-in-out infinite alternate;\n\
	animation: poofing3 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing3 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing3 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(3) .character {\n\
	color: #f99b0c;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 1s;\n\
	animation-delay: 1s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(3) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 1s;\n\
	animation-delay: 1s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(4).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing4 1.4s ease-in-out infinite alternate;\n\
	animation: poofing4 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing4 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing4 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(4) .character {\n\
	color: #cee007;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 1.33333s;\n\
	animation-delay: 1.33333s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(4) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 1.33333s;\n\
	animation-delay: 1.33333s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(5).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing5 1.4s ease-in-out infinite alternate;\n\
	animation: poofing5 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing5 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing5 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(5) .character {\n\
	color: #00c6b2;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 1.66667s\n\
	animation-delay: 1.66667s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(5) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 1.66667s;\n\
	animation-delay: 1.66667s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(6).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing6 1.4s ease-in-out infinite alternate;\n\
	animation: poofing6 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing6 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing6 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(6) .character {\n\
	color: #f44336;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 2s;\n\
	animation-delay: 2s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(6) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 2s;\n\
	animation-delay: 2s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(7).poofed {\n\
	-webkit-transform-origin: 50% 50%;\n\
	transform-origin: 50% 50%;\n\
	-webkit-animation: poofing7 1.4s ease-in-out infinite alternate;\n\
	animation: poofing7 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes poofing7 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes poofing7 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part1 .letter:nth-child(7) .character {\n\
	color: #4CAF50;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 2s;\n\
	animation-delay: 2.5s;\n\
}\n\
\n\
.text.part1 .letter:nth-child(7) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 2s;\n\
	animation-delay: 3s;\n\
}\n\
\n\
.text.part2 span:nth-child(1).poofed {\n\
	-webkit-animation: sec_poofing1 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing1 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing1 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing1 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(1) .character {\n\
	color: #ff5a5f;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 2.33333s;\n\
	animation-delay: 2.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(1) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 2.33333s;\n\
	animation-delay: 2.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(2).poofed {\n\
	-webkit-animation: sec_poofing2 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing2 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing2 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing2 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(2) .character {\n\
	color: #f99b0c;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 2.66667s;\n\
	animation-delay: 2.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(2) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 2.66667s;\n\
	animation-delay: 2.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(3).poofed {\n\
	-webkit-animation: sec_poofing3 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing3 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing3 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing3 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(3) .character {\n\
	color: #cee007;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 3s;\n\
	animation-delay: 3s;\n\
}\n\
\n\
.text.part2 span:nth-child(3) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 3s;\n\
	animation-delay: 3s;\n\
}\n\
\n\
.text.part2 span:nth-child(4).poofed {\n\
	-webkit-animation: sec_poofing4 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing4 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing4 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing4 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(4) .character {\n\
	color: #00c6b2;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 3.33333s;\n\
	animation-delay: 3.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(4) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 3.33333s;\n\
	animation-delay: 3.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(5).poofed {\n\
	-webkit-animation: sec_poofing5 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing5 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing5 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing5 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(5) .character {\n\
	color: #4e2a84;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 3.66667s;\n\
	animation-delay: 3.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(5) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 3.66667s;\n\
	animation-delay: 3.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(6).poofed {\n\
	-webkit-animation: sec_poofing6 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing6 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing6 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing6 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(6) .character {\n\
	color: #9C27B0;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 4s;\n\
	animation-delay: 4s;\n\
}\n\
\n\
.text.part2 span:nth-child(6) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 4s;\n\
	animation-delay: 4s;\n\
}\n\
\n\
.text.part2 span:nth-child(7).poofed {\n\
	-webkit-animation: sec_poofing7 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing7 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing7 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing7 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(7) .character {\n\
	color: #f99b0c;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 4.33333s;\n\
	animation-delay: 4.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(7) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 4.33333s;\n\
	animation-delay: 4.33333s;\n\
}\n\
\n\
.text.part2 span:nth-child(8).poofed {\n\
	-webkit-animation: sec_poofing8 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing8 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing8 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing8 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(8) .character {\n\
	color: #cee007;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 4.66667s;\n\
	animation-delay: 4.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(8) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 4.66667s;\n\
	animation-delay: 4.66667s;\n\
}\n\
\n\
.text.part2 span:nth-child(9).poofed {\n\
	-webkit-animation: sec_poofing9 1.4s ease-in-out infinite alternate;\n\
	animation: sec_poofing9 1.4s ease-in-out infinite alternate;\n\
}\n\
\n\
@-webkit-keyframes sec_poofing9 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
@keyframes sec_poofing9 {\n\
	0% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\n\
	}\n\
	50% {\n\
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	56% {\n\
		-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\n\
		transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
		transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\n\
	}\n\
}\n\
\n\
.text.part2 span:nth-child(9) .character {\n\
	color: #00c6b2;\n\
	-webkit-animation: wave 1.2s linear infinite;\n\
	animation: wave 1.2s linear infinite;\n\
	-webkit-animation-delay: 5s;\n\
	animation-delay: 5s;\n\
}\n\
\n\
.text.part2 span:nth-child(9) span::before {\n\
	-webkit-animation: shadow 1.2s linear infinite;\n\
	animation: shadow 1.2s linear infinite;\n\
	-webkit-animation-delay: 5s;\n\
	animation-delay: 5s;\n\
}\n\
\n\
@-webkit-keyframes wave {\n\
	0% {\n\
		-webkit-transform: translateY(0);\n\
		transform: translateY(0);\n\
	}\n\
	50% {\n\
		-webkit-transform: translateY(-10px);\n\
		transform: translateY(-10px);\n\
	}\n\
	100% {\n\
		-webkit-transform: translateY(0);\n\
		transform: translateY(0);\n\
	}\n\
}\n\
\n\
@keyframes wave {\n\
	0% {\n\
		-webkit-transform: translateY(0);\n\
		transform: translateY(0);\n\
	}\n\
	50% {\n\
		-webkit-transform: translateY(-10px);\n\
		transform: translateY(-10px);\n\
	}\n\
	100% {\n\
		-webkit-transform: translateY(0);\n\
		transform: translateY(0);\n\
	}\n\
}\n\
\n\
@-webkit-keyframes shadow {\n\
	0% {\n\
		width: 0;\n\
		height: 0;\n\
	}\n\
	50% {\n\
		width: 100%;\n\
		height: 100%;\n\
	}\n\
	100% {\n\
		width: 0;\n\
		height: 0;\n\
	}\n\
}\n\
\n\
@keyframes shadow {\n\
	0% {\n\
		width: 0;\n\
		height: 0;\n\
	}\n\
	50% {\n\
		width: 100%;\n\
		height: 100%;\n\
	}\n\
	100% {\n\
		width: 0;\n\
		height: 0;\n\
	}\n\
}\n\
\n\
.how-to {\n\
	margin: 2rem 0 2rem 1rem;\n\
	font-family: "Opens Sans", sans-serif;\n\
	font-weight: 300;\n\
	font-size: .85em;\n\
	letter-spacing: 4px;\n\
	/*color: rgba(0, 0, 0, 0.8);*/\n\
	color: rgba(255, 255, 255, 0.8);\n\
}\n\
\n\
@-webkit-keyframes rotate {\n\
	0% {\n\
		-webkit-transform: rotateZ(0) scale(0.7);\n\
		transform: rotateZ(0) scale(0.7);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(360deg) scale(0.7);\n\
		transform: rotateZ(360deg) scale(0.7);\n\
	}\n\
}\n\
\n\
@keyframes rotate {\n\
	0% {\n\
		-webkit-transform: rotateZ(0) scale(0.7);\n\
		transform: rotateZ(0) scale(0.7);\n\
	}\n\
	100% {\n\
		-webkit-transform: rotateZ(360deg) scale(0.7);\n\
		transform: rotateZ(360deg) scale(0.7);\n\
	}\n\
}\n\
\n\
@media only screen and (max-width: 767px) {\n\
	.text {\n\
		font-size: 6em;\n\
	}\n\
	.text .letter span {\n\
		bottom: .5rem;\n\
	}\n\
}\n\
\n\
@media only screen and (max-width: 480px) {\n\
	.text {\n\
		font-size: 4em;\n\
	}\n\
	.text .letter span {\n\
		bottom: 0;\n\
	}\n\
}\n\
';

