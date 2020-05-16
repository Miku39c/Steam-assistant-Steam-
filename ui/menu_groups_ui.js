//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * UI类 - 您的组 模块 UI具体实现
 * @class
 * @classdesc UI类 - 您的组 模块 UI具体实现
 * @extends UI
 */

// var DOMPurify = function DOMPurify(root) {
//     return createDOMPurify(root);
//   };

// var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


// // Most of the code here comes from dselect.js
// class Sortbox {

//     static init() {
//         this._activeDropLists = {};
//         this._lastSelectHideTime = 0;

//         document.addEventListener("mousedown", e => this._handleMouseClick(e));
//     }

//     static _handleMouseClick(e) {
//         for (let key of Object.keys(this._activeDropLists)) {
// 			if (!this._activeDropLists[key]) continue;
			
// 		    let ulAboveEvent = e.target.closest("ul");
		
//             if (ulAboveEvent && ulAboveEvent.id === `${key}_droplist`) continue;
		
//             this._hide(key);
// 	    }
//     }

//     static _highlightItem(id, index, bSetSelected) {
//         let droplist = document.querySelector(`#${id}_droplist`);
//         let trigger = document.querySelector(`#${id}_trigger`);
//         let rgItems = droplist.getElementsByTagName("a");

//         if (index >= 0 && index < rgItems.length ) {
//             let item = rgItems[index];
            
//             if (typeof trigger.highlightedItem !== "undefined" && trigger.highlightedItem !== index)
//                 rgItems[trigger.highlightedItem].className = "inactive_selection";
                
//             trigger.highlightedItem = index;
//             rgItems[index].className = "highlighted_selection";
            
//             let yOffset = rgItems[index].offsetTop + rgItems[index].clientHeight;
//             let curVisibleOffset = droplist.scrollTop + droplist.clientHeight;
//             let bScrolledDown = false;
//             let nMaxLoopIterations = rgItems.length;
//             let nLoopCounter = 0;

//             while (curVisibleOffset < yOffset && nLoopCounter++ < nMaxLoopIterations) {
//                 droplist.scrollTop += rgItems[index].clientHeight;
//                 curVisibleOffset = droplist.scrollTop+droplist.clientHeight;
//                 bScrolledDown = true;
//             }
            
//             if ( !bScrolledDown ) {
//                 nLoopCounter = 0;
//                 yOffset = rgItems[index].offsetTop;
//                 curVisibleOffset = droplist.scrollTop;
//                 while(curVisibleOffset > yOffset && nLoopCounter++ < nMaxLoopIterations) {
//                     droplist.scrollTop -= rgItems[index].clientHeight;
//                     curVisibleOffset = droplist.scrollTop;
//                 }
//             }
            
//             if (bSetSelected) {
//                 HTML.inner(trigger, item.innerHTML);
//                 let input = document.querySelector(`#${id}`);
//                 input.value = item.id;
//                 input.dispatchEvent(new Event("change"));
                
//                 this._hide(id);
//             }
//         }
//     }

//     static _onFocus(id) {
//         this._activeDropLists[id] = true;
//     }

//     static _onBlur(id) {
// 		if (!this._classCheck(document.querySelector(`#${id}_trigger`), "activetrigger"))
// 	        this._activeDropLists[id] = false;
//     }

//     static _hide(id) {
//         let droplist = document.querySelector(`#${id}_droplist`);
//         let trigger = document.querySelector(`#${id}_trigger`);
	
// 		let d = new Date();
// 	    this._lastSelectHideTime = d.valueOf();
	
//         trigger.className = "trigger";
//         droplist.className = "dropdownhidden";
//         this._activeDropLists[id] = false;
//         trigger.focus();
//     }

//     static _show(id) {
// 		let d = new Date();
// 	    if (d - this._lastSelectHideTime < 50) return;
		
//         let droplist = document.querySelector(`#${id}_droplist`);
//         let trigger = document.querySelector(`#${id}_trigger`);
        
