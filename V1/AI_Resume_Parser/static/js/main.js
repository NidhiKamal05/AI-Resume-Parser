
import * as globals from "./global.js" ;
// import {get_file}  from "./global.js" ;


upload_btn.addEventListener("click", () => {
    console.log("UPLOAD") ;
    const file = globals.get_file ;

    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
    }
    else {
        console.log("Select any pdf...") ;
    }
}) ;

// onclick=upload()
// const upload = () => {
//     console.log("UPLOAD") ;
//     file = get_file ;
//     // file = document.getElementById("pdf_file") ;

//     if(file.files.length > 0) {
//         pdf = file.files[0] ;
//         console.log(pdf.name) ;
//     }
//     else {
//         console.log("Select any pdf...") ;
//     }
// }

// const read_text = () => {
//     console.log("RAW TEXT") ;

//     // pdf = document.getElementById("pdf_file") ;
//     file = get_file ;

    

//     text = "ssfdfjhn" ;

//     raw_output.innerText = text ;
// }
// onclick=read_text()

read_btn.addEventListener("click",()=>{
    console.log("RAW TEXT");
    const file = globals.get_file ;
    let text = "ssfdfjhn" ;
   globals.raw_output.innerText = text ;
});

analyze_btn.addEventListener("click", () => {
    console.log("ANALYZE DATA");

    // file = get_file;
    const file = globals.get_file ;
    const pdf = file.files[0];

    let text = "ssfdfjhn";

    globals.gap_output.innerText = text;
    globals.score_output.innerText = text;
    globals.chart_output.innerText = text;
}) ;


// onclick=analyze_data()
// function analyze_data() {
//     console.log("ANALYZE DATA");

//     // file = document.getElementById("pdf_file") ;
//     file = get_file;
//     pdf = file.files[0];


//     text = "ssfdfjhn";

//     gap_output.innerText = text;
//     score.innerText = text;
//     chart_output.innerText = text;
// }