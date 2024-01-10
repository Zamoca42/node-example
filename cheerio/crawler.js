const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../winston/winston');

// 검색 키워드를 사용해서 인프런에서 강의 목록 웹 페이지 가져오기
const getHtml = async(keyword) => {
    try {
        return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword));
    } catch (error) {
        logger.error(error);
    }
}

// 가져온 웹 페이지에서 강의 제목을 추출해서 배열에 담기
const parsing = async (keyword) => {
    const html = await getHtml(keyword);
    const $ = cheerio.load(html.data);
    const $courseList = $(".course_card_item");
    
    let courses = [];
    
    $courseList.each((idx, node) => {
        courses.push({
            title: $(node).find(".course_title").text(),
            instructor: $(node).find(".instructor").text(),
            price: $(node).find(".price").text(),
            rating: $(node).find(".star_solid").css("width"),
        });
    });
    return courses;
}

const getCourse = async(keyword) => {
    const result = await parsing(keyword);
    console.log(result);
}

getCourse("NestJS");