//         trigger.className = "activetrigger";
//         droplist.className = "dropdownvisible";
//         this._activeDropLists[id] = true;
//         trigger.focus();
//     }

//     static _onTriggerClick(id) {
//         if (!this._classCheck(document.querySelector(`#${id}_trigger`), "activetrigger")) {
//             this._show(id);
//         }
//     }

//     static _classCheck(element, className) {
//         return new RegExp(`\\b${className}\\b`).test(element.className);
//     }

//     /**
//      * NOTE FOR ADDON REVIEWER:
//      * Elements returned by this function are already sanitized (calls to HTML class),
//      * so they can be safely inserted without being sanitized again.
//      * If we would sanitize them again, all event listeners would be lost due to
//      * DOMPurify only returning HTML strings.
//      */
//     static get(name, options, initialOption, changeFn, storageOption) {

//         let id = `sort_by_${name}`;
//         let reversed = initialOption.endsWith("_DESC");

//         let arrowDown = "↓";
//         let arrowUp = "↑";
        
//         let box = HTML.element(
//         `<div class="es-sortbox es-sortbox--${name}">
//             <div class="es-sortbox__label">${Localization.str.sort_by}</div>
//             <div class="es-sortbox__container">
//                 <input id="${id}" type="hidden" name="${name}" value="${initialOption}">
//                 <a class="trigger" id="${id}_trigger"></a>
//                 <div class="es-dropdown">
//                     <ul id="${id}_droplist" class="es-dropdown__list dropdownhidden"></ul>
//                 </div>
//             </div>
//             <span class="es-sortbox__reverse">${arrowDown}</span>
//         </div>`);

//         let input = box.querySelector(`#${id}`);
//         input.addEventListener("change", function() { onChange(this.value.replace(`${id}_`, ''), reversed); });

//         // Trigger changeFn for initial option
//         if (initialOption !== "default_ASC") {
//             input.dispatchEvent(new Event("change"));
//         }

//         let reverseEl = box.querySelector(".es-sortbox__reverse");
//         reverseEl.addEventListener("click", () => {
//             reversed = !reversed;
//             reverseEl.textContent = reversed ? arrowUp : arrowDown;
//             onChange(input.value.replace(`${id}_`, ''), reversed);
//         });
//         if (reversed) reverseEl.textContent = arrowUp;

//         let trigger = box.querySelector(`#${id}_trigger`);
//         trigger.addEventListener("focus", () => this._onFocus(id));
//         trigger.addEventListener("blur", () => this._onBlur(id));
//         trigger.addEventListener("click", () => this._onTriggerClick(id));

//         let ul = box.querySelector("ul");
//         let trimmedOption = getTrimmedValue(initialOption);
//         for (let i = 0; i < options.length; ++i) {
//             let [key, text] = options[i];

//             let toggle = "inactive";
//             if (key === trimmedOption) {
//                 box.querySelector(`#${id}`).value = key;
//                 box.querySelector(".trigger").textContent = text;
//                 toggle = "highlighted";
//             }

//             HTML.beforeEnd(ul,
//                 `<li>
//                     <a class="${toggle}_selection" tabindex="99999" id="${id}_${key}">${text}</a>
//                 </li>`);

//             let a = ul.querySelector("li:last-child > a");
//             //a.href = "javascript:DSelectNoop()";
//             a.addEventListener("mouseover", () => this._highlightItem(id, i, false));
//             a.addEventListener("click",     () => this._highlightItem(id, i, true));
//         }

//         function getTrimmedValue(val) { return val.replace(/(_ASC|_DESC)$/, ''); }

//         function onChange(val, reversed) {
//             val = getTrimmedValue(val);
//             changeFn(val, reversed);
//             if (storageOption) { SyncedStorage.set(storageOption, `${val}_${reversed ? "DESC" : "ASC"}`); }
//         }

//         return box;
//     }
// }



