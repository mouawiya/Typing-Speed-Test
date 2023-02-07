var eventsModule = (function(dModule, uModule, cModule, wModule){
    var addEventListeners = function(){
        
        // character typing event listener
        uModule.getDOMElements().textInput.addEventListener('input', function(event){
            
            // if the test ended, do nothing
            if (dModule.testEnded()){
                return;
            }
            // if the test has not started yet, start the test and countdown
            if (!dModule.testStarted()){
                // start the test
            }

            // get typed word: UI module
            var typedWord = uModule.getTypeWord();

            // update current word: data module
            dModule.updateCurrentWord(typedWord);

            // format the active word
                // format the active word: UIModule
                // get the current word value
                var currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

            // check if the user pressed space or enter
            if(uModule.spacePressed(event) || uModule.enterPressed()){
                
                // empty the text input 
                uModule.emptyInput();

                // deactivate (un-highlight) the current word
                uModule.deactivateCurrentWord();
                
                // move to a new word: dataModule
                dModule.moveToNewWord();

                // set active word: UIModule
                // get the correct current word index
                var index = dModule.getCurrentWordIndex();
                uModule.setActiveWord(index);

                // format the active word: UIModule
                // get the current word value
                currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

                // scroll word into the middle view
                uModule.scroll();
            }
        });
        // click on download button event listener
    };

    // scroll active word into middle view on window resize
    window.addEventListener('resize', uModule.scroll);
    
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
                dModule.moveToNewWord();

            // set active word: UIModule
                // get the correct current word index
                var index = dModule.getCurrentWordIndex();
                uModule.setActiveWord(index);

            // format the active word: UIModule
                // get the current word value
                currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

            // focus on text input: UIModule
                uModule.inputFocus();

            // add event listeners 
            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);