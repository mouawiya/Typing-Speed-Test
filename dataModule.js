var dataModule = (function (){

    var lineReturn = '|';

    // shuffle function: shuffle an array
        var shuffle=function(array){
            // [1, 2, 3] -> [2, 3, 1]
            // newArray[]
            // select rendom element: 2
            // newArray[2]
            // oldArray[1, 3]
            // select random element: 1
            // newArray[2, 1]
            // oldArray[3]
            // select random element: 3
            // newArray[2, 1, 3]
            // oldArray[]

            var newArray=[];
            var randomIndex;
            var randomElement;

            // a while loop while the array is not empty
            while(array.length>0){
                // take a random element from array and add it to newArray
                randomIndex= Math.floor(Math.random()*array.length); // generate a random index from 0 to the length of the array
                randomElement = array[randomIndex]; // selecting the random element
                newArray.push(randomElement); // add the random number at the end of the newArray

                // delete randomElement from array
                array.splice(randomIndex,1);
            }

            return newArray;
        };

    // capitalize first letter of a string
        String.prototype.capitalize = function(){
            var newString='';
            // capitalize the first letter of a string
            var firstCharCap = this.charAt(0).toUpperCase(); // "this" is used in order to refere to the elements inside the array since these are private methods
            // get the remaining of the string
            var remainingChar = this.slice(1)
            // concat the first and the rest of string
            newString = firstCharCap+remainingChar;
            

            return newString;
        };
  
    // capitalizeRandom function: capitalize random words in the array using the above method capitalize
    // array['word1', 'word2', 'word3']
    // array['Word1', 'word2', 'Word3']
        var capitalizeRandom=function(arrayOfStrings){

            // map: apply the method to all elements of the array
            return arrayOfStrings.map(function(currentWord){
                var x = Math.floor(4*Math.random()); // will return a number between 0 and 3

                // chances of x equal to 3: 25%

                return (x == 3)? currentWord.capitalize(): currentWord; // we can use this expression or the If(); it is the same
            });
        };

    // addRandomPunctuation function: add random punctuation to some words of the array
    // array['word1', 'word2', 'word3']
    // array['Word1.', 'word2?', 'Word3,']
        var addRandomPunctuation=function(arrayOfStrings){

            return arrayOfStrings.map(function(currentWord){
                var randomPunctuation;
                var items = [lineReturn,'?', ',', ',', ',', ',', '.', '.', '!', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
                /* the variable line return is defined at the start with '|' and referes to line returns,
                and the empty '' is for adding nothing to the words 
                (because some words won't get any punctuation)
                some elements are repeated more than others because they are more likely to accure*/
                var randomIndex= Math.floor(Math.random()*items.length);
                randomPunctuation = items [randomIndex];
                return currentWord + randomPunctuation;
            });
        };
    
    // character call back used to calculate the number of correct characters inside the current word
    var nbCorrectChar;
    var charCallback = function(currentElement, index){
        nbCorrectChar += (currentElement == this.characters.user[index])? 1 : 0; // this check if we ill increase te value of x by 1 or 0 deppendin on the condition (it can be written with an if())
    };    

    var appData = {
        indicators: {
            testStarted: false, testEnded: false, totalTestTime:0, timeLeft:0
        },
        results: {
            wpm: 0, wpmChange: 0, cpm: 0, cpmChange:0, accuracy: 0, accuracyChange:0,
            numOfCorrectWords: 0, numOfCorrectCharacters: 0, numOfTestCharacters:0
        },
        words: {
            currentWordIndex:-1, testWords: [], currentWord: {}
        },
    };


    // word constructor
    // {
    //     value: {correct: '', user: '', isCorrect: false},
    //     characters: {correct: [], user: [], totalCorrect: 0, totalTest:0}
    // }

    var word = function(index){
        // word values: correct vs user's
        this.value = {
            correct: appData.words.testWords[index] + ' ', // the space added represent the space between the words
            user: '',
            isCorrect: false
        };

        // characters: correct vs user's
        this.characters = {
            correct: this.value.correct.split(''),
            user: [],
            totalCorrect: 0,
            totalTest: this.value.correct.length // number of characters inside the correct value
        }
    };

    // update method: updates the word using the word typed by the user
    word.prototype.update = function(value){
        
        // update the user input
        this.value.user = value;

        // update the words status (correct or not)
        this.value.isCorrect = (this.value.correct == this.value.user);

        // update user characters
        this.characters.user = this.value.user.split('');

        // calculate the number of correct characters

        // example
        // correct: ['w', 'o', 'r', 'd']
        // user: ['w', 'o', 'o', 'w', 'w', 'w', 'w', 'w']
        var nbCorrectChar = 0; 

        // the charCallback function is defined above
        charCallback2 = charCallback.bind(this); // we used this because "this" in the charCallBack function will refere to the global object, but "bind" will link it to our instance class
        this.characters.correct.forEach(charCallback2);

        this.characters.totalCorrect = nbCorrectChar;
    };

    return {
    //indicators - test Control

        // sets the total test time to x
        setTestTime: function(x){
            appData.indicators.totalTestTime = x;
        }, 

        // initializes time left to the total test time
        initializeTimeLeft: function(){
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        }, 

        // starts the test
        startTest: function(){
            appData.indicators.testStarted = true;
        }, 

        endsTest: function(){}, // ends the test

        // return the remaining test time
        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        }, 

        reduceTime: function(){}, // reduces the time by one sec

        timeLeft: function(){}, // checks if there is time left to continue the test

        // checks if the test has already ended
        testEnded: function(){
            return appData.indicators.testEnded;
        }, 

        testStarted: function(){}, // checks if the test has started

    // results
        
        // calculates wpm and wpmChange and updates them in appData
        calculateWpm: function(){
            var wpmOld = appData.results.wpm;
            var numOfCorrectWords = appData.results.numOfCorrectWords;

            // check if the test has already started
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime){
                Math.round(appData.results.wpm = 60* numOfCorrectWords / (appData.indicators.totalTestTime - appData.indicators.timeLeft));
            }else {
                appData.results.wpm =0;
            }

            appData.results.wpmChange = appData.results.wpm - wpmOld;

            return [appData.results.wpm, appData.results.wpmChange];
        }, 

        calculateCpm: function(){}, // calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function(){}, // calculates accuracy and accuracyChange and updates them in appData

    // test words
        
        // fills words.testWords
        fillListOfTestWords: function(textNumber, words){

            // convert the string in an array using the space as a seperator
            var result = words.split(" ");

            // if we pick the first list of words, some extra treatment is obliged
            if(textNumber == 0){
                // shuffle words
                result = shuffle(result);

                // capitalise random strings
                result = capitalizeRandom(result);

                // add a random punctuation
                result = addRandomPunctuation(result);
            }
            
            // fill the testWords with the result 
            appData.words.testWords = result;
        },

        // get list of test words: words.testWords
        getListofTestWords: function(){
            return appData.words.testWords;
        },

        /* increments the currentWordIndex - updates the current word
        (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords,
        numOfCorrectCharacters and numOfTestCharacters */

        moveToNewWord: function(){
            if (appData.words.currentWordIndex > -1){
                // update the number of correct words
                if (appData.words.currentWord.value.isCorrect == true) {
                    appData.results.numOfCorrectWords++;
                }
                // update the number of correct characters
                appData.results.numOfCorrectCharacters += appData.words.currentWord.characters.totalCorrect;

                // update number of test characters
                appData.results.numOfTestCharacters += appData.words.currentWord.characters.totalTest;

            }

            appData.words.currentWordIndex++;
            var currentIndex = appData.words.currentWordIndex;
            var newWord = new word(currentIndex);
            appData.words.currentWord = newWord;
        },

        // get the current word index
        getCurrentWordIndex(){
            return appData.words.currentWordIndex;
        },

        // get current word
        getCurrentWord(){
            var currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            }
        },

        // updates current word using user input
        updateCurrentWord: function(value) {
            appData.words.currentWord.update(value);
        }, 

        getLineReturn(){
            return lineReturn;
        },

        // just a testing method
        returnData(){
            console.log(appData);
        }
    }
})();