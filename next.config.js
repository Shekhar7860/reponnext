const path = require('path')
module.exports = {
    images: {
        loader: "default",
        path: "/_next/image"
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}