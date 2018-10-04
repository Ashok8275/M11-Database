jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        return this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                }
                else {
                    if (pageData.ImageHotSpots.correctfeedback != undefined) {
                            fdkurl = pageData.ImageHotSpots.correctfeedback;
                    }
                }
                if(fdkurl !=undefined && fdkurl != "")
                {
                    fdkurl = _Settings.dataRoot + fdkurl;
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");
                    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                        //this.SetFeedbackTop()
                        $("body").animate({
                            scrollTop: $(document).height()
                        }, 1000);
                    });
                }
            }
        },
        DisplayInstructorReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                
                this.ViewTextEntryInReviewMode();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    for (var i = 0; i < reviewData.Positions.length; i++) {
                        var posObj = reviewData.Positions[i];
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.height();
                        if(ht < 597)
                        ht = 597;
                        while ((posObj.posY + 40) > ht) {
                            posObj.posY = posObj.posY - 2;
                        }
                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_div);


                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                            appendImage.append(_divI);
                        }
                    }
                }
            }
            if(_Navigator.GetCurrentPage().pageId == "p2" && _Navigator. CheckIfPageLoaded("p2m1"))//do not load feedback on p2 if another path is taken by user
            {
                return;
            }
            this.ShowFeedbackReviewMode();
        },
        InstructorReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        var tEntry = reviewData.textEntry[i].trim();
                        if (pageDetailData.answerset.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $("#"+pageDetailData.EmbedSettings[i].inputid).val(reviewData.textEntry[i]).css({"color":ColorCodes.green, "font-weight":"bold"});
                                $("#"+pageDetailData.EmbedSettings[i].inputid).show().k_disable();
                            }
                            else {
                                $("#"+pageDetailData.EmbedSettings[i-1].reviewid).val(reviewData.textEntry[i]).css({"color":ColorCodes.red, "font-weight":"bold"});
                                $("#"+pageDetailData.EmbedSettings[i-1].reviewid).show();
                            }
                        }
                        else {
                            $("#"+pageDetailData.EmbedSettings[i].inputid).val(reviewData.textEntry[i]).css({"color":ColorCodes.red, "font-weight":"bold"});
                            $("#"+pageDetailData.EmbedSettings[i].inputid).show();
                        }
                    }
                }
                $(".textentryreview1").show();
            }
        },
        DisplayUserReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                
                this.DisplayReviewModeForTextEntry();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                    var appendImage = $(".wrapperimage");
                    var ht = appendImage.height();
                    while ((posObj.posY + 40) > ht) {
                        posObj.posY = posObj.posY - 2;
                    }
                    if (posObj.isCorrect) {
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_div);


                    } else {
                        var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                        appendImage.append(_divI);
                    }

                }
            }
            this.ShowFeedbackReviewMode();


        },
        GetReviewData: function () {
            return reviewData;
        },
        AddReviewData: function (textentryObjId, isCorrect) {
            var found = false;
            var pageReviewData;
            var textentryObj = $("input#" + textentryObjId)
            var str = textentryObj.val().trim();
            var objId = textentryObjId;
            reviewData = this.GetReviewData();
            for (var r = 0; r < reviewData.length; r++) {
              if (reviewData[r].pageId == _Navigator.GetCurrentPage().pageId && objId == reviewData[r].objId) {
                var sameText = false;
                if (reviewData[r].textEntry != undefined) {
                  for (var i = 0; i < reviewData[r].textEntry.length; i++) {
                    if (reviewData[r].textEntry[i] == str) {
                      sameText = true;
                      break;
                    }
                  }
                  if (!sameText) {
                    if (reviewData[r].textEntry.length < 2) {
                      reviewData[r].textEntry.push(str);
                    }
                    else {
                      reviewData[r].textEntry.splice(0, 1);
                      reviewData[r].textEntry.push(str);
                    }
                  }
                }
                else {
                  reviewData[r].textEntry = [str];
                }
                found = true;
              }
            }
          
            if (!found) {
              var _obj = {};
              _obj.pageId = _Navigator.GetCurrentPage().pageId;
              _obj.textEntry = [str];
              _obj.isCorrect = isCorrect;
              _obj.objId = objId;
              reviewData.push(_obj);
            }
            /*ITSimModule.SetReviewData(reviewData)
            if (isCorrect) {
              fSetScoreForReviewMode();
            }*/
        },
        DisplayReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";

                if (reviewData.textEntry[reviewData.textEntry.length - 1] != undefined && reviewData.textEntry[reviewData.textEntry.length - 1] != "") {
                    var tEntry = reviewData.textEntry[reviewData.textEntry.length - 1].trim().toLowerCase();
                    if (pageDetailData.answerset.indexOf(tEntry) >= 0) {
                        $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[reviewData.textEntry.length - 1] + "</span>")
                    }

                }
                $(".textentryreview1").show();
            }
        },
        ViewTextEntryInReviewMode:function() {
            //var reviewData = ITSimModule.GetReviewDataForTextEntry();
            // var settings = PageSettings[gCurrPageObj.PageId];
            // var embedSettings = settings.EmbedSettings;
        $("input[type='text']").k_disable();
          var currentPageData = _Navigator.GetCurrentPage();
          var pageData = _ModuleCommon.GetPageDetailData();
            if (reviewData != undefined) {
              for (var i = 0; i < reviewData.length; i++) {
                var rData = reviewData[i];
                if(pageData != undefined){
                    if (pageData.EmbedSettings != undefined) {
                    for (j = 0; j < pageData.EmbedSettings.length; j++) {
                        if (rData.objId == pageData.EmbedSettings[j].inputid) {
                        var txtObj = $("#"+pageData.EmbedSettings[j].reviewid);
                        
                        for (k = 0; k < rData.textEntry.length; k++) {
                            var tEntry = rData.textEntry[k].trim();
                            if (k == 0) {
                                if (rData.textEntry[k].trim().toLowerCase() == pageData.answerset[k].trim().toLowerCase()) {
                                    $("#" + rData.objId).val( rData.textEntry[k] ).css({"color": ColorCodes.green, "font-weight": "bold"});
                                }
                                else {
                                    $("#" + rData.objId).val(rData.textEntry[k] ).css({"color": ColorCodes.red, "font-weight": "bold"});
                                }
                            }
                            if (k == 1) {
                                $("#" + pageData.EmbedSettings[j].reviewid).text( rData.textEntry[k] ).css({"color": ColorCodes.green, "font-weight": "bold"});
                                $("#" + pageData.EmbedSettings[j].reviewid).show();
                            }
                        }
                        break;
                        }
                    }
                    }
                }
              }
            }
          },
        AddHotspotClick: function (hotspotObj, event,isCorrect) {

            //$(".divHotSpot").remove();
            if (_Navigator.IsAnswered()) {
                return;
            }
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX;
            var rposY;
            if (event != undefined && event.pageX != undefined) {
                rposX = (event.pageX - posX);
                rposY = (event.pageY - posY);
            }
            if(rposX <0 || rposY <0){//gp if module is attmpted using accessibility
                rposX = hotspotObj.position().left + 20;
                rposY = hotspotObj.position().top + 20;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined)
            {
                return;
            }
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    var posindex = 0;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                                sameclick = true;
                                posindex = i;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                        else {
                            if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                                reviewData[r].Positions[posindex].isCorrect = isCorrect;
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                _obj.Positions = [position];
                //_obj.hsid = hotspotObj.hsid;
                reviewData.push(_obj);

            }

        },
        AddEditPropertiesClick: function (event) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData.EmbedSettings != undefined)
                return;
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX = (event.pageX - posX);
            var rposY = (event.pageY - posY);
            if (isNaN(rposX) || isNaN(rposY))
                return;

            var currentPageData = _Navigator.GetCurrentPage();
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                                sameclick = true;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: false };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: false };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }

        },
        OnPageLoad: function () {
            this.LoadHotSpot();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            if (_Navigator.IsAnswered()) {
                this.DisplayInstructorReviewMode();
                $(".divHotSpot, .divHotSpotdbl").addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
                //this.ViewTextEntryInReviewMode();
            }
        },
        LoadHotSpot: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];

            if (pageData != undefined) {

                var hotspotdata = pageData.ImageHotSpots;
                var htmlForDivHotspotImage = "";
                if (pageData.ImageHotSpots != undefined) {
                    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                        var currImg = $("img")
                        var orw = currImg.width();
                        var orh = currImg.height();

                        var hsId = hotspotdata.Hotspots[i].HotspotId;

                        var pwdth = hotspotdata.Hotspots[i].width;
                        var phight = hotspotdata.Hotspots[i].height;
                        var pleft = hotspotdata.Hotspots[i].left;
                        var ptop = hotspotdata.Hotspots[i].top;
                        var accessText = hotspotdata.Hotspots[i].accessText;
                        if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                            pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                            ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                        }

                        var eventname = hotspotdata.Hotspots[i].eventName;
                        if(eventname!=undefined )
                        {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpotdbl divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                        else
                        {
                        htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                    }
                    $(".wrapperimage").append(htmlForDivHotspotImage)
                }

            }
        },
        PresenterMode:function(){
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
            var hotspotLength = pageData.ImageHotSpots.Hotspots.length;
            if(currentPageData.pageId == "p17" && pageData.EmbedSettings!=undefined)
            {
                $("input[type='text']").addClass("greenspan");
                $("input[type='text']").val(pageData.answerset[0]);
                $("input[type='text']").k_disable();
            }
           /* if(hotspotLength > 1 && currentPageData.pageId == "p6" || currentPageData.pageId == "p10"){
                for(var i=0; i < hotspotLength; i++){
                    if(pageData.ImageHotSpots.Hotspots[i].presenter){

                    }
                }
            }
            else{*/
                if(currentPageData.pageId == "p6" || currentPageData.pageId == "p10"){
                    $(".divHotSpotdbl").addClass("hotspotclicked");
                    $(".divHotSpotdbl").addClass("disabled");
                    $(".divHotSpot").addClass("disabled");
                }
                else{
                    $(".divHotSpot").addClass("hotspotclicked");
                    $(".divHotSpot").addClass("disabled");
                }
            //}
            $("#linknext").k_enable();
        },
        ApplycontainerWidth: function () {
            
            var innerWidth = $(window).width();

            $("#header-title img").attr("src", "assets/images/logo.png")

            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))

                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }

        },
        OrientationChange: function () {

            this.ApplycontainerWidth();

        },
        HotspotClick: function (_hotspot, event) {
            if (_Navigator.IsAnswered())
                return;
            var action = _hotspot.attr("action")
            //this.AddHotspotClick(_hotspot, event);
            var score = 0;
            var nextpgid ="";
            var pageData = this.GetPageDetailData();
            isCorrect = true;
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        //if (pageData.ImageHotSpots.Hotspots[i].score != undefined && pageData.ImageHotSpots.Hotspots[i].score != "") {
                            //score = parseInt(pageData.ImageHotSpots.Hotspots[i].score);
                            nextpgid = pageData.ImageHotSpots.Hotspots[i].nextPageId;
                        //}
                            if(pageData.ImageHotSpots.Hotspots[i].correct !=undefined)
                            {
                                isCorrect = pageData.ImageHotSpots.Hotspots[i].correct;
                            }
                    }
                }
            }
            this.AddHotspotClick(_hotspot, event,isCorrect);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    _Navigator.SetPageStatus(true);
                    if(nextpgid !=undefined && nextpgid !="")
                    {
                        var ndata = _Navigator.SetNextPageId(nextpgid)
                        _Navigator.LoadPage(nextpgid);
                    }
                    else
                    {
                         this.HotspotNext();
                    }
                    break;
                case "feedback":
                    _Navigator.SetPageStatus(true);
                    this.HotspotFeedback(_hotspot);
                case "inputcheck":
                    _ModuleCommon.InputEnter($("input.EmbededElement"));
                    break;
                default:
                    break;
            }
        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        InputFeedback: function () {
            
            var pageData = this.GetPageDetailData();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            });
            $("input").k_disable();
            this.EnableNext();
        },
        HotspotFeedback: function (_hotspot) {
            
            var pageData = this.GetPageDetailData();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        url = pageData.ImageHotSpots.correctfeedback;
                        break;
                    }
                    else{
                        url = pageData.ImageHotSpots.incorrectfeedback;
                    }
                }
            }
            var fdbkUrl = _Settings.dataRoot + url;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            });

            this.EnableNext();
        },
        HotspotNext: function (_hotspot) {
            _Navigator.Next(_hotspot);
        },
        InputNext: function () {
            _Navigator.Next();
        },
        InputEnter: function (inputtext) {
            if (_Navigator.IsAnswered())
                return;
            if ($.trim(inputtext.val()) != "") {
                var pageData = this.GetPageDetailData();
                var vtextarr = pageData.EmbedSettings.validatearray;
                var isVRequired = false;
                for (var i = 0; i < vtextarr.length; i++) {
                    if (($.trim(vtextarr[i])).toLowerCase() == ($.trim(inputtext.val())).toLowerCase()) {
                        isVRequired = true;
                        break;
                    }
                }

                var found = false;
                var str = $.trim(inputtext.val()).toLowerCase();
                var currentPageData = _Navigator.GetCurrentPage();
                if (reviewData != undefined && reviewData.length > 0) {
                    for (var i = 0; i < reviewData.length; i++) {
                        if (reviewData[i].pageId == currentPageData.pageId) {
                            if (reviewData[i].textEntry.length < 2) {
                                reviewData[i].textEntry.push(str);
                            } else {
                                reviewData[i].textEntry.splice(0, 1);
                                reviewData[i].textEntry.push(str);
                            }

                            found = true;
                        }
                    }
                }

                if (!found) {
                    var _obj = {};
                    _obj.pageId = currentPageData.pageId;
                    _obj.textEntry = [str];
                    _obj.isCorrect = true;
                    reviewData.push(_obj);

                }

            }
            if (isVRequired) {
                var score = pageData.EmbedSettings.score;
                _Navigator.SetPageScore(score)
                var action = pageData.EmbedSettings.action;
                _Navigator.SetPageStatus(true);
                switch (action) {
                    case "next":
                        this.InputNext();
                        break;
                    case "feedback":
                        this.InputFeedback();
                        break;
                    default:
                        break;
                }
            }
            else
            {
                $(".divHotSpot").removeClass("disabled");
                $(".divHotSpot").removeClass("hotspotclicked");
            }
        },
        videoEnded : function () {
           // $("#linknext").k_enable();
            this.EnableNext();
            _Navigator.SetPageStatus(true)
        },
        videoStart : function () {
            $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });   
        },
        AppendFooter: function () {
            if ($(".presentationModeFooter").length == 0) {
                //var str = '<div class="levelfooterdiv"><div class="navBtn prev" onClick="_Navigator.Prev()" role="button" tabindex = 195 aria-label="Previous"><a id="prev_arrow" href="#"></a></div><div style="display: inline-block;width: 2px;"></div><div class="boxleveldropdown" style="width: 150px;"  role="button" tabindex = 196 aria-label="Scorecard"><span class="leftarrow"></span><ul class="levelmenu"><li class="uparrow" style = "width: 100px; margin-left: -8px;"><span class="menutitle" >Scorecard</span><div class="levelsubMenu" tabindex = 197 role="text">Total Score - <br>Activity Score - </div><a class="menuArrow"></a></div><div style="display: inline-block;width: 2px;"></div><div class="navBtn next" onClick="_Navigator.Next()" role="button" tabindex = 198 aria-label="Next"><a id="next_arrow" href="#"></a></div></div>';
                var str = '<div class="presentationModeFooter">Presentation Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
    }
})();
$(document).ready(function () {
    _Navigator.Start();   
    //if (_Settings.enableCache) {
    //    _Caching.InitAssetsCaching();
    //    _Caching.InitPageCaching();
    //}
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});