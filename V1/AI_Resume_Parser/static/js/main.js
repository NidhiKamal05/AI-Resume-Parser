
import * as globals from "./global.js" ;
// import {get_file}  from "./global.js" ;

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


// onclick=read_text()
// const read_text = () => {
//     console.log("RAW TEXT") ;
//     // pdf = document.getElementById("pdf_file") ;
//     file = get_file ;
//     text = "ssfdfjhn" ;
//     raw_output.innerText = text ;
// }

read_btn.addEventListener("click",()=>{
    console.log("RAW TEXT");

    const file = globals.get_file ;
    const pdf = file.files[0] ;

    fetchReadData() ;

    let text = "ssfdfjhn" ;
    globals.raw_output.innerText = text ;
});


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

analyze_btn.addEventListener("click", () => {
    console.log("ANALYZE DATA");

    // file = get_file;
    const file = globals.get_file ;
    const pdf = file.files[0] ;

    fetchAnalyzeData() ;

    let text = "ssfdfjhn";

    globals.gap_output.innerText = text;
    globals.score_output.innerText = text;
    globals.chart_output.innerText = text;
}) ;


const fetchReadData = async() => {
    const file = globals.get_file ;
    // const my_file = globals.get_file.files[0] ;
    const form_data = new FormData(globals.my_form) ;
    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
        form_data.append('my_pdf', pdf) ;
    }
    else {
        console.log("Select any pdf...") ;
    }
    try {
        const response = await fetch(globals.read_api, {
            method: 'POST',
            body: form_data,
        }) ;
        console.log(`Data fetched: ${response}`) ;
        globals.raw_output.innerText = JSON.stringify(response.raw_text, null, 2) ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
    }
}

const fetchAnalyzeData = async() => {
    // const my_file = globals.get_file.files[0] ;
    const job_desc = globals.jd ;
    const file = globals.get_file ;
    const form_data = new FormData(globals.my_form) ;
    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
        form_data.append('my_pdf', pdf) ;
    }
    else {
        console.log("Select any pdf...") ;
    }
    try {
        const response = await fetch(globals.analyze_api, {
            method: 'POST',
            body: form_data,
        });
        console.log(`Data fetched: ${response}`) ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
    }
}