//  DOMPurify.sanitize = function (dirty, cfg) {
//     var body = void 0;
//     var importedNode = void 0;
//     var currentNode = void 0;
//     var oldNode = void 0;
//     var returnNode = void 0;
//     /* Make sure we have a string to sanitize.
//       DO NOT return early, as this will return the wrong type if
//       the user has requested a DOM object rather than a string */
//     if (!dirty) {
//       dirty = '<!-->';
//     }

//     /* Stringify, in case dirty is an object */
//     if (typeof dirty !== 'string' && !_isNode(dirty)) {
//       // eslint-disable-next-line no-negated-condition
//       if (typeof dirty.toString !== 'function') {
//         throw new TypeError('toString is not a function');
//       } else {
//         dirty = dirty.toString();
//         if (typeof dirty !== 'string') {
//           throw new TypeError('dirty is not a string, aborting');
//         }
//       }
//     }

//     /* Check we can run. Otherwise fall back or ignore */
//     if (!DOMPurify.isSupported) {
//       if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
//         if (typeof dirty === 'string') {
//           return window.toStaticHTML(dirty);
//         }

//         if (_isNode(dirty)) {
//           return window.toStaticHTML(dirty.outerHTML);
//         }
//       }

//       return dirty;
//     }

//     /* Assign config vars */
//     if (!SET_CONFIG) {
//       _parseConfig(cfg);
//     }

//     /* Clean up removed elements */
//     DOMPurify.removed = [];

//     if (IN_PLACE) {
//       /* No special handling necessary for in-place sanitization */
//     } else if (dirty instanceof Node) {
//       /* If dirty is a DOM element, append to an empty document to avoid
//          elements being stripped by the parser */
//       body = _initDocument('<!-->');
//       importedNode = body.ownerDocument.importNode(dirty, true);
//       if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
//         /* Node is already a body, use as is */
//         body = importedNode;
//       } else {
//         // eslint-disable-next-line unicorn/prefer-node-append
//         body.appendChild(importedNode);
//       }
//     } else {
//       /* Exit directly if we have nothing to do */
//       if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf('<') === -1) {
//         return trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
//       }

//       /* Initialize the document to work on */
//       body = _initDocument(dirty);

//       /* Check we have a DOM node from the data */
//       if (!body) {
//         return RETURN_DOM ? null : emptyHTML;
//       }
//     }

//     /* Remove first element node (ours) if FORCE_BODY is set */
//     if (body && FORCE_BODY) {
//       _forceRemove(body.firstChild);
//     }

//     /* Get node iterator */
//     var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

//     /* Now start iterating over the created document */
//     while (currentNode = nodeIterator.nextNode()) {
//       /* Fix IE's strange behavior with manipulated textNodes #89 */
//       if (currentNode.nodeType === 3 && currentNode === oldNode) {
//         continue;
//       }

//       /* Sanitize tags and elements */
//       if (_sanitizeElements(currentNode)) {
//         continue;
//       }

//       /* Shadow DOM detected, sanitize it */
//       if (currentNode.content instanceof DocumentFragment) {
//         _sanitizeShadowDOM(currentNode.content);
//       }

//       /* Check attributes, sanitize if necessary */
//       _sanitizeAttributes(currentNode);

//       oldNode = currentNode;
//     }

//     oldNode = null;

//     /* If we sanitized `dirty` in-place, return it. */
//     if (IN_PLACE) {
//       return dirty;
//     }

//     /* Return sanitized string or DOM */
//     if (RETURN_DOM) {
//       if (RETURN_DOM_FRAGMENT) {
//         returnNode = createDocumentFragment.call(body.ownerDocument);

//         while (body.firstChild) {
//           // eslint-disable-next-line unicorn/prefer-node-append
//           returnNode.appendChild(body.firstChild);
//         }
//       } else {
//         returnNode = body;
//       }

//       if (RETURN_DOM_IMPORT) {
//         /* AdoptNode() is not used because internal state is not reset
//                (e.g. the past names map of a HTMLFormElement), this is safe
//                in theory but we would rather not risk another attack vector.
//                The state that is cloned by importNode() is explicitly defined
//                by the specs. */
//         returnNode = importNode.call(originalDocument, returnNode, true);
//       }

