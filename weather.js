document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value.trim();
  fetchWeather(city);
});

function fetchWeather(city = '') {
  // 接口基础地址
  const appid = '56761788';
  const appsecret = 'ti3hP8y9';
  let url = `https://www.tianqiapi.com/free/day?appid=${appid}&appsecret=${appsecret}`;
  if (city) {
    url += `&city=${encodeURIComponent(city)}`;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('网络请求失败');
      return response.json();
    })
    .then(data => {
      showWeather(data);
    })
    .catch(error => {
      document.getElementById('result').innerHTML = `<span style="color:red;">查询失败: ${error.message}</span>`;
    });
}

function showWeather(data) {
  if (!data || data.errmsg) {
    document.getElementById('result').innerHTML = `<span style="color:red;">未查询到天气信息。</span>`;
    return;
  }
  const html = `
    <h3>${data.city} - ${data.date}</h3>
    <p>天气：${data.wea}</p>
    <p>温度：${data.tem} ℃</p>
    <p>最高温：${data.tem1} ℃，最低温：${data.tem2} ℃</p>
    <p>风向：${data.win} ${data.win_speed || ''}</p>
    <p>空气质量：${data.air_tips || '无'}</p>
  `;
  document.getElementById('result').innerHTML = html;
}

// 页面加载时自动查询默认城市（可选）
fetchWeather('北京');
