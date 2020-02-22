module.exports = {
	'DATABASE': 'mongodb:localhost:27017/faceRecognition',
	'SECRET':	'thisisasupersecretpasswordthingy',
    'FACE_API_KEY': 'ebb7dee6d1814347ab00b43e738d9d76',
    'FACE_API_HOST': 'centralus.api.cognitive.microsoft.com',
    'FACE_API_PATH_VERIFY': '/face/v1.0/verify',
    'FACE_API_PATH_DETECT': '/face/v1.0/detect?returnFaceId=true',
    'FACE_API_CONFIDENCE_TRESHOLD': 0.75
};