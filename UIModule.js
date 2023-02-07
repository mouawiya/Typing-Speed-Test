var UIModule = (function (){

    // classes used to select HTML elements
    var DOMElements = {
        // indicators - test control
        timeLeft: document.getElementById('timeLeft'), // HTML element displaying time left

        // test results
        wpm: document.getElementById('wpm'), 
        wpmChange: document.getElementById('wpmChange'), 
        cpm: document.getElementById('cpm'),
        cpmChange: document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'), 
        accuracyChange: document.getElementById('accuracyChange'),

        // user input
        textInput: document.querySelector('#input'),
        nameInput: document.querySelector('.form-group'),

        // test words
        content: document.getElementById('content'), 
        activeWord:'',

        // modal
        modal: $('#myModal')
    };

    // a method that split each word into characters
    var splitArray = function(string){
        return string.split('');
    };

    // a method that add space at the end of the word
    var addSpace = function(array){
        array.push(' ');
        return array;
    };

    // a method that add the <span> </span> tags
    var addSpanTags = function(array){
        return array.map(function(currentCharacter){
            return '<span>' + currentCharacter + '</span>';
        });
    };

    // a method that add the <span> </span> tags at the start and end of the word
    var addWordSpanTags = function(array){
        
        array.unshift('<span>'); // unshift: add element at the start of the array
        array.push('</span>');   // push: add element at the end of the array
        
        return array
    };

    // a method that join each word of the array together
    var joinEachWord = function(array){
        return array.join(''); // the join is a predefined function that joins the elements of an array, and '' is used because the is no seperator
    };

    var userValue;
    var returnCharClass = function(currentCharacter, index){
        return (index < userValue.length)? (currentCharacter == userValue[index] ? 'correctCharacter': 'wrongCharacter') : '0';
    };

    return {

    // get DOM elements
        
        getDOMElements: function(){
            return {
                textInput: DOMElements.textInput,
            };
        },

    // Indicators - Test Control

        updateTimeLeft: function(x){
            DOMElements.timeLeft.innerHTML = x;
        },
    
    // results
        
        updateResults: function(){},

        fillModal: function(){},
        
        showModal: function(){},
    
    // user input
        
        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(event){
            return event.data == " ";
        },

        enterPressed: function(){},

        emptyInput: function(){
            DOMElements.textInput.value = "";
        },

        getTypeWord: function(){
            return DOMElements.textInput.value;
        },

    // test words
        
        fillContent: function(array, lineReturn){
           // ['word1,', 'word2']
            
           // step one (split each word into characters):
           // [['w', 'o', 'r', 'd', '1', ','], ['w', 'o', 'r', 'd', '2']]
           var content = array.map(splitArray); // the function splitArray is defined above

           // step two (add space after each word): 
           // [['w', 'o', 'r', 'd', '1', ','], [' '], ['w', 'o', 'r', 'd', '2'], [' ']]
           content = content.map(addSpace); // the function addSpace is defined above

           /* step three (put each character between <span></span>): 
           [['<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>'], ['<span> </span>'], 
            ['<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>2</span>'], ['<span> </span>']]*/
           content = content.map(addSpanTags); // the function addSpanTags is defined above
           
           /* step four (put the entire word between <span></span>):  
           [['<span>', '<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>', '</span>'], ['<span> </span>'], 
            ['<span>', '<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>2</span>', '</span>'], ['<span> </span>']]*/
           content = content.map(addWordSpanTags); // the function addWordSpanTags is defined above

           // step five: put the words of the array together
           content = content.map(joinEachWord); // the function joinEachWord is defined above
           /*['<span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span>' ,
           '<span><span>w</span><span>o</span><span>r</span><span>d</span><span>2</span><span> </span></span>']*/
           content = content.join('');
           /*<span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span>
           <span><span>w</span><span>o</span><span>r</span><span>d</span><span>2</span><span> </span></span>*/

           // step six:  replace the line return special code with the HTML entity (line return)
           // <span>|</span> ----> <span>&crarr;</span>
           // content = content.replace('<span>|</span>', '<span>&crarr;</span>'); // replace the first accurant of the '|' element so this is wrong
           // using split , push is the correct method
           content = content.split('<span>'+lineReturn+'</span>').join('<span>&crarr;</span>'); // the lineReturn represents the '|' element

           // fill content
           DOMElements.content.innerHTML = content;
            
        },

        formatWord: function(wordObject){
            var activeWord = DOMElements.activeWord;

            // hihglight current word
            activeWord.className = 'activeWord';

            // format indivisual characters
            var correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            // correct value 'word1 '
            // user value    'wwrd'
            var classes = Array.prototype.map.call(correctValue, returnCharClass);

            // get active word
            var activeWord = DOMElements.activeWord;
            // HTML collection and forEach won't work on it
            var characters = activeWord.children;

            // add classes to children
            for (var i=0; i<characters.length; i++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }
        },

        // store the right html element inside the active word property of the DOMElement
        setActiveWord: function(index){
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactivateCurrentWord: function(){
            DOMElements.activeWord.removeAttribute('class');
        },

        scroll: function(){
            var activeWord = DOMElements.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOMElements.content.offsetTop;
            var diff = top1 - top2;
            // scroll the content of the content box
            DOMElements.content.scrollTop = diff - 40;
        }
    }
})();