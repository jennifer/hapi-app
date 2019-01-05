module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return h.file('./public/index.html');
    }
}