// ==UserScript==
// @name        SteamCards
// @author      ZeroUnderscoreOu
// @version     1.1.0-alpha
// @icon        https://raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/SteamCards.png
// @downloadURL https://raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/Greasemonkey/SteamCards.user.js
// @updateURL   https://raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/Greasemonkey/SteamCards.user.js
// @namespace   https://github.com/ZeroUnderscoreOu/
// @include     *://store.steampowered.com/app/*
// @include     *://steamcommunity.com/market/search?*appid=753*
// @grant       none
// ==/UserScript==

var CustomStyle = document.createElement("Style");
CustomStyle.type = "Text/CSS";
document.head.appendChild(CustomStyle);
switch (document.location.hostname) {
	case "store.steampowered.com":
		var TmpElem = document.createElement("A");
		var TargetElem = document.getElementsByClassName("apphub_OtherSiteInfo")[0];
		var AppId = document.location.pathname.match(/\/app\/(\d+)/)[1];
		CustomStyle.textContent = "A.CardsButton .ico16 {Background: None;}"; // repeating SteamDB's button styling
		TmpElem.className = "btnv6_blue_hoverfade btn_medium CardsButton"; // Market button
		TmpElem.href = "//steamcommunity.com/market/search?category_753_Game[]=tag_app_" + AppId + "&appid=753";
		TmpElem = TmpElem.appendChild(document.createElement("Span"));
		TmpElem = TmpElem.appendChild(document.createElement("Img"));
		TmpElem.className = "ico16";
		TmpElem.src = "//raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/SteamCards.png";
		TargetElem.insertBefore(
			document.createTextNode(" "),
			TargetElem.firstChild
		);
		TargetElem.insertBefore(
			TmpElem.parentElement.parentElement,
			TargetElem.firstChild // text node is not element child
		);
		TargetElem.insertBefore(
			document.createTextNode(" "),
			TargetElem.firstChild
		);
		TmpElem = TmpElem.parentElement.parentElement.cloneNode(true), // SCE button
		TmpElem.href = "http://www.steamcardexchange.net/index.php?gamepage-appid-" + AppId;
		TmpElem.getElementsByTagName("Img")[0].src = "//raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/SteamCardExchangeLogo.png";
		TargetElem.insertBefore(
			TmpElem,
			TargetElem.firstChild
		);
		TargetElem.insertBefore(
			document.createTextNode(" "),
			TargetElem.firstChild
		);
		break;
	case "steamcommunity.com":
		var AppId = document.getElementsByName("category_753_Game[]")[0].value
		var ButtonList = [ // buttons to insert
			{
				Name: "category_753_cardborder[]",
				Value: "tag_cardborder_0",
				HRef: document.location.origin
					+ document.location.pathname
					+ "?category_753_Game[]="
					+ AppId
					+ "&category_753_cardborder[]=tag_cardborder_0&appid=753",
				Src: "//steamcommunity-a.akamaihd.net/economy/emoticon/:tradingcard:",
				Alt: "Normal Trading card"
			},
			{
				Name: "category_753_cardborder[]",
				Value: "tag_cardborder_1",
				HRef: document.location.origin
					+ document.location.pathname
					+ "?category_753_Game[]="
					+ AppId
					+ "&category_753_cardborder[]=tag_cardborder_1&appid=753",
				Src: "//steamcommunity-a.akamaihd.net/economy/emoticon/:tradingcardfoil:",
				Alt: "Foil Trading card"
			},
			{
				Name: "category_753_item_class[]",
				Value: "tag_item_class_4",
				HRef: document.location.origin
					+ document.location.pathname
					+ "?category_753_Game[]="
					+ AppId
					+ "&category_753_item_class[]=tag_item_class_4&appid=753",
				Src: "//steamcommunity-a.akamaihd.net/economy/emoticon/:summersun:",
				Alt: "Emoticon"
			},
			{
				Name: "category_753_item_class[]",
				Value: "tag_item_class_3",
				HRef: document.location.origin
					+ document.location.pathname
					+ "?category_753_Game[]="
					+ AppId
					+ "&category_753_item_class[]=tag_item_class_3&appid=753",
				Src: "//steamcommunity-a.akamaihd.net/economy/emoticon/:postcardf:",
				Alt: "Profile Background"
			},
			{
				Name: "category_753_item_class[]",
				Value: "tag_item_class_5",
				HRef: document.location.origin
					+ document.location.pathname
					+ "?category_753_Game[]="
					+ AppId
					+ "&category_753_item_class[]=tag_item_class_5&appid=753",
				Src: "//steamcommunity-a.akamaihd.net/economy/boosterpack/201210?l=english&size=18fx18f",
				Alt: "Booster Pack"
			},
			{
				Name: "",
				Value: "",
				HRef: "http://www.steamcardexchange.net/index.php?gamepage-appid-"
					+ AppId.replace("tag_app_",""),
				Src: "//raw.githubusercontent.com/ZeroUnderscoreOu/SteamCards/master/SteamCardExchangeLogo.png",
				Alt: "Steam Card Exchange"
			}
		];
		var TmpElem = document.createElement("Div");
		CustomStyle.textContent = "Button.CardsButton {Width: 22px; Height: 22px;}"
			+ "Img.CardsButton {Width: 18px; Height: 18px; Vertical-Align: Middle;}";
		TmpElem.style["margin-top"] = "9px"; // 1px margin already there
		ButtonList.forEach(function(Match){
			TmpElem = TmpElem.appendChild(document.createElement("Button"));
			TmpElem.type = "Button";
			//TmpElem.name = Match.Name;
			//TmpElem.value = Match.Value;
			TmpElem.className = "btnv6_grey_black CardsButton";
			TmpElem.addEventListener("click",function(){
				//document.location.search = "category_753_Game[]=" + AppId + "&" + this.name + "=" + this.value + "&appid=753";
				document.location.href = Match.HRef;
			},false);
			TmpElem = TmpElem.appendChild(document.createElement("Img"));
			TmpElem.src = Match.Src;
			TmpElem.alt = Match.Alt;
			TmpElem.className = "CardsButton";
			TmpElem = TmpElem.parentElement.parentElement;
			TmpElem.appendChild(document.createTextNode(" "));
		});
		document.getElementById("market_search").parentElement.appendChild(TmpElem); // appending to form's parent - div
		break;
};