//       return returnNode;
//     }

//     var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

//     /* Sanitize final string template-safe */
//     if (SAFE_FOR_TEMPLATES) {
//       serializedHTML = serializedHTML.replace(MUSTACHE_EXPR$$1, ' ');
//       serializedHTML = serializedHTML.replace(ERB_EXPR$$1, ' ');
//     }

//     return trustedTypesPolicy ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
//   };


// 		class HTML {
		
// 		    static escape(str) {
// 		        // @see https://stackoverflow.com/a/4835406
// 		        let map = {
// 		            '&': '&amp;',
// 		            '<': '&lt;',
// 		            '>': '&gt;',
// 		            '"': '&quot;',
// 		            "'": '&#039;'
// 		        };
		
// 		        return str.replace(/[&<>"']/g, function(m) { return map[m]; });
// 		    }
		
// 		    static fragment(html) {
// 		        let template = document.createElement('template');
// 		        template.innerHTML = DOMPurify.sanitize(html);
// 		        return template.content;
// 		    }
		
// 		    static element(html) {
// 		        return HTML.fragment(html).firstElementChild;
// 		    }
		
// 		    static inner(node, html) {
// 		        if (typeof node == 'undefined' || node === null) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
// 		        if (typeof node == "string") {
// 		            node = document.querySelector(node);
// 		        }
// 		        if (!(node instanceof Element)) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
		        
// 		        node.innerHTML = DOMPurify.sanitize(html);
// 		        return node;
// 		    }
		
// 		    static replace(node, html) {
// 		        if (typeof node == 'undefined' || node === null) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
// 		        if (typeof node == "string") {
// 		            node = document.querySelector(node);
// 		        }
// 		        if (!(node instanceof Element)) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
		
// 		        node.outerHTML = DOMPurify.sanitize(html);
// 		        return node;
// 		    }
		
// 		    static wrap(node, html) {
// 		        if (typeof node == 'undefined' || node === null) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
// 		        if (typeof node == "string") {
// 		            node = document.querySelector(node);
// 		        }
// 		        if (!(node instanceof Element)) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
		
// 		        let wrapper = HTML.element(html);
// 		        node.replaceWith(wrapper);
// 		        wrapper.append(node);
// 		        return wrapper;
// 		    }
		
// 		    static adjacent(node, position, html) {
// 		        if (typeof node == 'undefined' || node === null) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
// 		        if (typeof node == "string") {
// 		            node = document.querySelector(node);
// 		        }
// 		        if (!(node instanceof Element)) {
// 		            console.warn(`${node} is not an Element.`);
// 		            return null;
// 		        }
		        
// 		        node.insertAdjacentHTML(position, DOMPurify.sanitize(html));
// 		        return node;
// 		    }
		
// 		    static beforeBegin(node, html) {
// 		        HTML.adjacent(node, "beforebegin", html);
// 		    }
		
// 		    static afterBegin(node, html) {
// 		        HTML.adjacent(node, "afterbegin", html);
// 		    }
		
// 		    static beforeEnd(node, html) {
// 		        HTML.adjacent(node, "beforeend", html);
// 		    }
		
// 		    static afterEnd(node, html) {
// 		        HTML.adjacent(node, "afterend", html);
// 		    }
// 		}
		
// 		class GroupsPageClass {
		
// 		    constructor() {
// 		        this._groups = Array.from(document.querySelectorAll(".group_block"));
// 		        this._initSort = true;
		
// 		        this._moveSearchBar();
// 		        this._addSort();
// 		        this._addManageBtn();
// 		    }
		
// 		    _moveSearchBar() {
// 		        // move the search bar to the same position as on friends page
// 		        let container = HTML.wrap("#search_text_box", '<div class="searchBarContainer"></div>');
// 		        document.querySelector("#search_results").insertAdjacentElement("beforebegin", container);
// 		    }
		
