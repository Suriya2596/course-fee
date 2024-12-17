const stringTrim = (body) => {
    return Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
        }
    });
}

const requiredError = ({body={} , requiredFields=[] , res}) => {
    for (const field of requiredFields) {
        if (!body[field]) {
            return res.status(400).json({
                message: `${field} is required`
            });
        }
    }
}

module.exports = { stringTrim  , requiredError}