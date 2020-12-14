document.onclick = function() {
    let parent;
    if (typeof getSelection().focusNode != "undefined") { 
    parent = getSelection().focusNode.parentElement;
    if (typeof parent.tagName != "undefined" && parent.tagName == "CODE") {
        navigator.clipboard.writeText(parent.innerText)
        let child = document.createElement("div");
        document.body.appendChild(child);
        child.classList = "hovermsg";
        child.innerText = "Copied!"
        child.style.left = parent.offsetLeft - child.offsetWidth / 2 + parent.offsetWidth / 2;
        child.style.top = parent.offsetTop - child.offsetHeight;
        setTimeout(()=>child.remove(),2000)
    }}
};

// obj->prop obj->method() same same emptyFn() fullFn(args)

function debugStringify(string, pres = ["Before: ", "After : "]) {
    f = pre => { 
        let outputString = `std::cout<<"${pre}"`;
        let arrowsAllowed = document.getElementById("arr").checked
        let functionAllowed = document.getElementById("fn").checked
        let notEmptyFunctionsAllowed = document.getElementById("nef").checked
        let specialCharsAllowed = document.getElementById("spc").checked
        let duplicatesAllowed = document.getElementById("dup").checked
        let keywordsAllowed = document.getElementById("kwd").checked
        // Remove the arrows
        if (!arrowsAllowed) string = string
            .replace(/[^ ]*->[^ ]*/g, " ")

        if (!specialCharsAllowed) string = string
            .replace(/[^a-zA-Z0-9\(\)\[\]\-\>äöüß]/g, " ")
            .replace(/-[^>]/g, " ")


        if (!functionAllowed) string = string
            .replace(/[^ ]+\([^\)]*?\)/g,"")

        if (!notEmptyFunctionsAllowed) string = string
            .replace(/[^ ]*\([^\)]+?\)/g,"")
        
            console.log(string)

        string // method chain 
            .replace(/ /g, "  ") // add multiple spaces together
            .replace(/ [0-9][0-9a-zA-Z]*? /g, " ")
            .replace(/[ ]+/g, " ") // add multiple spaces together
            .replace(/^ /, "") // remove spaces @ the start
            .replace(/ $/, "") // & the end
            .split(" ")
            .forEach(variable => { 
                if ((!outputString.includes(", "+variable+":") || duplicatesAllowed) && (!keywords.includes(variable) || keywordsAllowed)) {
                    outputString += `<<", ${variable}: "<<${variable}` 
                }
            }); 
        return outputString.replace(", ", "") + "<<\"\\n\";\n" 
    }; 
    out = []; 
    pres.forEach(pre => out.push(f(pre))); 
    return out;
}
function p(example = false) {
    let inputElement = document.getElementById("i")
    let outputElement = document.getElementById("o")
    i = inputElement.value.replace(/\n/g,"$");
    if (example) {i = "BFOR: $AFTR: $position = position * variable"; outputElement = document.getElementById("generated")}
    outputElement.innerHTML = "";
    if (!i.includes("$")) { 
        debugStringify(i)
        .forEach(text => outputElement.innerHTML += ("<code>" + text.replace(/\</g,"&lt;") + "</code><br><br>"))
    } else { 
        arr = i.split("$"); 
        debugStringify(arr.splice(arr.length - 1, 1)[0], arr)
        .forEach(text => outputElement.innerHTML += ("<code>" + text.replace(/\</g,"&lt;") + "</code><br><br>"))
    }
    //if (!i.match(/[a-zA-Z]/) || !outputElement.innerText.match(/<<[a-zA-Z0-9]+<</)) outputElement.innerHTML = "<code>Output goes here...</code>";
}

function showExample() {
    p(true);
}