// 		    _addSort() {
// 		        document.querySelector("span.profile_groups.title").insertAdjacentElement("afterend", Sortbox.get(
// 		            "groups",
// 		            [
// 		                ["default", Localization.str.theworddefault],
// 		                ["members", Localization.str.members],
// 		                ["names", Localization.str.name]
// 		            ],
// 		            SyncedStorage.get("sortgroupsby"),
// 		            (sortBy, reversed) => { this._sortGroups(sortBy, reversed) },
// 		            "sortgroupsby")
// 		        );
		
// 		        let sortbox = document.querySelector("div.es-sortbox");
// 		        sortbox.style.flexGrow = "2";
// 		        sortbox.style.marginRight = "20px";
// 		        sortbox.style.marginTop = "0";
// 		        sortbox.style.textAlign = "right";
// 		    }
		
// 		    _getSortFunc(sortBy) {
// 		        let property = `esSort${sortBy}`;
// 		        switch(sortBy) {
// 		            case "default":
// 		                return (a, b) => Number(a.dataset[property]) - Number(b.dataset[property]);
// 		            case "members":
// 		                return (a, b) => Number(b.dataset[property]) - Number(a.dataset[property]);
// 		            case "names":
// 		                return (a, b) => a.dataset[property].localeCompare(b.dataset[property]);
// 		        }
// 		    }
		
// 		    _sortGroups(sortBy, reversed) {
// 		        if (this._groups.length === 0) { return; }
		
// 		        if (this._initSort) {
		
// 		            let i = 0;
// 		            for (let group of this._groups) {
// 		                let name = group.querySelector(".groupTitle > a").textContent;
// 		                let membercount = Number(group.querySelector(".memberRow > a").textContent.match(/\d+/g).join(""));
// 		                group.dataset.esSortdefault = i.toString();
// 		                group.dataset.esSortnames = name;
// 		                group.dataset.esSortmembers = membercount.toString();
// 		                i++;
// 		            }
		
// 		            this._initSort = false;
// 		        }
		
// 		        this._groups.sort(this._getSortFunc(sortBy, `esSort${sortBy}`));
		
// 		        let searchResults = document.querySelector("#search_results_empty");
// 		        for (let group of this._groups) {
// 		            if (reversed) {
// 		                searchResults.insertAdjacentElement("afterend", group);
// 		            } else {
// 		                searchResults.parentElement.appendChild(group);
// 		            }
// 		        }
// 		    }
		
// 		    _addManageBtn() {
// 		        if (this._groups.length === 0) { return; }
// 		        if (!this._groups[0].querySelector(".actions")) { return; }
		
// 		        let groupsStr = Localization.str.groups;
		
// 		        HTML.beforeEnd(".title_bar", 
// 		            `<button id="manage_friends_control" class="profile_friends manage_link btnv6_blue_hoverfade btn_medium btn_uppercase">
// 		                <span>${groupsStr.manage_groups}</span>
// 		            </button>`);
		
// 		        HTML.afterEnd(".title_bar",
// 		            `<div id="manage_friends" class="manage_friends_panel">
// 		                <div class="row">${groupsStr.action_groups}
// 		                    <span class="row">
// 		                        <span class="dimmed">${groupsStr.select}</span>
// 		                        <span class="selection_type" id="es_select_all">${Localization.str.all}</span>
// 		                        <span class="selection_type" id="es_select_none">${Localization.str.none}</span>
// 		                        <span class="selection_type" id="es_select_inverse">${Localization.str.inverse}</span>
// 		                    </span>
// 		                </div>
// 		                <div class="row">
// 		                    <span class="manage_action anage_action btnv6_lightblue_blue btn_medium btn_uppercase" id="es_leave_groups">
// 		                        <span>${groupsStr.leave}</span>
// 		                    </span>
// 		                    <span id="selected_msg_err" class="selected_msg error hidden"></span>
// 		                    <span id="selected_msg" class="selected_msg hidden">${groupsStr.selected.replace("__n__", `<span id="selected_count"></span>`)}</span>
// 		                </div>
// 		                <div class="row"></div>
// 		            </div>`);
		
