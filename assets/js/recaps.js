let days = 
[
    0, 1, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 31, 
    32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 
    59, 60, 61, 62, 66, 67, 68, 69, 80, 81, 82, 83, 87, 88, 89, 90
];

let day = days.length - 1;

const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const nextAllBtn = document.getElementById('next-all');
const backAllBtn = document.getElementById('back-all');

const pageText = document.getElementById("pages");

pageText.addEventListener("keydown", async function(event) {
    
    if (event.key === "Enter") {
        let num = pageText.value.trim();

    if(num === "")
    {
        pageText.value = "";
        return null;
    }
    const dayNumber = Number(num);

    if(!Number.isFinite(dayNumber))
    {
        pageText.value = "";
        return null;
    }
        for(let i = 0;i<days.length;++i)
        {
            if(days[i] >= dayNumber)
            {
                day = i;

                nextBtn.disabled = false;
                nextAllBtn.disabled = false;
                dayNum = days[day];

                text = await loadRecap(dayNum);

                addPost(dayNum, text);
                pageText.value = "";
                break;
            }
        }
    }
});

const post = document.getElementById("post");

function calcDate(date, days)
{
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

async function loadRecap(day)
{
    res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day 50-51.md`);
    if(day == 51)
    {
        res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day 50-51.md`);
    }
    else if (day == 62)
    {
        res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day 62-64.md`);
    }
    else if (day == 83)
    {
        res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day 83-85.md`);
    }
    else 
    {
        res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day ${day}.md`);

    }
    if(!res.ok) console.log('fetch failed');

    const text = await res.text();

    return text;
}

function addPost(dayNum, text)
{
    const article = document.createElement('article');

    const title = document.createElement('h2');

    if(dayNum == 51) title.innerText =  "Day 50-51";
    else if(dayNum == 62) title.innerText =  "Day 62-64";
    else title.innerText = `Day ${dayNum}`;

    title.className = "display-5 link-body-emphasis mb-1";
    title.id = "recap-post";
    article.appendChild(title);

    timestamp = document.createElement('p');
    timestamp.className = 'blog-post-meta';
    date = new Date(2026, 0, 9);
    timestamp.innerText = calcDate(date, dayNum).toDateString() + " by Xavier Eldridge (and Ishaan 🤩)";
    article.appendChild(timestamp);

    article.appendChild(document.createElement('hr'));

    const rec = document.createElement('div');
    rec.innerHTML = marked.parse(text);

    article.appendChild(rec)
    

    post.replaceChildren(article);
}

nextBtn.addEventListener('click', async () => 
{
    day++;
    if(day == days.length - 1)
    {
        nextBtn.disabled = true;
        nextAllBtn.disabled = true;
    }

    backBtn.disabled = false;
    backAllBtn.disabled = false;
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

backBtn.addEventListener('click', async () => 
{
    day--;
    if(day == 0)
    {
        backBtn.disabled = true;
        backAllBtn.disabled = true;
    }

    nextBtn.disabled = false;
    nextAllBtn.disabled = false;
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

backAllBtn.addEventListener('click', async () => 
{
    day = 0;

    backBtn.disabled = true;
    backAllBtn.disabled = true;

    nextBtn.disabled = false;
    nextAllBtn.disabled = false;
    
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

nextAllBtn.addEventListener('click', async () => 
{
    day = days.length - 1;

    nextBtn.disabled = true;
    nextAllBtn.disabled = true;

    backBtn.disabled = false;
    backAllBtn.disabled = false;
    
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});


document.addEventListener('DOMContentLoaded', async function() {
    text = await loadRecap(days[day]);

    addPost(days[day], text);

    nextBtn.disabled = true;
    nextAllBtn.disabled = true;
});
