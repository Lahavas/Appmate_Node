
const path = require('path');
const fs = require('fs');// AWS S3 서비스

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/aws.json')[env];

// AWS 설정
const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
AWS.config.accessKeyId = config.accessKeyId;
AWS.config.secretAccessKey = config.secretAccessKey;

const s3 = new AWS.S3();
const bucketName = 'appmate2017';

// 날짜를 이용해서 임의의 파일 이름 만들기
exports.getItemKey = originName => {
    // 확장자 얻기
    const extname = path.extname(originName);

    const now = new Date(); // 날짜를 이용한 파일 이름 생성
    const itemKey = 'file_' + now.getYear() + now.getMonth() + now.getDay() + now.getHours() + now.getMinutes() + now.getSeconds() + Math.floor(Math.random()*1000) + extname;
    return itemKey;
}

// 이미지를 S3로 업로드
exports.uploadToS3 = (itemKey, path, mimetype) => {
    return new Promise( (resolve, reject) => {
        const params = {
            Bucket: bucketName,  // 필수
            Key: itemKey,			// 필수
            ACL: 'public-read',
            Body: fs.createReadStream(path),
            ContentType: mimetype
        }

        s3.putObject(params, (err, data) => {
            if ( err ) {
                reject(err);
            }
            else {
                const imageUrl = s3.endpoint.href + bucketName + '/' + itemKey;
                resolve({url:imageUrl});
            }
        });
    });
}
