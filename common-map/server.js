const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '..')));

// 부스 데이터 API 엔드포인트
app.get('/api/booth-data', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/boothData.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('부스 데이터 가져오기 오류:', error);
    res.status(500).json({ error: '부스 데이터를 가져오는데 실패했습니다.' });
  }
});

// 맵 템플릿 API 엔드포인트
app.get('/api/map-template', async (req, res) => {
  try {
    const template = await fs.readFile(path.join(__dirname, 'templates/boothMap.svg'), 'utf8');
    res.type('text/html').send(template);
  } catch (error) {
    console.error('맵 템플릿 가져오기 오류:', error);
    res.status(500).send('맵 템플릿을 가져오는데 실패했습니다.');
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 오류 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('서버 오류가 발생했습니다.');
}); 