/**
 * injectCSS.js
 * @file 此文件存储注入到主页面上的css代码 [一般来说是一整套]
 */

var loadUI_css = "\
	position: absolute; \
	left: 0; right: 0; top: 0; \
	z-index: 10; \
	background: url(https://steamcommunity-a.akamaihd.net/public/images/friends/colored_body_top2.png?v=2) center top no-repeat #1b2838; \
	";

var load_cssCode = '\
	@charset "utf-8";\
	@import url("https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans:300");\
	*,\
	*::before,\
	*::after {\
		box-sizing: border-box;\
	}\
	\
	body {\
		font-family: "Fredoka One", cursive;\
		font-size: 16px;\
		margin: 0px;\
	}\
	\
	#loadingUI {\
		display: -webkit-box;\
		display: -ms-flexbox;\
		display: flex;\
		-webkit-box-pack: center;\
		-ms-flex-pack: center;\
		justify-content: center;\
		-webkit-box-align: center;\
		-ms-flex-align: center;\
		align-items: center;\
		min-height: 100vh;\
		/* background: rgba(249, 249, 249, 0.9); */\
		overflow: hidden;\
	}\
	\
	.text-wrapper {\
		padding: 0 1rem;\
		max-width: 50rem;\
		width: 100%;\
		text-align: center;\
	}\
	\
	.text {\
		font-size: 8em;\
		text-transform: uppercase;\
		letter-spacing: -14px;\
	}\
	\
	.text .letter {\
		position: relative;\
		display: inline-block;\
		-webkit-transition: all .4s;\
		transition: all .4s;\
	}\
	\
	.text .letter .character {\
		opacity: 0.65;\
		-webkit-transition: color .4s;\
		transition: color .4s;\
		cursor: pointer;\
	}\
	\
	.text .letter span {\
		position: absolute;\
		bottom: .8rem;\
		left: .4rem;\
		display: block;\
		width: 100%;\
		height: 15px;\
	}\
	\
	.text .letter span::before {\
		content: \'\';\
		position: absolute;\
		top: 50%;\
		left: 50%;\
		width: 0;\
		height: 0;\
		-webkit-transform: translate(-50%, -50%);\
		transform: translate(-50%, -50%);\
		border-radius: 50%;\
		background: rgba(0, 0, 0, 0.25);\
	}\
	\
	.text .letter:hover .character {\
		color: #fff !important;\
	}\
	\
	.text.part1 .letter:nth-child(1).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing1 1.4s ease-i\n-out infinite alternate;\
		animation: poofing1 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing1 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing1 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(1) .character {\
		color: #f44336;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 0.33333s;\
		animation-delay: 0.33333s;\
	}\
	\
	.text.part1 .letter:nth-child(1) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 0.33333s;\
		animation-delay: 0.33333s;\
	}\
	\
	.text.part1 .letter:nth-child(2).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing2 1.4s ease-in-out infinite alternate;\
		animation: poofing2 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing2 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing2 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(2) .character {\
		color: #9C27B0;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 0.66667s;\
		animation-delay: 0.66667s;\
	}\
	\
	.text.part1 .letter:nth-child(2) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 0.66667s;\
		animation-delay: 0.66667s;\
	}\
	\
	.text.part1 .letter:nth-child(3).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing3 1.4s ease-in-out infinite alternate;\
		animation: poofing3 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing3 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing3 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(3) .character {\
		color: #f99b0c;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 1s;\
		animation-delay: 1s;\
	}\
	\
	.text.part1 .letter:nth-child(3) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 1s;\
		animation-delay: 1s;\
	}\
	\
	.text.part1 .letter:nth-child(4).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing4 1.4s ease-in-out infinite alternate;\
		animation: poofing4 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing4 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing4 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(4) .character {\
		color: #cee007;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 1.33333s;\
		animation-delay: 1.33333s;\
	}\
	\
	.text.part1 .letter:nth-child(4) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 1.33333s;\
		animation-delay: 1.33333s;\
	}\
	\
	.text.part1 .letter:nth-child(5).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing5 1.4s ease-in-out infinite alternate;\
		animation: poofing5 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing5 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing5 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(5) .character {\
		color: #00c6b2;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 1.66667s\
		animation-delay: 1.66667s;\
	}\
	\
	.text.part1 .letter:nth-child(5) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 1.66667s;\
		animation-delay: 1.66667s;\
	}\
	\
	.text.part1 .letter:nth-child(6).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing6 1.4s ease-in-out infinite alternate;\
		animation: poofing6 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing6 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing6 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(6) .character {\
		color: #f44336;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 2s;\
		animation-delay: 2s;\
	}\
	\
	.text.part1 .letter:nth-child(6) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 2s;\
		animation-delay: 2s;\
	}\
	\
	.text.part1 .letter:nth-child(7).poofed {\
		-webkit-transform-origin: 50% 50%;\
		transform-origin: 50% 50%;\
		-webkit-animation: poofing7 1.4s ease-in-out infinite alternate;\
		animation: poofing7 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes poofing7 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes poofing7 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part1 .letter:nth-child(7) .character {\
		color: #4CAF50;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 2s;\
		animation-delay: 2.5s;\
	}\
	\
	.text.part1 .letter:nth-child(7) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 2s;\
		animation-delay: 3s;\
	}\
	\
	.text.part2 span:nth-child(1).poofed {\
		-webkit-animation: sec_poofing1 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing1 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing1 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing1 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(1) .character {\
		color: #ff5a5f;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 2.33333s;\
		animation-delay: 2.33333s;\
	}\
	\
	.text.part2 span:nth-child(1) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 2.33333s;\
		animation-delay: 2.33333s;\
	}\
	\
	.text.part2 span:nth-child(2).poofed {\
		-webkit-animation: sec_poofing2 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing2 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing2 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing2 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(2) .character {\
		color: #f99b0c;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 2.66667s;\
		animation-delay: 2.66667s;\
	}\
	\
	.text.part2 span:nth-child(2) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 2.66667s;\
		animation-delay: 2.66667s;\
	}\
	\
	.text.part2 span:nth-child(3).poofed {\
		-webkit-animation: sec_poofing3 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing3 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing3 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing3 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(3) .character {\
		color: #cee007;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 3s;\
		animation-delay: 3s;\
	}\
	\
	.text.part2 span:nth-child(3) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 3s;\
		animation-delay: 3s;\
	}\
	\
	.text.part2 span:nth-child(4).poofed {\
		-webkit-animation: sec_poofing4 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing4 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing4 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing4 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(4) .character {\
		color: #00c6b2;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 3.33333s;\
		animation-delay: 3.33333s;\
	}\
	\
	.text.part2 span:nth-child(4) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 3.33333s;\
		animation-delay: 3.33333s;\
	}\
	\
	.text.part2 span:nth-child(5).poofed {\
		-webkit-animation: sec_poofing5 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing5 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing5 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing5 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(5) .character {\
		color: #4e2a84;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 3.66667s;\
		animation-delay: 3.66667s;\
	}\
	\
	.text.part2 span:nth-child(5) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 3.66667s;\
		animation-delay: 3.66667s;\
	}\
	\
	.text.part2 span:nth-child(6).poofed {\
		-webkit-animation: sec_poofing6 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing6 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing6 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing6 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(6) .character {\
		color: #9C27B0;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 4s;\
		animation-delay: 4s;\
	}\
	\
	.text.part2 span:nth-child(6) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 4s;\
		animation-delay: 4s;\
	}\
	\
	.text.part2 span:nth-child(7).poofed {\
		-webkit-animation: sec_poofing7 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing7 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing7 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing7 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(7) .character {\
		color: #f99b0c;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 4.33333s;\
		animation-delay: 4.33333s;\
	}\
	\
	.text.part2 span:nth-child(7) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 4.33333s;\
		animation-delay: 4.33333s;\
	}\
	\
	.text.part2 span:nth-child(8).poofed {\
		-webkit-animation: sec_poofing8 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing8 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing8 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing8 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(8) .character {\
		color: #cee007;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 4.66667s;\
		animation-delay: 4.66667s;\
	}\
	\
	.text.part2 span:nth-child(8) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 4.66667s;\
		animation-delay: 4.66667s;\
	}\
	\
	.text.part2 span:nth-child(9).poofed {\
		-webkit-animation: sec_poofing9 1.4s ease-in-out infinite alternate;\
		animation: sec_poofing9 1.4s ease-in-out infinite alternate;\
	}\
	\
	@-webkit-keyframes sec_poofing9 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	@keyframes sec_poofing9 {\
		0% {\
			-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
		}\
		50% {\
			-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		56% {\
			-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
			transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
		}\
		100% {\
			-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
			transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
		}\
	}\
	\
	.text.part2 span:nth-child(9) .character {\
		color: #00c6b2;\
		-webkit-animation: wave 1.2s linear infinite;\
		animation: wave 1.2s linear infinite;\
		-webkit-animation-delay: 5s;\
		animation-delay: 5s;\
	}\
	\
	.text.part2 span:nth-child(9) span::before {\
		-webkit-animation: shadow 1.2s linear infinite;\
		animation: shadow 1.2s linear infinite;\
		-webkit-animation-delay: 5s;\
		animation-delay: 5s;\
	}\
	\
	@-webkit-keyframes wave {\
		0% {\
			-webkit-transform: translateY(0);\
			transform: translateY(0);\
		}\
		50% {\
			-webkit-transform: translateY(-10px);\
			transform: translateY(-10px);\
		}\
		100% {\
			-webkit-transform: translateY(0);\
			transform: translateY(0);\
		}\
	}\
	\
	@keyframes wave {\
		0% {\
			-webkit-transform: translateY(0);\
			transform: translateY(0);\
		}\
		50% {\
			-webkit-transform: translateY(-10px);\
			transform: translateY(-10px);\
		}\
		100% {\
			-webkit-transform: translateY(0);\
			transform: translateY(0);\
		}\
	}\
	\
	@-webkit-keyframes shadow {\
		0% {\
			width: 0;\
			height: 0;\
		}\
		50% {\
			width: 100%;\
			height: 100%;\
		}\
		100% {\
			width: 0;\
			height: 0;\
		}\
	}\
	\
	@keyframes shadow {\
		0% {\
			width: 0;\
			height: 0;\
		}\
		50% {\
			width: 100%;\
			height: 100%;\
		}\
		100% {\
			width: 0;\
			height: 0;\
		}\
	}\
	\
	.how-to {\
		margin: 2rem 0 2rem 1rem;\
		font-family: "Opens Sans", sans-serif;\
		font-weight: 300;\
		font-size: .85em;\
		letter-spacing: 4px;\
		/*color: rgba(0, 0, 0, 0.8);*/\
		color: rgba(255, 255, 255, 0.8);\
	}\
	\
	@-webkit-keyframes rotate {\
		0% {\
			-webkit-transform: rotateZ(0) scale(0.7);\
			transform: rotateZ(0) scale(0.7);\
		}\
		100% {\
			-webkit-transform: rotateZ(360deg) scale(0.7);\
			transform: rotateZ(360deg) scale(0.7);\
		}\
	}\
	\
	@keyframes rotate {\
		0% {\
			-webkit-transform: rotateZ(0) scale(0.7);\
			transform: rotateZ(0) scale(0.7);\
		}\
		100% {\
			-webkit-transform: rotateZ(360deg) scale(0.7);\
			transform: rotateZ(360deg) scale(0.7);\
		}\
	}\
	\
	@media only screen and (max-width: 767px) {\
		.text {\
			font-size: 6em;\
		}\
		.text .letter span {\
			bottom: .5rem;\
		}\
	}\
	\
	@media only screen and (max-width: 480px) {\
		.text {\
			font-size: 4em;\
		}\
		.text .letter span {\
			bottom: 0;\
		}\
	}\
	';
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
var fs_css = '\
	.fs-wrap {\
		position: relative;\
		display: inline-block;\
		vertical-align: bottom;\
		width: 200px;\
		margin: 3px;\
		font-size: 12px;\
		line-height: 1\
	}\
	.fs-label-wrap {\
		position: relative;\
		border: 1px solid #34DEFF;\
		cursor: default;\
		color: #66ccff;\
		border-radius: 4px;\
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)\
	}\
	.fs-label-wrap,\
	.fs-dropdown {\
		-webkit-user-select: none;\
		-moz-user-select: none;\
		-ms-user-select: none;\
		user-select: none\
	}\
	.fs-label-wrap .fs-label {\
		padding: 4px 22px 4px 8px;\
		text-overflow: ellipsis;\
		white-space: nowrap;\
		overflow: hidden;\
		cursor: pointer\
	}\
	.fs-arrow {\
		width: 0;\
		height: 0;\
		border-left: 4px solid transparent;\
		border-right: 4px solid transparent;\
		border-top: 6px solid #fff;\
		position: absolute;\
		top: 0;\
		right: 4px;\
		bottom: 0;\
		margin: auto;\
		cursor: pointer\
	}\
	.fs-dropdown {\
		position: absolute;\
		background-color: #3E9AC6;\
		border: 1px solid #000;\
		width: 100%;\
		z-index: 1000;\
		border-radius: 4px\
	}\
	.fs-dropdown .fs-options {\
		max-height: 200px;\
		overflow: auto\
	}\
	\
	.fs-search input {\
		width: 90%;\
		padding: 2px 4px;\
		border: 0\
		outline: 0;\
	}\
	.fs-selectAll {\
		float: right;\
		cursor: pointer;\
		margin-top: 4px;\
		height: auto\
	}\
	.fs-selectAll.selected {\
		float: right;\
		cursor: pointer;\
		margin-top: 4px;\
		height: auto;\
		color: green\
	}\
	.fs-selectAll:hover {\
		background-color: #35d5ff\
	}\
	.fs-option,\
	.fs-search,\
	.fs-optgroup-label {\
		padding: 6px 8px;\
		border-bottom: 1px solid #eee;\
		cursor: default\
	}\
	.fs-option {cursor: pointer}\
	.fs-option.hl {\
		background-color: #f5f5f5\
	}\
	.fs-wrap.multiple .fs-option {\
		position: relative;\
		padding-left: 30px\
	}\
	.fs-wrap.multiple .fs-checkbox {\
		position: absolute;\
		display: block;\
		width: 30px;\
		top: 0;\
		left: 0;\
		bottom: 0\
	}\
	.fs-wrap.multiple .fs-option .fs-checkbox i {\
		position: absolute;\
		margin: auto;\
		left: 0;\
		right: 0;\
		top: 0;\
		bottom: 0;\
		width: 14px;\
		height: 14px;\
		border: 1px solid #aeaeae;\
		border-radius: 4px;\
		background-color: #fff\
	}\
	.fs-wrap.multiple .fs-option.selected .fs-checkbox i {\
		background-color: #11a911;\
		border-color: transparent;\
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABMSURBVAiZfc0xDkAAFIPhd2Kr1WRjcAExuIgzGUTIZ/AkImjSofnbNBAfHvzAHjOKNzhiQ42IDFXCDivaaxAJd0xYshT3QqBxqnxeHvhunpu23xnmAAAAAElFTkSuQmCC);\
		background-repeat: no-repeat;\
		background-position: center\
	}\
	.fs-wrap .fs-option:hover {\
		background: #48E3FF;\
		border-radius: 4px;\
		margin-left: 2px;\
		margin-right: 2px\
	}\
	.fs-optgroup-label {font-weight: 700}\
	.hidden {display: none}\
	.fs-options::-webkit-scrollbar {width: 6px}\
	.fs-options::-webkit-scrollbar-track {\
		-webkit-border-radius: 2em;\
		-moz-border-radius: 2em;\
		border-radius: 2em;\
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
		background: rgba(0, 0, 0, .1)}\
	.fs-options::-webkit-scrollbar-thumb {\
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
		background: rgba(0, 0, 0, .2);\
		-webkit-border-radius: 2em;\
		-moz-border-radius: 2em;\
		border-radius: 2em\}\
	';
	
	