// 		        for (let group of this._groups) {
// 		            group.classList.add("selectable");
// 		            HTML.afterBegin(group, 
// 		                `<div class="indicator select_friend">
// 		                    <input class="select_friend_checkbox" type="checkbox">
// 		                </div>`);
// 		            group.querySelector(".select_friend").addEventListener("click", () => {
// 		                group.classList.toggle("selected");
// 		                group.querySelector(".select_friend_checkbox").checked = group.classList.contains("selected");
// 		                ExtensionLayer.runInPageContext(() => { UpdateSelection(); });
// 		            });    
// 		        }
		
// 		        document.querySelector("#manage_friends_control").addEventListener("click", () => {
// 		            ExtensionLayer.runInPageContext(() => { ToggleManageFriends(); });
// 		        });
		
// 		        document.querySelector("#es_select_all").addEventListener("click", () => {
// 		            ExtensionLayer.runInPageContext(() => { SelectAll(); });
// 		        });
		
// 		        document.querySelector("#es_select_none").addEventListener("click", () => {
// 		            ExtensionLayer.runInPageContext(() => { SelectNone(); });
// 		        });
		
// 		        document.querySelector("#es_select_inverse").addEventListener("click", () => {
// 		            ExtensionLayer.runInPageContext(() => { SelectInverse(); });
// 		        });
		
// 		        document.querySelector("#es_leave_groups").addEventListener("click", () => this._leaveGroups());
// 		    };
		
// 		    async _leaveGroups() {
// 		        let selected = [];
		
// 		        for (let group of this._groups) {
// 		            if (!group.classList.contains("selected")) {
// 		                continue;
// 		            }
		
// 		            let actions = group.querySelector(".actions");
// 		            let admin = actions.querySelector("[href*='/edit']");
// 		            let split = actions.querySelector("[onclick*=ConfirmLeaveGroup]")
// 		                .getAttribute("onclick").split(/'|"/);
// 		            let id = split[1];
		
// 		            if (admin) {
// 		                let name = split[3];
		
// 		                let body = Localization.str.groups.leave_admin_confirm.replace("__name__", `<a href=\\"/gid/${id}\\" target=\\"_blank\\">${name}</a>`);
// 		                let result = await ConfirmDialog.open(Localization.str.groups.leave, body);
// 		                let cont = (result === "OK");
// 		                if (!cont) {
// 		                    group.querySelector(".select_friend").click();
// 		                    continue;
// 		                }
// 		            }
		
// 		            selected.push([id, group]);
// 		        }
		
// 		        if (selected.length > 0) {
// 		            let body = Localization.str.groups.leave_groups_confirm.replace("__n__", selected.length);
// 		            let result = await ConfirmDialog.open(Localization.str.groups.leave, body);
		
// 		            if (result === "OK") {
// 		                for (let tuple of selected) {
// 		                    let [id, group] = tuple;
// 		                    let res = await this._leaveGroup(id).catch(err => console.error(err));
		
// 		                    if (!res || !res.success) {
// 		                        console.error("Failed to leave group " + id);
// 		                        continue;
// 		                    }
		
// 		                    group.style.opacity = "0.3";
// 		                    group.querySelector(".select_friend").click();
// 		                }
// 		            }
// 		        }
// 		    }
		
// 		    _leaveGroup(id) {
// 		        let formData = new FormData();
// 		        formData.append("sessionid", User.getSessionId());
// 		        formData.append("steamid", User.steamId);
// 		        formData.append("ajax", 1);
// 		        formData.append("action", "leave_group");
// 		        formData.append("steamids[]", id);
		
// 		        return RequestData.post(User.profileUrl + "/friends/action", formData, {
// 		            withCredentials: true
// 		        }, "json");
// 		    }
// 		}

class menu_groups_ui extends UI {
	constructor(arg) {
		super();
	}
	
