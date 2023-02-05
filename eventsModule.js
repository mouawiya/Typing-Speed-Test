var eventsModule = (function(dModule, uModule, cModule, wModule){
    var addEventListeners = function(){
        
        // character typing event listener

        // click on download button event listener
    };

    return {
        // init function, initializes the test before start
        init: function(duration, textNumber){

            // fill the list of test words: dataModule

                // get the words from the wordsModule using the getWords method and the textNumber to select the list of words out of 3
                var words = wModule.getWords(textNumber);

                dModule.fillListOfTestWords(textNumber, words);

            // fill the list of test words: UIModule

                // get the array with the test words
                var testWords = dModule.getListofTestWords();
                // get the line return variable
                var lineReturn = dModule.getLineReturn();
                uModule.fillContent(testWords, lineReturn);

            // set the total test time: data Module

                dModule.setTestTime(duration);

            // update time left: dataModule

                dModule.initializeTimeLeft();
            
            // update time left: UIModule
                var timeLeft = dModule.getTimeLeft();
                uModule.updateTimeLeft(timeLeft);

            // move to a new word: dataModule

            // set active word: UIModule

            // format the active word: UIModule

            // focus on text input: UIModule

            // add event listeners 
            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);