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

var jquery_localizationTool_css = '\
.flag {\n\
  width: 16px;\n\
  height: 11px;\n\
  background: url(flags.png) no-repeat;\n\
}\n\
.flag.flag-ad {\n\
  background-position: -16px 0;\n\
}\n\
.flag.flag-ae {\n\
  background-position: -32px 0;\n\
}\n\
.flag.flag-af {\n\
  background-position: -48px 0;\n\
}\n\
.flag.flag-ag {\n\
  background-position: -64px 0;\n\
}\n\
.flag.flag-ai {\n\
  background-position: -80px 0;\n\
}\n\
.flag.flag-al {\n\
  background-position: -96px 0;\n\
}\n\
.flag.flag-am {\n\
  background-position: -112px 0;\n\
}\n\
.flag.flag-an {\n\
  background-position: -128px 0;\n\
}\n\
.flag.flag-ao {\n\
  background-position: -144px 0;\n\
}\n\
.flag.flag-ar {\n\
  background-position: -160px 0;\n\
}\n\
.flag.flag-as {\n\
  background-position: -176px 0;\n\
}\n\
.flag.flag-at {\n\
  background-position: -192px 0;\n\
}\n\
.flag.flag-au {\n\
  background-position: -208px 0;\n\
}\n\
.flag.flag-aw {\n\
  background-position: -224px 0;\n\
}\n\
.flag.flag-az {\n\
  background-position: -240px 0;\n\
}\n\
.flag.flag-ba {\n\
  background-position: 0 -11px;\n\
}\n\
.flag.flag-bb {\n\
  background-position: -16px -11px;\n\
}\n\
.flag.flag-bd {\n\
  background-position: -32px -11px;\n\
}\n\
.flag.flag-be {\n\
  background-position: -48px -11px;\n\
}\n\
.flag.flag-bf {\n\
  background-position: -64px -11px;\n\
}\n\
.flag.flag-bg {\n\
  background-position: -80px -11px;\n\
}\n\
.flag.flag-bh {\n\
  background-position: -96px -11px;\n\
}\n\
.flag.flag-bi {\n\
  background-position: -112px -11px;\n\
}\n\
.flag.flag-bj {\n\
  background-position: -128px -11px;\n\
}\n\
.flag.flag-bm {\n\
  background-position: -144px -11px;\n\
}\n\
.flag.flag-bn {\n\
  background-position: -160px -11px;\n\
}\n\
.flag.flag-bo {\n\
  background-position: -176px -11px;\n\
}\n\
.flag.flag-br {\n\
  background-position: -192px -11px;\n\
}\n\
.flag.flag-bs {\n\
  background-position: -208px -11px;\n\
}\n\
.flag.flag-bt {\n\
  background-position: -224px -11px;\n\
}\n\
.flag.flag-bv {\n\
  background-position: -240px -11px;\n\
}\n\
.flag.flag-bw {\n\
  background-position: 0 -22px;\n\
}\n\
.flag.flag-by {\n\
  background-position: -16px -22px;\n\
}\n\
.flag.flag-bz {\n\
  background-position: -32px -22px;\n\
}\n\
.flag.flag-ca {\n\
  background-position: -48px -22px;\n\
}\n\
.flag.flag-catalonia {\n\
  background-position: -64px -22px;\n\
}\n\
.flag.flag-cd {\n\
  background-position: -80px -22px;\n\
}\n\
.flag.flag-cf {\n\
  background-position: -96px -22px;\n\
}\n\
.flag.flag-cg {\n\
  background-position: -112px -22px;\n\
}\n\
.flag.flag-ch {\n\
  background-position: -128px -22px;\n\
}\n\
.flag.flag-ci {\n\
  background-position: -144px -22px;\n\
}\n\
.flag.flag-ck {\n\
  background-position: -160px -22px;\n\
}\n\
.flag.flag-cl {\n\
  background-position: -176px -22px;\n\
}\n\
.flag.flag-cm {\n\
  background-position: -192px -22px;\n\
}\n\
.flag.flag-cn {\n\
  background-position: -208px -22px;\n\
}\n\
.flag.flag-co {\n\
  background-position: -224px -22px;\n\
}\n\
.flag.flag-cr {\n\
  background-position: -240px -22px;\n\
}\n\
.flag.flag-cu {\n\
  background-position: 0 -33px;\n\
}\n\
.flag.flag-cv {\n\
  background-position: -16px -33px;\n\
}\n\
.flag.flag-cw {\n\
  background-position: -32px -33px;\n\
}\n\
.flag.flag-cy {\n\
  background-position: -48px -33px;\n\
}\n\
.flag.flag-cz {\n\
  background-position: -64px -33px;\n\
}\n\
.flag.flag-de {\n\
  background-position: -80px -33px;\n\
}\n\
.flag.flag-dj {\n\
  background-position: -96px -33px;\n\
}\n\
.flag.flag-dk {\n\
  background-position: -112px -33px;\n\
}\n\
.flag.flag-dm {\n\
  background-position: -128px -33px;\n\
}\n\
.flag.flag-do {\n\
  background-position: -144px -33px;\n\
}\n\
.flag.flag-dz {\n\
  background-position: -160px -33px;\n\
}\n\
.flag.flag-ec {\n\
  background-position: -176px -33px;\n\
}\n\
.flag.flag-ee {\n\
  background-position: -192px -33px;\n\
}\n\
.flag.flag-eg {\n\
  background-position: -208px -33px;\n\
}\n\
.flag.flag-eh {\n\
  background-position: -224px -33px;\n\
}\n\
.flag.flag-england {\n\
  background-position: -240px -33px;\n\
}\n\
.flag.flag-er {\n\
  background-position: 0 -44px;\n\
}\n\
.flag.flag-es {\n\
  background-position: -16px -44px;\n\
}\n\
.flag.flag-esperanto {\n\
  background-position: -192px -165px;\n\
}\n\
.flag.flag-et {\n\
  background-position: -32px -44px;\n\
}\n\
.flag.flag-eu {\n\
  background-position: -48px -44px;\n\
}\n\
.flag.flag-fi {\n\
  background-position: -64px -44px;\n\
}\n\
.flag.flag-fj {\n\
  background-position: -80px -44px;\n\
}\n\
.flag.flag-fk {\n\
  background-position: -96px -44px;\n\
}\n\
.flag.flag-fm {\n\
  background-position: -112px -44px;\n\
}\n\
.flag.flag-fo {\n\
  background-position: -128px -44px;\n\
}\n\
.flag.flag-fr {\n\
  background-position: -144px -44px;\n\
}\n\
.flag.flag-ga {\n\
  background-position: -160px -44px;\n\
}\n\
.flag.flag-gb {\n\
  background-position: -176px -44px;\n\
}\n\
.flag.flag-gd {\n\
  background-position: -192px -44px;\n\
}\n\
.flag.flag-ge {\n\
  background-position: -208px -44px;\n\
}\n\
.flag.flag-gf {\n\
  background-position: -224px -44px;\n\
}\n\
.flag.flag-gg {\n\
  background-position: -240px -44px;\n\
}\n\
.flag.flag-gh {\n\
  background-position: 0 -55px;\n\
}\n\
.flag.flag-gi {\n\
  background-position: -16px -55px;\n\
}\n\
.flag.flag-gl {\n\
  background-position: -32px -55px;\n\
}\n\
.flag.flag-gm {\n\
  background-position: -48px -55px;\n\
}\n\
.flag.flag-gn {\n\
  background-position: -64px -55px;\n\
}\n\
.flag.flag-gp {\n\
  background-position: -80px -55px;\n\
}\n\
.flag.flag-gq {\n\
  background-position: -96px -55px;\n\
}\n\
.flag.flag-gr {\n\
  background-position: -112px -55px;\n\
}\n\
.flag.flag-gs {\n\
  background-position: -128px -55px;\n\
}\n\
.flag.flag-gt {\n\
  background-position: -144px -55px;\n\
}\n\
.flag.flag-gu {\n\
  background-position: -160px -55px;\n\
}\n\
.flag.flag-gw {\n\
  background-position: -176px -55px;\n\
}\n\
.flag.flag-gy {\n\
  background-position: -192px -55px;\n\
}\n\
.flag.flag-hk {\n\
  background-position: -208px -55px;\n\
}\n\
.flag.flag-hm {\n\
  background-position: -224px -55px;\n\
}\n\
.flag.flag-hn {\n\
  background-position: -240px -55px;\n\
}\n\
.flag.flag-hr {\n\
  background-position: 0 -66px;\n\
}\n\
.flag.flag-ht {\n\
  background-position: -16px -66px;\n\
}\n\
.flag.flag-hu {\n\
  background-position: -32px -66px;\n\
}\n\
.flag.flag-ic {\n\
  background-position: -48px -66px;\n\
}\n\
.flag.flag-id {\n\
  background-position: -64px -66px;\n\
}\n\
.flag.flag-ie {\n\
  background-position: -80px -66px;\n\
}\n\
.flag.flag-il {\n\
  background-position: -96px -66px;\n\
}\n\
.flag.flag-im {\n\
  background-position: -112px -66px;\n\
}\n\
.flag.flag-in {\n\
  background-position: -128px -66px;\n\
}\n\
.flag.flag-io {\n\
  background-position: -144px -66px;\n\
}\n\
.flag.flag-iq {\n\
  background-position: -160px -66px;\n\
}\n\
.flag.flag-ir {\n\
  background-position: -176px -66px;\n\
}\n\
.flag.flag-is {\n\
  background-position: -192px -66px;\n\
}\n\
.flag.flag-it {\n\
  background-position: -208px -66px;\n\
}\n\
.flag.flag-je {\n\
  background-position: -224px -66px;\n\
}\n\
.flag.flag-jm {\n\
  background-position: -240px -66px;\n\
}\n\
.flag.flag-jo {\n\
  background-position: 0 -77px;\n\
}\n\
.flag.flag-jp {\n\
  background-position: -16px -77px;\n\
}\n\
.flag.flag-ke {\n\
  background-position: -32px -77px;\n\
}\n\
.flag.flag-kg {\n\
  background-position: -48px -77px;\n\
}\n\
.flag.flag-kh {\n\
  background-position: -64px -77px;\n\
}\n\
.flag.flag-ki {\n\
  background-position: -80px -77px;\n\
}\n\
.flag.flag-km {\n\
  background-position: -96px -77px;\n\
}\n\
.flag.flag-kn {\n\
  background-position: -112px -77px;\n\
}\n\
.flag.flag-kp {\n\
  background-position: -128px -77px;\n\
}\n\
.flag.flag-kr {\n\
  background-position: -144px -77px;\n\
}\n\
.flag.flag-kurdistan {\n\
  background-position: -160px -77px;\n\
}\n\
.flag.flag-kw {\n\
  background-position: -176px -77px;\n\
}\n\
.flag.flag-ky {\n\
  background-position: -192px -77px;\n\
}\n\
.flag.flag-kz {\n\
  background-position: -208px -77px;\n\
}\n\
.flag.flag-la {\n\
  background-position: -224px -77px;\n\
}\n\
.flag.flag-lb {\n\
  background-position: -240px -77px;\n\
}\n\
.flag.flag-lc {\n\
  background-position: 0 -88px;\n\
}\n\
.flag.flag-li {\n\
  background-position: -16px -88px;\n\
}\n\
.flag.flag-lk {\n\
  background-position: -32px -88px;\n\
}\n\
.flag.flag-lr {\n\
  background-position: -48px -88px;\n\
}\n\
.flag.flag-ls {\n\
  background-position: -64px -88px;\n\
}\n\
.flag.flag-lt {\n\
  background-position: -80px -88px;\n\
}\n\
.flag.flag-lu {\n\
  background-position: -96px -88px;\n\
}\n\
.flag.flag-lv {\n\
  background-position: -112px -88px;\n\
}\n\
.flag.flag-ly {\n\
  background-position: -128px -88px;\n\
}\n\
.flag.flag-ma {\n\
  background-position: -144px -88px;\n\
}\n\
.flag.flag-mc {\n\
  background-position: -160px -88px;\n\
}\n\
.flag.flag-md {\n\
  background-position: -176px -88px;\n\
}\n\
.flag.flag-me {\n\
  background-position: -192px -88px;\n\
}\n\
.flag.flag-mg {\n\
  background-position: -208px -88px;\n\
}\n\
.flag.flag-mh {\n\
  background-position: -224px -88px;\n\
}\n\
.flag.flag-mk {\n\
  background-position: -240px -88px;\n\
}\n\
.flag.flag-ml {\n\
  background-position: 0 -99px;\n\
}\n\
.flag.flag-mm {\n\
  background-position: -16px -99px;\n\
}\n\
.flag.flag-mn {\n\
  background-position: -32px -99px;\n\
}\n\
.flag.flag-mo {\n\
  background-position: -48px -99px;\n\
}\n\
.flag.flag-mp {\n\
  background-position: -64px -99px;\n\
}\n\
.flag.flag-mq {\n\
  background-position: -80px -99px;\n\
}\n\
.flag.flag-mr {\n\
  background-position: -96px -99px;\n\
}\n\
.flag.flag-ms {\n\
  background-position: -112px -99px;\n\
}\n\
.flag.flag-mt {\n\
  background-position: -128px -99px;\n\
}\n\
.flag.flag-mu {\n\
  background-position: -144px -99px;\n\
}\n\
.flag.flag-mv {\n\
  background-position: -160px -99px;\n\
}\n\
.flag.flag-mw {\n\
  background-position: -176px -99px;\n\
}\n\
.flag.flag-mx {\n\
  background-position: -192px -99px;\n\
}\n\
.flag.flag-my {\n\
  background-position: -208px -99px;\n\
}\n\
.flag.flag-mz {\n\
  background-position: -224px -99px;\n\
}\n\
.flag.flag-na {\n\
  background-position: -240px -99px;\n\
}\n\
.flag.flag-nc {\n\
  background-position: 0 -110px;\n\
}\n\
.flag.flag-ne {\n\
  background-position: -16px -110px;\n\
}\n\
.flag.flag-nf {\n\
  background-position: -32px -110px;\n\
}\n\
.flag.flag-ng {\n\
  background-position: -48px -110px;\n\
}\n\
.flag.flag-ni {\n\
  background-position: -64px -110px;\n\
}\n\
.flag.flag-nl {\n\
  background-position: -80px -110px;\n\
}\n\
.flag.flag-no {\n\
  background-position: -96px -110px;\n\
}\n\
.flag.flag-np {\n\
  background-position: -112px -110px;\n\
}\n\
.flag.flag-nr {\n\
  background-position: -128px -110px;\n\
}\n\
.flag.flag-nu {\n\
  background-position: -144px -110px;\n\
}\n\
.flag.flag-nz {\n\
  background-position: -160px -110px;\n\
}\n\
.flag.flag-om {\n\
  background-position: -176px -110px;\n\
}\n\
.flag.flag-pa {\n\
  background-position: -192px -110px;\n\
}\n\
.flag.flag-pe {\n\
  background-position: -208px -110px;\n\
}\n\
.flag.flag-pf {\n\
  background-position: -224px -110px;\n\
}\n\
.flag.flag-pg {\n\
  background-position: -240px -110px;\n\
}\n\
.flag.flag-ph {\n\
  background-position: 0 -121px;\n\
}\n\
.flag.flag-pk {\n\
  background-position: -16px -121px;\n\
}\n\
.flag.flag-pl {\n\
  background-position: -32px -121px;\n\
}\n\
.flag.flag-pm {\n\
  background-position: -48px -121px;\n\
}\n\
.flag.flag-pn {\n\
  background-position: -64px -121px;\n\
}\n\
.flag.flag-pr {\n\
  background-position: -80px -121px;\n\
}\n\
.flag.flag-ps {\n\
  background-position: -96px -121px;\n\
}\n\
.flag.flag-pt {\n\
  background-position: -112px -121px;\n\
}\n\
.flag.flag-pw {\n\
  background-position: -128px -121px;\n\
}\n\
.flag.flag-py {\n\
  background-position: -144px -121px;\n\
}\n\
.flag.flag-qa {\n\
  background-position: -160px -121px;\n\
}\n\
.flag.flag-re {\n\
  background-position: -176px -121px;\n\
}\n\
.flag.flag-ro {\n\
  background-position: -192px -121px;\n\
}\n\
.flag.flag-rs {\n\
  background-position: -208px -121px;\n\
}\n\
.flag.flag-ru {\n\
  background-position: -224px -121px;\n\
}\n\
.flag.flag-rw {\n\
  background-position: -240px -121px;\n\
}\n\
.flag.flag-sa {\n\
  background-position: 0 -132px;\n\
}\n\
.flag.flag-sb {\n\
  background-position: -16px -132px;\n\
}\n\
.flag.flag-sc {\n\
  background-position: -32px -132px;\n\
}\n\
.flag.flag-scotland {\n\
  background-position: -48px -132px;\n\
}\n\
.flag.flag-sd {\n\
  background-position: -64px -132px;\n\
}\n\
.flag.flag-se {\n\
  background-position: -80px -132px;\n\
}\n\
.flag.flag-sg {\n\
  background-position: -96px -132px;\n\
}\n\
.flag.flag-sh {\n\
  background-position: -112px -132px;\n\
}\n\
.flag.flag-si {\n\
  background-position: -128px -132px;\n\
}\n\
.flag.flag-sk {\n\
  background-position: -144px -132px;\n\
}\n\
.flag.flag-sl {\n\
  background-position: -160px -132px;\n\
}\n\
.flag.flag-sm {\n\
  background-position: -176px -132px;\n\
}\n\
.flag.flag-sn {\n\
  background-position: -192px -132px;\n\
}\n\
.flag.flag-so {\n\
  background-position: -208px -132px;\n\
}\n\
.flag.flag-somaliland {\n\
  background-position: -224px -132px;\n\
}\n\
.flag.flag-sr {\n\
  background-position: -240px -132px;\n\
}\n\
.flag.flag-ss {\n\
  background-position: 0 -143px;\n\
}\n\
.flag.flag-st {\n\
  background-position: -16px -143px;\n\
}\n\
.flag.flag-sv {\n\
  background-position: -32px -143px;\n\
}\n\
.flag.flag-sx {\n\
  background-position: -48px -143px;\n\
}\n\
.flag.flag-sy {\n\
  background-position: -64px -143px;\n\
}\n\
.flag.flag-sz {\n\
  background-position: -80px -143px;\n\
}\n\
.flag.flag-tc {\n\
  background-position: -96px -143px;\n\
}\n\
.flag.flag-td {\n\
  background-position: -112px -143px;\n\
}\n\
.flag.flag-tf {\n\
  background-position: -128px -143px;\n\
}\n\
.flag.flag-tg {\n\
  background-position: -144px -143px;\n\
}\n\
.flag.flag-th {\n\
  background-position: -160px -143px;\n\
}\n\
.flag.flag-tj {\n\
  background-position: -176px -143px;\n\
}\n\
.flag.flag-tk {\n\
  background-position: -192px -143px;\n\
}\n\
.flag.flag-tl {\n\
  background-position: -208px -143px;\n\
}\n\
.flag.flag-tm {\n\
  background-position: -224px -143px;\n\
}\n\
.flag.flag-tn {\n\
  background-position: -240px -143px;\n\
}\n\
.flag.flag-to {\n\
  background-position: 0 -154px;\n\
}\n\
.flag.flag-tr {\n\
  background-position: -16px -154px;\n\
}\n\
.flag.flag-tt {\n\
  background-position: -32px -154px;\n\
}\n\
.flag.flag-tv {\n\
  background-position: -48px -154px;\n\
}\n\
.flag.flag-tw {\n\
  background-position: -64px -154px;\n\
}\n\
.flag.flag-tz {\n\
  background-position: -80px -154px;\n\
}\n\
.flag.flag-ua {\n\
  background-position: -96px -154px;\n\
}\n\
.flag.flag-ug {\n\
  background-position: -112px -154px;\n\
}\n\
.flag.flag-um {\n\
  background-position: -128px -154px;\n\
}\n\
.flag.flag-us {\n\
  background-position: -144px -154px;\n\
}\n\
.flag.flag-uy {\n\
  background-position: -160px -154px;\n\
}\n\
.flag.flag-uz {\n\
  background-position: -176px -154px;\n\
}\n\
.flag.flag-va {\n\
  background-position: -192px -154px;\n\
}\n\
.flag.flag-vc {\n\
  background-position: -208px -154px;\n\
}\n\
.flag.flag-ve {\n\
  background-position: -224px -154px;\n\
}\n\
.flag.flag-vg {\n\
  background-position: -240px -154px;\n\
}\n\
.flag.flag-vi {\n\
  background-position: 0 -165px;\n\
}\n\
.flag.flag-vn {\n\
  background-position: -16px -165px;\n\
}\n\
.flag.flag-vu {\n\
  background-position: -32px -165px;\n\
}\n\
.flag.flag-wales {\n\
  background-position: -48px -165px;\n\
}\n\
.flag.flag-wf {\n\
  background-position: -64px -165px;\n\
}\n\
.flag.flag-ws {\n\
  background-position: -80px -165px;\n\
}\n\
.flag.flag-ye {\n\
  background-position: -96px -165px;\n\
}\n\
.flag.flag-yt {\n\
  background-position: -112px -165px;\n\
}\n\
.flag.flag-za {\n\
  background-position: -128px -165px;\n\
}\n\
.flag.flag-zanzibar {\n\
  background-position: -144px -165px;\n\
}\n\
.flag.flag-zm {\n\
  background-position: -160px -165px;\n\
}\n\
.flag.flag-zw {\n\
  background-position: -176px -165px;\n\
}\n\
.localizationTool:hover {\n\
  cursor: pointer;\n\
  cursor: hand;\n\
}\n\
.localizationTool.ltool-is-visible ul {\n\
  display: block;\n\
  float: left;\n\
  position: absolute;\n\
  width: 100%;\n\
  list-style-type: none;\n\
}\n\
.localizationTool.ltool-is-visible .ltool-dropdown-label-arrow {\n\
  /* the arrow */\n\
\n\
  content: "";\n\
  display: block;\n\
  width: 0;\n\
  height: 0;\n\
  border-top: 10px solid transparent;\n\
  border-left: 10px solid transparent;\n\
  border-bottom: 10px solid #deedf7;\n\
  border-right: 10px solid transparent;\n\
  position: absolute;\n\
  right: 8px;\n\
  top: 7px;\n\
}\n\
.localizationTool {\n\
  color: #333333;\n\
  /* background: #8dc1e2; */\n\
  background: #009688;\n\
  position: relative;\n\
}\n\
.localizationTool .ltool-dropdown-label {\n\
  display: block;\n\
  padding: 12px 0 12px 12px;\n\
  color: #FFF;\n\
  border: 0;\n\
  position: relative;\n\
}\n\
.localizationTool .ltool-dropdown-label img,\n\
.localizationTool .ltool-dropdown-label .ltool-language-flag {\n\
  margin-left: 0;\n\
}\n\
.localizationTool .ltool-dropdown-label .ltool-language-name {\n\
  color: #deedf7;\n\
}\n\
.localizationTool .ltool-dropdown-label-arrow {\n\
  /* the arrow */\n\
\n\
  content: "";\n\
  display: block;\n\
  width: 0;\n\
  height: 0;\n\
  border-top: 10px solid #deedf7;\n\
  border-left: 10px solid transparent;\n\
  border-bottom: 10px solid transparent;\n\
  border-right: 10px solid transparent;\n\
  position: absolute;\n\
  right: 8px;\n\
  top: 17px;\n\
}\n\
.localizationTool img,\n\
.localizationTool div {\n\
  display: inline;\n\
}\n\
.localizationTool li {\n\
  display: block;\n\
  /* background: #deedf7; */\n\
  background: #009688;\n\
  padding: 5px;\n\
}\n\
.localizationTool li.ltool-is-selected {\n\
  /* background: #f5f1d6; */\n\
  background: #148B7E;\n\
}\n\
.localizationTool li:hover {\n\
  /* background: #f5f1d6; */\n\
  background: #148B7E;\n\
  outline: 0;\n\
  -webkit-appearance: none;\n\
  transition: all .3s;\n\
  -webkit-transition: all .3s;\n\
  box-sizing: border-box;\n\
}\n\
.localizationTool img {\n\
  width: 16px;\n\
  height: 11px;\n\
}\n\
.localizationTool .ltool-language-name {\n\
  /* color: #8dc1e2; */\n\
  color: #ebebeb;\n\
}\n\
.localizationTool .ltool-language-flag {\n\
  display: block;\n\
  float: left;\n\
  margin-top: 3px;\n\
}\n\
.localizationTool .ltool-language-flag,\n\
.localizationTool .ltool-language-countryname {\n\
  margin-left: 8px;\n\
}\n\
.localizationTool ul {\n\
  margin: 0;\n\
  padding: 0;\n\
  display: none;\n\
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

