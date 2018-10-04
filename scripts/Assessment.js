

var numOfQuestion = 4
var numOfPagesInModule = 1 + numOfQuestion
var currentQuestionIndex = 0;
var introHTML  = "";
//	- Progress logic = (visitedpages / total pages ) * 100 %
//  	"visitedNumberOfPages"  -- increase this by one on every page/question -- on next click?
var visitedNumberOfPages = 0;


var gRecordData = null;


 //	- Score -- number of correct attempted questions divided by total number of questions
var AssessmentScore = 0;

function startRecordPlayer(){
	//show record title
	window.document.title = gRecordData.RecordTitle
	$("#header-title").find("h1").text(gRecordData.RecordTitle)

	//$(".main-content").load(gRecordData.LandingPageURL)
	// init global var
	AssessmentScore = gRecordData.AssessmentScore;
	visitedNumberOfPages = gRecordData.VisitedNumberOfPages
	if( gRecordData.Status == "NotStarted" ){
		//randomize questions
		gRecordData.Questions = shuffle(gRecordData.Questions)
	}
	else
	{
		// set currentQuestionIndex by looping through last visited question
		for(var a=0; a < gRecordData.Questions.length; a++){
			if(gRecordData.Questions[a].UserSelectedOptionId == ""){
				currentQuestionIndex = a;
			}
		}

		// if its not landing page
		if(gRecordData.LastVisitedPage != "1"  ){

		}
	}


}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
var isFirstQAnswered = false
function showQuestion(){
	//addCSS("styles/questionPlaceholder.css");
	$(".question-band fieldset").empty();
	$(".question-band fieldset").append("<legend aria-label='Options'></legend>")
 	$(".intro-content-question").hide();
	 currQustion = gRecordData.Questions[currentQuestionIndex]
	 if(gRecordData.Status == "NotStarted"){
		 gRecordData.Status = "Started";
	 }
	$("#QuetionText").html( "<span style='font-size:0px'>Question Number </span><span >" + (currentQuestionIndex + 1) + ") &nbsp;</span>" + currQustion.QuestionText)

	if(currQustion.UserSelectedOptionId == ""){
		// randomize options
		currQustion.Options = shuffle(currQustion.Options)
	}

	$("#linkprevious").k_enable();
	$("#linknext").k_disable();

	for(var i=0; i < currQustion.Options.length; i++){
		optionObj = $(".Option").clone();
		optionObj.attr("id", "label"+currQustion.Options[i].OptionId)
		optionObj.find("input").attr("id", currQustion.Options[i].OptionId)
		optionObj.find("input").attr("name", "radiobutton")
		optionObj.find(".inpputtext").html(currQustion.Options[i].OptionText)
		optionObj.find(".inpputtext").attr("for",currQustion.Options[i].OptionId)
		optionObj.removeClass("Option")
		
		optionObj.show();
		$(".question-band fieldset").append(optionObj)
		
		if(currQustion.UserSelectedOptionId == currQustion.Options[i].OptionId){
			$("#"+currQustion.Options[i].OptionId).trigger( "click" );
			$("#linknext").k_enable()
			isFirstQAnswered = true
		}
	}
	//$(".assessmentradio").unwrap(".Option");
	$("#Questioninfo").text("Performance Check: Mini-Quiz: Question "+ parseInt(currentQuestionIndex+1) +" of 4")
	//removeCSS("styles/questionPlaceholder.css")
	$(".intro-content-question").fadeIn(600)
	
	
	setReader("Questioninfo")
	
	
	if(_Navigator.IsPresenterMode()){
		showQuestionPresenterMode();
		$("#linknext").k_enable()
	}
	if( gRecordData.Status == "Completed")
	{
		showUserReviewMode();
	}
	_Navigator.UpdateProgressBar();
	$(".assessmentSubmit").k_disable();
}
function showQuestionPresenterMode(){
	var currQuestion = gRecordData.Questions[currentQuestionIndex];
                var correctoption =  currQuestion.Options.filter(function (item) {
                    return item.IsCorrect;
                })[0];
                $("#"+correctoption.OptionId).prop("checked","true");	
                $("input[type='radio']").k_disable();
                var iscorrectimg = $("#"+correctoption.OptionId).closest("label").find(".iscorrect").find("img")
                $("#"+correctoption.OptionId).closest("label").css("position","relative");
                iscorrectimg.attr("src","assets/images/tick-icon-correct-1.png")
				iscorrectimg.closest("span").show();
				iscorrectimg.attr("aria-label","Correct option selected");
				$("#linknext").k_enable();
}
function showUserReviewMode(){
	var currQuestion = gRecordData.Questions[currentQuestionIndex];
                var correctoption =  currQuestion.Options.filter(function (item) {
                    return item.IsCorrect;
                })[0];
               
                
                var iscorrectimg = $("#"+correctoption.OptionId).closest("label").find(".iscorrect").find("img")
                $("#"+correctoption.OptionId).closest("label").css("position","relative");
                iscorrectimg.attr("src","assets/images/tick-icon-correct-1.png")
				iscorrectimg.closest("span").show();
				if(correctoption.OptionId == currQuestion.UserSelectedOptionId)
			    {
					iscorrectimg.attr("aria-label","Correct option selected");
					$("#"+correctoption.OptionId).prop("checked","true");	
				}
				else
				{
					iscorrectimg.attr("aria-label","Correct option");
					$("#"+ currQuestion.UserSelectedOptionId).closest("label").css("position","relative");
					iscorrectimg = $("#"+ currQuestion.UserSelectedOptionId).closest("label").find(".iscorrect").find("img")
					$("#"+ currQuestion.UserSelectedOptionId).prop("checked","true");
					iscorrectimg.attr("src","assets/images/incorrect-v1-1.png")
					iscorrectimg.attr("aria-label","Incorrect option selected");
					iscorrectimg.closest("span").show();
					
				}
				$("input[type='radio']").k_disable();
				$("#linknext").k_enable();
}

