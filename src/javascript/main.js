const url = "http://localhost:3600";

const tabCards = document.querySelector(".tab-cards");
const contentCards = document.querySelector(".content-cards");

const getTabData = async () => {
    try {
        const response = await fetch(`${url}/catalog`);
        const data = await response.json();
        renderTab(data);
        getContentData(data[0].name);
    } catch (error) {
        return error.message;
    }
}
getTabData();

const renderTab = (data) => {
    tabCards.innerHTML = data.map((item) => `
    <div class="tab-card">
        <div class="tab-img">
            <img src="${item.img}" alt="">
        </div>
        <div class="tab-title">
            <p><a data-name="${item.name}" href="#">${item.text}</a></p>
        </div>
    </div>
    `).join("");
};

const renderContent = async (data) => {
    contentCards.innerHTML = data.map((item) => `
    <div class="content-card">
        <div class="content-card-img">
            <img src="${item.img}" alt="">
        </div>
        <div class="content-card-title">
            <p><a href="#">Buy</a></p>
        </div>
    </div>
    `).join("");
}


const getContentData = async (name) => {
    try {
        const response = await fetch(`${url}/${name}`);
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        return error.message;
    }
}


tabCards.addEventListener("click", (e) => {
    tabName = e.target.dataset.name;
    console.log(tabName);
    if (tabName){
        getContentData(tabName);
    }
});