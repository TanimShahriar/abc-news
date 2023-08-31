//news category function
const handleCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();

  const tabContainer = document.getElementById('tabContainer');
  const news = data.data.news_category;
  news.forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>

`;
    tabContainer.appendChild(div);

  });

  // console.log(data.data.news_category);
}

//category related data function
const handleLoadNews = async (categoryId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
  const data = await response.json();

  const cardContainer = document.getElementById('cardContainer')
  cardContainer.innerHTML = '';
  data.data.forEach((news) => {
    console.log(news);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl pt-16">
    <figure><img src="${news.thumbnail_url}" /></figure>
    <h2 class="px-5 mt-5 text-xl font-bold">${news.title.slice(0, 40)}</h2>
    <p class="px-5">${news.details.slice(0, 200)}</p>
    <div class="card-body">
      <h2 class="card-title">
        ${news.author.name}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>${news.author.published_date}</p>
      
      <div class="card-actions justify-end">
        <div class="badge badge-outline">${news.rating.number}</div> 
        <div class="badge badge-outline">${news.rating.badge}</div>
      </div>
      <p>Total view: <span>${news.total_view}</span></p>
    </div>
  </div>

    `;
    cardContainer.appendChild(div);
  })
}

handleCategory();