	async initUI(type) { //type: true: 第一次加载, false: 再加载
	
		super.initUI();
		// 设置数据库
		// var db = new DB();
		// db.Test();
		// db.initAndCreateNewDBInstance({
		// 	driver: [localforage.WEBSQL,
		// 			localforage.INDEXEDDB,
		// 			localforage.LOCALSTORAGE],
		// 	name: 'Steam assistant-Conf',
		// 	size: 10485760 //10mb
		// });
		
		g_db = new DB({ //设置
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Conf',
			size: 10485760 //10mb
		},true);
		
		g_db1 = new DB({ //拓展功能
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Expand',
			size: 10485760 //10mb
		},false);
		
		g_db2 = new DB({ //动态助手
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Activity',
			size: 1073741824 //1gb
		},false);
		
		g_db3 = new DB({ //数据分析
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Friend',
			size: 1073741824 //1gb
		},false);
		
		g_db4 = new DB({ //留言设置
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Comment',
			size: 104857600 //100mb
		},false);
		
		await g_db.Write('g_conf',g_conf); //写入
		await g_db.Write('g_uiConf',g_uiConf); //写入
		//debugger
		//var data = await g_db.getAllKeyName();
		//console.log("data",data);
		//var data = await g_db.getKeyNameByIndex(1);
		//console.log("data",data);
		//var data = await g_db.getLength();
		//console.log("data",data);
		
		var data = await g_db.Read('g_conf'); //读取
		console.log("data",data);
		var data = await g_db.Read('g_uiConf'); //读取
		console.log("data",data);
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//await g_db.Remove('g_conf'); //删除数据
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//await g_db.RemoveAll(); //删除所有数据
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//if(data.length == 0){
		//	console.log("没有数据!");
		//}
		
		if(getLoginStatus() == false){ //判断是否登录，如果没有登录则不需要继续运行
			layer.alert('请先登录Steam，才能继续使用哦~', {icon: 0},function(index){
				if(g_conf[0].autoLogin == 1){
					var obj = document.getElementsByClassName("global_action_link");
					for (let i = 0; i < obj.length; i++) {
						if(obj[i].className == "global_action_link"){
							obj[i].click(); //跳转到登录页面
						}
					}
				}
			});
			return false;
		}
		
		readConfInfo(g_steamID); //读取已保存的对应配置信息
		
		if(type){ //第一次加载才需要监听这些事件
			
			//1.监听url中的hash变化  //window.location.hash='state_online'  =>  https://steamcommunity.com/id/miku-39/friends#state_online //页面不刷新,url改变,定位到指定锚点
			window.addEventListener('hashchange',function(event){
				console.log("1.监听url中的hash变化" + event);
				isReCreateUi(); //是否重新创建Ui
			});
			//2.监听通过history来改变url的事件 //浏览器前进，后退等
			window.addEventListener('popstate', function(event) {
				console.log("2.监听通过history来改变url的事件" + event);
				isReCreateUi(); //是否重新创建Ui
			});
			//3.监听pushState和replaceState行为 //pushState可以监听到本页替换超链接
			var _wr = function(type) {
				var orig = history[type];
				return function() {
					var rv = orig.apply(this, arguments);
					var e = new Event(type);
					e.arguments = arguments;
					window.dispatchEvent(e);
					return rv;
				};
			};
			history.pushState = _wr('pushState');
			history.replaceState = _wr('replaceState');
			
			window.addEventListener('replaceState', function(e) {
				console.log('监听到replaceState!');
				isReCreateUi(); //是否重新创建Ui
			});
			window.addEventListener('pushState', function(e) {
				console.log('监听到pushState!');
				var url = window.location.origin + window.location.pathname; //window.location.href //去除参数和锚点后的url 
				//https://steamcommunity.com/id/miku-39/friends?l=english#state_online => https://steamcommunity.com/id/miku-39/friends
				isReCreateUi(); //是否重新创建Ui
			});
		}
		
	}
	async createUI() {
		super.createUI();
		//修改html代码并注册事件，使点击后和刷新后的ui都保持一致
		jQuery(".profile_groups.title_bar").remove(); //删除
		
		jQuery("#groups_list").prepend('\
		<div class="profile_groups title_bar">\
			<span class="profile_groups title">您的组</span>\
			<div class="es-sortbox es-sortbox--groups" style="flex-grow: 2; margin-right: 20px; margin-top: 0px; text-align: right;">\
				<div class="es-sortbox__label">排序依据：</div>\
					<div class="es-sortbox__container">\
						<input value="default" name="groups" type="hidden" id="sort_by_groups">\
						<a id="sort_by_groups_trigger" class="trigger">默认</a>\
						<div class="es-dropdown">\
							<ul class="es-dropdown__list dropdownhidden" id="sort_by_groups_droplist">\
								<li><a id="sort_by_groups_default" tabindex="99999" class="highlighted_selection">默认</a></li>\
								<li><a id="sort_by_groups_members" tabindex="99999" class="inactive_selection">成员</a></li>\
								<li><a id="sort_by_groups_names" tabindex="99999" class="inactive_selection">名称</a></li>\
							</ul>\
						</div>\
					</div>\
					<span class="es-sortbox__reverse">↓</span>\
				</div>\
			<button class="profile_friends manage_link btnv6_blue_hoverfade btn_medium btn_uppercase" id="manage_friends_control">\
				<span>管理组</span>\
		    </button>\
			</div>\
			\
			<div class="manage_friends_panel" id="manage_friends">\
				<div class="row">请在下方选择您要操作的组。\
					<span class="row">\
						<span class="dimmed">选择：</span>\
							<span id="es_select_all" class="selection_type">全部</span>\
							<span id="es_select_none" class="selection_type">无</span>\
							<span id="es_select_inverse" class="selection_type">逆序</span>\
						</span>\
				</div>\
				<div class="row">\
					<span id="es_leave_groups" class="manage_action anage_action btnv6_lightblue_blue btn_medium btn_uppercase">\
						<span>离开组</span>\
					</span>\
					<span class="selected_msg error hidden" id="selected_msg_err"></span>\
					<span class="selected_msg hidden" id="selected_msg">已选择 <span id="selected_count"></span> 个。</span>\
				</div>\
				<div class="row"></div>\
			</div>\
			\
			<div class="searchBarContainer">\
				<input name="search_text_box" id="search_text_box" class="groups_search_text_box" value="" onkeyup="ShowMatching( \'search_results\', \'group_block\', \'data-search\', $J(\'#search_text_box\').val(), UpdateGroupList );" autocomplete="off" autofocus="" placeholder="通过名称搜索组">\
			</div>\
		</div>\
		');
		
		//正常html代码
		jQuery("#manage_friends").after(groupUI_html);
		
		document.querySelector("#manage_friends_control").addEventListener("click", () => {
			ToggleManageFriends();
			var obj = jQuery(".group_block.invite_row");
			
			if(obj.hasClass("manage")){
				obj.removeClass("selectable");
				obj.removeClass("manage");
			}
			else{
				obj.addClass("selectable");
				obj.addClass("manage");
			}
				
		});
		
		document.querySelector("#es_select_all").addEventListener("click", () => {
			SelectAll();
		});
		
		document.querySelector("#es_select_none").addEventListener("click", () => {
			SelectNone();
		});
		
		document.querySelector("#es_select_inverse").addEventListener("click", () => {
			SelectInverse();
		});
		
		
		
		//document.querySelector("#es_leave_groups").addEventListener("click", () => this._leaveGroups());
		
		//(new GroupsPageClass());
		
		if(g_uiConf.isShowQuickNavigationBar){ //是否显示快速导航栏
			//快捷导航栏
			jQuery(".responsive_page_template_content").after(ExpandUI_QuickNavigationBar_html);
		}
		UI.prototype.uiHandler(); //UI与UI事件等相关的处理程序
	}
	
	async reCreateUI(){
		if(await gc_menu_groups_ui.initUI(false) != false){
			await gc_menu_groups_ui.createUI();
		}
	}
	
	async private_saveUIConfFile() {
	
	}
	async private_readUIConfFile() {
	
	}
}

