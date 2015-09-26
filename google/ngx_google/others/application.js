$(document).ready(function() {
    var isMobile, doUIStyleClear, doUIStyleBlack, doUIStyleBlue, doUIStyleSwitch, doUIStyleLoader, __oq, __hl, __pos, __resultBox, __ajaxThread, __ajaxDelay, __ajaxTimer, __ajaxSearchThread, __ajaxSearchThreadError, __ajaxSearchTimer, __ajaxSearchTimeout, __ajaxStartTime, __progressIntervalPercent, __progressInterval, __isThreadAbort, __isCaptchaRead, __isCaptchaSubmit, __imageSearch, __imageSearching, __imageSearchStart, __title, __setUrlAndParse, getParamFromURL, doImageClickEvent, doImagePreloading, doImageVisibleLoading, doCreateResultBox, doParseComplete, doParseResult, doParseSyncAbuse, doCaptShow, doUseBackupSearchEngine, doAjaxStop, doAjax, doSearch, doShowPageMain, doSearchByImageUpload, doSearchByImageDrop, doInitSearchByImageBox, doSwitchTab, doParseUrl, __currPage, doCNZZPageView, setUrl, doCreateUrl, cnzzTrackEvent;
    doCreateResultBox = function(a) {
        var b, c, d, e;
        __resultBox === !1 ? (__resultBox = $('<div id="__resultBox" class="ui compact stacked segment vertical selection list"></div>'), __resultBox.hide(), __resultBox.appendTo($("body"))) : __resultBox = $("#__resultBox"), b = a.offset().top, c = a.offset().left, d = a.outerHeight(), e = a.outerWidth(), isMobile.any() && (e = a.parent().width()), __resultBox.css({
            zIndex: "10",
            marginTop: "0px",
            position: "absolute",
            top: b + d,
            left: c,
            width: e
        })
    }, doParseComplete = function(a, b) {
        return (new Date).getTime() - __ajaxStartTime, __resultBox.empty(), __resultBox.hide(), a.is(":visible") === !1 ? !1 : 0 === b[1].length ? !1 : ($.each(b[1], function(a, b) {
            $('<a class="item ajax" href="/?q=' + b[0] + '">' + b[0] + "</a>").appendTo(__resultBox)
        }), __resultBox.children("a.item").hover(function() {
            $(this).css("color", "rgba(0, 0, 0, 0.8)"), $(this).css("background-color", "rgba(220, 220, 220, 0.8)")
        }, function() {
            $(this).css("color", "rgba(0, 0, 0, 0.4)"), $(this).css("background-color", "rgba(0, 0, 0, 0)")
        }), __resultBox.show(), void 0)
    }, $("input[name=keywords]").keyup(function(a) {
        var d, b = $(this),
            c = b.val();
        return void 0 === a.which ? !1 : 0 === c.length ? !1 : c === __oq ? !1 : (__ajaxSearchThread.length > 0 && (__isThreadAbort = !0, $.each(__ajaxSearchThread, function(a, b) {
            b.abort()
        }), __ajaxSearchThread = new Array), __oq = c, b.parent().children("i.fire").removeClass("fire").addClass("spinner loading"), d = {
            client: "serp",
            hl: __hl,
            sugexp: "msedr",
            gs_rn: "60",
            gs_ri: "serp",
            pq: __oq,
            cp: c.length,
            gs_id: "bik",
            q: c,
            xhr: "t"
        }, __ajaxThread !== !1 && (__ajaxThread.abort(), __ajaxThread = !1), __ajaxTimer !== !1 && (clearTimeout(__ajaxTimer), __ajaxTimer = !1), __ajaxTimer = setTimeout(function() {
            __ajaxStartTime = (new Date).getTime(), __ajaxThread = $.ajax({
                url: __externalSearching + "/complete/search",
                timeout: 5e3,
                data: d,
                dataType: "json",
                xhrFields: {
                    withCredentials: !0
                },
                complete: function() {
                    __ajaxThread = !1, b.parent().children("i.loading").removeClass("spinner").removeClass("loading").addClass("fire")
                },
                success: function(a) {
                    doCreateResultBox(b), doParseComplete(b, a)
                },
                error: function() {}
            })
        }, __ajaxDelay), void 0)
    }), $("input[name=keywords]").keydown(function(a) {
        var b, c;
        switch (a.which) {
            case 229:
                setTimeout(function() {
                    $("input[name=keywords]").trigger("keyup")
                }, 100);
                break;
            case 38:
            case 40:
                if (__resultBox === !1) return !1;
                if (__resultBox.is(":visible") === !1) return !1;
                __pos === !1 && (__pos = 0), b = __resultBox.children("a.item"), b.css("color", "rgba(0, 0, 0, 0.4)"), b.css("background-color", "rgba(0, 0, 0, 0)"), 40 === a.which ? __pos++ : __pos--, __pos = __pos > b.length ? 1 : __pos, __pos = 0 >= __pos ? b.length : __pos, c = __resultBox.children("a:eq(" + (__pos - 1) + ")"), __oq = c.text(), $(this).val(c.text()), c.css("color", "rgba(0, 0, 0, 0.8)"), c.css("background-color", "rgba(220, 220, 220, 0.8)");
                break;
            case 13:
                $(this).parent().children(".submit").trigger("click"), $(this).trigger("blur")
        }
    }), $("input[name=keywords]").blur(function() {
        $(this).parent().children("i.loading").removeClass("spinner").removeClass("loading").addClass("fire"), __ajaxThread !== !1 && (__ajaxThread.abort(), __ajaxThread = !1), __ajaxTimer !== !1 && (clearTimeout(__ajaxTimer), __ajaxTimer = !1), __resultBox !== !1 && setTimeout(function() {
            __resultBox.hide()
        }, 100)
    }), GParse = {}, GParse.init = function(a) {
        a = $(a);
        var b = a.find("input[type=hidden][name=tbs]").val();
        __imageSearch = !0, url = doCreateUrl("sbi", {
            sbi: b
        }), __imageSearch = !1, __setUrlAndParse = !1, setUrl(url), __setUrlAndParse = !0, GParse.appbar(a), GParse.search(a), GParse.xjs(a), ($('img[name^="imgthumb"]').length > 0 || $('img[name^="imgthumb"]').length === $(".rg_meta").length) && $(".rg_meta").each(function(a) {
            var c = JSON.parse($(this).html());
            $('img[name^="imgthumb"]:eq(' + a + ")").attr("src", c.tu)
        })
    }, GParse.appbar = function(a) {
        a.find("#resultStats").html() && $(".search-result .ribbon").html(a.find("#resultStats").html())
    }, GParse.search = function(a) {
        var b = $(".search-result-list");
        b.empty(), a.find(".g").each(function() {
            var d, e, f, g, h, i, j, k, l, m, n, o, r, s;
            if ($(this).hasClass("currency")) return d = $(this).find("h3.r").parent().html(), $('<div class="item"><h3>' + d + "</h3></div>").appendTo(b), void 0;
            if (!$(this).hasClass("obcontainer"))
                if ("imagebox_bigimages" === $(this).attr("id")) d = $(this).children("div._Icb").children("a"), e = $(this).find("ul.rg_ul"), f = $(this).find("a.irg-footer"), g = getParamFromURL(d.attr("href").replace(/&amp;/g, "&"), "tbs"), g.length > 5 && (d.removeAttr("href"), e.find("a").each(function() {
                    $(this).attr("href", $(this).children("img").attr("title")), $(this).attr("target", "_blank")
                })), d = $("<div>").append(d.clone()).html(), e = $("<div>").append(e.clone()).html(), f = $("<div>").append(f.clone()).html(), $('<div class="item"><h3>' + d + '</h3><p class="u">' + f + '</p><p class="s">' + e + "</p></div>").appendTo(b);
                else if ($(this).hasClass("card-section")) $(this).hasClass("_mZd") ? (h = $(this).find("img").parent().removeAttr("onmousedown").html(), d = $("<div>").append($(this).find("a._Dk").removeAttr("onmousedown").clone()).html(), i = $(this).find("div._Ck").html(), j = $(this).find("span._dwd").html(), h ? $('<div class="item"><div class="left">' + h + '</div><div class="right"><h3>' + d + '</h3><p class="u">' + i + '</p><p class="s">' + j + "</p></div></div>").appendTo(b) : $('<div class="item"><h3>' + d + '</h3><p class="u">' + i + '</p><p class="s">' + j + "</p></div>").appendTo(b)) : (d = $("<div>").append($(this).find("a._Dk").removeAttr("onmousedown").clone()).html(), i = $(this).find("div._Ck").html(), $('<div class="item"><h3>' + d + '</h3><p class="u">' + i + "</p></div>").appendTo(b));
            else if ($(this).hasClass("tpo")) d = $(this).find("h3.r").find("a").removeAttr("onmousedown").parent().html(), i = $(this).find("span.a").html(), j = $(this).find("h3.r").parent(), j.find("a").remove(), j.find(".a").remove(), j = j.text(), $('<div class="item"><h3>' + d + '</h3><p class="u">' + i + '</p><p class="s">' + j + "</p></div>").appendTo(b);
            else {
                if (d = $(this).find("h3.r").find("a").removeAttr("onmousedown").parent().html(), i = $(this).find("div.s").find("cite._Rm").html(), j = $(this).find("div.s").find("span.st").html(), k = $(this).find("div.s").find(".action-menu-panel"), h = $(this).find("div.s").find("div.th"), l = $(this).find("div.s").find("div.osl"), m = $(this).find("div.s").find("g-reviewstars"), n = "", o = "full", !d) return;
                h.length > 0 ? (h.find("img").removeAttr("onload"), h.find("a").removeAttr("onmousedown"), r = getParamFromURL(h.find("a").attr("href"), "imgurl"), r.length > 5 && h.find("a").attr("href", r), h = '<div class="item-left"><span class="i">' + h.html() + "</span></div>", o = "right") : h = "", l.length > 0 ? (l.find("a").removeAttr("onmousedown"), l = '<p class="o">' + l.html() + "</p>") : l = "", m = m.length > 0 ? '<p class="r">' + m.parent().html() + "</p>" : "", k.find("a.fl").length > 0 && (s = "", k.find("a.fl").each(function() {
                    var d, c = $(this).attr("href");
                    c.indexOf("webcache") >= 0 ? ($(this).removeAttr("onmousedown"), c = c.replace("googleusercontent", "googto"), $(this).attr("href", c)) : (d = doCreateUrl(getParamFromURL(c, "q"), {}), $(this).addClass("ajax"), $(this).attr("href", d)), s += '<span class="item">' + $("<div>").append($(this)).html() + "</span>"
                }), n = '<span class="ui pointing inline dropdown" tabindex="0"><i class="dropdown icon"></i><span class="menu transition hidden" tabindex="-1">' + s + "</span></span>"), $('<div class="item"><h3>' + d + "</h3>" + h + '<div class="item-' + o + '"><p class="u">' + i + " " + n + "</p>" + m + '<p class="s">' + j + "</p>" + l + "</div></div>").appendTo(b)
            }
        }), $(".ui.inline.dropdown").dropdown(), setTimeout(function() {
            $(".page-search").parent().outerHeight() > $(".pusher").outerHeight() && $(".pusher").css("height", "initial")
        }, 100)
    }, GParse.xjs = function(a) {
        var b = encodeURIComponent($('input[name="keywords"]').val()),
            c = $(".pagination");
        c.empty(), $.each(a.find("table#nav").children("tbody").children("tr").children("td"), function(a) {
            var f, e = $("<a>");
            if (e.addClass("item"), e.addClass("ajax"), $(this).hasClass("b")) {
                if (e.addClass("icon"), !($(this).children("a").length > 0)) return e.addClass("disabled"), void 0;
                start = getParamFromURL($(this).children("a").attr("href"), "start"), f = doCreateUrl(b, {
                    start: start
                }), e.attr("href", f), 0 === a ? e.html('<span class="hide"><<</span>') : e.html('<span class="hide">>></span>'), 0 === a ? $('<i class="left arrow icon"></i>').appendTo(e) : $('<i class="right arrow icon"></i>').appendTo(e)
            } else e.text($(this).text()), $(this).children("a").length > 0 ? (start = getParamFromURL($(this).children("a").attr("href"), "start"), f = doCreateUrl(b, {
                start: start
            }), e.attr("href", f)) : e.addClass("active");
            e.appendTo(c)
        })
    }, GParse.rhscol = function(a) {
        if ($(".search-wiki").hide(), $(".search-wiki").empty(), $(".search-wiki-button").hide(), a.find("div").length > 1) {
            $(".search-wiki").show(), $(".search-wiki-button").show();
            var b = $('<div class="wikiBox">');
            b.append(a), b.appendTo($(".search-wiki")), $(".search-wiki-button").click(function() {
                $(".search-wiki").toggle("normal", function() {
                    $(this).is(":hidden") ? $(".search-wiki-button").children(".text").text("Display Wiki") : $(".search-wiki-button").children(".text").text("Hidden Wiki")
                })
            })
        }($('img[name^="imgthumb"]').length > 0 || $('img[name^="imgthumb"]').length === $(".rg_meta").length) && $(".rg_meta").each(function(a) {
            var c = JSON.parse($(this).html());
            $('img[name^="imgthumb"]:eq(' + a + ")").attr("src", c.tu).parents().show().css("visibility", "visible")
        })
    }, je = {}, je.api = function(object) {
        var objHTML, lastObjHTML;
        switch (object.n) {
            case "ad":
                break;
            case "p":
                switch (objHTML = $(object.h), object.i) {
                    case "appbar":
                        GParse.appbar(objHTML);
                        break;
                    case "taw":
                        objHTML.find("a.spell").length > 0 ? ($(".search-spell").show(), $(".search-spell").children("span.spell").text(objHTML.find("span.spell").text()), $(".search-spell").children("a.spell").addClass("ajax").attr("href", "/?q=" + encodeURI(objHTML.find("a.spell").text())).html(objHTML.find("a.spell").html()), objHTML.find("a.spell_orig").length > 0 ? ($(".search-spell").children("div.divider").show(), $(".search-spell").children("span.search_orig").show(), $(".search-spell").children("span.search_orig").children("a.spell_orig").addClass("ajax").attr("href", "/?q=" + encodeURI(objHTML.find("a.spell_orig").text()) + "&nfpr=1").html(objHTML.find("a.spell_orig").html())) : ($(".search-spell").children("div.divider").hide(), $(".search-spell").children("span.search_orig").hide())) : $(".search-spell").hide();
                        break;
                    case "topstuff":
                        $(".search-related").children(".tag").remove(), 0 === objHTML.find("a.nobr").length ? $(".search-related").hide() : ($(".search-related").show(), objHTML.find("a.nobr").each(function() {
                            $('<a class="ui tag label ajax" href="/?q=' + encodeURI($(this).text()) + '">' + $(this).text() + "</a>").appendTo($(".search-related"))
                        })), objHTML.length >= 3 && (lastObjHTML = objHTML[objHTML.length - 1], $(lastObjHTML).text().length > 2 && "wmxmsg" !== $(lastObjHTML).attr("id") && "trev" !== $(lastObjHTML).attr("id") && ($(".search-loading").children("span.loading").hide(), $(".search-loading").children(".error").show(), $(".search-loading").children(".error").children(".content").html(lastObjHTML), $(".search-loading").show(), $(".search-result").hide()));
                        break;
                    case "search":
                        GParse.search(objHTML);
                        break;
                    case "botstuff":
                        $(".search-related-list").hide(), objHTML.find(".brs_col").length > 0 && ($(".search-related-list").show(), $(".search-related-list").find("a.tag").text(objHTML.find("h3.med").text()), $(".search-related-list").find(".list").empty(), objHTML.find(".brs_col").each(function(a) {
                            $(this).find("a").each(function() {
                                $('<a class="item ajax" href="/?q=' + encodeURI($(this).text()) + '">' + $(this).text() + "</a>").appendTo($(".search-related-list").find(".list:eq(" + a + ")"))
                            })
                        }));
                        break;
                    case "xjs":
                        GParse.xjs(objHTML);
                        break;
                    case "lfoot":
                        eval(objHTML.html());
                        break;
                    case "footc":
                        $('img[id^="vidthumb"]').each(function() {
                            var c = $(this).attr("id"),
                                d = '"' + c + '","',
                                e = object.h.indexOf(d),
                                f = object.h.substr(e + d.length),
                                g = f.substr(0, f.indexOf('"]'));
                            g = g.replace(/\\u003d/g, "="), $(this).attr("src", g)
                        });
                        break;
                    case "rhscol":
                        GParse.rhscol(objHTML)
                }
        }
    }, doParseResult = function(a) {
        var c, b = (new Date).getTime() - __ajaxStartTime;
        return __imageSearch ? _czc.push(["_trackEvent", "searching", "image", __externalSearching, b, "search"]) : _czc.push(["_trackEvent", "searching", "web", __externalSearching, b, "search"]), (__imageSearch === !1 || __imageSearch === !0 && __imageSearching === !1) && ($(".search-result .ribbon").attr("onclick", "javascript:alert('process: " + b / 1e3 + "s, use " + __externalSearching + ".');"), $("html, body").animate({
            scrollTop: 0
        }, 100)), 0 === a.indexOf("<!doctype html>") ? (GParse.init(a), void 0) : (c = a.split('/*""*/'), $(".JSVM").empty(), $.each(c, function(a, b) {
            0 !== b.length && (json = JSON.parse(b), __imageSearch ? (0 === __imageSearchStart && $(".search-result-list").empty(), $(".search-result-list").append($(json.d).find(".rg_add_chunk").html()), doImagePreloading()) : $(json.d).appendTo($(".JSVM")))
        }), void 0)
    }, doParseSyncAbuse = function(a) {
        if ("read" === a) $.ajax({
            url: "/syncabuse/",
            type: "POST",
            data: {
                ac: "read",
                as: __externalSearching
            },
            timeout: 1e4,
            dataType: "text",
            xhrFields: {
                withCredentials: !0
            },
            success: function(a) {
                _czc.push(["_trackEvent", "capt", "read", "", 0, "search"]);
                var b = __externalSearching.replace("https", "http");
                a.length > 10 ? $.ajax({
                    url: b + "/syncabuse",
                    type: "GET",
                    data: {
                        k: "GOOGLE_ABUSE_EXEMPTION",
                        v: a
                    },
                    timeout: 1e4,
                    dataType: "text",
                    xhrFields: {
                        withCredentials: !0
                    },
                    success: function() {
                        setUrl(window.location.search)
                    }
                }) : setUrl(window.location.search)
            }
        });
        else {
            var b = __externalSearching.replace("https", "http");
            $.ajax({
                url: b + "/syncabuse",
                type: "GET",
                data: {},
                timeout: 1e4,
                dataType: "text",
                xhrFields: {
                    withCredentials: !0
                },
                success: function(a) {
                    $.ajax({
                        url: "/syncabuse/",
                        type: "POST",
                        data: {
                            ac: "sync",
                            as: __externalSearching,
                            ab: decodeURIComponent(a)
                        },
                        timeout: 1e4,
                        dataType: "text",
                        xhrFields: {
                            withCredentials: !0
                        },
                        success: function() {
                            _czc.push(["_trackEvent", "capt", "sync", "", 0, "search"])
                        }
                    })
                }
            })
        }
    }, doCaptShow = function() {
        var a, b, c, d, e;
        $(".search-loading").show(), $(".search-result").hide(), $(".search-loading").children("span.loading").hide(), $(".search-loading").children(".error").show(), a = $.cookie("captid"), b = $.cookie("captcontinue"), c = b.substr(0, b.indexOf("/search?")), _czc.push(["_trackEvent", "capt", "show", "", 0, "search"]), date = new Date, date.setTime(date.getTime() + 3e5), $.cookie("externalSearch", c, {
            expires: date,
            path: "/",
            domain: document.domain
        }), d = $('<input type="submit" name="submit" value="鎻愪氦" style="font-size:18px;">'), d.css("padding", "2px 15px"), d.css("marginLeft", "10px"), d.click(function() {
            var e, f, g;
            __isCaptchaSubmit = !0, _czc.push(["_trackEvent", "capt", "submit", "", 0, "search"]), e = $(".search-loading").children(".error").find(".content").find("input[name=captcha]"), e.attr("disabled", !0), d.attr("disabled", !0), d.val("鎻愪氦涓€︹€�"), f = "/sorry/CaptchaRedirect", g = {
                "continue": b,
                id: a,
                captcha: e.val()
            }, doAjax(f, g)
        }), e = $("<div>"), e.append('<div class="header">璇烽敭鍏ヤ笅鍥炬樉绀虹殑瀛楃浠ョ户缁搷浣滐細</div>'), e.append('<img src="' + c + "/sorry/image?id=" + a + '&amp;hl=zh-CN" border="1" alt="璇峰惎鐢ㄥ浘鐗�">'), e.append("<br><br>"), e.append('<input type="text" name="captcha" value="" id="captcha" size="12" style="font-size:16px; padding:3px 0 3px 5px; margin-left:0px;">'), e.append(d), e.append("<p>璇疯緭鍏ラ獙璇佺爜甯姪鎴戜滑璇嗗埆杩欐槸鍚︽槸涓€娆′汉涓虹殑鎼滅储琛屼负锛屼互渚跨户缁娇鐢ㄦ悳绱㈡湇鍔°€�</p>"), $(".search-loading").children(".error").find(".content").html(e)
    }, doUseBackupSearchEngine = function() {
        _czc.push(["_trackEvent", "retry", "timeout", __externalSearching, 0, "search"]), __externalSearchConf[9] = __externalSearchBackup, setUrl(window.location.search)
    }, doAjaxStop = function() {
        $.each(__ajaxSearchThread, function(a, b) {
            b.abort()
        }), __ajaxSearchThread = new Array, __progressIntervalPercent = 100, clearInterval(__progressInterval), $(".searching.progress").progress({
            percent: 100
        }), __ajaxSearchTimer !== !1 && (clearTimeout(__ajaxSearchTimer), __ajaxSearchTimer = !1)
    }, doAjax = function(a, b) {
        var c, d, e, f, g;
        return "/sorry/CaptchaRedirect" !== a && (c = $.cookie("captid"), null !== c) ? (doCaptShow(), void 0) : (__ajaxStartTime = (new Date).getTime(), 0 === __ajaxSearchThread.length ? __isThreadAbort = !1 : (__isThreadAbort = !0, doAjaxStop()), $(".searching.progress").progress("reset"), d = __externalSearchConf, e = $.cookie("externalSearch"), null !== e && (d = {
            0: e
        }), __ajaxSearchTimer !== !1 && clearTimeout(__ajaxSearchTimer), __ajaxSearchTimer = setTimeout(function() {
            null !== e ? ($.cookie("externalSearch", "", {
                expires: -1,
                path: "/",
                domain: document.domain
            }), doUseBackupSearchEngine()) : (__imageSearch === !1 && ($(".search-result").hide(), $(".search-loading").show()), $(".search-loading").find(".ui.warning.message").show())
        }, __ajaxSearchTimeout), f = {
            type: "GET",
            cache: !0,
            processData: !0
        }, b["encoded_image"] && (g = new FormData, g.append("encoded_image", b["encoded_image"]), b = g, f["type"] = "POST", f["cache"] = !1, f["processData"] = !1), __progressInterval !== !1 && (__progressInterval = !1, __progressIntervalPercent = 0, clearInterval(__progressInterval)), __progressInterval = setInterval(function() {
            __progressIntervalPercent++, __progressIntervalPercent > 100 ? (__progressIntervalPercent = 100, clearInterval(__progressInterval)) : $(".searching.progress").progress({
                percent: __progressIntervalPercent
            })
        }, 300), __ajaxSearchThreadError = 0, $.each(d, function(c, d) {
            ajaxSearchThread = $.ajax({
                url: d + a,
                data: b,
                timeout: 3e4,
                dataType: "text",
                type: f["type"],
                cache: f["cache"],
                processData: f["processData"],
                contentType: !1,
                xhrFields: {
                    withCredentials: !0
                },
                beforeSend: function() {},
                complete: function() {},
                success: function(a) {
                    __externalSearching = d, doAjaxStop(), $(".search-loading").hide(), $(".search-result").show(), doParseResult(a), null !== $.cookie("captid") && ($.cookie("captid", "", {
                        expires: -1,
                        path: "/",
                        domain: document.domain
                    }), $.cookie("captcontinue", "", {
                        expires: -1,
                        path: "/",
                        domain: document.domain
                    })), null === $.cookie("externalSearch") && (date = new Date, date.setTime(date.getTime() + 3e5), $.cookie("externalSearch", d, {
                        expires: date,
                        path: "/",
                        domain: document.domain
                    })), __isCaptchaSubmit === !0 && (__isCaptchaSubmit = !1, doParseSyncAbuse("sync")), __isCaptchaRead === !0 && (__isCaptchaRead = !1, _czc.push(["_trackEvent", "capt", "success", "", 0, "search"]))
                },
                error: function(a) {
                    var b, c, e;
                    if (504 === a.status && (doAjaxStop(), _czc.push(["_trackEvent", "error", "504", __externalSearching, 0, "search"]), $(".search-result").hide(), $(".search-loading").show(), $(".search-loading").children("span.loading").hide(), $(".search-loading").children(".error").show(), $(".search-loading").children(".error").children(".content").html('<div class="header">璀﹀憡锛氭悳绱㈣姹傞鐜囪繃楂�</div><ul class="list"><li>鎴戜滑妫€娴嬪埌鎮ㄧ殑鎼滅储棰戠巼杩囬珮锛岃涓嶈楂橀鐜囨悳绱紒</li></ul>')), 503 === a.status) {
                        if (__externalSearching = d, doAjaxStop(), _czc.push(["_trackEvent", "capt", "trigger", "", 0, "search"]), __isCaptchaRead === !1 && -1 === document.referrer.indexOf("3bsou.com")) return __isCaptchaRead = !0, date = new Date, date.setTime(date.getTime() + 3e5), $.cookie("externalSearch", d, {
                            expires: date,
                            path: "/",
                            domain: document.domain
                        }), doParseSyncAbuse("read"), !1;
                        b = $(a.responseText), c = b.find("input[name=id]").val(), e = b.find("input[name=continue]").val(), $.cookie("captid", c, {
                            expires: 1,
                            path: "/",
                            domain: document.domain
                        }), $.cookie("captcontinue", e, {
                            expires: 1,
                            path: "/",
                            domain: document.domain
                        }), _czc.push(["_trackEvent", "capt", "save", "", 0, "search"]), setTimeout(function() {
                            doCaptShow()
                        }, 500)
                    }
                    __ajaxSearchThreadError++, __ajaxSearchThreadError < __ajaxSearchThread.length || (__isThreadAbort === !1 && ($(".search-result").hide(), $(".search-loading").show(), $(".search-loading").children("span.loading").hide(), $(".search-loading").children(".error").show()), 403 === a.status && (_czc.push(["_trackEvent", "error", "403", __externalSearching, 0, "search"]), $.cookie("externalSearch", "", {
                        expires: -1,
                        path: "/",
                        domain: document.domain
                    }), doUseBackupSearchEngine()))
                }
            }), __ajaxSearchThread.push(ajaxSearchThread)
        }), void 0)
    }, doSearch = function(a, b) {
        var c, d;
        document.title = $('input[name="keywords"]').val() + " - " + __title, $(".page-main").hide(), $(".page-search").show(), $(".launch.sidebar").show(), $(".search-loading").children("span.loading").show(), $(".search-loading").children(".error").hide(), $(".search-loading").find(".ui.warning.message").hide(), $(".search-spell").hide(), $(".search-related").hide(), $(".search-wiki").hide(), $(".search-wiki-button").hide(), (b["sbi"] || "___sbi___" === a) && (__imageSearch = !1), __imageSearch ? ($(".search-related-list").hide(), $(".search-result-list").css("max-width", "100%"), $(".search-result .ribbon").hide(), $(".search-result .pagination").hide(), $(".search-result").css("background-color", "rgb(245, 245, 245)"), $(".search-option").children(".web-option").hide(), $(".search-option").children(".image-option").show()) : ($(".search-result-list").css("max-width", "630px"), $(".search-result .ribbon").show(), $(".search-result .pagination").show(), $(".search-result").css("background-color", "rgb(255, 255, 255)"), $(".search-option").children(".web-option").show(), $(".search-option").children(".image-option").hide()), (b["sbi"] || "___sbi___" === a) && ($(".search-related-list").hide(), $(".search-option").children(".web-option").hide(), $(".search-option").children(".image-option").show()), b["start"] || (b["start"] = 0), c = {
            newwindow: "1",
            start: b["start"],
            source: "hp",
            sa: "N",
            cad: "b",
            tch: "1",
            ech: "1",
            safe: "off",
            filter: "0",
            fp: "7912f7472892ef90",
            hl: __hl,
            q: a
        }, c["biw"] = $(window).width(), c["bih"] = $(window).height(), __imageSearch && (__imageSearchStart = parseInt(b["start"]), c["site"] = "imghp", c["tbm"] = "isch", c["ijn"] = parseInt(b["start"] / 100)), b["lr"] && (c["lr"] = b["lr"]), b["qdr"] && (c["tbs"] = "qdr:" + b["qdr"]), b["li"] && (c["tbs"] = "li:" + b["li"]), b["filter"] && (c["as_eq"] = decodeURIComponent(b["filter"])), b["occt"] && (c["as_occt"] = b["occt"]), b["num"] && (c["num"] = b["num"]), b["filetype"] && (c["as_filetype"] = b["filetype"]), b["nfpr"] && (c["nfpr"] = b["nfpr"]), b["sbi"] && (d = b["sbi"], b["qdr"] && (d += ",qdr:" + b["qdr"]), c = {
            newwindow: "1",
            safe: "off",
            start: b["start"],
            tbs: d
        }), "___sbi___" === a ? b["image_url"] ? doAjax("/searchbyimage", {
            image_url: b["image_url"]
        }) : doAjax("/searchbyimage/upload", {
            encoded_image: b["encoded_image"]
        }) : doAjax("/search", c)
    }, doShowPageMain = function() {
        $(".launch.sidebar").hide(), $(".page-main").show(), $(".page-search").hide(), $(".search-loading").show(), $(".search-result").hide(), $('input[name="keywords"]').val(""), $(".pusher").css("height", "100%"), document.title = __title
    }, doSearchByImageUpload = function(a) {
        return name = a.name, size = a.size, type = a.type, a.name.length < 1 ? (alert("File not empty."), !1) : a.size > 1048576 ? (alert("File is to big"), !1) : "image/png" != a.type && "image/jpg" != a.type && "image/gif" != !a.type && "image/jpeg" != a.type ? (alert("File doesnt match png,jpg or gif"), !1) : (doSearch("___sbi___", {
            encoded_image: a
        }), $(".sbibox").hide(), void 0)
    }, doSearchByImageDrop = function(a) {
        var c, b = a.dataTransfer.files;
        return 0 == b.length ? !1 : (c = b[0], doSearchByImageUpload(c), void 0)
    }, doInitSearchByImageBox = function() {
        $(".sbibox i.close").click(function() {
            $(".sbibox").hide()
        }), $(".sbibox.tabular.item").click(function() {
            var b = $(this).attr("data-tab");
            $(".sbibox.tabular.item").removeClass().addClass("item"), $(this).addClass("active"), $(".sbibox.tab1").hide(), $(".sbibox.tab2").hide(), $(".sbibox." + b).show()
        }), $(".sbibox.ui.button").click(function() {
            var b = $(this).parent().children("input").val();
            b.length > 0 && (doSearch("___sbi___", {
                image_url: b
            }), $(".sbibox").hide())
        }), $('.sbibox input[type="file"]').change(function() {
            var b = this.files[0];
            doSearchByImageUpload(b)
        }), document.getElementById("sbibox").addEventListener("drop", function(a) {
            doSearchByImageDrop(a)
        })
    }, doInitSearchByImageBox(), doSwitchTab = function(a) {
        switch (a) {
            case "image":
                if ($(".ui.main.menu").find(".title.item").removeClass("active"), $(".image-search").parent().parent().addClass("active"), $('input[name="keywords"]').attr("placeholder", "Image Searching..."), __title = document.title = "Googto鍥剧墖鎼滅储", __imageSearch = !0, 0 === $("i.sbi").length) {
                    var b = $('<i class="sbi photo icon"></i>');
                    b.click(function() {
                        var b = $(".sbibox"),
                            c = $(this).parent(),
                            d = c.offset().top,
                            e = c.offset().left,
                            f = c.outerHeight(),
                            g = c.outerWidth();
                        b.css("position", "absolute"), b.css("top", d - f + "px"), b.css("left", e + "px"), b.css("width", g + "px"), b.css("zIndex", "11"), $(".sbibox").show()
                    }), $('input[name="keywords"]').before(b)
                }
                break;
            default:
                $(".ui.main.menu").find(".title.item").removeClass("active"), $(".web-search").parent().parent().addClass("active"), $('input[name="keywords"]').attr("placeholder", "Web Searching..."), __title = document.title = "Googto鎼滅储", __imageSearch = !1, $("i.sbi").remove()
        }
    }, doParseUrl = function(a) {
        var e, f, g, h, i, j, k, l, b = "\\x",
            c = "7ff7f3fd",
            d = "";
        for (e = 0; e < c.length; e++) d += b + 6 + c.substr(e, 1), 3 === e && (d += b + "74"), 4 === e && (d += b + "2e");
        return f = "^([a-z0-9]+.)?" + d + "$", g = new RegExp(f), g.test(document.domain) ? (h = !1, i = !1, j = {}, a.length <= 0 ? (isMobile.any() || $("input[name=keywords]").focus(), doShowPageMain(), !1) : ($("input[type=radio][name=li][value=1]").prop("checked", !1), $("input[type=checkbox]").prop("checked", !1), $("input[type=hidden]").each(function() {
            $(this).val(""), $(this).parent().find(".item").removeClass().addClass("item"), $(this).parent().find(".text").removeClass().addClass("default text"), $(this).parent().find(".text").text($(this).parent().find('.item[data-value="none"]').text())
        }), $.each(a.split("&"), function(a, b) {
            var f, g, c = b.split("="),
                d = c[0],
                e = c[1];
            switch (d) {
                case "tab":
                    "image" === e && doSwitchTab("image");
                    break;
                case "q":
                    h = decodeURIComponent(e);
                    break;
                case "start":
                    j["start"] = e;
                    break;
                case "sbi":
                    j["sbi"] = e;
                    break;
                case "nfpr":
                    j["nfpr"] = e;
                    break;
                case "lr":
                case "qdr":
                case "num":
                case "occt":
                case "filetype":
                    i = !0, "lr" === d && (e = decodeURIComponent(e)), j[d] = e, f = $('input[type=hidden][name="' + d + '"]'), g = f.parent().find('.item[data-value="' + e + '"]'), g.addClass("active selected"), f.parent().find(".text").removeClass("default").text(g.text());
                    break;
                case "li":
                    i = !0, j["li"] = e, $('input[type=radio][name=li][value="' + e + '"]').prop("checked", !0);
                    break;
                case "filter":
                    i = !0, j["filter"] = e, $("input[type=checkbox]").each(function() {
                        e.indexOf($(this).val()) >= 0 && $(this).prop("checked", !0)
                    })
            }
        }), h === !1 || "" == h ? !1 : ($('input[name="keywords"]').val(h), k = $.cookie("mobsearchtimes"), null === k && (k = 0), f = new RegExp("^1([0-9]{10})$"), f.test(h.replace(/\s/g, "")) && (k++, date = new Date, date.setTime(date.getTime() + 6e5), $.cookie("mobsearchtimes", k, {
            expires: date,
            path: "/",
            domain: document.domain
        })), l = 10, -1 !== document.referrer.indexOf("3bsou.com") && (l = 5), k >= l ? (_czc.push(["_trackEvent", "error", "mobsearchtimes", "", 0, "search"]), $(".page-main").hide(), $(".page-search").show(), $(".search-loading").show(), $(".search-result").hide(), $(".search-loading").children("span.loading").hide(), $(".search-loading").children(".error").show(), $(".search-loading").children(".error").children(".content").html('<div class="header">璀﹀憡锛氭殏鍋滄彁渚涙悳绱㈡湇鍔★紒</div><ul class="list"><li>鎴戜滑鍒ゅ畾浣犵殑鎼滅储琛屼负瀛樺湪杩濊琛屼负锛�</li><li>璇烽棿闅斾竴灏忔椂鍚庡啀浣跨敤鎴戜滑鐨勬悳绱㈡湇鍔°€�</li><li>鏈変换浣曠枒闂紝璇蜂笌鎴戜滑鑱旂郴锛�root@googto.com</li></ul>'), !1) : (i === !0 && ($(".search-option-button").remove(), $(".search-option").show()), doSearch(h, j), void 0)))) : !1
    }, __currPage = document.referrer, doCNZZPageView = function(a) {
        "/" != a.substr(0, 1) && (a = "/" + a), _czc.push(["_trackPageview", a, __currPage]), __currPage = a
    }, setUrl = function(a, b) {
        return __ajaxSearchThread.length > 0 && window.location.pathname + window.location.search === a ? !1 : (doCNZZPageView(a), void 0 === b && window.history.pushState(null, null, a), a = a.replace("#", "").replace("?", ""), "/" == a.substr(0, 1) && (a = a.substr(1)), __setUrlAndParse === !0 && doParseUrl(a), void 0)
    }, $(window).on("hashchange", function(a) {
        a.preventDefault(), setUrl(window.location.hash, !1)
    }), $(window).on("popstate", function(a) {
        a.preventDefault(), setUrl(window.location.search, !1)
    }), $("body").on("click", "a.ajax", function(a) {
        return a.preventDefault(), setUrl($(this).attr("href")), $(this).html($('<i class="icon spinner loading"></i>')), !1
    }), doCreateUrl = function(a, b) {
        var c = !1,
            d = 0,
            e = "",
            f = "",
            g = "",
            h = "",
            i = "",
            j = "",
            k = "",
            l = "",
            m = window.location.search.replace("?", "");
        return 0 === m.length && (m = window.location.hash.replace("#", "")), m.length > 0 && $.each(m.split("&"), function(a, b) {
            var m = b.split("=");
            switch (m[0]) {
                case "q":
                    c = m[1];
                    break;
                case "sbi":
                    e = m[1];
                    break;
                case "start":
                    d = m[1];
                    break;
                case "lr":
                    f = m[1];
                    break;
                case "qdr":
                    g = m[1];
                    break;
                case "num":
                    h = m[1];
                    break;
                case "li":
                    i = m[1];
                    break;
                case "filter":
                    j = m[1];
                    break;
                case "occt":
                    k = m[1];
                    break;
                case "filetype":
                    l = m[1]
            }
        }), a.length > 0 && (c = a), b["start"] >= 0 && (d = b["start"]), b["sbi"] && (e = b["sbi"]), b["lr"] && (f = b["lr"]), b["qdr"] && (g = b["qdr"]), b["num"] && (h = b["num"]), b["li"] && (i = b["li"]), b["filter"] && (j = b["filter"]), b["occt"] && (k = b["occt"]), b["filetype"] && (l = b["filetype"]), "none" === b["lr"] && (f = ""), "none" === b["qdr"] && (g = ""), "none" === b["num"] && (h = ""), "none" === b["li"] && (i = ""), "none" === b["filter"] && (j = ""), "none" === b["occt"] && (k = ""), "none" === b["filetype"] && (l = ""), c === !1 ? "" : (m = __imageSearch ? "/?tab=image&q=" + c : "/?q=" + c, d > 0 && (m += "&start=" + d), e.length > 0 && (m += "&sbi=" + e), f.length > 0 && (m += "&lr=" + f), g.length > 0 && (m += "&qdr=" + g), h.length > 0 && (m += "&num=" + h), i.length > 0 && (m += "&li=" + i), j.length > 0 && (m += "&filter=" + j), k.length > 0 && (m += "&occt=" + k), l.length > 0 && (m += "&filetype=" + l), m)
    }, 
    
    /* 响应点击search 按钮事件 */
    $(".submit").click(function() {
        var c, b = $(this).parent().children("input").val();
        b.length > 0 && (c = __imageSearch ? "/?tab=image&q=" + encodeURIComponent(b) : "/?q=" + encodeURIComponent(b), setUrl(c))
    }), 
    
    $("input[type=radio]").change(function() {
        var b;
        switch ($(this).attr("name")) {
            case "li":
                b = doCreateUrl("", {
                    li: $(this).prop("checked") ? "1" : "none"
                })
        }
        setUrl(b)
    }), $("input[type=checkbox]").change(function() {
        var c, b = "";
        $("input[type=checkbox]:checked").each(function() {
            b += " " + $(this).val()
        }), 0 === b.length && (b = "none"), c = doCreateUrl("", {
            filter: b
        }), setUrl(c)
    }), $("input[type=hidden]").each(function() {
        $(this).change(function() {
            var b, e, c = $(this).attr("name"),
                d = $(this).val();
            switch (c) {
                case "lr":
                case "qdr":
                case "num":
                case "occt":
                case "filetype":
                    e = {}, e[c] = d, b = doCreateUrl("", e)
            }
            setUrl(b)
        })
    }), $(".search-setdefault").children(".button").click(function() {
        var c, b = window.external;
        if (b && "AddSearchProvider" in b && "IsSearchProviderInstalled" in b) {
            c = 0;
            try {
                c = b.IsSearchProviderInstalled("http://" + document.domain)
            } catch (d) {
                c = 0
            }
            switch (c) {
                case 0:
                    b.AddSearchProvider("http://" + document.domain + "/opensearch.xml");
                    break;
                case 1:
                    alert("宸叉坊鍔� " + document.domain + " 鍒版偍鐨勬祻瑙堝櫒鎼滅储寮曟搸鍒楄〃锛屼絾涓嶆槸榛樿鎼滅储寮曟搸銆�");
                    break;
                case 2:
                    alert("宸叉坊鍔� " + document.domain + " 鍒版偍鐨勬祻瑙堝櫒鎼滅储寮曟搸鍒楄〃锛屼笖涓洪粯璁ゆ悳绱㈠紩鎿庛€�")
            }
        } else alert("鎶辨瓑锛屾偍鐨勬祻瑙堝櫒涓嶆敮鎸佺浉鍏虫帴鍙ｏ紝璇锋墜鍔ㄨ缃€�")
    }), isMobile.any() ? ($(document).scroll(function() {
        __imageSearch && doImageVisibleLoading()
    }), $(".page-main").find("input[name=keywords]").focus(function() {
        $(".page-main").css("padding-top", "10px"), $(".page-main").find(".google-logo").hide(), $(".search-uistyle").hide(), $(".ui.main.menu").hide()
    }), $(".page-main").find("input[name=keywords]").blur(function() {
        $(".page-main").css("padding-top", "30%"), $(".page-main").find(".google-logo").show(), $(".search-uistyle").show(), $(".ui.main.menu").show()
    }), $(".ui.left.sidebar").append($(".search-option").removeClass("hide")).sidebar({
        closable: !1,
        onVisible: function() {
            $(".pusher").click(function(a) {
                return $(".ui.left.sidebar").sidebar("hide"), a.stopPropagation(), !1
            })
        },
        onHidden: function() {}
    }).sidebar("attach events", ".launch.sidebar"), $(".launch.sidebar").hide(), $(".gotop").parent().remove()) : ($(".launch.sidebar").remove(), $(document).scroll(function() {
        var a, b, c;
        __imageSearch && doImageVisibleLoading(), $(".search-result-list").is(":visible") && (a = parseInt($(this).scrollTop()), a >= 80 ? 0 === $(".ui.main.menu .column").find(".search-input").length && (b = $('<div class="item search-input"></div>'), c = $(".page-search .ui.action.input").clone(!0, !0), c.children("input.keywords").css("width", "450px"), c.children(".ui.submit.button").removeClass("blue").removeClass("black").addClass("basic"), c.children(".ui.submit.button")[0].style.setProperty("background", "#fff", "important"), b.append(c), b.appendTo($(".ui.main.menu .column")), $(".ui.main.menu .column .title:gt(2)").hide()) : $(".ui.main.menu .column").find(".search-input").length > 0 && ($(".ui.main.menu .column").find(".search-input").remove(), $(".ui.main.menu .column .title:gt(2)").show())), $("#__resultBox").hide()
    }), $(document).on({
        dragleave: function(a) {
            a.preventDefault()
        },
        drop: function(a) {
            a.preventDefault()
        },
        dragenter: function(a) {
            a.preventDefault(), $("i.sbi:visible").trigger("click"), $('.tabular .item[data-tab="tab2"]').trigger("click")
        },
        dragover: function(a) {
            a.preventDefault()
        }
    })), $(".gohome").click(function() {
        doShowPageMain(), __imageSearch ? setUrl("/?tab=image") : setUrl("/")
    }), $(".gotop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 100)
    }), $(".search-option-button").click(function() {
        $(this).remove(), $(".search-option").fadeIn(500)
    }), $(".retrySearch").click(function() {
        _czc.push(["_trackEvent", "retry", "click", __externalSearching, 0, "search"]), doUseBackupSearchEngine()
    }), $(".reportSearch").click(function() {
        _czc.push(["_trackEvent", "report", "click", __externalSearching, 0, "search"]), alert("鎴愬姛涓婃姤姝ゆ寮傚父锛屾垜浠皢灏藉揩澶勭悊锛�")
    }), $(".web-search").click(function() {
        doSwitchTab("web"), $(".gohome").trigger("click")
    }), $(".image-search").click(function() {
        doSwitchTab("image"), $(".gohome").trigger("click")
    }), cnzzTrackEvent = function() {
        $(".leftad").find("iframe").length > 0 ? _czc.push(["_trackEvent", "adsense", "loaded", location.hostname, 0, "leftad"]) : setTimeout(function() {
            cnzzTrackEvent()
        }, 100)
    }, cnzzTrackEvent(), setUrl(window.location.search.replace(/\+/g, " "))
});
