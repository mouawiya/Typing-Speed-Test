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

            // set the total test time

            // update time left: dataModule
            
            // update time left: UIModule

            // move to a new word: dataModule

            // set active word: UIModule

            // format the active word: UIModule

            // focus on text input: UIModule

            // add event listeners 
            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);