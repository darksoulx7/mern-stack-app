const validation = (schema) => async (req,resp,next) => {
    const body = req.body;

    try {
        await schema.validate(body, { abortEarly: false });
        next()
    } catch(error) {
        let err = {}
        for(let i = 0;i < error.errors.length; i++) {
            let key = `err${i+1}`
            err[key] = error.errors[i]
        }

        return resp.status(400).json(err)
    }
}

module.exports = validation;