const languageDropdown = document.getElementById("languages");
const appendArea = document.getElementById("translate-documents");

const spanish_documents = new Map(
    [
        ['Spanish_Mechanical_Electrical_1.pdf', 'Spanish Mechanical'],
        ['Spanish_CAD.pdf', 'Spanish CAD'],
        ['Spanish_Electrical.pdf', 'Spanish Electrical']
    ]
);

const portuguese_documents = new Map(
    [
        ['Portuguese_Mechanical.pdf', 'Portuguese Mechanical']
    ]
);

const arabic_documents = new Map(
    [
        ['Arabic_Mechanical.pdf', 'Arabic Mechanical']
    ]
);

const tamil_documents = new Map(
    [
        ['Tamil_Mechanical.pdf', 'Tamil Mechanical']
    ]
);

const thai_documents = new Map(
    [
        ['Thai_Mechanical.pdf', 'Thai Mechanical'],
        ['Thai_Electrical.pdf', 'Thai Electrical']
    ]
);

const mandarin_documents = new Map(
    [
        ['Mandarin_Mechanical.pdf', 'Mandarin Mechanical'],
        ['Mandarin_Electrical.pdf', 'Mandarin Electrical']
    ]
);

const french_documents = new Map(
    [
        ['French_Mechanical.pdf', 'French Mechanical'],
        ['French_Electrical.pdf', 'French Electrical'],
        ['French_CAD.pdf', 'French CAD']
    ]
);

const japanese_documents = new Map(
    [
        ['Japanese_Mechanical.pdf', 'Japanese Mechanical'],
        ['Japanese_Electrical.pdf', 'Japanese Electrical'],
        ['Japanese_CAD.pdf', 'Japanese CAD']
    ]
);

function addLink(pdf, text)
{


    const d1 = document.createElement('div');
    d1.className = 'col-md-12';

    const d2 = document.createElement('div');
    d2.className = 'row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-150 position-relative';

    const d3 = document.createElement('div');
    d3.className = 'col p-4 d-flex flex-column position-static';

    const h3 = document.createElement('h3');
    h3.className = 'mb-0';
    h3.innerText = text;

    const link = document.createElement('a');

    link.href = `assets/project-translate-documents/${pdf}`;
    link.target = '_blank';
    link.innerText = 'View PDF';
    if(text === "Spanish Mechanical") link.innerText = 'View V1 PDF';
    link.className = 'icon-link gap-1 icon-link-hover';


    d3.appendChild(h3);
    d3.appendChild(link);

    if(text === "Spanish Mechanical")
    {
        const linkM = document.createElement('a');

        linkM.href = `assets/project-translate-documents/Spanish_Mechanical_2.pdf`;
        linkM.target = '_blank';
        linkM.innerText = 'View V2 PDF';
        linkM.className = 'icon-link gap-1 icon-link-hover';

        d3.appendChild(linkM);
    }

    


    d2.appendChild(d3);
    d1.appendChild(d2);

    documents.appendChild(d1);
}

languageDropdown.addEventListener('change', (event) =>
{
    documents = document.createElement('div');

    let documents_to_iterate = spanish_documents;

    switch(event.target.value)
    {
        case 'Spanish':
            documents_to_iterate = spanish_documents;
            break;
        case 'Portuguese':
            documents_to_iterate = portuguese_documents;
            break;
        case 'Arabic':
            documents_to_iterate = arabic_documents;
            break;
        case 'Tamil':
            documents_to_iterate = tamil_documents;
            break;
        case 'Thai':
            documents_to_iterate = thai_documents;
            break;
        case 'Mandarin':
            documents_to_iterate = mandarin_documents;
            break;
        case 'French':
            documents_to_iterate = french_documents;
            break;
        case 'Japanese':
            documents_to_iterate = japanese_documents;
            break;
    }

    for (const [pdf, text] of documents_to_iterate) 
    {
        addLink(pdf, text);
    }

    appendArea.replaceChildren(documents);
});

document.addEventListener('DOMContentLoaded', function() {
    documents = document.createElement('div');

    for (const [pdf, text] of spanish_documents) 
    {
        addLink(pdf, text);
    }

    appendArea.replaceChildren(documents);
});