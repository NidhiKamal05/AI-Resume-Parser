
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
    globals.show_loader("entities", "Loading Entities...") ;
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

const fetchSkills = async() => {
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
    globals.show_loader("skills", "Loading Skills...") ;
    try {
        const response = await fetch(globals.skills_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`) ;
        }
        const result = await response.json() ;
        console.log("Data fetched:", result) ;
        // const prog_lang = Array.isArray(result.skills["Programming"]) ? result.skills["Programming"].join(", ") : result.skills["Programming"] || "" ;
        // const ml = Array.isArray(result.skills["Machine Learning"]) ? result.skills["Machine Learning"].join(", ") : result.skills["Machine Learning"] || "" ;
        // const cloud = Array.isArray(result.skills["Cloud"]) ? result.skills["Cloud"].join(", ") : result.skills["Cloud"] || "" ;
        // const tools = Array.isArray(result.skills["Tools"]) ? result.skills["Tools"].join(", ") : result.skills["Tools"] || "" ;
        // globals.skills_output.innerText = `Programming: ${prog_lang}\n` + `Machine Learning: ${ml}\n` + `Cloud: ${cloud}\n` + `Tools: ${tools}` ;

        const prog_lang = Array.isArray(result.skills["Programming"]) ? result.skills["Programming"].join(", ") : result.skills["Programming"] || "" ;
        const web_dev = Array.isArray(result.skills["Web Development"]) ? result.skills["Web Development"].join(", ") : result.skills["Web Development"] || "" ;
        const db = Array.isArray(result.skills["Database & Storage"]) ? result.skills["Database & Storage"].join(", ") : result.skills["Database & Storage"] || "" ;
        const os = Array.isArray(result.skills["Operating Systems & Networking"]) ? result.skills["Operating Systems & Networking"].join(", ") : result.skills["Operating Systems & Networking"] || "" ;
        const ai_ml = Array.isArray(result.skills["AI & Machine Learning"]) ? result.skills["AI & Machine Learning"].join(", ") : result.skills["AI & Machine Learning"] || "" ;
        const ds = Array.isArray(result.skills["Data Science & Analytics"]) ? result.skills["Data Science & Analytics"].join(", ") : result.skills["Data Science & Analytics"] || "" ;
        const cloud = Array.isArray(result.skills["Cloud & DevOps"]) ? result.skills["Cloud & DevOps"].join(", ") : result.skills["Cloud & DevOps"] || "" ;
        const cyber_security = Array.isArray(result.skills["Cybersecurity"]) ? result.skills["Cybersecurity"].join(", ") : result.skills["Cybersecurity"] || "" ;
        const se = Array.isArray(result.skills["Software Engineering Concepts"]) ? result.skills["Software Engineering Concepts"].join(", ") : result.skills["Software Engineering Concepts"] || "" ;
        const tools = Array.isArray(result.skills["Tools"]) ? result.skills["Tools"].join(", ") : result.skills["Tools"] || "" ;
        globals.skills_output.innerText = `Programming: ${prog_lang}\n` + 
                                          `Web Development: ${web_dev}\n` + 
                                          `Database & Storage: ${db}\n` + 
                                          `Operating Systems & Networking: ${os}\n` + 
                                          `AI & Machine Learning: ${ai_ml}\n` + 
                                          `Data Science & Analytics: ${ds}\n` + 
                                          `Cloud & DevOps: ${cloud}\n` + 
                                          `Cybersecurity: ${cyber_security}\n` + 
                                          `Software Engineering Concepts: ${se}\n` + 
                                          `Tools: ${tools}` ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("skills") ;
    }
}


const fetchJDSkills = async() => {
    const job_desc = globals.jd ;
    const form_data = new FormData(globals.my_form);
    if(job_desc) {
        form_data.append("job_desc", job_desc) ;
    }
    else {
        console.log("Job Description is empty.....") ;
        return ;
    }
    globals.show_loader("jd_skills", "Loading JD Skills....") ;
    try {
        const response = await fetch(globals.jd_skills_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`) ;
        }
        const result = await response.json() ;
        console.log("Data fetched:", result) ;
        const prog_lang = Array.isArray(result.jd_skills["Programming"]) ? result.jd_skills["Programming"].join(", ") : result.jd_skills["Programming"] || "" ;
        const web_dev = Array.isArray(result.jd_skills["Web Development"]) ? result.jd_skills["Web Development"].join(", ") : result.jd_skills["Web Development"] || "" ;
        const db = Array.isArray(result.jd_skills["Database & Storage"]) ? result.jd_skills["Database & Storage"].join(", ") : result.jd_skills["Database & Storage"] || "" ;
        const os = Array.isArray(result.jd_skills["Operating Systems & Networking"]) ? result.jd_skills["Operating Systems & Networking"].join(", ") : result.jd_skills["Operating Systems & Networking"] || "" ;
        const ai_ml = Array.isArray(result.jd_skills["AI & Machine Learning"]) ? result.jd_skills["AI & Machine Learning"].join(", ") : result.jd_skills["AI & Machine Learning"] || "" ;
        const ds = Array.isArray(result.jd_skills["Data Science & Analytics"]) ? result.jd_skills["Data Science & Analytics"].join(", ") : result.jd_skills["Data Science & Analytics"] || "" ;
        const cloud = Array.isArray(result.jd_skills["Cloud & DevOps"]) ? result.jd_skills["Cloud & DevOps"].join(", ") : result.jd_skills["Cloud & DevOps"] || "" ;
        const cyber_security = Array.isArray(result.jd_skills["Cybersecurity"]) ? result.jd_skills["Cybersecurity"].join(", ") : result.jd_skills["Cybersecurity"] || "" ;
        const se = Array.isArray(result.jd_skills["Software Engineering Concepts"]) ? result.jd_skills["Software Engineering Concepts"].join(", ") : result.jd_skills["Software Engineering Concepts"] || "" ;
        const tools = Array.isArray(result.jd_skills["Tools"]) ? result.jd_skills["Tools"].join(", ") : result.jd_skills["Tools"] || "" ;
        globals.jd_skills_output.innerText = `Programming: ${prog_lang}\n` + 
                                             `Web Development: ${web_dev}\n` + 
                                             `Database & Storage: ${db}\n` + 
                                             `Operating Systems & Networking: ${os}\n` + 
                                             `AI & Machine Learning: ${ai_ml}\n` + 
                                             `Data Science & Analytics: ${ds}\n` + 
                                             `Cloud & DevOps: ${cloud}\n` + 
                                             `Cybersecurity: ${cyber_security}\n` + 
                                             `Software Engineering Concepts: ${se}\n` + 
                                             `Tools: ${tools}` ;
    }
    catch(error) {
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("jd_skills") ;
    }
}


