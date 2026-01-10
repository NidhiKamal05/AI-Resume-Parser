
import * as globals from "./global.js" ;
// import {get_file}  from "./global.js" ;

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
        return ;
    }    
    globals.show_loader("raw_text", "Loading Raw Text....") ;
    try {
        const response = await fetch(globals.read_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);
        globals.raw_output.innerText = result.raw_text ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("raw_text") ;
    }
}

const fetchContactData = async() => {
    const file = globals.get_file ;
    const form_data = new FormData(globals.my_form) ;
    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
        form_data.append('my_pdf', pdf) ;
    }
    else {
        console.log("Select any pdf...") ;
        return ;
    }
    globals.show_loader("contact_info", "Loading Contacts....") ;
    try {
        const response = await fetch(globals.contact_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`) ;
        }
        const result = await response.json() ;
        console.log("Data fetched:", result);
        globals.contact_output.innerText = `Email: ${result.contact.Emails || ""}
                                            Phone: ${result.contact.Phones || ""}
                                            Linked In: ${result.contact.LinkedIn || ""}
                                            Github: ${result.contact.Github || ""}` ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("contact_info") ;
    }
}


const fetchEntitiesData = async() => {
    const file = globals.get_file ;
    const form_data = new FormData(globals.my_form) ;
    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
        form_data.append('my_pdf', pdf) ;
    }
    else {
        console.log("Select any pdf...") ;
        return ;
    }
    globals.show_loader("entities", "Loading Entities") ;
    try {
        const response = await fetch(globals.entities_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`) ;
        }
        const result = await response.json() ;
        console.log("Data fetched:", result) ;
        const candidate_name = result.entities.Candidate_Name || "" ;
        const all_names = Array.isArray(result.entities.All_Names_Found) ? result.entities.All_Names_Found.join(", ") : result.entities.All_Names_Found || "" ;
        const organization = Array.isArray(result.entities["Companies/Institutions"]) ? result.entities["Companies/Institutions"].join(", ") : result.entities["Companies/Institutions"] || "" ;
        globals.entities_output.innerText = `Candidate Name: ${candidate_name}\n` + `All Names Found: ${all_names}` + `Organization: ${organization}` ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("entities") ;
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
        return ;
    }
    if (globals.jd) {
        form_data.append("job_desc", globals.jd);
    }
    globals.show_loader("score", "Loading Score....") ;
    globals.show_loader("gap_analysis", "Loading Gaps....") ;
    try {
        const response = await fetch(globals.analyze_api, {
            method: 'POST',
            body: form_data,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // result = {'Missing Skills': missing_skills, 'Matched Skills': matched_skills, 'Score': score}
        const result = await response.json();
        console.log("Data fetched:", result);
        globals.score_output.innerText=JSON.stringify(result.Score);
        const missing = Array.isArray(result.Missing_Skills) ? result.Missing_Skills.join(", ") : result.Missing_Skills ;
        const matched = Array.isArray(result.Matched_Skills) ? result.Matched_Skills.join(", ") : result.Matched_Skills ;
        globals.gap_output.innerText = `Gaps = ${missing}\nMatched Skills = ${matched}`;
        // globals.gap_output.innerText=`Gaps = ${result.Missing_Skills} \n Matched Skills=${result.Matched_Skills}`;
        // globals.score_output.innerText=JSON.stringify(result.Score);
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("score") ;
        globals.hide_loader("gap_analysis") ;
    }
}



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

globals.upload_btn.addEventListener("click", () => {
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

globals.read_btn.addEventListener("click",() => {
    console.log("RAW TEXT");

    // const file = globals.get_file ;
    // const pdf = file.files[0] ;
    globals.clear_all_output_divs() ;
    fetchReadData() ;

    // let text = "ssfdfjhn" ;
    // globals.raw_output.innerText = text ;
});


globals.contact_btn.addEventListener("click", () => {
    console.log("CONTACT INFO") ;
    globals.clear_all_output_divs() ;
    fetchContactData() ;
}) ;


globals.entities_btn.addEventListener("click", () => {
    console.log("ENTITIES") ;
    globals.clear_all_output_divs() ;
    fetchEntitiesData() ;
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

globals.analyze_btn.addEventListener("click", () => {
    console.log("ANALYZE DATA");

    // file = get_file;
    // const file = globals.get_file ;
    // const pdf = file.files[0] ;
    globals.clear_all_output_divs() ;
    fetchAnalyzeData() ;

    // let text = "ssfdfjhn";

    // globals.gap_output.innerText = text;
    // globals.score_output.innerText = text;
    // globals.chart_output.innerText = text;
}) ;