function showSummary(){
	var score = 0;
	for(var b=0; b < gRecordData.Questions.length; b++){
		questionObj = $("#Question").clone();
		currQustion = gRecordData.Questions[b]
		questionObj.find(".quetiontext").html( "<span style='font-size:0px'>Question Number </span><span>" + (b + 1) + ") &nbsp;</span>" + currQustion.QuestionText)
		var radioname = "radio" +gRecordData.Questions[b].QuestionId;
		if(currQustion.UserSelectedOptionId == ""){
			// randomize options
			currQustion.Options = shuffle(currQustion.Options)
		}
		questionObj.find("#question-band fieldset").empty();
		questionObj.find("#question-band fieldset").append("<legend aria-label='Options'></legend>")
		var feedbacktext = "";
		for(var i=0; i < currQustion.Options.length; i++){
			
			optionObj = $(".Option").clone();
			optionObj.find("input").attr("id", "question"+gRecordData.Questions[b].QuestionId+currQustion.Options[i].OptionId)
			optionObj.find("input").attr("name", "radiobutton")
			optionObj.find(".inpputtext").html(currQustion.Options[i].OptionText)
			optionObj.find(".inpputtext").attr("for","question"+gRecordData.Questions[b].QuestionId+currQustion.Options[i].OptionId)
			optionObj.removeClass("Option");
			optionObj.find("input").attr("name",radioname)
			optionObj.show();
			
			//questionObj.find(".question-band").append(optionObj)

			 var iscorrectimg = optionObj.find(".iscorrect").find("img")

			 if(currQustion.Options[i].IsCorrect){
					iscorrectimg.attr("src","assets/images/tick-icon-correct-1.png")
					iscorrectimg.closest("span").show();
					iscorrectimg.attr("aria-label","Correct option");
					if(_Navigator.IsPresenterMode() ){
						optionObj.find("input").prop("checked","true");
					}
			 }
			if(currQustion.UserSelectedOptionId == currQustion.Options[i].OptionId){
				
				 if( !currQustion.Options[i].IsCorrect){
					iscorrectimg.attr("src","assets/images/incorrect-v1-1.png")
					iscorrectimg.attr("aria-label","Incorrect option selected");
					feedbacktext = currQustion.IncorrectFeedback;
					
					
				 }
				 else
				 {
					iscorrectimg.attr("aria-label","Correct option selected");
					score ++;
					feedbacktext = currQustion.CorrectFeedback;
				 }
				
				 optionObj.find("input").prop("checked","true");				 
				 iscorrectimg.closest("span").show();

			}

			questionObj.find(".question-band fieldset").append(optionObj)
			
		}
		var fdk =$(".questionfdk").clone();
		fdk.removeClass("questionfdk");
		fdk.html("<br/>"+feedbacktext);fdk.show()
		questionObj.append(fdk);
		questionObj.show();
	    questionObj.find(".question-band").addClass("summaryoptions");
		$("#Summary").append(questionObj);
		$("#Summary").find("input[type='radio']").k_disable();
		questionObj.find(".question-band label").css("position","relative");
		$("#Summary").find("input[type='radio']").attr("readonly","readonly");
		
	}
	if(gRecordData.Status == "Started"){
		gRecordData.Status  = "Completed";
		gRecordData.Score = score;
	}
	_Navigator.UpdateProgressBar();
	var perscore = score / gRecordData.AssessmentScore * 100;
	$("#ScoreSummary").text("Score: "+perscore+"%");
	setReader("summaryheading")
}