const fetchScore = async() => {
    const form_data = new FormData(globals.my_form) ;
    const file = globals.get_file ;
    if(file.files.length > 0) {
        const pdf = file.files[0] ;
        console.log(pdf.name) ;
        form_data.append('my_pdf', pdf) ;
    }
    else {
        console.log("Select any pdf...") ;
        return ;
    }
    const job_desc = globals.jd ;
    if(job_desc) {
        form_data.append("job_desc", job_desc) ;
    }
    else {
        console.log("Job Description is empty.....") ;
        return ;
    }
    globals.show_loader("score", "Loading Score.....") ;
    try {
        const response = await fetch(globals.score_api, {
            method: 'POST',
            body: form_data,
        }) ;
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`) ;
        }
        const result = response.json() ;
        console.log("Data fetched:", result) ;
        const score = result.score ;
        globals.score_output.innerText = `Score: ${score}` ;
    }
    catch(error){
        console.log(`Error: ${error}`) ;
    }
    finally {
        console.log(`Task Completed`) ;
        globals.hide_loader("score") ;
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
    console.log("RESUME TEXT");
    globals.clear_all_output_divs() ;
    fetchReadData() ;
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


globals.skills_btn.addEventListener("click", () => {
    console.log("SKILLS") ;
    globals.clear_all_output_divs() ;
    fetchSkills() ;
}) ;


globals.jd_skills_btn.addEventListener("click", () => {
    console.log("JD SKILLS") ;
    globals.clear_all_output_divs() ;
    fetchJDSkills() ;
}) ;


globals.score_btn.addEventListener("click", () => {
    console.log("SCORE") ;
    globals.clear_all_output_divs() ;
    fetchScore() ;
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
    globals.clear_all_output_divs() ;
    fetchAnalyzeData() ;
}) ;