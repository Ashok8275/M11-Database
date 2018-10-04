gRecordData = {
    Status: "NotStarted",
    AssessmentScore: "4",
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: true,
    RandomizeOptions: true,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "What is the difference between a record and a field?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "A field is a single piece of information in a record.",
                                         "IsCorrect": true,
                                         "score": 2
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "A record is a single piece of information in a field.",
                                         "IsCorrect": false,
                                     },
                        ],
                        IsAnswered:false,
                        CorrectFeedback: "That is right.",
                        IncorrectFeedback: "That is not right. It’s the opposite—a field is a single piece of information in a record.",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "2",
                        QuestionText: "What is an example of a record in the Windows Media Player database?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "A song",
                                         "IsCorrect": true,
                                         score: 2,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Genre",
                                         "IsCorrect": false
                                        
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Artist",
                                         "IsCorrect": false,                                     
                                    }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "That is not right.",
                        CorrectFeedback: "That is right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "Which tool is used to search for information in a database?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Record",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Field",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Query",
                                         "IsCorrect": true,
                                         score:2
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That is not right. Queries are used to search a database.​",
                        CorrectFeedback: "That is right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "What is used to indicate a search term can be anywhere in a string of text?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Quotation marks",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "SQL",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Wildcards",
                                         "IsCorrect": true,
                                         score: 2
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​​That is not right. Wildcards indicate a search term can be anywhere in a string of text.",
                        CorrectFeedback: "That is right.​",
                        "UserSelectedOptionId": ""

                    }

    ]
}