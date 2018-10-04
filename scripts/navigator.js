//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [26];
    var totalsimscore = 18;
    var presentermode = false;
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,
        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p3",
            dataurl: "p2.htm",
            hinturl: "hintp2.htm",
            hasActivity: true,
            hashint: true
        },
        "p2m1": {
            pageId: "p2m1",
            prevPageId: "p2",
            nextPageId: "p2m2",
            dataurl: "p2m1.htm",
            hinturl: "hintp2m1.htm",
            hasActivity: true,
            hashint: true
        },
        "p2m2": {
            pageId: "p2m2",
            prevPageId: "p2m1",
            nextPageId: "p3",
            dataurl: "p2m2.htm",
            hinturl: "hintp2m2.htm",
            hasActivity: true,
            hashint: true
        },
        
        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4",
            dataurl: "p3.htm",
            hasActivity: true,
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p3",
            nextPageId: "p6",
            dataurl: "p4.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            hashint: true
        },
        "p5": {//optional
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p6",
            dataurl: "p5.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
            hashint: true
        },
        "p6": {
            pageId: "p6",
            prevPageId: "p4",
            nextPageId: "p7",
            dataurl: "p6.htm",
            hinturl: "hintp6.htm",
            hasActivity: true,
            hashint: true
        },
        "p7": {
            pageId: "p7",
            prevPageId: "p6",
            nextPageId: "p8",
            dataurl: "p7.htm",
            hasActivity: true,
        },
        "p8": {
            pageId: "p8",
            prevPageId: "p7",
            nextPageId: "p10",
            dataurl: "p8.htm",
            hinturl: "hintp8.htm",
            hasActivity: true,
            hashint: true
        },
        "p9": {//optional
            pageId: "p9",
            prevPageId: "p8",
            nextPageId: "p10",
            dataurl: "p9.htm",
            hinturl: "hintp9.htm",
            hasActivity: true,
            hashint: true
        },
        "p10": {
            pageId: "p10",
            prevPageId: "p8",
            nextPageId: "p11",
            dataurl: "p10.htm",
            hinturl: "hintp10.htm",
            hasActivity: true,
            hashint: true
        },
        "p11": {
            pageId: "p11",
            prevPageId: "p10",
            nextPageId: "p14",
            dataurl: "p11.htm",
            hinturl: "hintp11.htm",
            hasActivity: true,
            hashint: true
        },
        "p12": {//optional
            pageId: "p12",
            prevPageId: "p11",
            nextPageId: "p13",
            dataurl: "p12.htm",
            hinturl: "hintp12.htm",
            hasActivity: true,
            hashint: true
        },
        "p13": {//optional
            pageId: "p13",
            prevPageId: "p12",
            nextPageId: "p14",
            dataurl: "p13.htm",
            hinturl: "hintp13.htm",
            hasActivity: true,
            hashint: true
        },
        "p14": {
            pageId: "p14",
            prevPageId: "p11",
            nextPageId: "p15",
            dataurl: "p14.htm",
            hasActivity: true,
        },
        "p15": {
            pageId: "p15",
            prevPageId: "p14",
            nextPageId: "p16",
            dataurl: "p15.htm",
            hinturl: "hintp15.htm",
            hasActivity: true,
            hashint: true
        },
        "p16": {
            pageId: "p16",
            prevPageId: "p15",
            nextPageId: "p17",
            dataurl: "p16.htm",
            hinturl: "hintp16.htm",
            hasActivity: true,
            hashint: true
        },
        "p17": {
            pageId: "p17",
            prevPageId: "p16",
            nextPageId: "p18",
            dataurl: "p17.htm",
            hinturl: "hintp17.htm",
            hasActivity: true,
            hashint: true
        },
        "p18": {
            pageId: "p18",
            prevPageId: "p17",
            nextPageId: "p19",
            dataurl: "p18.htm",
            hinturl: "hintp18.htm",
            hasActivity: true,
            hashint: true
        },
        "p19": {
            pageId: "p19",
            prevPageId: "p18",
            nextPageId: "p20",
            dataurl: "p19.htm",
            hinturl: "hintp19.htm",
            hasActivity: true,
            hashint: true
        },
        "p20": {
            pageId: "p20",
            prevPageId: "p19",
            nextPageId: "p21",
            dataurl: "p20.htm",
            hinturl: "hintp20.htm",
            hasActivity: true,
            hashint: true
        },
        "p21": {
            pageId: "p21",
            prevPageId: "p20",
            nextPageId: "p22",
            dataurl: "p21.htm",
            hinturl: "hintp21.htm",
            hasActivity: true,
            hashint: true
        },
        "p22": {
            pageId: "p22",
            prevPageId: "p21",
            nextPageId: "p23",
            dataurl: "p22.htm",
            hinturl: "hintp22.htm",
            hasActivity: true,
            hashint: true
        },
        "p23": {
            pageId: "p23",
            prevPageId: "p22",
            nextPageId: "p24",
            dataurl: "p23.htm",
            hinturl: "hintp23.htm",
            hasActivity: true,
            hashint: true
        },
        "p24": {
            pageId: "p24",
            prevPageId: "p23",
            nextPageId: "p25",
            dataurl: "p24.htm",
            hasActivity: true,
            hinturl: "hintp24.htm",
            hashint: true
        },
        "p25": {
            pageId: "p25",
            prevPageId: "p24",
            nextPageId: "p26",
            dataurl: "p25.htm",
            hasActivity: true,
        },

         "p26":{
            pageId: "p26",
            prevPageId: "p25",
            nextPageId: "",
            dataurl: "p26.htm",
            hasActivity: true,
            isLastPage:true,
            isAssessment:true,
            hideHint: true
        }
    }
    var _StateData = {}

    function OnPageLoad() {

        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        _ModuleCommon.OnPageLoad();
        if(presentermode){
            $("#linknext").k_enable();
            $(".start-btn").k_disable();
        }
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            this.LoadPage("p1");
            if(presentermode){
                _ModuleCommon.AppendFooter();
            }
        },
        LoadPage: function (pageId, jsonObj) {
            console.log(pageId)
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;
            this.UpdateProgressBar();
            _currentPageObject = _NData[_currentPageId]
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();

            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
            }
            if (this.IsAnswered()) {
                $("#linknext").k_enable();

            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();
            if (_currentPageObject.pageId == "p2") { // temporary fix
                $("#progressdiv").css("margin-left", "-20px")
            }
            else
            {
                $("#progressdiv").css("margin-left", "-15px")
            }
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();                   
                    setReader("header1");    

                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                        if(_currentPageId=="p26")//  change to assessment id
                        {
                            showQuestion();
                        }
                        if(_currentPageObject.pageId == "p2")
                            setReader("titleheader");
                        else
                        {
                            //if($("body").hasClass("no-focus"))
                            {
                                setReader("titleheader");
                            }
                            // else
                            // {
                            //     setReader("progressdiv");
                            // }
                        }
                        //$("#hintdiv").show();
                        if(_currentPageObject.hideHint !=undefined && _currentPageObject.hideHint)
                        {
                            $("#hintlink").k_disable();
                            $(".hintdiv").hide();
                        }
                            if(presentermode)
                            {
                                _ModuleCommon.PresenterMode();
                            }
                        if( _currentPageObject.hinturl !=undefined || _currentPageObject.hashint)
                        {
                            $("div#hintdiv").show();
                            //$(".hintlink").show();
                            $("div#hintdiv").css("margin-left","auto");
                            $(".hintlink").k_enable();
                            $(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });
                        }
                        else
                        {
                            //$(".hintlink").hide();
                            $("div#hintdiv").hide();
                        }
                        if(_Navigator.GetCurrentPage().hideHint != undefined && _Navigator.GetCurrentPage().hideHint){
                            //$(".hintlink").hide();
                            $("div#hintdiv").hide();
                        }
                        _NData[_currentPageObject.pageId].isLoaded = true;
                        //$("h2.pageheading").focus();
                    });
                })
            }
        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            if ( _currentPageObject.pageId == "p26" && typeof(currentQuestionIndex) !='undefined'  &&  currentQuestionIndex > 0   ) {
				$("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex  = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
				showQuestion();				
            }
            else{
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            $("#linkprevious").k_enable();
            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                var custFunction = new Function(_currentPageObject.customNext.jsFunction);
                custFunction();
            }
            if ( _currentPageObject.pageId == "p26")
            {  
             if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) < gRecordData.Questions.length ) {
                    currentQuestionIndex  = currentQuestionIndex + 1
                    $("#Questioninfo").show();
                    showQuestion()
                    
                    //this.UpdateProgressBar();
                    if(gRecordData.Status !="Completed" && !presentermode)
                    {
                        $("#linknext").k_disable();    
                        $("#linkprevious").k_disable();
                    }
                }
              else  if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) == gRecordData.Questions.length ) {
                    //this.UpdateProgressBar();
                    // Show review instruction
                    
                        $(".intro-content-question").hide();
                        $(".questionwrapper").hide();
                        currentQuestionIndex  = currentQuestionIndex + 1;
                        $("#Summary").show();
                        $("#Questioninfo").hide();
				        $("#Summary").load("pagedata/Summary.htm",function(){
                            showSummary()                           
                            $("#linkprevious").k_enable();
                            $("#Summary").find("input[type='radio']").attr("readonly","readonly");
                            $(".question-band").find("img").attr("aria-hidden","true");
                        })
                        $("#climate-deal").css("margin-left","23%");
                        $("#linknext").k_disable();
                        //$(".inputcircle").k_disable();
                        

                }                
          
			}
            else {

                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                    visitpage++;
                }
            }
            visitpage += this.GetAnswerCount() ;
            return visitpage;
        },
        GetAnswerCount:function(){
          var cnt =  (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length  ) 
            cnt+= gRecordData.Status == "Completed" ? 1:0;
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressDiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");


        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;

            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var score = (ObtainPoint / totalsimscore) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }
        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;

            return false;

        },
        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;

            return false;

        },
        CheckIfPageLoaded:function(pageid){
            return _NData[pageid].isLoaded !=undefined && _NData[pageid].isLoaded ? true : false;
        },
        SetPresenterMode:function(val){
            presentermode = val;
        },
        IsPresenterMode:function(){
            return presentermode;
        },
        SetNextPageId :function(nextpageid){
            if(nextpageid == "p12")
            {
                _NData[_currentPageObject.nextPageId].prevPageId="p13";
                progressLevels[0] = progressLevels[0]+2;//increase num of pages by 1 
            }
            else if(nextpageid == "p2m1")
            {
                _NData[_currentPageObject.nextPageId].prevPageId="p2m2";
                progressLevels[0] = progressLevels[0]+2;//increase num of pages by 1 
            }
            else
            {
                _NData[_currentPageObject.nextPageId].prevPageId=nextpageid;
                progressLevels[0] = progressLevels[0]+1;//increase num of pages by 1 
            }
            _NData[_currentPageId].nextPageId = nextpageid;
           
           
        }
    };
})();



function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}


function removeCSS(cssFileToRemove) {
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToRemove) != -1 ) {
			document.styleSheets[w].disabled = true;
		}
	}
}
function addCSS(cssFileToAdd) {
	var isCSSAlreadyAdded = false;
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToAdd) != -1 ) {
			isCSSAlreadyAdded = false;
		}
	}
	console.log(isCSSAlreadyAdded + " --")
	if(! isCSSAlreadyAdded){
		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFileToAdd);
		document.getElementsByTagName("head").item(0).appendChild(newlink);
	}
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
