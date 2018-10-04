

$(document).on("mouseover", ".qheight", function (event) {
    $(this).css({
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });

});
$(document).on("mouseout", ".qheight", function (event) {
    $(this).css({
        "font-weight": "normal"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#007AA2",
        "color": "#FFF"
    });
});
$(document).on("click", ".qheight", function (event) {
    $(".qheight").removeClass("optionselected");

    $(this).addClass("optionselected");

});
var hotspotclicked = false;;
var hotspot;
$(document).on("click", ".divHotSpot", function (event) {
    if(_Navigator.IsPresenterMode()){
        return;
    }
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event); 
    },400)
    
});
$(document).on("dblclick", ".divHotSpotdbl", function (event) {
    if(_Navigator.IsPresenterMode()){
        return;
    }
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
       
    },400)
    
});
$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;    
    _Navigator.Next();
});


//$(document).on("dblclick", ".divHotSpot", function (event) {
//    return;

//});


$(document).on("click", ".hintlink", function (event) {
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if ($(this).hasClass("expanded")) {
        $(".hintlink").removeClass("expanded")
        $(".hintlink").attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
    }
    else {
        $(".hintcontainer").slideDown(100, function () {
            $(".hintlink").addClass("expanded");
            $(".hintlink").attr("aria-expanded", "true");
        });
    }

});
$(document).on("click", ".closehintlink", function (event) {

    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100);


});
$(document).on("keydown", "input.EmbededElement", function (event) {
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        _ModuleCommon.InputEnter($(this));
    }
});

$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});

$(window).resize(function () {
});

$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled") || $(".divHotSpot").length == 0)
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});


$(document).on('click', "#start", function (event) {
   //_Navigator.Next();
   _Navigator.LoadPage("p26")
});
$(document).on('click', ".reviewsubmit", function (event) {
    _Navigator.Next();
});
$(document).on('mouseover', ".hintlink", function (event) {
    $(".hintlink .hintlinkspan").css({"color":"#b22222","border-bottom":"1px solid #b22222"})
    $(this).find("path").css({"fill":"#b22222"})
});

$(document).on('mouseout', ".hintlink", function (event) {
 $(".hintlink .hintlinkspan").css({"color":"#047a9c","border-bottom":"1px solid #047a9c"})
 $(this).find("path").css({"fill":"#047a9c"}) 
});
$(document).on('keydown', "#p17val1", function (event) {
    var currentpid =_Navigator.GetCurrentPage().pageId;
    
    if (event.keyCode == 13) {
        if($(this).val() == undefined || $(this).val() == ""){
            return;
        }
        var inputtextids =  $("input[type='text']").map(function () {
            return $(this).attr("id");
        });
        for(var i=0; i<inputtextids.length; i++){
            _ModuleCommon.AddReviewData(inputtextids[i], true);
        }
        if($.trim($(this).val()).toLowerCase() == _PData[currentpid].answerset){
            _Navigator.GetCurrentPage().isAnswered = true;
            _Navigator.Next();
        }
    }
});

$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();  
  
});
$(document).on("click", ".assessmentSubmit", function (event) {
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id") ;
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    _Navigator.Next();
});
$(document).on('click', ".menuArrow", function (event) {
    //$(".levelsubMenu").hide();
    $(".levelsubMenu").toggle();
});
$(document).on('click', ".inputcircle", function (event) {
    $(this).next(".inpputtext").trigger( "click" );
});
