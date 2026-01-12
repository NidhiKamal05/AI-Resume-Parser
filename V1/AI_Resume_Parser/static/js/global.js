// global data
export const index_api ="https://ai-resume-parser-42a1.onrender.com/api/";
// export const read_api ="https://ai-resume-parser-42a1.onrender.com/analyze";
export const read_api ="https://ai-resume-parser-42a1.onrender.com/api/read";
export const contact_api ="https://ai-resume-parser-42a1.onrender.com/api/contact";
export const entities_api ="https://ai-resume-parser-42a1.onrender.com/api/entities";
export const skills_api ="https://ai-resume-parser-42a1.onrender.com/api/skills";
export const jd_skills_api ="https://ai-resume-parser-42a1.onrender.com/api/jd_skills";
export const analyze_api ="https://ai-resume-parser-42a1.onrender.com/api/analyze";

export const my_form = document.getElementById("upload_form") ;

export const get_file = document.getElementById("pdf_file") ;
export const jd = document.getElementById("job_desc") ;

export const raw_output = document.getElementById("raw_text") ;
export const contact_output = document.getElementById("contact_info") ;
export const entities_output = document.getElementById("entities") ;
export const skills_output = document.getElementById("skills") ;
export const jd_skills_output = document.getElementById("jd_skills") ;
export const gap_output = document.getElementById("gap_analysis") ;
export const score_output = document.getElementById("score") ;
export const chart_output = document.getElementById("chart") ;

export const read_btn = document.getElementById("read_btn") ;
export const contact_btn = document.getElementById("contact_btn") ;
export const entities_btn = document.getElementById("entities_btn") ;
export const skills_btn = document.getElementById("skills_btn") ;
export const jd_skills_btn = document.getElementById("jd_skills_btn") ;
export const analyze_btn = document.getElementById("analyze_btn") ;
export const upload_btn = document.getElementById("upload_btn") ;

export const clear_all_output_divs = () => {
    raw_output.innerText = "" ;
    contact_output.innerText = "" ;
    entities_output.innerText = "" ;
    skills_output.innerText = "" ;
    jd_skills_output.innerText = "" ;
    gap_output.innerText = "" ;
    score_output.innerText = "" ;
    chart_output.innerText = "" ;
}

export const show_loader = (parentId, message = "Loading...") => {
    const parent = document.getElementById(parentId);
    if (!parent) return;
    const loader_div = `<div class="dynamic_loader"><img class="loader-gif" width="40" height="40" src="https://i.gifer.com/ZZ5H.gif" alt="loading" /><span class="loader-text">${message}</span></div>`
    parent.insertAdjacentHTML('beforeend', loader_div) ;
}

export const hide_loader = (parentId) => {
    const parent = document.getElementById(parentId);
    if (!parent) return;
    const loader = parent.querySelector(".dynamic_loader") ;
    if(loader) {
        loader.remove() ;
    }
}



// export  {get_file};